import { AxiosError } from "axios";

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

const formatError = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error.response) {
      const apiError = error.response?.data as APIError;

      if (Array.isArray(apiError.detail)) {
        // Handle validation errors
        return apiError.detail
          .map((err: ValidationError) => `${err.loc[1]}: ${err.msg}`)
          .join("\n");
      }

      return apiError.detail || error.message;
    }

    return error.message;
  }
  return (error as Error).message;
};

export { formatError };
