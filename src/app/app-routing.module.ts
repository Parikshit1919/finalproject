import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {StudentDashboardComponent} from './student-dashboard/student-dashboard.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
const routes: Routes = [
  {path:'' ,component:HomepageComponent},
  {path:'Home',component:HomepageComponent},
  {path:'Register',component:RegisterComponent},
  {path:'Login/Admin',component:AdminLoginComponent},
  {path:'Login/Student', component:StudentLoginComponent},
  {path:'About', component:AboutComponent},
  {path:'ForgotPassword', component:ForgotPasswordComponent},
  {path:'Login/Student/Dashboard',component:StudentDashboardComponent},
  {path:'Login/Admin/Dashboard',component:AdminDashboardComponent},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
