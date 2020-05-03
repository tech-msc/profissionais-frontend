// import { Observable } from 'rxjs/'
import { HttpResponse } from '@angular/common/http'

import { Observable, of } from 'rxjs'



class ErrorHandlerCustom {
  // tslint:disable-next-line: align
  static handleError(operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {
      console.error(error)
      this.log(`${operation} failed: ${error.message}`)

      return of(result as any)
    }
  }

  static log(message: string) {
    console.log(message)
  }
}

export default ErrorHandlerCustom
