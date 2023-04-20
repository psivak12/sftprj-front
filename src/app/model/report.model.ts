
export class Report{
    constructor(
        public id:String,
        public polarity:number,
        public title?:String,
        public category?:String,
    ){}
  
    public toString(): string
    {
        return `
        Surveys
        -------------------------------
        Id         : ${this.id},
        Title      : ${this.title},
        Category   : ${this.category},
        Sentimental Polarity: ${this.polarity},
        `;
    }
  }