
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,  FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { Feedback } from '../Models/feedback';
import { Courses } from '../Models/courses';
import {Exam} from '../Models/exam';
import { AdminService } from '../services/admin.service';
declare var $ : any;

@Component({
  selector: 'app-student-feedback',
  templateUrl: './student-feedback.component.html',
  styleUrls: ['./student-feedback.component.css']
})
export class StudentFeedbackComponent implements OnInit {

    levels : number [] = [1,2,3];
    exams: Exam[] = [];
 
   //feedback: Feedback[] = [];
  constructor(
    public fb: FormBuilder,
    private router: Router,
    public StudentService: StudentService,
    public CourseService: AdminService

  ) { }
  AddFeedbackForm=new FormGroup({
    s_id:new FormControl('',Validators.required),
    s_name:new FormControl('',Validators.required),
    e_id:new FormControl('',Validators.required),
    Feedback1:new FormControl('',Validators.required)
  })

  // ngOnInit() {}

  ngOnInit() {
    this. CourseService.GetExams().subscribe((data: Exam[])=>{
      this.exams = data;
      console.log(data);
  })
  }
  
  get s_id()
  {
    return this.AddFeedbackForm.get('s_id');
  }
  get s_name()
  {
    return this.AddFeedbackForm.get('s_name');
  }
  get e_id()
  {
    return this.AddFeedbackForm.get('e_id');
  }
  get Feedback1()
  {
    return this.AddFeedbackForm.get('Feedback1');
  }
  
  /********************************** MODAL FUNCTIONS ******************************************************/

  
  onSuccess()
  {
    $('#successModal').modal('show'); 
    
  }

   //MODAL POPUP FOR Feedback ERROR
   onError()
   {
     $('#errorModal').modal('show'); 
   }
 /********************************** FORMS FUNCTIONS ******************************************************/
  //CALL SERVICE ON METHOD CALL
  submitForm() {
    console.log(this.AddFeedbackForm.value);
    this.StudentService.SendFeedback(this.AddFeedbackForm.value).subscribe(res => {
      console.log(res)
     
      if(res.toString() == "added")
      {
          this.onSuccess();
      }
      else if(res.toString() == "error")
      {
        this.onError();
      }
    });
  } 

}