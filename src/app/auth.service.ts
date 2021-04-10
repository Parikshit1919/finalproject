import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Register } from './register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiServer = "http://localhost:55345/api";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }
  create(register): Observable<Register> {
    return this.httpClient.post<Register>(this.apiServer + '/registration/', JSON.stringify(register), this.httpOptions)
}
}
