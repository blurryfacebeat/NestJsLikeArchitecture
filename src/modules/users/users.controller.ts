import { NextFunction, Request, Response } from 'express';

import { IUsersControllerConstructor } from './users.types.js';
import { BaseController } from '../../common/BaseController/base.controller.js';

export class UsersController extends BaseController {
  constructor({ logger }: IUsersControllerConstructor) {
    super({ logger });
    this.bindRoutes([
      { path: '/register', method: 'post', func: this.register },
      { path: '/login', method: 'post', func: this.login },
    ]);
  }

  login(req: Request, res: Response, next: NextFunction): Response {
    return this.ok(res, 'login');
  }

  register(req: Request, res: Response, next: NextFunction): Response {
    return this.ok(res, 'register');
  }
}
