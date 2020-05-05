import { Component, OnInit, TemplateRef } from '@angular/core'
import { Profissional } from './profissional.model'
import { ProfissionalService } from './profissional.service'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'


@Component({
  selector: 'app-profissional',
  templateUrl: './profissional.component.html',
  styles: [
  ]
})
export class ProfissionalComponent implements OnInit {

  constructor(
    private profissionalService: ProfissionalService,
    private modalService: BsModalService) { }

  profissionais: Profissional[]
  profissional: Profissional

  // Modal
  modalRef: BsModalRef

  ngOnInit(): void {
    this.getProfissionais()
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

  // Modal
  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService
      .show(template)
  }

}
