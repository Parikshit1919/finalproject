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
import {AddCourseComponent} from './add-course/add-course.component';
import {AnalyticsComponent} from './analytics/analytics.component';
import {AdminFeedbackComponent} from './admin-feedback/admin-feedback.component';
import {AdminExamResultComponent} from './admin-exam-result/admin-exam-result.component';
import {AdminStudentResultComponent} from './admin-student-result/admin-student-result.component';
import {StudentFeedbackComponent} from './student-feedback/student-feedback.component';
import {StudentResultsComponent} from './student-results/student-results.component';
import {StudentRankingComponent} from './student-ranking/student-ranking.component';
import {LicencesComponent} from './licences/licences.component';
const routes: Routes = [
  {path:'' ,component:HomepageComponent},
  {path:'Home',component:HomepageComponent},
  {path:'Register',component:RegisterComponent},
  {path:'Login/Admin',component:AdminLoginComponent},
  {path:'Login/Student', component:StudentLoginComponent},
  {path:'About', component:AboutComponent},
  {path:'ForgotPassword', component:ForgotPasswordComponent},
  {path:'Licences',component:LicencesComponent},
  {
    path:'Login/Student/Dashboard',component:StudentDashboardComponent,
    children:[
      {path:'Feedback',component:StudentFeedbackComponent},
      {path:'Results',component:StudentResultsComponent},
      {path:'Ranking',component:StudentRankingComponent}
    ]
  },
  {
    path:'Login/Admin/Dashboard',component:AdminDashboardComponent,
    children:[
      {path:'AddCourses',component:AddCourseComponent},
      {path:'Analytics',component:AnalyticsComponent},
      {path:'Feedback',component:AdminFeedbackComponent},
      {path:'ExamResults',component:AdminExamResultComponent},
      {path:'StudentResults',component:AdminStudentResultComponent}
    ]
  },
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
