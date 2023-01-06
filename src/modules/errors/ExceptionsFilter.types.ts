import { NextFunction, Request, Response } from 'express';

import { HttpError } from './HttpError.class.js';
import { LoggerService } from '../logger/logger.service.js';

export interface IExceptionsFilterConstructor {
  logger: LoggerService;
}

export interface IExceptionsFilter {
  catch: (
    err: HttpError | Error,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Response;
}
