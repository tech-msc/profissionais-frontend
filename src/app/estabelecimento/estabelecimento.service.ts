import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Estabelecimento } from './estabelecimento.model'
import { PROFISSIONAL_API as API } from './../app.api'
import { Observable, of } from 'rxjs'
import ErrorHandler from '../app.error-handler'
import { catchError, map, tap } from 'rxjs/operators'

@Injectable()
export class EstabelecimentoService {
  constructor(private http: HttpClient) {}

  estabelecimentos(): Observable<Estabelecimento[]> {
    return this.http
      .get<Estabelecimento[]>(`${API}/estabelecimento`)
      .pipe(catchError(ErrorHandler.handleError('get all estabelecimentos')))
  }

  estabelecimentoPorID(id: number): Observable<Estabelecimento> {
    return this.http
      .get<Estabelecimento>(`${API}/estabelecimento/${id}`)
      .pipe(catchError(ErrorHandler.handleError('get estabelecimento by ID')))
  }

  estabelecimentoEditar(
    id: number,
    estabelecimento: Estabelecimento
  ): Observable<Estabelecimento> {
    return this.http.put(`${API}/estabelecimento/${id}`, estabelecimento).pipe(
      map((response) => response),
      catchError(ErrorHandler.handleError('update estabelecimento by id'))
    )
  }


  estabelecimentoNovo(estabelecimento: Estabelecimento): Observable<Estabelecimento> {
    return this.http.post(`${API}/estabelecimento`, estabelecimento).pipe(
      map((response) => response),
      catchError(ErrorHandler.handleError('create estabelecimento'))
    )
  }


  estabelecimentoRemover(id: number): Observable<any> {
    return this.http.delete(`${API}/estabelecimento/${id}`).pipe(
      map((response) => response),
      catchError(ErrorHandler.handleError('remove estabelecimento'))
    )
  }


}
