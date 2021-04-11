import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,  FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { Courses } from '../Models/courses';
import { compileNgModule } from '@angular/compiler';
declare var $ : any;
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  deleteCourseId:number;
  courses: Courses[] = [];
  constructor(
    public fb: FormBuilder,
    private router: Router,
    public CourseService: AdminService

  ) { }
  AddCourseForm=new FormGroup({
    Course_name:new FormControl('',Validators.required)
  })

  ngOnInit() {
    this. CourseService.GetCourse().subscribe((data: Courses[])=>{
      this.courses = data;
      console.log(data);
  })
  }
  //GET COURSES DATA
  get Course_name(){
    return this.AddCourseForm.get('Course_name');
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

    $('#AddCourseModal').modal('hide'); 
    $('#DeleteCourseModal').modal('hide'); 
    $('#successModal').modal('show'); 
    
  }

   //MODAL POPUP FOR REGISTRATION ERROR
   onError()
   {
     $('#AddCourseModal').modal('hide'); 
     $('#DeleteCourseModal').modal('hide');
     $('#errorModal').modal('show'); 
   }
 /********************************** FORMS FUNCTIONS ******************************************************/
  //CALL SERVICE ON METHOD CALL
  submitForm() {
    this.CourseService.AddCourse(this.AddCourseForm.value).subscribe(res => {
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

  //GET THE COURSE ID TO BE DELETED
  setDeleteCourse(id:number)
  {
    this.deleteCourseId=id;
    console.log(id);
  }


  //CALL SERVICE TO DELETE THE COURSE 
  deleteCourse()
  {
    this.CourseService.DeleteCourse(this.deleteCourseId).subscribe(res => {
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
