import 'reflect-metadata';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { HttpError } from './HttpError.class.js';
import { ILogger } from '../logger/logger.types.js';
import { IExceptionsFilter } from './ExceptionsFilter.types.js';
import { MODULE_TYPE } from '../../common/types/modules.types.js';

@injectable()
export class ExceptionsFilter implements IExceptionsFilter {
  logger: ILogger;

  constructor(@inject(MODULE_TYPE.ILogger) logger: ILogger) {
    this.logger = logger;
  }

  catch(err: HttpError | Error, req: Request, res: Response): Response {
    if (err instanceof HttpError) {
      this.logger.error(`[${err.context}] Error ${err.statusCode}: ${err.message}`);
      return res.status(err.statusCode ?? 500).send({ err: err.message });
    } else {
      this.logger.error(err.message);
      return res.status(500).send({ err: err.message });
    }
  }
}
