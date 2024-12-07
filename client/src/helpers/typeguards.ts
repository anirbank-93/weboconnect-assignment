import { AxiosResponse } from "axios";

// Models
import { ApiErrorResponse } from "@/models/apiFuncHelpers";

export function isApiErrorResponse(
  response: AxiosResponse | ApiErrorResponse
): response is ApiErrorResponse {
  return (response as ApiErrorResponse).error !== undefined;
}
