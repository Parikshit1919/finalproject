import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { StudentLoginComponent } from './student-login/student-login.component';

const routes: Routes = [
  {path:'' ,component:HomepageComponent},
  {path:'Home',component:HomepageComponent},
  {path:'Register',component:RegisterComponent},
  {path:'Login/Admin',component:AdminLoginComponent},
  {path:'Login/Student', component:StudentLoginComponent},
  {path:'About', component:AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
