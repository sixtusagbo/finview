import axios from 'axios';
import { API_BASE_URL, ENDPOINTS } from './constants';

export interface IncomeStatement {
  date: string;
  revenue: number;
  net_income: number;
  gross_profit: number;
  eps: number;
  operating_income: number;
}

export const fetchIncomeStatements = async (): Promise<IncomeStatement[]> => {
  const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.INCOME_STATEMENT}`);
  return response.data;
};
