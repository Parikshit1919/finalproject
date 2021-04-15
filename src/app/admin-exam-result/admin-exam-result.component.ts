import { Component, OnInit,ViewChild } from '@angular/core';
import{AdminService} from '../services/admin.service';
import{MatSort, MatSortModule}from '@angular/material/sort';
import{MatTableModule}from '@angular/material/table';
import{MatTableDataSource}from '@angular/material/table';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Results} from '../Models/results'
import {Exam} from '../Models/exam';
import { NumericLiteral } from 'typescript';
import { NgModule } from '@angular/core';
import { CdkNoDataRow } from '@angular/cdk/table';

@Component({
  selector: 'app-admin-exam-result',
  templateUrl: './admin-exam-result.component.html',
  styleUrls: ['./admin-exam-result.component.css']
})
export class AdminExamResultComponent implements OnInit {
  @ViewChild(MatSort) sort:MatSort;

  displayedColumns=['e_id','Course_name','level','s_id','Result','Fullname'];
  results:Results[]=[];
  exams:Exam[]=[];
  exam_id:number;
  dataSource;

  constructor(public adminService:AdminService, public fb: FormBuilder) { }

  //SEARCH FORM
  SearchExamForm=new FormGroup({
    e_id:new FormControl('',Validators.required),
  })
  get e_id()
  {
    return this.SearchExamForm.get('e_id');
  }

  ngOnInit(): void
   {
     //GET ALL THE RESULTS
    this.adminService.GetAllResults().subscribe((data: Results[])=>{
      this.results=data;
      console.log(this.results);
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.sort=this.sort;

  });
  //GET AVAILABLE EXAMS
  this.adminService.GetExams().subscribe((data: Exam[])=>{
    this.exams=data;
    console.log(data);

});
}

submitForm()
{
  console.log("INSIDE");
  console.log(this.SearchExamForm.value);
  this.adminService.GetResult(this.SearchExamForm.get('e_id').value).subscribe((data: Results[])=>{
  
    console.log(data);
    this.dataSource=new MatTableDataSource(data);
    this.dataSource.sort=this.sort;

});
}


}