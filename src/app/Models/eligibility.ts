export class Eligibility 
{
    e_id:number;
    s_id: number;
    c_id: number;
    level: number;

    constructor(e_id:number,s_id:number,c_id:number,level:number)
    {
        this.e_id=e_id;
        this.s_id=s_id;
        this.c_id=c_id;
        this.level=level;
        
    }
}
