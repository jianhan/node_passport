import HttpClientError from "./HttpClientError";

export class HTTP404Error extends HttpClientError {
  public readonly statusCode = 404;

  constructor(message: string | object = "Not found") {
    super(message);
  }
}
