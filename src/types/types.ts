export interface Fields {
    email: string;
    password: string;
  }

export enum Status{
  Open,
  Paid,
  Inactive,
  Due
}
export interface TableData{
  id:number,
  name:string,
  phone:string,
  description:string,
  status:Status,
  rate:number,
  balance:number,
  deposit:number,
}