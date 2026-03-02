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
