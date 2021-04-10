import { Component, OnInit } from '@angular/core';
import {Register} from '../register';   
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';


import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';  

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  data = false;    
  
  massage:string; 
  studentForm= new FormGroup({
    Fullname: new FormControl('',[Validators.required]),
    Student_Email: new FormControl('',[Validators.email,Validators.required]),
    Student_Password:new FormControl('',[Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
    Mobile: new FormControl('',[Validators.required,Validators.pattern("^[0-9]{10}$")]),
    City: new FormControl('',[Validators.required]),
    DOB:new FormControl('',[Validators.required]),
    State:new FormControl('',[Validators.required]),
    Qualification:new FormControl('',[Validators.required]),
    Year_of_completion:new FormControl('',[Validators.required]),
    recaptcha:new FormControl('',[Validators.required])
   

  })
  constructor(private formBuilder: FormBuilder, public registration:AuthService,private router:Router) { }
   siteKey:string="6Ldl9ZcaAAAAAAvNdFyM-fTThxY3aVN8S13ns1By";

  ngOnInit(): void 
  {
 
  }
  get Fullname()
  {
    return this.studentForm.get('Fullname');
  }
  get Student_Email()
  {
    return this.studentForm.get('Student_Email');
  }
  get Student_Password()
  {
    return this.studentForm.get('Student_Password');
  }
  get Mobile()
  {
    return this.studentForm.get('Mobile');
  }
  get City()

  {
    return this.studentForm.get('City');
  }
  get DOB()
  {
    return this.studentForm.get('DOB');
  }
  get State()
  {
    return this.studentForm.get('State');
  }
  get Qualification()
  {
    return this.studentForm.get('Qualification');
  }
  get Year_of_completion()
  {
    return this.studentForm.get('Year_of_completion');
  }
  get recaptcha()
  {
    return this.studentForm.get('recaptcha');
  }
  onFormSubmit()    
  {    
    
  this.registration.create(this.studentForm.value).subscribe(res => {
      
      
      this.router.navigateByUrl('/Login/Student');
      
      
    });
  

 
  }    


}

