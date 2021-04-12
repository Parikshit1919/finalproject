
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,  FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { Feedback } from '../Models/feedback';
import { Courses } from '../Models/courses';

import { AdminService } from '../services/admin.service';
declare var $ : any;

@Component({
  selector: 'app-student-feedback',
  templateUrl: './student-feedback.component.html',
  styleUrls: ['./student-feedback.component.css']
})
export class StudentFeedbackComponent implements OnInit {

  levels : number [] = [1,2,3];
    courses: Courses[] = [];
 
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
    c_id:new FormControl('',Validators.required),
    level:new FormControl('',Validators.required),
    Feedback1:new FormControl('',Validators.required)
  })

  // ngOnInit() {}

  ngOnInit() {
    this. CourseService.GetCourse().subscribe((data: Courses[])=>{
      this.courses = data;
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
  get c_id()
  {
    return this.AddFeedbackForm.get('c_id');
  }
  get level()
  {
    return this.AddFeedbackForm.get('level');
  }
  get Feedback1()
  {
    return this.AddFeedbackForm.get('Feedback1');
  }
  
  /********************************** MODAL FUNCTIONS ******************************************************/

  //REFRESH PAGE METHOD
  // refresh()
  // {
  //   location.reload();
  // }

  //MODAL POPUP FOR SUCESSFULL Feedback
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
    this.StudentService.SendFeedback(this.AddFeedbackForm.value).subscribe(res => {
      console.log(res)
     
      if(res.toString() == "added")
      {
          this.onSuccess();
      }
      else if(res.toString() == "exists")
      {
        this.onError();
      }
    });
  } 

}