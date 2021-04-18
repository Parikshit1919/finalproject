import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Results } from '../Models/results';
import { LoginService } from '../services/login.service';
import { StudentService } from '../services/student.service';
import {TogglerService} from '../services/toggler.service';
import {Students} from '../Models/students'
@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  // VARIABLE FOR SIDEBAR COLLAPSE LIST ng-bootstrap
  public isCollapsed = true;
  public student_email:string; //GET STUDENT EMAIL
  public student:Students; // GET RESULTS
  public student_name:string; // GET STUDENT NAME

  constructor(public studentService:StudentService,public sideNavService: TogglerService,public login:LoginService, private router:Router) { 
    sideNavService.toggleMenu();
  }

  ngOnInit(): void 
  {
    //GET STUDENT EMAIL FROM LOCAL STORAGE AND CALL SERVICE TO GET STUDENT NAME
    this.student_email=localStorage.getItem('token');
    this.studentService.GetStudent(this.student_email).subscribe((data:Students)=>{
      this.student=data;
      localStorage.setItem('s_id',this.student.Student_id.toString());
      console.log(this.student);
      console.log(this.student.Fullname);
      this.student_name=this.student.Fullname;
    });
  }

  //METHOD TO LOGOUT STUDENT
  logout() {  
    console.log('logout');  
    // localStorage.setItem('s_id',"");
    // localStorage.setItem('exam_id',"");
    localStorage.clear();
    localStorage
    this.login.logout();  
    this.router.navigateByUrl('/Home');  
  }  
}
