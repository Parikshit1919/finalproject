import { Component, OnInit } from '@angular/core';
import {Register} from '../Models/register';   
import { Router } from '@angular/router';
declare var $ : any;
import { AuthService } from '../services/auth.service';


import { NgForm, FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';  

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  data = false;    
  //STATES DROPDOWN LIST
  states : string [] = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgar", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttarakhand", "Uttar Pradesh","West Bengal"];



  massage:string; 
  //FORMS GROUP
  studentForm= new FormGroup({
    Fullname: new FormControl('',[Validators.required]),
    Student_Email: new FormControl('',[Validators.required,Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')]),
    Student_Password:new FormControl('',[Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
    Mobile: new FormControl('',[Validators.required,Validators.pattern("^[0-9]{10}$")]),
    City: new FormControl('',[Validators.required]),
    DOB:new FormControl('',[Validators.required]),
    State:new FormControl('',[Validators.required]),
    Qualification:new FormControl('',[Validators.required]),
    Year_of_completion:new FormControl('',[Validators.required,Validators.min(2010),Validators.max(2021)]),
    recaptcha:new FormControl('',[Validators.required])
  })

  

  constructor(private formBuilder: FormBuilder, public registration:AuthService,private router:Router) { }
   siteKey:string="6Ldl9ZcaAAAAAAvNdFyM-fTThxY3aVN8S13ns1By";

  ngOnInit(): void 
  {
 
  }
  //GET METHODS FOR DATA
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

  //MODAL POPUP FOR SUCESSFULL REGISTRATION
  onSuccess()
  {
    $('#successModal').modal('show'); 
  }

  //MODAL POPUP FOR REGISTRATION ERROR
  onError()
  {
    $('#errorModal').modal('show'); 
  }

  //CALL SERVICE ON BUTTON CLICK
  onFormSubmit()    
  {    
   console.log(this.studentForm.value); 
   this.registration.create(this.studentForm.value).subscribe(res => {
    if(res.toString() == "added")
    {
        this.onSuccess();
    }
    else if(res.toString() == "exists")
    {
      this.onError();
    }
    console.log(res);
      // 
    });
  } 
  


}

