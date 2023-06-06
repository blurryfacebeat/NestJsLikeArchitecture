import { NextFunction, Request, Response } from 'express';

export interface IUsersController {
  login: (req: Request, res: Response) => Response;
  register: (req: Request, res: Response, next: NextFunction) => Promise<unknown>;
}
