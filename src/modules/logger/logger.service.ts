import { Logger } from 'tslog';

export class LoggerService {
  private logger: Logger<{ [name: string]: unknown }>;

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
