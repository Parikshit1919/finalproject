import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import {  Observable, throwError } from 'rxjs';
import {Feedback} from '../Models/feedback';
import {Exam} from '../Models/exam';
import { Results } from '../Models/results';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiServer = "http://localhost:49910/api";
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
GetResultById(s_id):Observable<Results[]>{
  var req = this.httpClient.get<Results[]>(this.apiServer + '/AdminExamResult/'+s_id);
  console.log(req);
  return req;
}

}
