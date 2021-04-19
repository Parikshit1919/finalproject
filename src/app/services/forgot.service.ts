import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ForgotService {
  private apiServer = "http://localhost:49910/api";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
   }

  constructor(private httpClient: HttpClient) { }

  SendEmail(email)
  {
    console.log(email);
     let params = new HttpParams().set('email', email);
    console.log(this.apiServer + '/ResetPassword/'+email )
    var req = this.httpClient.get(this.apiServer + '/ResetPassword/',{ params: params });
    console.log(req);
    return req;
  }

  changePassword(values)
  {
    console.log(values);
   
    var req = this.httpClient.post(this.apiServer + '/ResetPassword/', JSON.stringify(values), this.httpOptions);
    console.log(req);
    return req;
  }
}
