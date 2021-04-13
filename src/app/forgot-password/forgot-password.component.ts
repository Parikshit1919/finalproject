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
   public ForgotService: ForgotService
  

) { }
  ForgotPasswordForm=new FormGroup({
    Email:new FormControl('',[Validators.required]),
    resetcode:new FormControl('',[Validators.required]),
    newpassword:new FormControl('',[Validators.required]),
    confirmpassword:new FormControl('',[Validators.required]),
})
ngOnInit(): void {
}
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
  // this.isCollapsed1 = !this.isCollapsed1;

  this.isCollapsed1 = false;
}

submitForm() {
  // this.loginService.login(this.ForgotPasswordForm.value).subscribe(res => {
  //   console.log(res)
  //    if(res.toString()=="valid"){
       
  //      this.router.navigateByUrl('/Login/Admin/Dashboard')
  //    }
  //    else
  //    {
  //     $('#errorModal').modal('show'); 
  //    }
  //     });
} 

}

