import { Component, OnInit } from '@angular/core';
import {TogglerService} from '../services/toggler.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
 // VARIABLE FOR SIDEBAR COLLAPSE LIST ng-bootstrap
  public isCollapsed = true;
  public isCollapsed1 = true;
  public isCollapsed2 = true;
  constructor(public sideNavService: TogglerService) 
  { 
    sideNavService.toggleMenu();
  }
  courseToggler():void{
    this.isCollapsed1 = !this.isCollapsed1;
  }
  resultsToggler():void{
    this.isCollapsed2 = !this.isCollapsed2;
  }
  ngOnInit(): void {
  }

}
