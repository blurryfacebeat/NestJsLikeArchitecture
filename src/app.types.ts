import { LoggerService } from './modules/logger/logger.service.js';
import { UsersController } from './modules/users/users.controller.js';
import { ExceptionsFilter } from './modules/errors/exceptions.filter.js';

export interface IAppConstructor {
  logger: LoggerService;
  usersController: UsersController;
  exceptionsFilter: ExceptionsFilter;
}
