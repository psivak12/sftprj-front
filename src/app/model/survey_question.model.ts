

export class SurveyQuestion{
  constructor(
      public _id?:number,
      public SurveyId?:String,
      public Question?:String,
  ){}

  public toString(): string
  {
      return `
      SurveyQuestions
      -------------------------------
      Id         : ${this._id}
      Survey_id      : ${this.SurveyId}
      Survey_Question      : ${this.Question}
      `;
  }
}
