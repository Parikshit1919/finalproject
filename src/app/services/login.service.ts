import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import {  Observable, throwError } from 'rxjs';
import { LoginClass } from '../login-class';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiServer = "http://localhost:56413/api";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }
  login(login):Observable<LoginClass>
{
  console.log("INSIDE SERVICE",login);
  var req = this.httpClient.post<LoginClass>(this.apiServer + '/login/',JSON.stringify(login), this.httpOptions)
  console.log(req);
  return(req);
}
}
