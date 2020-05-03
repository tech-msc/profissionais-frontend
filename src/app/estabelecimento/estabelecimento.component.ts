import { Estabelecimento } from './estabelecimento.model'
import { Component, OnInit } from '@angular/core'
import { EstabelecimentoService } from './estabelecimento.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-estabelecimento',
  templateUrl: './estabelecimento.component.html',
  styles: [],
})
export class EstabelecimentoComponent implements OnInit {
  estabelecimentos: Estabelecimento[]
  // estabelecimentos: Observable<Estabelecimento[]>
  // estabelecimento: Estabelecimento

  constructor(private estabelecimentoService: EstabelecimentoService) {}

  ngOnInit(): void {
    this.estabelecimentoService.estabelecimentos()
      .subscribe(data => this.estabelecimentos = data
    )
  }
}
