import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public loginService: LoginService) { }
  loginForm=new FormGroup({
    email:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required])
  })
  ngOnInit(): void {
  }
  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }
  submitForm() {
    // console.log(this.loginForm.value);
    // alert("Login Successful")
    this.loginService.login(this.loginForm.value).subscribe(res => {
     console.log(res)
      if(res.toString()=="FOUND"){
        console.log("Found");
        this.router.navigateByUrl('/Login/Student/Dashboard')
      }
      
     
      
    });
  } 
  

}
export class Login {
  email:string;
  password:string;
  
} 
