import { Component, OnInit } from '@angular/core';
import { FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Surveys } from 'src/app/model/survey.model';
import { SurveysRepo } from 'src/app/model/survey.repository';


@Component({
  selector: 'app-survey-create',
  templateUrl: './survey-create.component.html',
  styleUrls: ['./survey-create.component.css']
})
export class SurveyCreateComponent implements OnInit {

  title!: string;
  surveyId!: number;
  surveyForm!: FormGroup;
  surveyCategoryId!: number;

  constructor(
    private repository: SurveysRepo,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private fb:FormBuilder) {
      this.surveyForm = this.fb.group({
        surveyId: ['', Validators.required],
        surveyCategoryId: ['', Validators.required],
        surveyTitle: ['', Validators.required],
        surveyDescription: ['', Validators.required],
        surveyCategory: ['', Validators.required],
        username: localStorage.getItem("username"),
        questions: this.fb.array([]) ,
      });
     }

  ngOnInit(): void {
    this.title = this.activeRoute.snapshot.data['title'];
    this.repository.refresh();
    this.surveyId = this.activeRoute.snapshot.params["id"];
  }
  onSubmit() {
    switch(this.title) {
      case "Movie":
        this.surveyForm.patchValue({
          surveyCategoryId: 1
        });
        break;
      case "Product":
        this.surveyForm.patchValue({
          surveyCategoryId: 2
        });
        break;
      case "Place":
        this.surveyForm.patchValue({
          surveyCategoryId: 3
        });
        break;
      case "Book":
        this.surveyForm.patchValue({
          surveyCategoryId: 4
        });
        break;
      default:
        console.log("Invalid title");

    }
    this.repository.createSurvey(this.surveyForm.value);
    //this.router.navigateByUrl('/survey-mgmt/'+this.title+'list');
    this.returnToSurveyList(this.title);
  }
  questions() : FormArray {
    return this.surveyForm.get("questions") as FormArray
  }
  newQuestion(): FormGroup {
    return this.fb.group({
      question: ''
    })
  }

  addQuestions() {
    this.questions().push(this.newQuestion());
  }
  removeQuestions(i:number) {
    this.questions().removeAt(i);
  }

  returnToSurveyList(title: string) {
    var lowerCaseTitle = this.title.toLowerCase();
    this.repository.refresh();
    this.router.navigateByUrl('/survey-mgmt/'+lowerCaseTitle+'list');
  }

}












