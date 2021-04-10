import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,  FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { Courses } from '../Models/login-class';
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  courses: Courses[] = [];
  constructor(
    public fb: FormBuilder,
    private router: Router,
    public AddCourseService: AdminService

  ) { }
  AddCourseForm=new FormGroup({
    courseID:new FormControl(''),
    CourseName:new FormControl('')
  })

  ngOnInit() {
    this. AddCourseService.GetCourse().subscribe((data: Courses[])=>{
      this.courses = data;
  })
  }
  get  courseID(){
    return this.AddCourseForm.get('courseID');
  }
  get CourseName(){
    return this.AddCourseForm.get('CourseName');
  }
  submitForm() {
    this.AddCourseService.AddCourse(this.AddCourseForm.value).subscribe(res => {
      console.log('Registered Successfully')
      console.log(res)
      console.log(this.AddCourseForm.value)
    });
  } 

}
export class AddCourse{
  courseID:string;
  CourseName:string;
}
