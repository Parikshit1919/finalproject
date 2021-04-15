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
 Student_email;
 results;

  constructor(public studentService:StudentService, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.Student_email=localStorage.getItem('token');
    this.studentService.GetResult(Student_Email).subscribe((data: Results[])=>
    {
      
      this.results=data;
    })  
  }

}


function Student_Email(Student_Email: any) {
  throw new Error('Function not implemented.');
}

