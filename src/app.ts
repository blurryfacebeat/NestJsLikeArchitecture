import { Server } from 'http';
import express, { Express } from 'express';

import { IAppConstructor } from './app.types.js';
import { ILogger } from './modules/logger/logger.types.js';
import { UsersController } from './modules/users/users.controller.js';
import { ExceptionsFilter } from './modules/errors/exceptions.filter.js';

export class App {
  app: Express;
  port: number;
  server: Server;
  logger: ILogger;
  usersController: UsersController;
  exceptionsFilter: ExceptionsFilter;

  constructor({ logger, usersController, exceptionsFilter }: IAppConstructor) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.usersController = usersController;
    this.exceptionsFilter = exceptionsFilter;
  }

  useRoutes(): void {
    this.app.use('/users', this.usersController.router);
  }

  useExceptionFilters(): void {
    this.app.use(this.exceptionsFilter.catch.bind(this.exceptionsFilter));
  }

  async init(): Promise<void> {
    this.useRoutes();
    this.useExceptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`This server started on ${this.port} port`);
  }
}
