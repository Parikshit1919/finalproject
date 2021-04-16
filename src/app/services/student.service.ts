import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import {  Observable, throwError } from 'rxjs';
import {Feedback} from '../Models/feedback';
import {Exam} from '../Models/exam';
import { Results } from '../Models/results';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiServer = "http://localhost:50471/api";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }



 //METHOD TO ADD Feedback
SendFeedback(feedback): Observable<Feedback> 
{
  return this.httpClient.post<Feedback>(this.apiServer + '/Feedback/', JSON.stringify(feedback), this.httpOptions);
}


//METHOD TO VIEW RESULT
GetAllResults():Observable<Results[]>{
  var req = this.httpClient.get<Results[]>(this.apiServer + '/AdminExamResult/ViewAll');
  console.log(req);
  return req;
}
//METHOD TO GET REUSLT BY EMAIL
GetResult(Student_Email):Observable<Results[]>{
  
  let params = new HttpParams().set('email', Student_Email);
  var req = this.httpClient.get<Results[]>(this.apiServer + '/AdminExamResult/ByEmail/',{ params: params });
  console.log(req);
  return req;
}

}
