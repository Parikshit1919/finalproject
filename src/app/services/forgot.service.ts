import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ForgotService {
  private apiServer = "http://localhost:50471/api";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
   }

  constructor(private httpClient: HttpClient) { }
  
  /***********************************************  RESET PASSWORD METHODS ************************************/
  //METHOD TO SEND EMAIL TO API
  SendEmail(email)
  {
    console.log(email);
     let params = new HttpParams().set('email', email);
    console.log(this.apiServer + '/ResetPassword/'+email )
    var req = this.httpClient.get(this.apiServer + '/ResetPassword/',{ params: params }).pipe(catchError(this.errorHandler));
    console.log(req);
    return req;
  }

  //METHOD TO SUBMIT CHANGE PASSWORD FORM
  changePassword(values)
  {
    console.log(values);
   
    var req = this.httpClient.post(this.apiServer + '/ResetPassword/', JSON.stringify(values), this.httpOptions).pipe(catchError(this.errorHandler));
    console.log(req);
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
