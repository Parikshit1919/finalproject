import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,  FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { Courses } from '../Models/courses';
import { compileNgModule } from '@angular/compiler';
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
    courseID:new FormControl(''),
    CourseName:new FormControl('')
  })

  ngOnInit() {
    this. CourseService.GetCourse().subscribe((data: Courses[])=>{
      this.courses = data;
      console.log(data);
  })
  }
  //GET COURSES DATA
  get  courseID(){
    return this.AddCourseForm.get('courseID');
  }
  get CourseName(){
    return this.AddCourseForm.get('CourseName');
  }

  //CALL SERVICE ON METHOD CALL
  submitForm() {
    this.CourseService.AddCourse(this.AddCourseForm.value).subscribe(res => {
      console.log('Registered Successfully')
      console.log(res)
      console.log(this.AddCourseForm.value)
    });
  } 

  setDeleteCourse(id:number)
  {
    this.deleteCourseId=id;
    console.log(id);
  }
  deleteCourse()
  {
    this.CourseService.DeleteCourse(this.deleteCourseId).subscribe(res => {
      console.log(res);
    });
  }

}
