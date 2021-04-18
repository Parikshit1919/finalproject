import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
declare var $ : any;
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
    Admin_Email:new FormControl('',[Validators.required]),
    Admin_Password:new FormControl('',[Validators.required])
  })
  ngOnInit(): void {
  }

  get Admin_Email(){
    return this.adminLoginForm.get('Admin_Email');
  }
  get Admin_Password(){
    return this.adminLoginForm.get('Admin_Password');
  }

  submitForm() {
    this.loginService.login(this.adminLoginForm.value).subscribe(res => {
      console.log(res)
      
       if(res.toString()=="valid"){
        localStorage.setItem('isLoggedIn', "true"); 
        localStorage.setItem('token', this.adminLoginForm.value.Admin_Email);
        this.router.navigateByUrl('/Login/Admin/Dashboard')
       }
       else
       {
        $('#errorModal').modal('show'); 
       }
        });
  } 

}
