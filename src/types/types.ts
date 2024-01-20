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

export interface HeadCell {
  disablePadding: boolean;
  id: keyof TableData;
  label: string;
  numeric: boolean;
}

export type Order = 'asc' | 'desc';

export interface EnhancedTableHeadProps {
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  numSelected: number;
  rowCount: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof TableData) => void;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
  searchInput: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEnterKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}
