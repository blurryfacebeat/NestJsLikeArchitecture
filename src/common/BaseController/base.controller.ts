import { Response, Router } from 'express';

import { IControllerRoute } from './ControllerRoute.types.js';
import { IBaseControllerConstructor } from './BaseController.types.js';

export abstract class BaseController {
  private logger;
  private readonly _router: Router;

  constructor({ logger }: IBaseControllerConstructor) {
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
    routes.forEach(({ method, path, func }) => {
      this.logger.log(`[${method}] ${path}`);

      const handler = func.bind(this);

      this._router[method](path, handler);
    });
  }
}
