import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public RegisterFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) { }
   siteKey:string="6Ldl9ZcaAAAAAAvNdFyM-fTThxY3aVN8S13ns1By";

  ngOnInit(): void 
  {
    this.RegisterFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }
  

}
