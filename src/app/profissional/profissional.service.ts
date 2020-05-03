import { HttpClient } from '@angular/common/http'

import { PROFISSIONAL_API as API } from './../app.api'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Profissional } from './profissional.model'
import ErrorHandler from '../app.error-handler'
import { catchError, map, tap } from 'rxjs/operators'

@Injectable()
export class ProfissionalService {
  constructor(private http: HttpClient) {}

  profissionais(): Observable<Profissional[]> {
    return this.http
      .get<Profissional[]>(`${API}/profissional`)
      .pipe(catchError(ErrorHandler.handleError('get all profissionais')))
  }

  profissionalPorID(id: number): Observable<Profissional> {
    return this.http
      .get<Profissional>(`${API}/profissional/${id}`)
      .pipe(
        map(response => response),
        catchError(ErrorHandler.handleError('get profissional by id')
      ))
  }

  profissionalEditar( id: number ,  profissional: Profissional): Observable<Profissional> {
    return this.http.put(`${API}/profissional/${id}`, profissional)
    .pipe(
      map(response => response),
      catchError(ErrorHandler.handleError('update profissional by id')
    ))
  }

  profissionalNovo( profissional: Profissional ): Observable<Profissional>{
    return this.http.post (`${API}/profissional`, profissional)
    .pipe(
      map(response => response),
      catchError(ErrorHandler.handleError('create profissional')
    ))
  }

  profissionalRemover( id: number ): Observable<any>{
   return this.http.delete (`${API}/profissional/${id}` )
    .pipe(
      map(response => response),
      catchError(ErrorHandler.handleError('create profissional')
    ))
  }



}
