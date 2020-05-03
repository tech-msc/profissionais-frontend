import { Component, OnInit } from '@angular/core'
import { Profissional } from '../profissional.model'

@Component({
  selector: 'app-profissional-item',
  templateUrl: './profissional-item.component.html',
  styleUrls: ['./profissional-item.component.css']
})
export class ProfissionalItemComponent implements OnInit {

  constructor() { }

  profissional: Profissional

  ngOnInit(): void {
    
  }

}
