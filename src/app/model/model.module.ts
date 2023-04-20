import { NgModule } from "@angular/core";
import { SurveysRepo } from "./survey.repository";
import { PubSurveysRepo } from "./pubsurvey.repository";
import { RestDataSource } from "./rest.datasource";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";


@NgModule({
    imports: [HttpClientModule, FormsModule],
    providers: [SurveysRepo,
        RestDataSource, PubSurveysRepo
            //provide: JwtHelperService,
            //useFactory: () => new JwtHelperService()
          ],

})
export class ModelModule{

}
