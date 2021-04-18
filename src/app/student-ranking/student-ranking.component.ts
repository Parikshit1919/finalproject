import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import{MatSort, MatSortModule}from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Exam } from '../Models/exam';
import { Results } from '../Models/results';
import { StudentService } from '../services/student.service';
@Component({
  selector: 'app-student-ranking',
  templateUrl: './student-ranking.component.html',
  styleUrls: ['./student-ranking.component.css']
})
export class StudentRankingComponent implements OnInit {
  @ViewChild(MatSort) sort:MatSort;
  displayedColumns=['e_id','Course_name','level','s_id','Result','Fullname'];
  results:Results[]=[];
  exams:Exam[]=[];
  exam_id:number;
  dataSource;
  constructor(public studentService:StudentService, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.studentService.GetAllResults().subscribe((data: Results[])=>{
      this.results=data;
      console.log(this.results);
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.sort=this.sort;

  });
  }

}
