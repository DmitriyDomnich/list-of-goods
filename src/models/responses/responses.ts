export interface Response {
  ok: boolean;
}

export interface ErrorResponse extends Response {
  error: string;
}

export interface DataResponse<T> extends Response {
  data: {
    goods: T[];
  };
}
