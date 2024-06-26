export interface Quotation {
  id: string;
  title: string;
  description: string;
  id_user: string;
  images?: any;
  price?: number;
  status: Status;
}

export interface CreateQuotation {
  title: string;
  description: string;
  id_user?: string;
  images?: any;
  price?: number;
  status: Status;
}

export enum Status {
  progress = "progress",
  done = "done",
}
