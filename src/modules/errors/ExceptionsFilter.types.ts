import { NextFunction, Request, Response } from 'express';

import { HttpError } from './HttpError.class.js';
import { ILogger } from '../logger/logger.types.js';

export interface IExceptionsFilter {
  logger: ILogger;

  catch: (err: HttpError | Error, req: Request, res: Response, next: NextFunction) => Response;
}
