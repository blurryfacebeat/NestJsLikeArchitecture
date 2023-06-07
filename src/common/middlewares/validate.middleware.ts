import { NextFunction, Request, Response } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';

import { IMiddleware } from './middleware.types.js';
import { STATUS_CODE } from '../constants/statusCode.constant.js';
import { validateDecorator } from '../methods/validateDecorator.js';

export class ValidateMiddleware implements IMiddleware {
  constructor(private _classForValidate: ClassConstructor<object>) {}

  async execute({ body }: Request, res: Response, next: NextFunction) {
    const instance = plainToInstance(this._classForValidate, body);

    const errors = await validateDecorator(instance);

    if (!!errors.length) {
      res.status(STATUS_CODE.INVALID_DATA).send(errors);
    } else {
      next();
    }
  }
}
