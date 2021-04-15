import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Results } from '../Models/results';
import { StudentService } from '../services/student.service';


@Component({
  selector: 'app-student-results',
  templateUrl: './student-results.component.html',
  styleUrls: ['./student-results.component.css']
})
export class StudentResultsComponent implements OnInit {
 

  constructor(public studentService:StudentService, public fb: FormBuilder) { }

  ngOnInit(): void {
    // this.studentService.GetResultById(s_id).subscribe((data: Results)=>
    // {
      
    //   this.results=data;
    // })  
  }

}


