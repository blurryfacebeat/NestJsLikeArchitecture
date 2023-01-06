export interface IHttpErrorConstructor {
  statusCode: number;
  message: string;
  context?: string;
}
