import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Exam } from '../Models/exam';
import { Results } from '../Models/results';
import { StudentService } from '../services/student.service';


@Component({
  selector: 'app-student-results',
  templateUrl: './student-results.component.html',
  styleUrls: ['./student-results.component.css']
})
export class StudentResultsComponent implements OnInit {
  @ViewChild(MatSort) sort:MatSort;
  displayedColumns=['e_id','Course_name','level','s_id','Result','Fullname'];
  results:Results[]=[];
  exams:Exam[]=[];
  exam_id:number;
 public Student_email:string;
 
  dataSource: any;
  
 
  constructor(public studentService:StudentService, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.Student_email=localStorage.getItem('token');
    this.studentService.GetResult(this.Student_email).subscribe((data:Results[])=>{
      this.results=data;
      console.log(this.results);
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.sort=this.sort;
    });
  }

}


 

