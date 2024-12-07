import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import {
  ApiFuncArgProps,
  // requestConfig,
  ApiErrorResponse,
} from "@/models/apiFuncHelpers";

let API_URL: string | undefined = process.env.NEXT_PUBLIC_API_BASE_URL;

async function ApiHelperFunction(
  props: ApiFuncArgProps
): Promise<AxiosResponse | ApiErrorResponse> {
  let authToken = localStorage.getItem("Authorization") as string;
  const { urlPath, method, data, role, contentType } = props;

  let config: AxiosRequestConfig = {
    method: `${method}`,
    url: `${API_URL}${urlPath}`,
    data: data,
    headers: {
      "Content-Type":
        contentType && contentType === "form-data"
          ? "multipart/form-data"
          : "application/json",
      Authorization: role && role === "privileged" && `Bearer ${authToken}`,
    },
  };

  try {
    const response: AxiosResponse = await axios(config);

    // If the response contains an error field, treat it as an error
    if (response.data?.error) {
      return {
        status: response.data.error.status || 400,
        message: response.data.error.message || "Error",
        data: response.data.data || null,
        error: response.data.error, // Include the error object
      } as ApiErrorResponse;
    }

    return response; // Normal successful response
  } catch (error: any) {
    const errorResponse = error?.response?.data || {};

    return {
      status: errorResponse?.error?.status || 500, // Default to 500 for network errors
      message: errorResponse?.error?.message || "Unknown error occurred",
      data: errorResponse?.data || null,
      error: errorResponse?.error || {}, // Include the error object if available
    } as ApiErrorResponse;
  }
}

export { ApiHelperFunction };
