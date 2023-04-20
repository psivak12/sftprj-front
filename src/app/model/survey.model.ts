

export class Surveys{
  constructor(
      public _id?:number,
      public Survey_id?:String,
      public Survey_title?:String,
      public Survey_description?:String,
      public Survey_category?:String,
      public Survey_categoryId?:String
  ){}

  public toString(): string
  {
      return `
      Surveys
      -------------------------------
      Id         : ${this._id}
      Survey_id      : ${this.Survey_id}
      Survey_Title      : ${this.Survey_title}
      Survey_Description: ${this.Survey_description}
      Survey_Category   : ${this.Survey_category}
      Survey_CategoryId   : ${this.Survey_categoryId}
      `;
  }
}
