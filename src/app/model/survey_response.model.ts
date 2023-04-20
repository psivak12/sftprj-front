
export class SurveyResponse{
  constructor(
public _id?:number,
public SurveyId?: String,
public Response?: String,
public QuestionId?: String
){}
public toString(): string
{
    return `
    SurveyResponses
    -------------------------------
    Id         : ${this._id}
    SurveyId      : ${this.SurveyId}
    Response      : ${this.Response}
    QuestionId   : ${this.QuestionId}
    `;
}
}
