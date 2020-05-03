import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Estabelecimento } from './estabelecimento.model'
import { PROFISSIONAL_API as API } from './../app.api'
import { Observable, of } from 'rxjs'
import ErrorHandler from '../app.error-handler'
import { catchError, map, tap } from 'rxjs/operators'

@Injectable()
export class EstabelecimentoService {

  constructor(private http: HttpClient) { }


  estabelecimentos(): Observable<Estabelecimento[]> {
    return this.http
      .get<Estabelecimento[]>(`${API}/estabelecimento`)
      .pipe(catchError(ErrorHandler.handleError('get all estabelecimentos')))
  }
}
