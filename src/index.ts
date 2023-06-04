import { Container } from 'inversify';

import { App } from './app.js';
import { ILogger } from './modules/logger/logger.types.js';
import { MODULE_TYPE } from './common/types/modules.types.js';
import { LoggerService } from './modules/logger/logger.service.js';
import { UsersController } from './modules/users/users.controller.js';
import { ExceptionsFilter } from './modules/errors/exceptions.filter.js';
import { IExceptionsFilter } from './modules/errors/ExceptionsFilter.types.js';

const appContainer = new Container();

appContainer.bind<ILogger>(MODULE_TYPE.ILogger).to(LoggerService);
appContainer.bind<IExceptionsFilter>(MODULE_TYPE.ExceptionsFilter).to(ExceptionsFilter);
appContainer.bind<UsersController>(MODULE_TYPE.UsersController).to(UsersController);
appContainer.bind<App>(MODULE_TYPE.Application).to(App);

const app = appContainer.get<App>(MODULE_TYPE.Application);

await app.init();

export { app, appContainer };
