import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StudentService } from '../services/student.service';
import {Exam} from '../Models/exam';
import {Question} from '../Models/questions';
import { AdminService } from '../services/admin.service';
import { TogglerService } from '../services/toggler.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CdkNoDataRow } from '@angular/cdk/table';
import {Answers} from '../Models/answers';
import { PlatformLocation } from '@angular/common';
import { HostListener } from '@angular/core';


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
  modifiedFlag:boolean=false;
  keypress:number=0;


  constructor(
    public StudentService: StudentService,
    public CourseService: AdminService,
    public TogglerService:TogglerService,
    private ref: ChangeDetectorRef,
    private router: Router,
    location: PlatformLocation, 
  ) 
  { 
    //Restricting to go back
  
    location.onPopState(() => {
    this.router.navigateByUrl('Login/Student/Dashboard/Exam');
    //history.forward();
    
    });
        
  }

  ngOnInit(): void 
  {
    this.TogglerService.resetSideMenu(); //hide sidebar
   // Prevent Refresh (key)
    // window.addEventListener("keyup", disableF5);
    // window.addEventListener("keydown", disableF5); 
    //  function disableF5(e) {
    //     if ((e.which || e.keyCode) == 116)
    //     //  ||((e.ctrlKey || e.keycode) == 82)) 
    //      { 
    //       alert("You cannot refresh");
    //       e.preventDefault(); }
    // };

  
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



 
   /********************************** EXAM FUNCTIONS ******************************************************/
  nextQuestion()
  {
    console.log(this.question.Q_no+this.optionSelected);
    
    //CHEKC IF QUESTION IS AREADY ANSWERED
    this.answers.forEach((question)=>
    {
      if(question.id==this.question.Q_no)
      {
        console.log("ANSWERED QUESTION DETECTED", question.id);
        this.answers[this.i]=new Answers(this.question.Q_no,this.optionSelected,parseInt(localStorage.getItem("exam_id")),parseInt(localStorage.getItem('s_id')));
       
        console.log(this.answers);
        this.modifiedFlag=true;
      }
     
    })
    //IF QUESTION IS MODIFIED DONT ADD AGAIN
    if(!this.modifiedFlag)
    {
      let answer =new Answers(this.question.Q_no,this.optionSelected,parseInt(localStorage.getItem("exam_id")),parseInt(localStorage.getItem('s_id')))  
      this.answers.push(answer);
      this.modifiedFlag=false;
    }
    //RESET THE MODIFIED FALG
    this.modifiedFlag=false;
    console.log(this.answers);

    //USED TO INCREMENT THE VALUE OF I TILL LAST QUESTION
    if(this.i<this.noOfQuestions)
    {
      this.i+=1;
      console.log(this.i);
      this.question=this.questions[this.i];
      try {
        
      if(this.answers[this.i].answerSelected=="a")
      {
        console.log("CHANGING TO A")
        this.optionSelected='a';
      }
      else if (this.answers[this.i].answerSelected=="b")
      {
        console.log("CHANGING TO B")
        this.optionSelected='b';
      }
      else if (this.answers[this.i].answerSelected=="c")
      {
        console.log("CHANGING TO C")
        this.optionSelected='c';
      }
      else if (this.answers[this.i].answerSelected=="d")
      {
        console.log("CHANGING TO D")
        this.optionSelected='d';
      }
    }
    catch(e)
    {
      console.log("new Question No Previous data");
      this.optionSelected="";
    }
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
    this.answers.forEach((question)=>
    {
      if(question.id==this.question.Q_no)
      {
        console.log("PREVIOUS ANSWERED QUESTION DETECTED", question.id);
        // this.answers[this.i]=new Answers(this.question.Q_no,this.optionSelected,parseInt(localStorage.getItem("exam_id")),parseInt(localStorage.getItem('s_id')));
        if(this.answers[this.i].answerSelected=="a")
        {
        this.optionSelected='a';
        }
        else if (this.answers[this.i].answerSelected=="b")
        {
          this.optionSelected='b';
        }
        else if (this.answers[this.i].answerSelected=="c")
        {
          this.optionSelected='c';
        }
        else if (this.answers[this.i].answerSelected=="d")
        {
          this.optionSelected='d';
        }
        console.log(this.answers);
       
      }
     
    })
    this.buttonText="Next Question";
    console.log(this.answers)
  }

  //AUTO SUBMIT TEST
  onTimerFinished(e:Event){
    if (e["action"] == "done")
    {
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

/********************************** Keyboard block  ******************************************************/

  //Autosubmit if keyboard is used more than one time
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
  console.log(event);
   event.returnValue = false;
   event.preventDefault();
   this.keypress++;
   alert("Dont use Keyboard");
     if (this.keypress===2)
     {
      alert("You used Keyboard"+ this.keypress + "time");
      alert("You cannot continue");
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

  @HostListener("window:beforeunload", ["$event"]) 
  unloadHandler(event: Event) 
  {
    // console.log("Processing beforeunload...");
   // event.returnValue = false;
    this.router.navigateByUrl('/Login/Student/Dashboard/SelectExam');
      // Do more processing...
    
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
