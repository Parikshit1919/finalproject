import { Component, OnInit } from '@angular/core';
import {TogglerService} from '../services/toggler.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  constructor(public sideNavService: TogglerService) { }

  ngOnInit(): void {
  }

}