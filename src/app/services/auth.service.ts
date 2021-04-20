import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Register } from '../Models/register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiServer = "http://localhost:50471/api";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }
  create(register): Observable<Register> {
    var req= this.httpClient.post<Register>(this.apiServer + '/Registration/', JSON.stringify(register), this.httpOptions).pipe(catchError(this.errorHandler));
    return req;
}

/*********************************************** ERROR HANDLING  ************************************/

errorHandler(error) {
  let errorMessage = '';
  if(error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
}

}
