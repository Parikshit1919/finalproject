import { Component, OnInit } from '@angular/core';
import {Feedback} from '../Models/feedback';
import { AdminService } from '../services/admin.service';
@Component({
  selector: 'app-admin-feedback',
  templateUrl: './admin-feedback.component.html',
  styleUrls: ['./admin-feedback.component.css']
})
export class AdminFeedbackComponent implements OnInit {

  feedbacks:Feedback[] = [];
  constructor( public feedbackService: AdminService ) { }

  ngOnInit(): void 
  {
    this.feedbackService.GetFeedback().subscribe((data: Feedback[])=>
    {
      console.log("FEEDBACK",data);
      this.feedbacks=data;
    })  
  }

}
