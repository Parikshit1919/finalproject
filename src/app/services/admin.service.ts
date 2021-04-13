import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import {  Observable, throwError } from 'rxjs';
import {AdminLogin} from '../Models/admin-login';
import {Feedback} from '../Models/feedback';
import {Courses} from '../Models/courses';
import {Exams} from '../Models/exams'
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiServer = "http://localhost:49910/api";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

//METHOD TO LOGIN ADMIN
login(login):Observable<AdminLogin>
{
  console.log("INSIDE SERVICE",login);
  var req = this.httpClient.post<AdminLogin>(this.apiServer + '/AdminLogin/',JSON.stringify(login), this.httpOptions);
  console.log(req);
  return(req);
}

//METHOD TO GET COURSES
GetCourse():Observable<Courses[]>
{
  var req =  this.httpClient.get<Courses[]>(this.apiServer + '/Courses/');
  console.log(req);
  return req;
}

//METHOD TO ADD COURSES
AddCourse(course): Observable<Courses> 
{
  return this.httpClient.post<Courses>(this.apiServer + '/Courses/', JSON.stringify(course), this.httpOptions);
}
//METHOD TO DELETE COURSES
DeleteCourse(courseID):Observable<Courses> 
{
  console.log("INSIDE SERVICE",courseID);
  console.log("INSIDE SERVEE URL",this.apiServer + '/Courses/' +courseID);
  var req = this.httpClient.delete<Courses>(this.apiServer + '/Courses/' +courseID);
  console.log(req);
  return req;
}

//METHOD TO GET FEEDBACK
GetFeedback():Observable<Feedback[]>
{
  var req = this.httpClient.get<Feedback[]>(this.apiServer + '/FeedBack/');
  console.log(req);
  return req;
}
//METHOD TO DELETE EXAM
DeleteExam(Exam_id):Observable<Exams> 
{
  console.log("INSIDE SERVICE",Exam_id);
  console.log("INSIDE SERVEE URL",this.apiServer + '/AdminExam/' +Exam_id);
  var req = this.httpClient.delete<Exams>(this.apiServer + '/AdminExam/' +Exam_id);
  console.log(req);
  return req;
}

}
