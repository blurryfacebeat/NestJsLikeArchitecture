import { LoggerService } from '../logger/logger.service.js';

export interface IUsersControllerConstructor {
  logger: LoggerService;
}
