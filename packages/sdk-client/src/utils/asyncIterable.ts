export async function* mapAsyncIterable<From, To>(
  f: (t: From, index: number) => Promise<To> | To,
  source: AsyncIterable<From>,
): AsyncIterable<To> {
  let index = 0;
  for await (const item of source) {
    yield await f(item, index++);
  }
}

export async function* filterAsyncIterable<T>(
  f: (t: T) => Promise<boolean> | boolean,
  source: AsyncIterable<T>,
): AsyncIterable<T> {
  for await (const item of source) {
    if (await f(item)) {
      yield item;
    }
  }
}

export type BufferedAsyncIterable<T> = AsyncIterable<T> & {
  cancel: () => Promise<void>;
};

export function bufferAsyncIterable<T>(
  source: AsyncIterable<T>,
): BufferedAsyncIterable<T> {
  const iterator = source[Symbol.asyncIterator]();
  const first = iterator.next();
  void first.catch(() => undefined); // The generator still surfaces it.
  let consumed = false;

  return {
    async *[Symbol.asyncIterator]() {
      consumed = true;
      try {
        let result = await first;
        while (result.done !== true) {
          yield result.value;
          result = await iterator.next();
        }
      } finally {
        await iterator.return?.(undefined);
      }
    },
    async cancel() {
      if (consumed) {
        return;
      }
      consumed = true;
      await iterator.return?.(undefined);
    },
  };
}
