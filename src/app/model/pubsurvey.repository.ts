import { Injectable } from '@angular/core';
import { Surveys } from './survey.model';
import { RestDataSource } from './rest.datasource';

@Injectable()
export class PubSurveysRepo {
    private surveys: Surveys[] = [];

    constructor(private dataSource: RestDataSource) {
        this.refresh();
    }

    refresh(): void{
        this.dataSource.getPubSurveys().subscribe(data => {

            this.surveys = data;
            this.storeSurveyData(data);
        });
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

    createResponses(surveyResponseDetails: Object):void{
      this.dataSource.addSurveyResponse(surveyResponseDetails).subscribe(b => {
        this.refresh();
    });
}

}
