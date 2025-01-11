import { AxiosError } from "axios";
import { APIError, ValidationError, NestedAPIError } from "../types";
import numeral from "numeral";

const isValidationErrorArray = (
  detail: APIError["detail"]
): detail is ValidationError[] => {
  return Array.isArray(detail);
};

const isNestedError = (
  detail: APIError["detail"]
): detail is NestedAPIError => {
  return typeof detail === "object" && detail !== null && "error" in detail;
};

export const formatError = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error.response) {
      const apiError = error.response?.data as APIError;
      const { detail } = apiError;

      if (isValidationErrorArray(detail)) {
        return detail
          .map((err) => `${err.loc[1].replace("_", " ")}: ${err.msg}`)
          .join("\n");
      }

      if (isNestedError(detail)) {
        const { error: nestedError } = detail as NestedAPIError;
        return nestedError.message || nestedError.details || error.message;
      }

      return detail || error.message;
    }

    return error.message;
  }
  return (error as Error).message;
};

export const formatMoney = (number: number) => {
  return numeral(number).format("0.0a").toUpperCase();
};
