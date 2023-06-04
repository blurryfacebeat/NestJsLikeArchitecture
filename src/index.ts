import { Container, ContainerModule, interfaces } from 'inversify';

import { App } from './app.js';
import { ILogger } from './modules/logger/logger.types.js';
import { MODULE_TYPE } from './common/types/modules.types.js';
import { LoggerService } from './modules/logger/logger.service.js';
import { UsersController } from './modules/users/users.controller.js';
import { ExceptionsFilter } from './modules/errors/exceptions.filter.js';
import { IExceptionsFilter } from './modules/errors/ExceptionsFilter.types.js';

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(MODULE_TYPE.ILogger).to(LoggerService);
  bind<IExceptionsFilter>(MODULE_TYPE.ExceptionsFilter).to(ExceptionsFilter);
  bind<UsersController>(MODULE_TYPE.UsersController).to(UsersController);
  bind<App>(MODULE_TYPE.Application).to(App);
});

const bootstrap = () => {
  const appContainer = new Container();
  appContainer.load(appBindings);

  const app = appContainer.get<App>(MODULE_TYPE.Application);
  app.init();

  return { app, appContainer };
};

export const { app, appContainer } = bootstrap();
