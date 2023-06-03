import { Logger } from 'tslog';

import { ILogger } from './logger.types.js';

export class LoggerService implements ILogger {
  logger: Logger<Record<string, unknown>>;

  constructor() {
    this.logger = new Logger({});
  }

  log(...args: Array<unknown>): void {
    this.logger.info(...args);
  }

  error(...args: Array<unknown>): void {
    this.logger.error(...args);
  }

  warn(...args: Array<unknown>): void {
    this.logger.warn(...args);
  }
}
