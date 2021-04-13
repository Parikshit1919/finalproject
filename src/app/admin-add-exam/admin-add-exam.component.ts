import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Courses } from '../Models/courses';
import {Exam} from '../Models/exam';
import { AdminService } from '../services/admin.service';
declare var $ : any;

@Component({
  selector: 'app-admin-add-exam',
  templateUrl: './admin-add-exam.component.html',
  styleUrls: ['./admin-add-exam.component.css']
})
export class AdminAddExamComponent implements OnInit
 {
  deleteExamId:number;
  levels:number[] = [1,2,3];
  exams: Exam[] = []; //TO STROE ALL AVAILABLE EXAMS
  courses : Courses[] = []; // TO STORE ALL AVAIALBLE COURSES
  constructor(
    public CourseService: AdminService,
    public fb: FormBuilder,
  ) { }
  ngOnInit(): void 
  {
    this. CourseService.GetExams().subscribe((data: Exam[])=>{
      this.exams = data;
      console.log(data);
    })
    this. CourseService.GetCourse().subscribe((data: Courses[])=>{
      this.courses = data;
      console.log(data);
    })
  }
/****************************************** ADD EXAM FORM CONTROL **************************************/  

  AddExamForm=new FormGroup({
    Course_id:new FormControl('',Validators.required),
    Level:new FormControl('',Validators.required),
    Time:new FormControl('',[Validators.required,Validators.min(10),Validators.max(180)])
  })
  //GET FROM DATA
 

  get Course_id()
  {
    return this.AddExamForm.get('Course_id');
  }

  get Level()
  {
    return this.AddExamForm.get('Level');
  }

  get Time()
  {
    return this.AddExamForm.get('Time');
  }
 /********************************** FORMS FUNCTIONS ******************************************************/
  //CALL SERVICE ON METHOD CALL
  submitForm() {
    console.log(this.AddExamForm.value);

    this.CourseService.AddExam(this.AddExamForm.value).subscribe(res => {
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
/********************************** MODAL FUNCTIONS ******************************************************/

  //REFRESH PAGE METHOD
  refresh()
  {
    location.reload();
  }
  //MODAL POPUP FOR SUCESSFULL REGISTRATION
  onSuccess()
  {

    $('#AddExamModal').modal('hide'); 
    $('#DeleteExamModal').modal('hide'); 
    $('#successModal').modal('show'); 
    
  }

   //MODAL POPUP FOR REGISTRATION ERROR
   onError()
   {
     $('#AddExamModal').modal('hide'); 
     $('#DeleteExamModal').modal('hide');
     $('#errorModal').modal('show'); 
   }

   /************************************************** METHODS FOR DELETE ******************/
   //GET THE COURSE ID TO BE DELETED
   setDeleteExam(id:number)
   {
     this.deleteExamId=id;
     console.log(id);
   }

   
  //CALL SERVICE TO DELETE THE COURSE 
  deleteExam()
  {
    this.CourseService.DeleteExam(this.deleteExamId).subscribe(res => {
      console.log(res);
      if(res.toString() == "removed")
      {
          this.onSuccess();
      }
      else if(res.toString() == "course_error")
      {
        this.onError();
      }
    });
  }
 

}
