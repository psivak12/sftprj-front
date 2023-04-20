import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/model/report.model';
import { ReportRepo } from 'src/app/model/report.repository';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(private repository: ReportRepo,private http: HttpClient) {

    const headers = new HttpHeaders({'Content-type': 'application/json'});

    this.postSenytimentalAnaysis().subscribe(response => {
      console.log(response);
  });
  }

  ngOnInit(): void {  
   this.repository.refresh();
  }

  getReview(polarity: number): string {
    return polarity < 0.5 ? 'Bad': 'Good'; 
  }

  getAveragePolarity(a: Report, b: Report) {
    return (a.polarity + b.polarity)/2;
  }

  get reports(): Report[]  {
    const allReports = this.repository.getAllReports();
    const reportList: Report[] = [];
    for (let index = 0; index < allReports.length; index++) {
      const report = allReports[index];
      var existingReport = reportList.find(x => x.title ==report.title);
      if(existingReport == null) reportList.push(report)
      else existingReport.polarity = this.getAveragePolarity(existingReport, report)
    }
    console.log("Reports", reportList);
    return reportList;
  }

  public postSenytimentalAnaysis(): Observable<any> {
    const url = 'http://localhost:5000/add_sentiment';
    return this.http.get<any>(url);
  }

}
