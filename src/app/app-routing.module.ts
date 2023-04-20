import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EmailComponent } from './components/email/email.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ReportComponent } from './components/report/report.component';

const routes: Routes = [
  { path: '',component:HomeComponent},
  { path: 'home',component:HomeComponent},
  { path: 'aboutus', component: AboutusComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'email', component:EmailComponent},
  { path: 'reviews', component:NavigationComponent},
  { path: 'reports', component:ReportComponent},
  { path: 'pubsurveys', loadChildren: () => import('./components/surveys/pubsurvey.module').then(m => m.PubSurveyModule)},
  { path: 'survey-mgmt', loadChildren: () => import('./components/surveys/survey.module').then(m => m.SurveyModule)},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  //{ path: '**', redirectTo: '/home', pathMatch: 'full' },
  //{ path: '', redirectTo: '/home',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
