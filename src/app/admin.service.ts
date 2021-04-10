import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import {  Observable, throwError } from 'rxjs';
import { Courses, LoginClass } from './login-class';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiServer = "http://localhost:56413/api";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }
  login(login):Observable<LoginClass>
{
  console.log("INSIDE SERVICE",login);
  var req = this.httpClient.post<LoginClass>(this.apiServer + '/login/',JSON.stringify(login), this.httpOptions)
  console.log(req);
  return(req);
}
GetCourse():Observable<Courses[]>{
  return this.httpClient.get<Courses[]>(this.apiServer + '/course/')
}
AddCourse(course): Observable<Courses> {
  return this.httpClient.post<Courses>(this.apiServer + '/course/', JSON.stringify(course), this.httpOptions)
}
DeleteCourse(courseID):Observable<Courses>{
  return this.httpClient.delete<Courses>(this.apiServer + '/course/' +courseID ,this.httpOptions)
}
}
