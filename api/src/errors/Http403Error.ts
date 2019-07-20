import HttpClientError from "./HttpClientError";

export class HTTP403Error extends HttpClientError {
  public readonly statusCode = 403;

  constructor(message: string | object = "Forbidden") {
    super(message);
  }
}
