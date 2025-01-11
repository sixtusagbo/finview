export type SortableColumn = "date" | "revenue" | "net_income";
export type SortOrder = "asc" | "desc";

export interface IncomeStatement {
  date: string;
  revenue: number;
  net_income: number;
  gross_profit: number;
  eps: number;
  operating_income: number;
}

export interface ValidationError {
  loc: string[];
  msg: string;
  type: string;
}

export interface APIError {
  detail?: string | ValidationError[];
}
