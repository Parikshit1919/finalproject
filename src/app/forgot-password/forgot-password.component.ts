import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotService } from '../services/forgot.service';
declare var $ : any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit { constructor(
  public fb: FormBuilder,
  private router: Router,
  public forgotService: ForgotService
  

) { }
  ForgotPasswordForm=new FormGroup({
    Email:new FormControl('',[Validators.required]),
    resetcode:new FormControl('',[Validators.required]),
    newpassword:new FormControl('',[Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
    confirmpassword:new FormControl('',[Validators.required])
},{validators: this.password.bind(this)})

//PASSWORD MATCHING
password(formGroup: FormGroup) {
  const { value: password } = formGroup.get('newpassword');
  const { value: confirmPassword } = formGroup.get('confirmpassword');
  return password === confirmPassword ? null : { passwordNotMatch: true };
}
ngOnInit(): void {
}
//GET FORM DATA
get Email(){
  return this.ForgotPasswordForm.get('Email');
}

get resetcode(){
  return this.ForgotPasswordForm.get('resetcode');
}
get newpassword(){
  return this.ForgotPasswordForm.get('newpassword');
  
}

get confirmpassword(){
  return this.ForgotPasswordForm.get('confirmpassword');
}



public isCollapsed1 = true;
resetToggler():void{
  this.isCollapsed1 = false;
}

//THIS METHOD CALLS THE API TO SEND RESET KEY
sendEmail()
{
  console.log(this.ForgotPasswordForm.get('Email').value);
  var res =this.forgotService.SendEmail(this.ForgotPasswordForm.get('Email').value).subscribe(res => {
    console.log(res);
  });
  console.log(res);
}
submitForm() {
  console.log(this.ForgotPasswordForm.value);
  console.log(this.ForgotPasswordForm.get('Email').value);
  var res =this.forgotService.changePassword(this.ForgotPasswordForm.value).subscribe(res => {
    console.log(res);
  });
  console.log(res);
} 

}

