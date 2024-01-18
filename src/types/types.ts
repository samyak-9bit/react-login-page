export interface Fields {
    email: string;
    password: string;
  }

export enum Status{
  Open="Open",
  Paid="Paid",
  Inactive="Inactive",
  Due="Due"
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

export interface FormData {
  name: string;
  description: string;
  status: string;
  rate: string;
  balance: string;
  deposit: string;
}

export interface ModalProps {
  showModal: boolean;
  setModal: (show: boolean) => void;
}

export interface Keywords{
  key:string,
  value:string
}