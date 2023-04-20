import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PubSurveysRepo } from 'src/app/model/pubsurvey.repository';
import { Surveys } from 'src/app/model/survey.model';
import { SurveysRepo } from 'src/app/model/survey.repository';
import { SurveyQuestion } from 'src/app/model/survey_question.model';

@Component({
  selector: 'app-survey-response',
  templateUrl: './survey-response.component.html',
  styleUrls: ['./survey-response.component.css'],
})
export class SurveyResponseComponent implements OnInit {
  title!: string;

  editing = false;
  surveyQuestions: SurveyQuestion = new SurveyQuestion();
  surveys: Surveys = new Surveys();
  surveyResponseForm!: FormGroup;
  enableSubmission = false;
  demo: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private repository: SurveysRepo,
    private pubSurveyRepositroy: PubSurveysRepo,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.editing = true;

    if (this.editing) {
      let cloneObj = Object.assign(
        this.surveys,
        this.repository.getSurvey(this.activeRoute.snapshot.params['id'])
      );
      this.surveyResponseForm = this.formBuilder.group({
        questions: this.formBuilder.array([]),
        responses: this.formBuilder.array([])
      });
      this.populateData(this.surveys.Survey_id!);
    }
  }

  onSubmit() {
    this.surveyResponseForm.value;
    this.pubSurveyRepositroy.createResponses(
      this.surveyResponseForm.value
    );
    this.router.navigateByUrl('/pubsurveys/list');
  }

  returnToSurveyList() {
    this.router.navigateByUrl('/pubsurveys/list');
  }
  questions(): FormArray {
    return this.surveyResponseForm.get('questions') as FormArray;
  }
  responses(): FormArray {
    return this.surveyResponseForm.get('responses') as FormArray;
  }
  newQuestion(): FormGroup {
    return this.formBuilder.group({
      question: '',
    });
  }
  newResponse(): FormGroup {
    return this.formBuilder.group({
      response: '',
    });
  }
  addQuestions() {
    this.questions().push(this.newQuestion());
  }
  populateData(surveyId: String) {
    this.repository.getSurveyQuestions(surveyId).subscribe((data) => {
      console.log(data);
      data.forEach((q) => {
        this.demo.push(q);
        this.responses().push(this.formBuilder.group({
          response: '',
          question:q.Question,
          questionId:q._id,
          surveyId:q.SurveyId
        }));
        this.questions().push(
          this.formBuilder.group({
            question: q.Question,
            questionId:q._id,
            surveyId:q.SurveyId
          })
        );
      });
      console.log(this.demo);
    });
  }
  returnToPublicSurveyList() {
    this.router.navigateByUrl('/pubsurveys/list');
  }
}
