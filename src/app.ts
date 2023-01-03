import { Server } from 'http';
import express, { Express } from 'express';

import { IAppConstructor } from './app.types.js';
import { LoggerService } from './modules/logger/logger.service.js';
import { UsersController } from './modules/users/users.controller.js';

export class App {
  app: Express;
  port: number;
  server: Server;
  logger: LoggerService;
  usersController: UsersController;

  constructor({ logger, usersController }: IAppConstructor) {
    this.app = express();
    this.port = 3000;
    this.logger = logger;
    this.usersController = usersController;
  }

  useRoutes(): void {
    this.app.use('/users', this.usersController.router);
  }

  async init(): Promise<void> {
    this.useRoutes();
    this.server = this.app.listen(this.port);
    this.logger.log(`This server started on ${this.port} port`);
  }
}
