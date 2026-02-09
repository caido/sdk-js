export interface Logger {
  debug(message: string, ...args: unknown[]): void;
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
}

export class ConsoleLogger implements Logger {
  debug(message: string, ...args: unknown[]): void {
    console.debug(`[caido] ${message}`, ...args);
  }

  info(message: string, ...args: unknown[]): void {
    console.info(`[caido] ${message}`, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    console.warn(`[caido] ${message}`, ...args);
  }

  error(message: string, ...args: unknown[]): void {
    console.error(`[caido] ${message}`, ...args);
  }
}
