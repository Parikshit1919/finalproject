import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Results } from '../Models/results';
import { LoginService } from '../services/login.service';
import { StudentService } from '../services/student.service';
import {TogglerService} from '../services/toggler.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  // VARIABLE FOR SIDEBAR COLLAPSE LIST ng-bootstrap
  public isCollapsed = true;
  public student_email:string;
  public results:Results[]=[];
  public student_name:string;
  constructor(public studentService:StudentService,public sideNavService: TogglerService,public login:LoginService, private router:Router) { 
    sideNavService.toggleMenu();
  }

  ngOnInit(): void 
  {
    this.student_email=localStorage.getItem('token');
    this.studentService.GetResult(this.student_email).subscribe((data:Results[])=>{
      this.results=data;
      console.log(this.results[0].Fullname);
      this.student_name=this.results[0].Fullname;
    });
  }
  logout() {  
    console.log('logout');  
    this.login.logout();  
    this.router.navigateByUrl('/Home');  
  }  
}
