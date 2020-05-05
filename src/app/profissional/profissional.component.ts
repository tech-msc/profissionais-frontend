import { Estabelecimento } from './../estabelecimento/estabelecimento.model'
import { Component, OnInit, TemplateRef } from '@angular/core'
import { Profissional } from './profissional.model'
import { ProfissionalService } from './profissional.service'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import { EstabelecimentoService } from '../estabelecimento/estabelecimento.service'


@Component({
  selector: 'app-profissional',
  templateUrl: './profissional.component.html',
  styles: [
  ]
})
export class ProfissionalComponent implements OnInit {

  constructor(
    private profissionalService: ProfissionalService,
    private estabelecimentoService: EstabelecimentoService,
    private modalService: BsModalService) { }

  profissionais: Profissional[]
  profissional: Profissional

  estabelecimentos: Estabelecimento[]
  estabeleciemento: Estabelecimento

  // Modal
  profissionalSelected: any
  modalData = []

  // Modal
  modalRef: BsModalRef

  ngOnInit(): void {
    this.getProfissionais()
    this.getEstabelecimentos()
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
        .subscribe( data => this.profissional = data)
  }

  novoProfissional(profissional: Profissional)
  {
    this.profissionalService
    .profissionalNovo(profissional)
      .subscribe( data => this.profissional = data)
  }

  editarProfissional(id: number, profissional: Profissional) {
    this.profissionalService
      .profissionalEditar(id, profissional)
        .subscribe( data => this.profissional = data)
  }

  removerProfissional(profissional: Profissional)
  {
    this.profissionalService
    .profissionalNovo(profissional)
      .subscribe( data => this.profissional = data)
  }


  getEstabelecimentos(){
    this.estabelecimentoService.estabelecimentos()
    .subscribe(data => this.estabelecimentos = data)
  }



  // Modal
  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService
      .show(template)

  }


  openModal2(template: TemplateRef<any>, item?: any){
    const initialState = [
      this.profissionalSelected = item
    ]
    this.modalRef = this.modalService
      .show(template, {initialState})



  }

}
