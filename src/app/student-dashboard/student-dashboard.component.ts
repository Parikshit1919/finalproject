import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
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
  constructor(public sideNavService: TogglerService,public login:LoginService, private router:Router) { 
    sideNavService.toggleMenu();
  }

  ngOnInit(): void 
  {
    this.student_email=localStorage.getItem('token');
    
  }
  logout() {  
    console.log('logout');  
    this.login.logout();  
    this.router.navigateByUrl('/Home');  
  }  
}
