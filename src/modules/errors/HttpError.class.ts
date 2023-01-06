import { IHttpErrorConstructor } from './HttpError.types.js';

export class HttpError extends Error {
  statusCode: number;
  context?: string;

  constructor({
    statusCode,
    message,
    context = 'No context',
  }: IHttpErrorConstructor) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.context = context;
  }
}
