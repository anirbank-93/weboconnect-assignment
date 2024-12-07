export interface ApiFuncArgProps {
    urlPath: string;
    method: string;
    data?: any;
    role?: string;
    contentType?: string;
  }
  
  export interface requestConfig {
    method: string;
    url: string;
    headers: {
      "Content-Type": string;
      "x-access-token": string;
    };
    data: any;
  }
  
  export interface responseConfig {
    status: boolean;
    message: string;
    r: any;
  }
  
  export interface ApiErrorResponse {
    status: number;
    message: string;
    data: any | null;
    error: {
      status: number;
      name: string;
      message: string;
      details: Record<string, any>;
    };
    [key: string]: any;
  }
  