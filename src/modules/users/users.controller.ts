import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { NextFunction, Request, Response } from 'express';

import { IUsersController } from './users.types.js';
import { ILogger } from '../logger/logger.types.js';
import { UserLoginDto } from './dto/UserLogin.dto.js';
import { HttpError } from '../errors/HttpError.class.js';
import { IUsersService } from './users.service.types.js';
import { UserRegisterDto } from './dto/UserRegister.dto.js';
import { MODULE_TYPE } from '../../common/types/modules.types.js';
import { TEmptyRecord } from '../../common/types/common.types.js';
import { BaseController } from '../../common/BaseController/base.controller.js';
import { THIS_USER_ALREADY_EXISTS } from '../../common/exceptions/exceptionsMessages.js';

@injectable()
export class UsersController extends BaseController implements IUsersController {
  constructor(
    @inject(MODULE_TYPE.ILogger) private _logger: ILogger,
    @inject(MODULE_TYPE.UsersService) private _usersService: IUsersService,
  ) {
    super(_logger);

    this.bindRoutes([
      { path: '/register', method: 'post', func: this.register },
      { path: '/login', method: 'post', func: this.login },
    ]);
  }

  login(req: Request<TEmptyRecord, TEmptyRecord, UserLoginDto>, res: Response): Response {
    return this.ok(res, 'login');
  }

  async register({ body }: Request<TEmptyRecord, TEmptyRecord, UserRegisterDto>, res: Response, next: NextFunction) {
    const result = await this._usersService.createUser(body);

    if (!result) return next(new HttpError({ statusCode: 422, message: THIS_USER_ALREADY_EXISTS }));

    // TODO сделать DTO для возвращаемого объекта result (без пароля)
    return this.ok(res, result);
  }
}
