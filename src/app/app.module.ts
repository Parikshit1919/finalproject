import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MenuComponent } from './menu/menu.component';
import { RegisterComponent } from './register/register.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { AboutComponent } from './about/about.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LicencesComponent } from './licences/licences.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AdminFeedbackComponent } from './admin-feedback/admin-feedback.component';
import { AdminExamResultComponent } from './admin-exam-result/admin-exam-result.component';
import { AdminStudentResultComponent } from './admin-student-result/admin-student-result.component';
import { StudentFeedbackComponent } from './student-feedback/student-feedback.component';
import { StudentRankingComponent } from './student-ranking/student-ranking.component';
import { StudentResultsComponent } from './student-results/student-results.component';
import {NgxCaptchaModule} from 'ngx-captcha';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    MenuComponent,
    RegisterComponent,
    AdminLoginComponent,
    StudentLoginComponent,
    AboutComponent,
    ForgotPasswordComponent,
    NotFoundComponent,
    StudentDashboardComponent,
    AdminDashboardComponent,
    LicencesComponent,
    AddCourseComponent,
    AnalyticsComponent,
    AdminFeedbackComponent,
    AdminExamResultComponent,
    AdminStudentResultComponent,
    StudentFeedbackComponent,
    StudentRankingComponent,
    StudentResultsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgxCaptchaModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
