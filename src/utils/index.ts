import { AxiosError } from "axios";
import { APIError, ValidationError } from "../types";
import numeral from "numeral";

export const formatError = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error.response) {
      const apiError = error.response?.data as APIError;

      if (Array.isArray(apiError.detail)) {
        // Handle validation errors
        return apiError.detail
          .map(
            (err: ValidationError) =>
              `${err.loc[1].replace("_", " ")}: ${err.msg}`
          )
          .join("\n");
      }

      return apiError.detail || error.message;
    }

    return error.message;
  }
  return (error as Error).message;
};

export const formatMoney = (number: number) => {
  return numeral(number).format("0.0a").toUpperCase();
};
