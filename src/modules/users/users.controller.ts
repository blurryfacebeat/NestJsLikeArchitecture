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
import { UserRegisterResultDto } from './dto/UserRegisterResult.dto.js';
import { STATUS_CODE } from '../../common/constants/statusCode.constant.js';
import { BaseController } from '../../common/BaseController/base.controller.js';
import { ValidateMiddleware } from '../../common/middlewares/validate.middleware.js';
import { THIS_USER_ALREADY_EXISTS } from '../../common/exceptions/exceptionsMessages.js';

@injectable()
export class UsersController extends BaseController implements IUsersController {
  constructor(
    @inject(MODULE_TYPE.ILogger) private _logger: ILogger,
    @inject(MODULE_TYPE.UsersService) private _usersService: IUsersService,
  ) {
    super(_logger);

    this.bindRoutes([
      {
        path: '/register',
        method: 'post',
        func: this.register,
        middlewares: [new ValidateMiddleware(UserRegisterDto)],
      },
      { path: '/login', method: 'post', func: this.login },
    ]);
  }

  login(req: Request<TEmptyRecord, TEmptyRecord, UserLoginDto>, res: Response): Response {
    return this.ok(res, 'login');
  }

  async register({ body }: Request<TEmptyRecord, TEmptyRecord, UserRegisterDto>, res: Response, next: NextFunction) {
    const result = await this._usersService.createUser(body);

    if (!result)
      return next(new HttpError({ statusCode: STATUS_CODE.INVALID_DATA, message: THIS_USER_ALREADY_EXISTS }));

    return this.ok(res, new UserRegisterResultDto(result));
  }
}
