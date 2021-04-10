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
    Student_Email:new FormControl('',[Validators.required]),
    Student_Password:new FormControl('',[Validators.required])
  })
  ngOnInit(): void {
  }
  get Student_Email(){
    return this.loginForm.get('Student_Email');
  }
  get Student_Password(){
    return this.loginForm.get('Student_Password');
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
