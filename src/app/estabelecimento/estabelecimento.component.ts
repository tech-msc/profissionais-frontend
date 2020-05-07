import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import { Estabelecimento } from './estabelecimento.model'
import { Component, OnInit, TemplateRef } from '@angular/core'
import { EstabelecimentoService } from './estabelecimento.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-estabelecimento',
  templateUrl: './estabelecimento.component.html',
  styles: [],
})
export class EstabelecimentoComponent implements OnInit {
  constructor(
    private estabelecimentoService: EstabelecimentoService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder
  ) {}

  estabelecimentos: Estabelecimento[]
  estabelecimento: Estabelecimento

  // Formulário
  formularioCadastro: FormGroup
  formularioEdicao: FormGroup

  // Modal
  estabelecimentoSelected: any


  modalData = {
    nome: '',
    endereco: '',
  }
  modalRef: BsModalRef

  ngOnInit(): void {
    this.getEstabelecimentos()
    this.criarFormCadastroEstabelecimento()
  }

  getEstabelecimentos() {
    this.estabelecimentoService
      .estabelecimentos()
      .subscribe( data => this.estabelecimentos = data)
  }

  getEstabelecimento(id: number) {
    this.estabelecimentoService
      .estabelecimentoPorID(id)
      .subscribe((data) => (this.estabelecimento = data))
  }

  novoEstabelecimento(estabelecimento: Estabelecimento) {
    this.estabelecimentoService
      .estabelecimentoNovo(estabelecimento)
      .subscribe((data) => (this.estabelecimento = data))
  }

  editarEstabelecimento(id: number, estabelecimento: Estabelecimento) {
    this.estabelecimentoService
      .estabelecimentoEditar(id, estabelecimento)
      .subscribe((data) => (this.estabelecimento = data))
  }

  removerEstabelecimento(estabelecimento: Estabelecimento) {
    try {

      this.estabelecimentoService
        .estabelecimentoRemover(estabelecimento.id)
        .subscribe()
    } catch (error) {
      console.log('[ERR-EC-RE]')
    }

    this.onClose()
  }

  // Modal
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template)

  }

  openModalExclusao(template: TemplateRef<any>, item: any) {

const initialState = [(this.estabelecimentoSelected = item)]

this.modalRef = this.modalService.show(template, { initialState })
  }

  openModalEdicao(template: TemplateRef<any>, item: any) {
    // const id_estab = item.id

    // this.estabelecimentoSelected = this.estabelecimentos.find(
    //   (x) => id_estab === x.id
    // )


    this.criarFormEdicaoEstabelecimento(item)

    const initialState = [(this.estabelecimentoSelected = item)]
    this.modalRef = this.modalService.show(template, { initialState })
  }

  criarFormEdicaoEstabelecimento(item: Estabelecimento) {
    this.formularioEdicao = this.formBuilder.group({
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
    })
  }

  criarFormCadastroEstabelecimento() {
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
    })
  }

  formularioEdicaoSubmit() {
    this.modalData = {
      // id: this.formularioEdicao.get('id_edit_form').value,
      nome: this.formularioEdicao.get('nome_edit_form').value,
      endereco: this.formularioEdicao.get('endereco_edit_form').value,
    }

    try {
      const { nome, endereco } = this.modalData
      const saveEstabelecimento = new Estabelecimento(nome, endereco)


      saveEstabelecimento.id = this.estabelecimentoSelected.id

      this.editarEstabelecimento(saveEstabelecimento.id, saveEstabelecimento)
      this.getEstabelecimentos()
    } catch (error) {
      console.log('[ERR-EC-FES]')
    }
    this.onClose()
  }

  formularioCadastroSubmit() {
    this.modalData = {
      // id: '',
      nome: this.formularioCadastro.get('nome_add_form').value,
      endereco: this.formularioCadastro.get('endereco_add_form').value,
    }

    try {
      const { nome, endereco } = this.modalData
      const saveEstabelecimento = new Estabelecimento(nome, endereco)

      this.novoEstabelecimento(saveEstabelecimento)
      this.getEstabelecimentos()
    } catch (error) {
      console.log('[ERR-EC-FCS]')
    }

    this.onClose()
    this.criarFormCadastroEstabelecimento()
  }

  onClose() {
    this.modalRef.hide()
  }
}
