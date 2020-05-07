import { Estabelecimento } from './../estabelecimento/estabelecimento.model'
import { Component, OnInit, TemplateRef } from '@angular/core'
import { Profissional } from './profissional.model'
import { ProfissionalService } from './profissional.service'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import { EstabelecimentoService } from '../estabelecimento/estabelecimento.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-profissional',
  templateUrl: './profissional.component.html',
  styles: [],
})
export class ProfissionalComponent implements OnInit {
  constructor(
    private profissionalService: ProfissionalService,
    private estabelecimentoService: EstabelecimentoService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder
  ) {}

  profissionais: Profissional[]
  profissional: Profissional

  estabelecimentos: Estabelecimento[]
  estabeleciemento: Estabelecimento

  // Formulário
  formularioCadastro: FormGroup
  formularioEdicao: FormGroup

  // Modal
  profissionalSelected: any
  profissionalSelectedId = 0
  estabelecimentoSelected: Estabelecimento
  modalData = {
    // id: '',
    nome: '',
    endereco: '',
    estabelecimento: '',
  }

  // Modal
  modalRef: BsModalRef

  // criarFormEdicaoProfissional(item: Profissional) {

  ngOnInit(): void {
    this.getProfissionais()
    this.getEstabelecimentos()
    this.criarFormCadastroProfissional()
    // this.criarFormEdicaoProfissional()
  }

  getProfissionais() {
    this.profissionalService
      .profissionais()
      .subscribe((data) => (this.profissionais = data))

    // console.log(`Profissionais: ${this.profissionais} `)
  }

  getProfissional(id: number) {
    this.profissionalService
      .profissionalPorID(id)
      .subscribe((data) => (this.profissional = data))
  }

  novoProfissional(profissional: Profissional) {
    this.profissionalService
      .profissionalNovo(profissional)
      .subscribe((data) => (this.profissional = data))
  }

  editarProfissional(id: number, profissional: Profissional) {

    this.profissionalService
      .profissionalEditar(id, profissional)
      .subscribe((data) => (this.profissional = data))
  }

  removerProfissional(profissional: Profissional) {
    try {
      this.profissionalService.profissionalRemover(profissional.id).subscribe()
    } catch (error) {
      console.log('[ERR-PC-RPF]')
    }

    this.onClose()
  }

  getEstabelecimentos() {
    this.estabelecimentoService
      .estabelecimentos()
      .subscribe((data) => (this.estabelecimentos = data))
  }

  // Modal
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template)
  }

  openModalExclusao(template: TemplateRef<any>, item: any) {
    const initialState = [
      (this.profissionalSelected = item)
    ]
    this.modalRef = this.modalService.show(template, { initialState })
  }

  openModalEdicao(template: TemplateRef<any>, item: any) {
    const id_estab = item.estabelecimento_id

    this.estabelecimentoSelected = this.estabelecimentos.find(
      (x) => id_estab === x.id
    )

    this.criarFormEdicaoProfissional(item)

    const initialState = [(this.profissionalSelected = item)]
    this.modalRef = this.modalService.show(template, { initialState })
  }

  criarFormEdicaoProfissional(item: Profissional) {
    this.formularioEdicao = this.formBuilder.group({
      // id_edit_form: [
      //   item.id
      // ],

      nome_edit_form: [
        item.nome,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(150),
        ]),
      ],
      endereco_edit_form: [
        item.endereco,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(150),
        ]),
      ],
      estabelecimento_edit_form: [null],
    })
  }

  criarFormCadastroProfissional() {
    this.formularioCadastro = this.formBuilder.group({
      nome_add_form: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(150),
        ]),
      ],
      endereco_add_form: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(150),
        ]),
      ],
      estabelecimento_add_form: [null],
    })
  }

  formularioEdicaoSubmit() {
    this.modalData = {
      // id: this.formularioEdicao.get('id_edit_form').value,
      nome: this.formularioEdicao.get('nome_edit_form').value,
      endereco: this.formularioEdicao.get('endereco_edit_form').value,
      estabelecimento: this.formularioEdicao.get('estabelecimento_edit_form')
        .value,
    }

    try {
      const { nome, endereco } = this.modalData
      const saveProfissional = new Profissional(nome, endereco, null)

      debugger

      saveProfissional.id = this.profissionalSelected.id

      if (this.modalData.estabelecimento) {
        saveProfissional.estabelecimento_id = Number(
          this.modalData.estabelecimento
        )
      }

      debugger
      //  this.novoProfissional(saveProfissional)
      this.editarProfissional(saveProfissional.id, saveProfissional)
      this.getProfissionais()
    } catch (error) {
      console.log('[ERR-PC-FES]')
    }
    this.onClose()
  }

  formularioCadastroSubmit() {
    this.modalData = {
      // id: '',
      nome: this.formularioCadastro.get('nome_add_form').value,
      endereco: this.formularioCadastro.get('endereco_add_form').value,
      estabelecimento: this.formularioCadastro.get('estabelecimento_add_form')
        .value,
    }

    try {
      const { nome, endereco } = this.modalData
      const saveProfissional = new Profissional(nome, endereco, null)

      if (this.modalData.estabelecimento) {
        const { id } = this.estabelecimentos.find(
          (x) => x.nome === this.modalData.estabelecimento
        )

        saveProfissional.estabelecimento_id = id
      }
      this.novoProfissional(saveProfissional)
      this.getProfissionais()
    } catch (error) {
      console.log('[ERR-PC-FCS]')
    }

    this.onClose()
    this.criarFormCadastroProfissional()
  }

  onClose() {
    this.modalRef.hide()
  }
}
