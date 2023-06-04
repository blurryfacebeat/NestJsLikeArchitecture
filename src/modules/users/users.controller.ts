import 'reflect-metadata';
import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';

import { IUsersController } from './users.types.js';
import { ILogger } from '../logger/logger.types.js';
import { MODULE_TYPE } from '../../common/types/modules.types.js';
import { BaseController } from '../../common/BaseController/base.controller.js';

@injectable()
export class UsersController extends BaseController implements IUsersController {
  constructor(@inject(MODULE_TYPE.ILogger) logger: ILogger) {
    super(logger);

    this.bindRoutes([
      { path: '/register', method: 'post', func: this.register },
      { path: '/login', method: 'post', func: this.login },
    ]);
  }

  login(req: Request, res: Response): Response {
    return this.ok(res, 'login');
  }

  register(req: Request, res: Response): Response {
    return this.ok(res, 'register');
  }
}
