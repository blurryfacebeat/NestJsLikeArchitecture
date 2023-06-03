import { Logger } from 'tslog';

export interface ILogger {
  logger: Logger<Record<string, unknown>>;

  log: (...args: Array<unknown>) => void;
  error: (...args: Array<unknown>) => void;
  warn: (...args: Array<unknown>) => void;
}
