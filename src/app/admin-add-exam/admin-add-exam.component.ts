import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
declare var $ : any;
=======
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Courses } from '../Models/courses';
import {Exam} from '../Models/exam';
import { AdminService } from '../services/admin.service';
declare var $ : any;

>>>>>>> backup
@Component({
  selector: 'app-admin-add-exam',
  templateUrl: './admin-add-exam.component.html',
  styleUrls: ['./admin-add-exam.component.css']
})
<<<<<<< HEAD
export class AdminAddExamComponent implements OnInit {
  deleteExam_id: number;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public CourseService: AdminService
=======
export class AdminAddExamComponent implements OnInit
 {
  deleteExamId:number;
  levels:number[] = [1,2,3];
  exams: Exam[] = []; //TO STROE ALL AVAILABLE EXAMS
  courses : Courses[] = []; // TO STORE ALL AVAIALBLE COURSES

  constructor(
    public CourseService: AdminService,
    public fb: FormBuilder,
>>>>>>> backup
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
<<<<<<< HEAD
  onSuccess()
  {

    //$('#AddCourseModal').modal('hide'); 
    //$('#DeleteCourseModal').modal('hide'); 
    //$('#successModal').modal('show'); 
    
  }

   //MODAL POPUP FOR REGISTRATION ERROR
   onError()
   {
    // $('#AddCourseModal').modal('hide'); 
    // $('#DeleteCourseModal').modal('hide');
     //$('#errorModal').modal('show'); 
   }
  setDeleteCourse(id:number)
  {
    this.deleteExam_id=id;
    console.log(id);
  }
  DeleteExam()
  {
    this.CourseService.DeleteCourse(this.deleteExam_id).subscribe(res => {
=======
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

  /****************************************** MODIFY EXAM FORM CONTROL **************************************/ 
  ModifyExamForm=new FormGroup({
    course_id:new FormControl('',Validators.required),
    exam_id:new FormControl('',Validators.required),
    level:new FormControl('',Validators.required),
    time:new FormControl('',[Validators.required,Validators.min(10),Validators.max(180)])
  })
  
  //GET FROM DATA
  get course_id()
  {
    return this.ModifyExamForm.get('course_id');
  }

  get level()
  {
    return this.ModifyExamForm.get('level');
  }

  get time()
  {
    return this.ModifyExamForm.get('time');
  }

  get exam_id()
  {
    return this.ModifyExamForm.get('exam_id');
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
    $('#ModifyExamModal').modal('hide'); 
    $('#DeleteExamModal').modal('hide'); 
    $('#successModal').modal('show'); 
    
  }

   //MODAL POPUP FOR REGISTRATION ERROR
   onError()
   {
     $('#AddExamModal').modal('hide'); 
     $('#ModifyExamModal').modal('hide'); 
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
>>>>>>> backup
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
<<<<<<< HEAD

=======
  }
 

   /************************************************** METHODS FOR MODIFY ****************************************/
   GetExam(examID)
   {
     console.log(examID);
     this.CourseService.GetExamByID(examID).subscribe(res => {
      this.ModifyExamForm.controls['course_id'].setValue(res.Course_id);
      this.ModifyExamForm.controls['exam_id'].setValue(res.Exam_id);
      this.ModifyExamForm.controls['level'].setValue(res.level);
      this.ModifyExamForm.controls['time'].setValue(res.time);
      console.log(res);
     
    });
   }

   //METHOD TO SUBMIT MODIFIED COURSE DATA
  submitModified()
  {
    console.log(this.ModifyExamForm.value)
    this.CourseService.ModifyExam(this.ModifyExamForm.value).subscribe(res => {
      console.log(res);
      if(res.toString() == "changed")
      {
          this.onSuccess();
      }
      else if(res.toString() == "error")
      {
        this.onError();
      }
    });
>>>>>>> backup
  }
}
