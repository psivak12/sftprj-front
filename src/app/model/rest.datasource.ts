import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Surveys } from './survey.model'
import { SurveyQuestion } from './survey_question.model';
import { SurveyResponse } from './survey_response.model';
import { map } from 'rxjs/operators';
import { Report } from './report.model';
import { SurveyResponses } from './surveyresponses.model';


const PROTOCOL = 'https';
const PORT = 3500;

@Injectable()
export class RestDataSource {
  baseUrl: string;
  authToken!: string;

  private httpOptions =
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
    };

  constructor(private http: HttpClient) {
    this.baseUrl = `http://localhost:3000/api/`;
  }

  getPubSurveys(): Observable<Surveys[]> {
    //this.loadToken();
    return this.http.get<Surveys[]>(this.baseUrl + 'survey-mgmt/list');
  }

  respondSurvey(survey: Surveys): Observable<Comment> {
    return this.http.post<Comment>(this.baseUrl + 'surveys/respond'+survey._id,survey, this.httpOptions);
  }

  getSurveys(): Observable<Surveys[]> {
    //this.loadToken();
    return this.http.get<Surveys[]>(this.baseUrl + 'survey-mgmt/list');
  }

  getSurveyResponses(): Observable<SurveyResponses[]> {
    return this.http.get<SurveyResponses[]>(this.baseUrl + 'reports/list');
  }  

  getSurveysByUsername(username:Object): Observable<Surveys[]> {
    //this.loadToken();
    return this.http.get<Surveys[]>(this.baseUrl + 'survey-mgmt/list/'+username);
  }

  addSurvey(survey: Surveys): Observable<Surveys> {
    return this.http.post<Surveys>(this.baseUrl + 'survey-mgmt/add', survey, this.httpOptions);
  }

  editSurvey(survey: Surveys,id: Object): Observable<Surveys> {
    return this.http.post<Surveys>(this.baseUrl + 'survey-mgmt/edit/'+id,survey, this.httpOptions);
  }

  deleteSurvey(id: Object): Observable<Surveys> {
    return this.http.post<Surveys>(this.baseUrl + 'survey-mgmt/delete/' + id, this.httpOptions);
  }


  getSurveyQuestions(id:Object):Observable<SurveyQuestion[]> {
    return this.http.get<SurveyQuestion[]>(this.baseUrl + 'survey-mgmt/questions/'+id,this.httpOptions);
  }
  addSurveyResponse(surveyResponse: Object): Observable<SurveyResponse> {
     return this.http.post<Object>(this.baseUrl + 'pub-surveys/respond/add', surveyResponse, this.httpOptions);
   }
}

