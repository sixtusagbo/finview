import axios from "axios";
import { API_BASE_URL, ENDPOINTS } from "./constants";
import { SortableColumn, SortOrder } from "../types";
import { IncomeStatement } from "../types";

export interface FilterParams {
  start_year?: number;
  end_year?: number;
  min_revenue?: number;
  max_revenue?: number;
  min_net_income?: number;
  max_net_income?: number;
  sort_by?: SortableColumn;
  order?: SortOrder;
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

    // Add sorting parameters
    if (filters.sort_by) {
      params.append("sort_by", filters.sort_by);
      params.append("order", filters.order || "desc");
    }
  }
  const response = await axios.get(
    `${API_BASE_URL}${ENDPOINTS.INCOME_STATEMENT}`,
    { params }
  );
  console.log("data", response.data);
  return response.data;
};
