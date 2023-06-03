import { ILogger } from './modules/logger/logger.types.js';
import { UsersController } from './modules/users/users.controller.js';
import { ExceptionsFilter } from './modules/errors/exceptions.filter.js';

export interface IAppConstructor {
  logger: ILogger;
  usersController: UsersController;
  exceptionsFilter: ExceptionsFilter;
}
