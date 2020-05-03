import { Component, OnInit } from '@angular/core'
import { Profissional } from 'src/app/profissional/profissional.model'

@Component({
  selector: 'app-estabelecimento-item',
  templateUrl: './estabelecimento-item.component.html',
  styleUrls: ['./estabelecimento-item.component.css']
})
export class EstabelecimentoItemComponent implements OnInit {

  profissional: Profissional

  constructor() { }

  ngOnInit(): void {
  }

}
