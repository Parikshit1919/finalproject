import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import {TogglerService} from '../services/toggler.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  //FOR LOCAL STORAGE
  id: string; 
  name:string;
 // VARIABLE FOR SIDEBAR COLLAPSE LIST ng-bootstrap
  public isCollapsed = true;
  public isCollapsed1 = true;
  public isCollapsed2 = true;
  constructor(public sideNavService: TogglerService, public adminservice:AdminService, private router:Router) 
  { 
    sideNavService.toggleMenu();
  }
  courseToggler():void{
    this.isCollapsed1 = !this.isCollapsed1;
  }
  resultsToggler():void{
    this.isCollapsed2 = !this.isCollapsed2;
  }
  ngOnInit(): void 
  {
    this.id = localStorage.getItem('token');  
    this.name  = this.id.substring(0, this.id.lastIndexOf("@"));
    this.router.navigateByUrl('Login/Admin/Dashboard/Analytics');
  }

  logout() {  
    console.log('logout');  
    this.adminservice.logout();  
    this.router.navigateByUrl('/Home');  
  }  
}
