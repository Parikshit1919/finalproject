import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormGroup, FormControl,  FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import {Exam} from '../Models/exam';
import {Question} from '../Models/questions';
import { AdminService } from '../services/admin.service';
import { Observable } from 'rxjs';
import{UserService} from '../services/user.service';
declare var $ : any;

@Component({
  selector: 'app-admin-add-questions',
  templateUrl: './admin-add-questions.component.html',
  styleUrls: ['./admin-add-questions.component.css']
})
export class AdminAddQuestionsComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  message: string;
  allUsers: Observable<Question[]>;
  deleteQuestionId:number;
  exams: Exam[] = [];
  exam_id:number;
  questions: Question[] = [];
  modifiy_question:Question;
 
   //feedback: Feedback[] = [];
  constructor(
    public fb: FormBuilder,
    private router: Router,
    public StudentService: StudentService,
    public CourseService: AdminService,
    public post:UserService,

  ) { }

  ngOnInit():void {
    this. CourseService.GetExams().subscribe((data: Exam[])=>{
      this.exams = data;
      console.log(data);
  });

  }
 

  /****************************************** ADD Question FORM CONTROL **************************************/  

  AddQuestionForm=new FormGroup({
    Question1:new FormControl('',Validators.required),
    Option1:new FormControl('',Validators.required),
    Option2:new FormControl('',Validators.required),
    Option3:new FormControl('',Validators.required),
    Option4:new FormControl('',Validators.required),
    Correct_ans:new FormControl('',Validators.required),
    e_id:new FormControl()
  })

  get Question1()
  {
    return this.AddQuestionForm.get('Question1');
  }
  get Option1()
  {
    return this.AddQuestionForm.get('Option1');
  }
  get Option2()
  {
    return this.AddQuestionForm.get('Option2');
  }
  get Option3()
  {
    return this.AddQuestionForm.get('Option3');
  }
  get Option4()
  {
    return this.AddQuestionForm.get('Option4');
  }
    get Correct_ans()
  {
    return this.AddQuestionForm.get('Correct_ans');
  }
  get e_id()
  {
    return this.AddQuestionForm.get('e_id');
  }

 /****************************************** Searcn Exam FORM CONTROL **************************************/  
  SearchExamForm=new FormGroup({
    Exam_id:new FormControl('',Validators.required),
    courseName:new FormControl('',Validators.required),
    time:new FormControl('',Validators.required),
    level:new FormControl('',Validators.required),
   
  })

  get Exam_id()
  {
    return this.SearchExamForm.get('Exam_id');
  }
  get time()
  {
    return this.SearchExamForm.get('time');
  }
  get courseName()
  {
    return this.SearchExamForm.get('courseName');
  }

    /****************************************** MODIFY EXAM FORM CONTROL **************************************/ 
  ModifyQuestionForm=new FormGroup({
    question1:new FormControl('',Validators.required),
    option1:new FormControl('',Validators.required),
    option2:new FormControl('',Validators.required),
    option3:new FormControl('',Validators.required),
    option4:new FormControl('',Validators.required),
    correct_ans:new FormControl('',Validators.required),
    E_id:new FormControl('',Validators.required),
    q_no:new FormControl('',Validators.required),
   
  })
  
  //GET FROM DATA
  get question1()
  {
    return this.ModifyQuestionForm.get('question1');
  }
  get option1()
  {
    return this.ModifyQuestionForm.get('option1');
  }

  get option2()
  {
    return this.ModifyQuestionForm.get('option2');
  }

  get option3()
  {
    return this.ModifyQuestionForm.get('option3');
  }

  get option4()
  {
    return this.ModifyQuestionForm.get('option4');
  }
  get correct_ans()
  {
    return this.ModifyQuestionForm.get('correct_ans');
  }
  get E_id()
  {
    return this.ModifyQuestionForm.get('E_id');
  }
  get q_no()
  {
    return this.ModifyQuestionForm.get('q_no');
  }

  /********************************** MODAL FUNCTIONS ******************************************************/

  refresh()//REFRESH THE TABLE
  {
    // location.reload();
    this. CourseService.GetQuestionByID(this.exam_id).subscribe((data: Question[])=>{
      this.questions = data;
      console.log(data);
  })
  }

  onSuccess()
  {
    $('#DeleteQuestionModal').modal('hide');
    $('#ModifyQuestionModal').modal('hide');
    $('#AddQuestionsModal').modal('hide'); 
    $('#successModal').modal('show'); 
  }

   //MODAL POPUP FOR Feedback ERROR
   onError()
   {
    $('#ModifyQuestionModal').modal('hide');
    $('#DeleteQuestionModal').modal('hide');
    $('#AddQuestionsModal').modal('hide'); 
     $('#errorModal').modal('show'); 
   }
 /********************************** FORMS FUNCTIONS ******************************************************/
 
 Search(Exam_id)
 {   
     console.log(Exam_id);
     this.exam_id=Exam_id;
      this.CourseService.GetExamByID(Exam_id).subscribe(res => {
      this.SearchExamForm.controls['courseName'].setValue(res.Course_name);
      this.SearchExamForm.controls['time'].setValue(res.time);
      this.SearchExamForm.controls['level'].setValue(res.level);
      this.AddQuestionForm.controls['e_id'].setValue(res.Exam_id);
      console.log(res);
    });

    this. CourseService.GetQuestionByID(Exam_id).subscribe((data: Question[])=>{
          this.questions = data;
          console.log(data);
      })


   }

    uploadFile() {
     let formData = new FormData();
     formData.append('upload', this.fileInput.nativeElement.files[0])

     this.post.UploadExcel(formData).subscribe(result => {
       console.log(result);
       if(result=="success")
     {
       alert("Question Uploaded Successfully");
     }
 
     else
     {
       alert("faild to Upload");
     }
     
     });
  
   }
 
 //CALL SERVICE ON METHOD CALL

 AddQuestion() {
  console.log(this.AddQuestionForm.value);

  this.CourseService.AddQuestion(this.AddQuestionForm.value).subscribe(res => {
    console.log(res)
   
    if(res.toString() == "added")
    { 
        this.onSuccess();
    }
    else if(res.toString() == "error")
    {
      this.onError();
    }
  });
} 
 /************************************************** METHODS FOR DELETE ******************/
   //GET THE COURSE ID TO BE DELETED
   setDeleteQuestion(id:number)
   {
     this.deleteQuestionId=id;
     console.log(id);
   }

  
  //CALL SERVICE TO DELETE THE COURSE 
  deleteQuestion()
  {
    this.CourseService.DeleteQuestion(this.deleteQuestionId).subscribe(res => {
      console.log(res);
      if(res.toString() == "removed")
      {
          this.onSuccess();
      }
      else if(res.toString() == "error")
      {
        this.onError();
      }
    });
  }
 /************************************************** METHODS FOR Moodify ******************/
 GetQuestion(Q_no)
 {
   console.log(Q_no);
  this. CourseService.GetQuestionByQno(Q_no).subscribe((data: Question)=>{
       this.modifiy_question=data;
       console.log(this.modifiy_question);
       this.ModifyQuestionForm.controls['question1'].setValue(this.modifiy_question.Question);
        this.ModifyQuestionForm.controls['option1'].setValue(this.modifiy_question.Option1);
       this.ModifyQuestionForm.controls['option2'].setValue(this.modifiy_question.Option2);
      this.ModifyQuestionForm.controls['option3'].setValue(this.modifiy_question.Option3);
      this.ModifyQuestionForm.controls['option4'].setValue(this.modifiy_question.Option4);
       this.ModifyQuestionForm.controls['correct_ans'].setValue(this.modifiy_question.Correct_ans);
      this.ModifyQuestionForm.controls['E_id'].setValue(this.modifiy_question.e_id);
      this.ModifyQuestionForm.controls['q_no'].setValue(this.modifiy_question.Q_no);
  });
    
 }
 
