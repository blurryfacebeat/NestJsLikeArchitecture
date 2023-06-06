import 'reflect-metadata';
import { Server } from 'http';
import { json } from 'body-parser';
import express, { Express } from 'express';
import { injectable, inject } from 'inversify';

import { ILogger } from './modules/logger/logger.types.js';
import { MODULE_TYPE } from './common/types/modules.types.js';
import { UsersController } from './modules/users/users.controller.js';
import { ExceptionsFilter } from './modules/errors/exceptions.filter.js';

@injectable()
export class App {
  app: Express;
  port: number;
  server: Server;
  logger: ILogger;
  usersController: UsersController;
  exceptionsFilter: ExceptionsFilter;

  constructor(
    @inject(MODULE_TYPE.ILogger) logger: ILogger,
    @inject(MODULE_TYPE.UsersController) usersController: UsersController,
    @inject(MODULE_TYPE.ExceptionsFilter) exceptionsFilter: ExceptionsFilter,
  ) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.usersController = usersController;
    this.exceptionsFilter = exceptionsFilter;
  }

  useMiddleware(): void {
    this.app.use(json());
  }

  useRoutes(): void {
    this.app.use('/users', this.usersController.router);
  }

  useExceptionFilters(): void {
    this.app.use(this.exceptionsFilter.catch.bind(this.exceptionsFilter));
  }

  async init(): Promise<void> {
    this.useMiddleware();
    this.useRoutes();
    this.useExceptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`This server started on ${this.port} port`);
  }
}
