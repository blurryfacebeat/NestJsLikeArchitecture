import { NextFunction, Request, Response } from 'express';

import {
  IExceptionsFilterConstructor,
  IExceptionsFilter,
} from './ExceptionsFilter.types.js';
import { HttpError } from './HttpError.class.js';
import { LoggerService } from '../logger/logger.service.js';

export class ExceptionsFilter implements IExceptionsFilter {
  logger: LoggerService;

  constructor({ logger }: IExceptionsFilterConstructor) {
    this.logger = logger;
  }

  catch(
    err: HttpError | Error,
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response {
    if (err instanceof HttpError) {
      this.logger.error(
        `[${err.context}] Error ${err.statusCode}: ${err.message}`,
      );
      return res.status(err.statusCode ?? 500).send({ err: err.message });
    } else {
      this.logger.error(err.message);
      return res.status(500).send({ err: err.message });
    }
  }
}
