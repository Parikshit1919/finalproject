import { Component, OnInit,ViewChild } from '@angular/core';
import {Results} from '../Models/results';
import{AdminService} from '../services/admin.service';
import{MatSort, MatSortModule}from '@angular/material/sort';
import{MatTableModule}from '@angular/material/table';
import{MatTableDataSource}from '@angular/material/table';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NumericLiteral } from 'typescript';
import { NgModule } from '@angular/core';
import { CdkNoDataRow } from '@angular/cdk/table';
import{Students} from '../Models/students';


@Component({
  selector: 'app-admin-student-result',
  templateUrl: './admin-student-result.component.html',
  styleUrls: ['./admin-student-result.component.css']
})
export class AdminStudentResultComponent implements OnInit {

  @ViewChild(MatSort) sort:MatSort;

  displayedColumns=['e_id','Course_name','level','s_id','Result','Fullname'];
  results1:Results[]=[];
  dataSource;
  students1:Students[]=[]

  distinct_students:Results[]=[]; // STORE DISTINCT Student IDS FOR SEARCH
  student_ids:number[]=[];        // STORE Student IDS FOR SEARCH
  student_id:number;             // TO GET BY Student


  constructor(public result:AdminService, public fb: FormBuilder) { }
  SearchExamForm=new FormGroup({
    s_id:new FormControl('',Validators.required),
  })
  get s_id()
  {
    return this.SearchExamForm.get('s_id');
  }

  ngOnInit(): void {
    //GET ALL REULTS OF STUDENTS
    this.result.GetResultsadminstudent().subscribe((data: Results[])=>{
      this.results1=data;
      this.results1.forEach((item)=>{
        if(!this.student_ids.includes(item.s_id))
        {
          this.student_ids.push(item.s_id);
          this.distinct_students.push(item);
        }
        
      })
      //SLELECT ONLY DISTINCT STUDENT SOURSES
      console.log(this.distinct_students)
      console.log(this.results1);
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.sort=this.sort;

  });

  }
  
  //METHOD TO SUBMIT FORM
  submitForm()
  {
    console.log("INSIDE");
    console.log(this.SearchExamForm.value);
    this.result.GetResultsbystudent(this.SearchExamForm.get('s_id').value).subscribe((data: Results[])=>{
    
      console.log(data);
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.sort=this.sort;
  
  });
  }



}