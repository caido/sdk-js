import { isAbsent } from "@/utils/optional.js";

type WebSocketInit = {
  protocols?: string | string[];
  headers: Record<string, string>;
};

type HeaderWebSocketConstructor = {
  new (url: string | URL, init: WebSocketInit): WebSocket;
  readonly OPEN: number;
  readonly CLOSING: number;
};

type WebSocketConstructor = new (
  url: string | URL,
  protocols?: string | string[],
) => WebSocket;

const getNativeWebSocket = (): HeaderWebSocketConstructor | undefined => {
  if (typeof WebSocket === "undefined") {
    return undefined;
  }
  // The DOM typings omit the `headers` option that Node, Bun and Deno accept.
  return WebSocket as unknown as HeaderWebSocketConstructor;
};

export const createWebSocketImpl = (
  userAgent: string,
): WebSocketConstructor | undefined => {
  const NativeWebSocket = getNativeWebSocket();
  if (isAbsent(NativeWebSocket)) {
    return undefined;
  }

  return class extends NativeWebSocket {
    constructor(url: string | URL, protocols?: string | string[]) {
      super(url, { protocols, headers: { "User-Agent": userAgent } });
    }
  };
};
