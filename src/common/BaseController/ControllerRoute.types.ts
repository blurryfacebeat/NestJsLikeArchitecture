import { NextFunction, Request, Response, Router } from 'express';

import { TApiMethods } from '../types/literals.types.js';

export interface IControllerRoute {
  path: string;
  func: (req: Request, res: Response, next: NextFunction) => void;
  method: keyof Pick<Router, TApiMethods>;
}
