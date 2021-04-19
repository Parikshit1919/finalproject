import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,  FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import {Exam} from '../Models/exam';
import {Question} from '../Models/questions';
import { AdminService } from '../services/admin.service';
declare var $ : any;

@Component({
  selector: 'app-student-exam-select',
  templateUrl: './student-exam-select.component.html',
  styleUrls: ['./student-exam-select.component.css']
})
export class StudentExamSelectComponent implements OnInit {

  //FOR LOCAL STORAGE
  selected_exam: number;
  exams: Exam[] = [];
  exam_id:number;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public StudentService: StudentService,
    public CourseService: AdminService
    ) {}

    ngOnInit():void {
      this. CourseService.GetExams().subscribe((data: Exam[])=>{
        this.exams = data;
        console.log(data);
    })
    }
  

  SearchExamForm=new FormGroup({
    Exam_id:new FormControl('',Validators.required),
    courseName:new FormControl('',Validators.required),
    time:new FormControl('',Validators.required),
    level:new FormControl('',Validators.required),
   
  })

  get Exam_id()
  {
    return this.SearchExamForm.get('Exam_id');
  }
  get time()
  {
    return this.SearchExamForm.get('time');
  }
  get courseName()
  {
    return this.SearchExamForm.get('courseName');
  }


  Select(Exam_id)
 {   
     console.log(Exam_id);
     this.exam_id=Exam_id;
     this.selected_exam=Exam_id;  
      this.CourseService.GetExamByID(Exam_id).subscribe(res => {
      this.SearchExamForm.controls['courseName'].setValue(res.Course_name);
      this.SearchExamForm.controls['time'].setValue(res.time+' Mins');
      this.SearchExamForm.controls['level'].setValue(res.level);
      localStorage.setItem('course_id',res.Course_id);
      console.log(res);
    });
  }

  submitForm(){
    console.log("INSIDE SUBMIT",this.selected_exam);
    console.log("INSIDE SIBMIT",this.SearchExamForm.value)
    localStorage.setItem("exam_id",this.selected_exam.toString());
    this.router.navigateByUrl('/Login/Student/Dashboard/Exam')
  }
 
}
