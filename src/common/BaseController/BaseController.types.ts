import { LoggerService } from '../../modules/logger/logger.service.js';

export interface IBaseControllerConstructor {
  logger: LoggerService;
}
