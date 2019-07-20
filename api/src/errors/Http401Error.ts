import HttpClientError from "./HttpClientError";

export class HTTP401Error extends HttpClientError {
  public readonly statusCode = 401;

  constructor(message: string | object = "Unauthorized") {
    super(message);
  }
}
