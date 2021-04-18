import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StudentService } from '../services/student.service';
import {Exam} from '../Models/exam';
import {Question} from '../Models/questions';
import { AdminService } from '../services/admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CdkNoDataRow } from '@angular/cdk/table';
import {Answers} from '../Models/answers';
declare var $ : any;
@Component({
  selector: 'app-student-exam',
  templateUrl: './student-exam.component.html',
  styleUrls: ['./student-exam.component.css']
})
export class StudentExamComponent implements OnInit {

  questions:Question[]=[];                   //STORE ALL AVAILABLE QUESTIONS FOR THE EXAM
  optionSelected:string;                    //TO STORE THE OPTION SLELCTED
  questionID:number;                        //QUESTION ID
  question:Question;                       //QUESTION TO BE DISPLAYED
  noOfQuestions:number;                   //NO OF QUESTIONS IN THE TEST
  answers:Answers[]=[];                  //STORE ALL ANSWERS IN AN ANSWERS OBJECT
  buttonText:string="Next Question";
  i:number =0;                         // USED TO INTERATE THROUGH THE TEST
  exam:Exam;                          // EXAM OBJECT
  score:string;

  constructor(
    public StudentService: StudentService,
    public CourseService: AdminService,
    private ref: ChangeDetectorRef,
    private router: Router,
  ) { }
 

  ngOnInit(): void 
  {
    //METHOD TO GET EXAM DETAILS
    this.CourseService.GetExamByID(localStorage.getItem("exam_id")).subscribe((data:Exam) => {
      this.exam=data;
      console.log(this.exam);
      this.ref.detectChanges();
    });
    //METHOD TO GET QUESTIONS
    this.CourseService.GetQuestionByID(localStorage.getItem("exam_id")).subscribe((data:Question[]) => {
      this.questions=data;
      console.log(this.questions);
      this.noOfQuestions=this.questions.length-1; 
      this.question=this.questions[0];
      this.ref.detectChanges();
    });
  }

  nextQuestion()
  {
    console.log(this.question.Q_no+this.optionSelected);
    let answer =new Answers(this.question.Q_no,this.optionSelected,parseInt(localStorage.getItem("exam_id")),parseInt(localStorage.getItem('s_id')))  
    this.answers.push(answer);
    console.log(this.answers);
    
    //USED TO INCREMENT THE VALUE OF I TILL LAST QUESTION
    if(this.i<this.noOfQuestions)
    {
      this.i+=1;
      console.log(this.i);
      this.question=this.questions[this.i];
      
      //CHANGE BUTTON TEXT FOR THE LAST QUESITON
      if(this.i==this.noOfQuestions)
      {
        this.buttonText="Finish Test";
      }
    }
    //SUBMIT THE TEST AFTER FINAL QUESTION
    else
    {
      console.log("SUBMITTING TEST")
       this.StudentService.submitExam(this.answers).subscribe((data:Answers[]) => {
         console.log(data.toString());
         this.score=data.toString()
         this.onSuccess();
       });

    }
  }
  //METHOD TO GO TO PREVIOUS QUESTION
  previousQuestion()
  {
    this.i-=1;
    console.log(this.i);
    this.question=this.questions[this.i];
    console.log(this.answers)
    this.answers.pop();
  }
  //AUTO SUBMIT TEST
  onTimerFinished(e:Event){
    if (e["action"] == "done"){
       console.log("AUTO SUBMIT");
       let answer =new Answers(this.question.Q_no,this.optionSelected,parseInt(localStorage.getItem("exam_id")),parseInt(localStorage.getItem('s_id')))  
      this.answers.push(answer);
       this.StudentService.submitExam(this.answers).subscribe((data:Answers[]) => {
        console.log(data.toString());
        this.score=data.toString()
        this.onSuccess();
      });
     }
   }
   /********************************** MODAL FUNCTIONS ******************************************************/

  //REFRESH PAGE METHOD
  refresh()
  {
    this.router.navigateByUrl('/Login/Student/Dashboard/SelectExam')
  }
  //MODAL POPUP FOR SUCESSFULL REGISTRATION
  onSuccess()
  {


    $('#resultModal').modal('show'); 
    
  }

}
