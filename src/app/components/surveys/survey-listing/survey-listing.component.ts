import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Surveys } from 'src/app/model/survey.model';
import { SurveysRepo } from 'src/app/model/survey.repository';

@Component({
  selector: 'app-survey-listing',
  templateUrl: './survey-listing.component.html',
  styleUrls: ['./survey-listing.component.css']
})
export class SurveyListingComponent implements OnInit {
  title!: string;
  filteredSrveyData : any;
  constructor(private repository: SurveysRepo,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  this.title = this.route.snapshot.data['title'];
  switch(this.title) {
    case "Movie":
      this.filteredSrveyData = this.filterSurveysByCategoryId("1");
      break;
    case "Product":
      this.filteredSrveyData = this.filterSurveysByCategoryId("2");
      break;
    case "Place":
      this.filteredSrveyData = this.filterSurveysByCategoryId("3");
      break;
    case "Book":
      this.filteredSrveyData = this.filterSurveysByCategoryId("4");
      break;
    default:
      console.log("Invalid title");

  }
  
   this.repository.refresh();
  }

//   get surveys(): Surveys[]
//  {
//    return this.repository.getAllSurveys();
//  }

  getSurveys(): Surveys[]
 {
   return this.repository.getAllSurveys();
 }

filterSurveysByCategoryId(categoryId:String) {
  const allSurveys = this.getSurveys();
  console.log(allSurveys);
  const filteredSurveys = allSurveys.filter(survey => survey.Survey_categoryId === categoryId);
  return filteredSurveys;
}

// storeSurveyData(surveys: Surveys[]) {
//   localStorage.setItem('surveys', JSON.stringify(surveys));
//   this.surveys = surveys;
// }

 editSurvey(id: number): void
 {
   this.router.navigateByUrl('/survey-mgmt/'+this.title+'edit/' + id);
 }

 deleteSurvey(id: number): void
 {
   this.repository.deleteSurvey(id);
   this.repository.refresh();
   //this.router.navigateByUrl('/survey-mgmt/list');
 }
}








