import { isPresent, type Maybe } from "@/utils/optional.js";

/**
 * Base error class for all Caido client errors.
 */
export class BaseError extends Error {
  source: Maybe<Error>;

  constructor(message: string) {
    super(message);
    this.name = "BaseError";
    this.source = undefined;
  }

  withSource<T extends Error>(source: T): this {
    this.source = source;
    return this;
  }

  override toString(): string {
    let message = "";
    message += `${this.message}`;

    const source = this.source;
    if (isPresent(source)) {
      message += `\n  Source: ${source.toString()}`;
    }
    return message;
  }
}
