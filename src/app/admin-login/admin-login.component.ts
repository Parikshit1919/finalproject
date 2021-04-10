import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public loginService: AdminService

  ) { }
  adminLoginForm=new FormGroup({
    email:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required])
  })
  ngOnInit(): void {
  }
  get email(){
    return this.adminLoginForm.get('email');
  }
  get password(){
    return this.adminLoginForm.get('password');
  }
  submitForm() {
    this.loginService.login(this.adminLoginForm.value).subscribe(res => {
      console.log(res)
       if(res.toString()=="FOUND"){
         console.log("Found");
         
         this.router.navigateByUrl('/Login/Admin/Dashboard')
       }
        });
  } 
  DeleteCourse(courseID)
  {
    this.loginService.DeleteCourse(courseID).subscribe();
  }
}
export class AdminLogin {
  email:string;
  password:string;
  
} 