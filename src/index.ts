import { App } from './app.js';
import { LoggerService } from './modules/logger/logger.service.js';
import { UsersController } from './modules/users/users.controller.js';
import { ExceptionsFilter } from './modules/errors/exceptions.filter.js';

const bootstrap = async (): Promise<void> => {
  const logger = new LoggerService();

  const app = new App({
    logger,
    usersController: new UsersController({ logger }),
    exceptionsFilter: new ExceptionsFilter({ logger }),
  });

  await app.init();
};

bootstrap();
