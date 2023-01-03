import { App } from './app.js';
import { LoggerService } from './modules/logger/logger.service.js';
import { UsersController } from './modules/users/users.controller.js';

const bootstrap = async (): Promise<void> => {
  const app = new App({
    logger: new LoggerService(),
    usersController: new UsersController({ logger: new LoggerService() }),
  });

  await app.init();
};

bootstrap();
