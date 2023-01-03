import { LoggerService } from './modules/logger/logger.service.js';
import { UsersController } from './modules/users/users.controller.js';

export interface IAppConstructor {
  logger: LoggerService;
  usersController: UsersController;
}
