

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelModule } from '../../model/model.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SurveyPublicListingComponent } from './survey-public-listing/survey-public-listing.component';
import { SurveyResponseComponent } from './survey-response/survey-response.component';

const routes = RouterModule.forChild([
  { path: 'list', component: SurveyPublicListingComponent, data: { title: 'Surveys' } },
  { path: 'respond/:id', component: SurveyResponseComponent, data: { title: 'Surveys'} },
]);

@NgModule({
  imports: [ModelModule, CommonModule, FormsModule, ReactiveFormsModule, routes],
  providers: [],
  declarations: [SurveyPublicListingComponent,SurveyResponseComponent]
})
export class PubSurveyModule {}
