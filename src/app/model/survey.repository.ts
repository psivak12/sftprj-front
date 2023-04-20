import { Injectable } from '@angular/core';
import { Surveys } from './survey.model';
import { SurveyQuestion } from './survey_question.model';
import { SurveyResponse } from './survey_response.model';
import { RestDataSource } from './rest.datasource';
import { Observable } from 'rxjs';

@Injectable()
export class SurveysRepo {
    private surveys: Surveys[] = [];

    constructor(private dataSource: RestDataSource) {
       this.refresh();
    }

    refresh(): void{
        if(localStorage.getItem('userrole')== 'admin'){
          this.dataSource.getSurveys().subscribe(data => {

            this.surveys = data;
            this.storeSurveyData(data);
        });
        }
        else {
          this.dataSource.getSurveysByUsername(localStorage.getItem('username')!).subscribe(data => {

            this.surveys = data;
            this.storeSurveyData(data);
        });
        }
    }

    storeSurveyData(surveys: Surveys[]) {
      localStorage.setItem('surveys', JSON.stringify(surveys));
      this.surveys = surveys;
    }

    loadSurveys(): void{
      this.surveys = JSON.parse(localStorage.getItem('surveys')!);
    }

    getSurvey(id: any): Surveys {
        this.loadSurveys();
        return this.surveys.find(b => b._id == id)!;
    }

    getAllSurveys(){
        this.loadSurveys();
        return this.surveys;
    }

    modifySurveys(savedSurvey: Surveys, id: any): void {
        if (id === null || id == 0) {
            this.dataSource.addSurvey(savedSurvey).subscribe(b => {
                this.refresh();
            });
        }
        else {
            this.dataSource.editSurvey(savedSurvey,id).subscribe(survey => {
                this.refresh();
            });
        }
    }

    createSurvey(surveyDetails: Surveys):void{
      this.dataSource.addSurvey(surveyDetails).subscribe(b => {
        this.refresh();
    });
}

    deleteSurvey(deleteSurveyId: number): void {

        this.dataSource.deleteSurvey(deleteSurveyId).subscribe(survey => {
            this.refresh();
        });
    }

    getSurveyQuestions(surveyId:String): Observable<SurveyQuestion[]> {
      return this.dataSource.getSurveyQuestions(surveyId)
    }

}
