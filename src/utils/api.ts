import axios from "axios";
import { API_BASE_URL, ENDPOINTS } from "./constants";

export interface IncomeStatement {
  date: string;
  revenue: number;
  net_income: number;
  gross_profit: number;
  eps: number;
  operating_income: number;
}

export interface FilterParams {
  start_year?: number;
  end_year?: number;
  min_revenue?: number;
  max_revenue?: number;
  min_net_income?: number;
  max_net_income?: number;
}

export const fetchIncomeStatements = async (
  filters?: FilterParams
): Promise<IncomeStatement[]> => {
  const params = new URLSearchParams();
  if (filters) {
    console.log("Filters:", filters);
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });
  }
  const response = await axios.get(
    `${API_BASE_URL}${ENDPOINTS.INCOME_STATEMENT}`,
    { params }
  );
  return response.data;
};
