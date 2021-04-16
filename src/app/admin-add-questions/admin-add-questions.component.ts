import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl,  FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import {Exam} from '../Models/exam';
import {Question} from '../Models/questions';
import { AdminService } from '../services/admin.service';
declare var $ : any;

@Component({
  selector: 'app-admin-add-questions',
  templateUrl: './admin-add-questions.component.html',
  styleUrls: ['./admin-add-questions.component.css']
})
export class AdminAddQuestionsComponent implements OnInit {
  deleteQuestionId:number;       //QUESION ID TO BE DELETED
  exams: Exam[] = [];            // STORE EXAMS ARRAY
  exam_id:number;                //EXAM ID 
  questions: Question[] = [];    //QUESTIONS ARRAY TO STORE ALL AVAIALABLE QUESTIONS
  modifiy_question:Question;    // QUESION OBJECT TO BE MODIFIED
  @ViewChild('fileInput') fileInput;  // FOR EXCEL
   //feedback: Feedback[] = [];
  constructor(
    public fb: FormBuilder,
    private router: Router,
    public StudentService: StudentService,
    public CourseService: AdminService

  ) { }

  ngOnInit():void {
    this. CourseService.GetExams().subscribe((data: Exam[])=>{
      this.exams = data;
      console.log(data);
  })
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
  //GET FORM DATA
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

 /****************************************** SEARCG EXAM FORM CONTROL **************************************/  
  SearchExamForm=new FormGroup({
    Exam_id:new FormControl('',Validators.required),
    courseName:new FormControl('',Validators.required),
    time:new FormControl('',Validators.required),
    level:new FormControl('',Validators.required),
   
  })
  // GET FORM DATA
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

  // METHOD TO TOGGLE SUCCESS MODAL
  onSuccess()
  {
    $('#DeleteQuestionModal').modal('hide');
    $('#ModifyQuestionModal').modal('hide');
    $('#AddQuestionsModal').modal('hide'); 
    $('#successModal').modal('show'); 
  }

  // POPUP FOR  ERROR MODAL
   onError()
   {
    $('#ModifyQuestionModal').modal('hide');
    $('#DeleteQuestionModal').modal('hide');
    $('#AddQuestionsModal').modal('hide'); 
     $('#errorModal').modal('show'); 
   }
 /********************************** FORMS FUNCTIONS ******************************************************/
 
 //METHOD TO SEARCH BY EXAM ID
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

  //  uploadFile() {
  //   let formData = new FormData();
  //   formData.append('upload', this.fileInput.nativeElement.files[0])

  //   this.CourseService.UploadExcel(formData).subscribe(result => {
     
  //     this.loadAllUser();
  //   });
  
  // }
 
 //CALL SERVICE ON METHOD CALL

 //METHOD TO ADD QUESTIONS
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
 /************************************************** METHODS FOR DELETE *******************************/

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

 //GET QUESTION BY QUESTION ID
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
