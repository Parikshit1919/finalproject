import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import {  Observable, throwError } from 'rxjs';
import {Feedback} from '../Models/feedback';
import {Exam} from '../Models/exam';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiServer = "http://localhost:27104/api";
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
}
