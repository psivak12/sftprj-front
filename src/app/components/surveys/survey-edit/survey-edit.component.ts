import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Surveys } from 'src/app/model/survey.model';
import { SurveysRepo } from 'src/app/model/survey.repository';
import { SurveyQuestion } from 'src/app/model/survey_question.model';

@Component({
  selector: 'app-survey-edit',
  templateUrl: './survey-edit.component.html',
  styleUrls: ['./survey-edit.component.css']
})
export class SurveyEditComponent implements OnInit {

  title!: string;

  editing = false;
  surveys: Surveys = new Surveys();
  surveyForm!: FormGroup;
  enableSubmission = false;
  surveyQuestions: any;
  surveyQuestionsBackend: any;
  demo:any[]= [];
  model: any = {}

  constructor(private formBuilder: FormBuilder,
    private repository: SurveysRepo,
    private router: Router,
    private activeRoute: ActivatedRoute,) {

     }

  ngOnInit(): void {

    this.editing = this.activeRoute.snapshot.params['update'] === 'edit';
    this.repository.refresh();
    this.editing = true;// need to be removed after the authentication logic comes in
    this.title = this.activeRoute.snapshot.data['title'];

    if (this.editing) {
      let cloneObj = Object.assign(this.surveys, this.repository.getSurvey(this.activeRoute.snapshot.params['id']));
      //let cloneObj1 =  Object.assign(this.items,this.repository.getSurveyQuestions(this.surveys.Survey_id!));
      //this.surveyForm.patchValue(cloneObj1);
     // this.surveyForm.patchValue(cloneObj);
     this.surveyForm = this.formBuilder.group({
      surveyId: this.surveys.Survey_id,
      surveyTitle: this.surveys.Survey_title,
      surveyDescription: this.surveys.Survey_description,
      surveyCategory:this.surveys.Survey_category,
      questions: this.formBuilder.array([]) ,
    });
      this.populateData(this.surveys.Survey_id!);
  }
}

  onSubmit() {
      this.repository.modifySurveys(this.surveyForm.value, this.surveys._id);
      this.router.navigateByUrl('/survey-mgmt/'+this.title+'list');
      this.repository.refresh();
  }


  returnToSurveyList() {
    this.router.navigateByUrl('/survey-mgmt/list');
  }
  questions() : FormArray {
    return this.surveyForm.get("questions") as FormArray
  }
  newQuestion(): FormGroup {
    return this.formBuilder.group({
      question: ''
    })
  }

  addQuestions() {
    this.questions().push(this.newQuestion());
  }
  populateData(surveyId:String) {
    this.repository.getSurveyQuestions(surveyId).subscribe(data => {
      console.log(data);
      data.forEach(q => {
        this.demo.push(q);
        this.questions().push(this.formBuilder.group({
          question: q.Question
        }));
      });
      console.log(this.demo);
    });
  }
  removeQuestions(i:number) {
    this.questions().removeAt(i);
  }

}












