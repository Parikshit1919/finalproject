import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
declare var $ : any;
@Component({
  selector: 'app-admin-add-exam',
  templateUrl: './admin-add-exam.component.html',
  styleUrls: ['./admin-add-exam.component.css']
})
export class AdminAddExamComponent implements OnInit {
  deleteExam_id: number;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public CourseService: AdminService
  ) { }

  ngOnInit(): void {
  }
  onSuccess()
  {

    //$('#AddCourseModal').modal('hide'); 
    //$('#DeleteCourseModal').modal('hide'); 
    //$('#successModal').modal('show'); 
    
  }

   //MODAL POPUP FOR REGISTRATION ERROR
   onError()
   {
    // $('#AddCourseModal').modal('hide'); 
    // $('#DeleteCourseModal').modal('hide');
     //$('#errorModal').modal('show'); 
   }
  setDeleteCourse(id:number)
  {
    this.deleteExam_id=id;
    console.log(id);
  }
  DeleteExam()
  {
    this.CourseService.DeleteCourse(this.deleteExam_id).subscribe(res => {
      console.log(res);
      if(res.toString() == "removed")
      {
          this.onSuccess();
      }
      else if(res.toString() == "course_error")
      {
        this.onError();
      }
    });

  }
}
