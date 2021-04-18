export class Answers 
{
    id:number;
    answerSelected:string;
    e_id:number;
    s_id:number;
    constructor(id:number,answerSelected:string,e_id:number,s_id:number)
    {
        this.id = id;
        this.answerSelected=answerSelected;
        this.e_id=e_id;
        this.s_id=s_id;
    }
}

