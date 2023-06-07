import 'reflect-metadata';
import { injectable } from 'inversify';
import { Response, Router } from 'express';

import { IControllerRoute } from './ControllerRoute.types.js';
import { ILogger } from '../../modules/logger/logger.types.js';

@injectable()
export abstract class BaseController {
  private logger: ILogger;
  private readonly _router: Router;

  constructor(logger: ILogger) {
    this.logger = logger;
    this._router = Router();
  }

  get router(): Router {
    return this._router;
  }

  send<T>(res: Response, code: number, message: T): Response {
    res.type('application/json');
    return res.status(200).json(message);
  }

  ok<T>(res: Response, message: T): Response {
    return this.send<T>(res, 200, message);
  }

  created(res: Response): Response {
    return res.sendStatus(201);
  }

  protected bindRoutes(routes: Array<IControllerRoute>): void {
    routes.forEach(({ method, path, func, middlewares }) => {
      this.logger.log(`[${method}] ${path}`);

      const handler = func.bind(this);
      const middleware = middlewares?.map((middleware) => middleware.execute.bind(middleware));
      const pipeline = middleware ? [...middleware, handler] : handler;

      this._router[method](path, pipeline);
    });
  }
}
