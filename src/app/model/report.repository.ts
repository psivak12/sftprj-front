import { Injectable } from '@angular/core';
import { RestDataSource } from './rest.datasource';
import { Report } from './report.model';

@Injectable()
export class ReportRepo {
    private reports: Report[] = [];

    constructor(private dataSource: RestDataSource) {
        this.refresh();
    }

    refresh(): void{
        this.dataSource.getSurveyResponses().subscribe(surveyResponses => {
            this.dataSource.getSurveys().subscribe(surveys => {
                if(!surveyResponses) return;
                if(!surveys) return;

                var data: Report[] = [];
                surveyResponses.forEach(surveyResponse => {
                    var survey = surveys.find(x => x.Survey_id == surveyResponse.SurveyId);
                    if(!survey) return;
                    data.push({
                        id: surveyResponse._id,
                        polarity: surveyResponse.sentiment_polarity,
                        title: survey.Survey_title,
                        category: survey.Survey_category,
                    });
                    console.log('Reports', data);
                    this.reports = data;
                    this.storeReportData(data);
                });                
            })
            
        });
    }

    storeReportData(reports: Report[]) {
      localStorage.setItem('reports', JSON.stringify(reports));
      this.reports = reports;
    }

    loadReports(): void{
      this.reports = JSON.parse(localStorage.getItem('reports')!);
    }

    getReport(id: any): Report {
        this.loadReports();
        return this.reports.find(b => b.id == id)!;
    }

    getAllReports(){
        this.loadReports();
        return this.reports;
    }
}
