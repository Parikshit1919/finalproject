import { Component, OnInit } from '@angular/core';
import {Exam} from '../Models/exam';
import { AdminService } from '../services/admin.service';
declare var $ : any;

@Component({
  selector: 'app-admin-add-exam',
  templateUrl: './admin-add-exam.component.html',
  styleUrls: ['./admin-add-exam.component.css']
})
export class AdminAddExamComponent implements OnInit {
  deleteExamId:number;
  exams: Exam[] = [];

  constructor(
    public CourseService: AdminService
  ) { }

  ngOnInit(): void 
  {
    this. CourseService.GetExams().subscribe((data: Exam[])=>{
      this.exams = data;
      console.log(data);
  })
  }
/********************************** MODAL FUNCTIONS ******************************************************/

  //REFRESH PAGE METHOD
  refresh()
  {
    location.reload();
  }
  //MODAL POPUP FOR SUCESSFULL REGISTRATION
  onSuccess()
  {

    $('#AddCourseModal').modal('hide'); 
    $('#DeleteExamModal').modal('hide'); 
    $('#successModal').modal('show'); 
    
  }

   //MODAL POPUP FOR REGISTRATION ERROR
   onError()
   {
     $('#AddCourseModal').modal('hide'); 
     $('#DeleteExamModal').modal('hide');
     $('#errorModal').modal('show'); 
   }

   /************************************************** METHODS FOR DELETE ******************/
   //GET THE COURSE ID TO BE DELETED
   setDeleteExam(id:number)
   {
     this.deleteExamId=id;
     console.log(id);
   }

   
  //CALL SERVICE TO DELETE THE COURSE 
  deleteExam()
  {
    this.CourseService.DeleteExam(this.deleteExamId).subscribe(res => {
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