//METHOD TO SUBMIT MODIFIED QUESTION
 submitModified()
  {
    console.log(this.ModifyQuestionForm.value)
    this.CourseService.ModifyQuestion(this.ModifyQuestionForm.value).subscribe(res => {
      console.log(res);
      if(res.toString() == "changed")
      {
          this.onSuccess();
      }
      else if(res.toString() == "error")
      {
        this.onError();
      }
    });
  }


}

/*
Add this controller in api
using ExcelDataReader;
using H_API.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace H_API.Controllers
{
   
    public class questionbyexcelController : ApiController

    {
        Online_examEntities db = new Online_examEntities();
        [HttpPost]
        public string ExcelUpload()
        {
            string message = "";
            HttpResponseMessage result = null;
            var httpRequest = HttpContext.Current.Request;



            if (httpRequest.Files.Count > 0)
            {
                HttpPostedFile file = httpRequest.Files[0];
                Stream stream = file.InputStream;

                IExcelDataReader reader = null;

                if (file.FileName.EndsWith(".xls"))
                {
                    reader = ExcelReaderFactory.CreateBinaryReader(stream);
                }
                else if (file.FileName.EndsWith(".xlsx"))
                {
                    reader = ExcelReaderFactory.CreateOpenXmlReader(stream);
                }
                else
                {
                    message = "This file format is not supported";
                }

                DataSet excelRecords = reader.AsDataSet();
                reader.Close();
                string temp;

                var finalRecords = excelRecords.Tables[0];
                for (int i = 0; i < finalRecords.Rows.Count; i++)
                {
                    Question question = new Question();
                    question.Question1 = finalRecords.Rows[i][0].ToString();
                    question.Option1 = finalRecords.Rows[i][1].ToString();
                    question.Option2 = finalRecords.Rows[i][2].ToString();
                    question.Option3 = finalRecords.Rows[i][3].ToString();
                    question.Option4 = finalRecords.Rows[i][4].ToString();
                    question.Correct_ans = finalRecords.Rows[i][5].ToString();
                    question.e_id =Convert.ToDecimal(finalRecords.Rows[i][6]);
                    






                    db.Questions.Add(question);

                }

                int output = db.SaveChanges();
                if (output > 0)
                {
                    message = "success";
                }
                else
                {
                    message = "Excel file uploaded has fiald";
                }

            }

            else
            {
                result = Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            return message;
        }


        

    }
}
create a user service in angular
to avoid ambiguity between getquestion of previous method.
sqldatareader.dataset package must be installed from neuget package manager.

*/

