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
    nome: '',
    endereco: '',
    estabelecimento: '',
  }

  // Modal
  modalRef: BsModalRef


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

  criarFormEdicaoProfissional() {
    this.formularioEdicao = this.formBuilder.group({
      nome_edit_form: [''],
      endereco_edit_form: [''],
      estabelecimento_edit_form: [''],
    })
  }

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
      .subscribe((data) =>  this.profissional = data)
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
      this.getProfissionais()
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

  openModal2(template: TemplateRef<any>, item: any) {
    const initialState = [
      (this.profissionalSelected = item),
      // (this.estabelecimentoSelected = this.estabelecimentos.find( x => item.estabelecimento_id = x.id))
    ]
    this.modalRef = this.modalService.show(template, { initialState })
  }



  onClose() {
    this.modalRef.hide()
  }

  formularioCadastroSubmit() {
    this.modalData = {
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
}
