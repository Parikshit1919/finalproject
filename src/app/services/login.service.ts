import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import {  Observable, throwError } from 'rxjs';
import { LoginClass } from '../Models/login-class';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiServer = "http://localhost:50471/api";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  //METHOD TO LOGIN STUDENT
  login(login):Observable<LoginClass>
{
  console.log("INSIDE SERVICE",login);
  var req = this.httpClient.post<LoginClass>(this.apiServer + '/Login/',JSON.stringify(login), this.httpOptions)
  console.log(req);
  return(req);
}
}
