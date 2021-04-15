import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import {  Observable, throwError } from 'rxjs';
import {AdminLogin} from '../Models/admin-login';
import {Feedback} from '../Models/feedback';
import {Courses} from '../Models/courses';
import {Exam} from '../Models/exam';
import {Results} from '../Models/results';
import {Analytics} from '../Models/analytics';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiServer = "http://localhost:50471/api";
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
/*************************************************** COURSES METHOD *************************************/

//METHOD TO GET COURSES
GetCourse():Observable<Courses[]>
{
  var req =  this.httpClient.get<Courses[]>(this.apiServer + '/Courses/');
  console.log(req);
  return req;
}
//METHOD TO GET COURSE BY ID
GetCourseByID(courseID):Observable<Courses>
{
  let params = new HttpParams().set('id', courseID);
  var req = this.httpClient.get<Courses>(this.apiServer + '/CoursesByID/', { params: params });
  console.log(req);
  return req;
}

//METHOD TO MODIFT COURSES
ModifyCourse(course):Observable<Courses>
{
  console.log(course);
  var req = this.httpClient.put<Courses>(this.apiServer + '/Courses/', JSON.stringify(course), this.httpOptions);
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

/*********************************************** EXAMS METHODS ************************************/

  //METHOD TO GET ADD AVAILABLE EXAMS
GetExams():Observable<Exam[]>
  {
    var req = this.httpClient.get<Exam[]>(this.apiServer + '/AdminExam/');
    console.log(req);
    return req;
  }
//METHOD TO GET EXAM BY ID
GetExamByID(examID):Observable<Exam>
{
  let params = new HttpParams().set('id', examID);
  var req = this.httpClient.get<Exam>(this.apiServer + '/ExamsByID/',{ params: params } );
  console.log(req);
  return req;
}
//METHOD TO MODIFY EXAM
ModifyExam(exam):Observable<Exam>
{
  var req = this.httpClient.put<Exam>(this.apiServer + '/AdminExam/',JSON.stringify(exam), this.httpOptions );
  console.log(req);
  return req;
}
//METHOD TO DELETE EXAM
DeleteExam(ExamID):Observable<Exam>
{
  console.log(this.apiServer + '/AdminExam/' +ExamID);
  var req = this.httpClient.delete<Exam>(this.apiServer + '/AdminExam/' +ExamID);
  console.log(req);
  return req;
}
//METHOD TO ADD EXAM
AddExam(Exam):Observable<Exam>
{
  var req = this.httpClient.post<Exam>(this.apiServer + '/AdminExam/' ,JSON.stringify(Exam), this.httpOptions);
  console.log(req);
  return req;
}

/*********************************************** FEEDBACK METHODS ************************************/

//METHOD TO GET FEEDBACK
GetFeedback():Observable<Feedback[]>
{
  var req = this.httpClient.get<Feedback[]>(this.apiServer + '/FeedBack/');
  console.log(req);
  return req;
}

/*********************************************** RESULTS METHODS ************************************/

GetAllResults():Observable<Results[]>
{
  var req = this.httpClient.get<Results[]>(this.apiServer + '/AdminExamResult/ViewAll');
  console.log(req);
  return req;
}
GetResult(e_id):Observable<Results[]>
{
  var req = this.httpClient.get<Results[]>(this.apiServer + '/AdminExamResult/'+e_id);
  console.log(req);
  return req;
}

/*********************************************** ANALYTICS METHODS ************************************/
GetAnalytics():Observable<Analytics>
{
  var req = this.httpClient.get<Analytics>(this.apiServer + '/Analytics/');
  console.log(req);
  return req;
}

//LOGOUT
logout() :void {    
  localStorage.setItem('isLoggedIn','false');    
  localStorage.removeItem('token');  
    
  } 
  
}
