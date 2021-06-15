export interface FormReactive {
  value: string | number;
  picked: string;
  checkboxes: Payment[];
}

export interface Result {
  id: number;
  salary: string | number;
  reduceMode: string;
  payments: Payment[];
}

export interface Payment {
  year: number;
  value: number;
}
