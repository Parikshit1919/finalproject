import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import {Analytics} from '../Models/analytics';
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  analytics:Analytics
  constructor(public adminService:AdminService) { }

  ngOnInit(): void 
  {
    //GET AVAILABLE ANALYTICS
    this.adminService.GetAnalytics().subscribe((data: Analytics)=>{
      this.analytics=data;
      console.log(data);

      });
      }

}
