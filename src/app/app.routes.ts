import { EstabelecimentoComponent } from './estabelecimento/estabelecimento.component'
import { HomeComponent } from './home/home.component'
import { ProfissionalComponent } from './profissional/profissional.component'
import { Routes} from '@angular/router'


const rotas = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'estabelecimento',
    component: EstabelecimentoComponent
  },
  {
    path: 'profissional',
    component: ProfissionalComponent
  }
]


export const ROUTES: Routes = rotas
