

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelModule } from '../../model/model.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SurveyListingComponent } from './survey-listing/survey-listing.component';
import { SurveyEditComponent } from './survey-edit/survey-edit.component';
import { SurveyCreateComponent } from './survey-create/survey-create.component';

const routes = RouterModule.forChild([
  { path: 'movielist', component: SurveyListingComponent, data: { title: 'Movie' } },
  { path: 'productlist', component: SurveyListingComponent, data: { title: 'Product' } },
  { path: 'placelist', component: SurveyListingComponent, data: { title: 'Place' } },
  { path: 'booklist', component: SurveyListingComponent, data: { title: 'Book' } },
  { path: 'Movieedit/:id', component: SurveyEditComponent, data: { title: 'movie'} },
  { path: 'Productedit/:id', component: SurveyEditComponent, data: { title: 'product'} },
  { path: 'Placeedit/:id', component: SurveyEditComponent, data: { title: 'place'} },
  { path: 'Bookedit/:id', component: SurveyEditComponent, data: { title: 'book'} },
  { path: 'addMovie', component: SurveyCreateComponent, data: { title: 'Movie' } },
  { path: 'addProduct', component: SurveyCreateComponent, data: { title: 'Product' } },
  { path: 'addPlace', component: SurveyCreateComponent, data: { title: 'Place' } },
  { path: 'addBook', component: SurveyCreateComponent, data: { title: 'Book' } },
]);

@NgModule({
  imports: [ModelModule, CommonModule, FormsModule, ReactiveFormsModule, routes],
  providers: [],
  declarations: [SurveyListingComponent, SurveyEditComponent,SurveyCreateComponent,
    ]
})
export class SurveyModule {}
