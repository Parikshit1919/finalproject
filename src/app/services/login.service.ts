import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import {  Observable, throwError } from 'rxjs';
import { LoginClass } from '../Models/login-class';
import { catchError } from 'rxjs/operators';

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

/*********************************************** LOGIN METHODS  ************************************/
  //METHOD TO LOGIN STUDENT
  login(login):Observable<LoginClass>
{
  console.log("INSIDE SERVICE",login);
  var req = this.httpClient.post<LoginClass>(this.apiServer + '/Login/',JSON.stringify(login), this.httpOptions).pipe(catchError(this.errorHandler));
  console.log(req);
  return(req);
}
//LOGOUT
logout() :void {    
  localStorage.setItem('isLoggedIn','false');    
  localStorage.removeItem('token');  
    
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
