import { NextFunction, Request, Response, Router } from 'express';

import { T_API_METHOD } from '../types/literals.types.js';

export interface IControllerRoute {
  path: string;
  func: (req: Request, res: Response, next: NextFunction) => void;
  method: keyof Pick<Router, T_API_METHOD>;
}
