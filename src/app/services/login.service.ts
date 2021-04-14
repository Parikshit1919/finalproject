import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import {  Observable, throwError } from 'rxjs';
import { LoginClass } from '../Models/login-class';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
<<<<<<< HEAD
  private apiServer = "http://localhost:49910/api";
=======
  private apiServer = "http://localhost:27104/api";
>>>>>>> backup
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
