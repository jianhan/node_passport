import HttpClientError from "./HttpClientError";

export class HTTP400Error extends HttpClientError {
  public readonly statusCode = 400;

  constructor(message: string | object = "Bad Request") {
    super(message);
  }
}
