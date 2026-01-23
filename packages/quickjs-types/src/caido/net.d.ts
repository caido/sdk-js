declare module "caido:utils" {
  /**
   * A TCP connection.
   *
   * @category Net
   */
  export type Connection = {
    /*
     * Send bytes to the connection.
     * @param bytes - The bytes to send.
     * @returns A promise that resolves when the bytes are sent.
     */
    send(bytes: Bytes): Promise<void>;
    /*
     * Receive bytes from the connection.
     * @param size - The number of bytes to receive.
     * @returns The received bytes.
     */
    receive(size?: number): Promise<Uint8Array>;
  };

  /**
   * Information about a target.
   *
   * @category Net
   */
  export class ConnectionInfo {
    constructor(url: string);

    get host(): string;
    set host(value: string);
    get port(): number;
    set port(value: number);
    get tls(): boolean;
    set tls(value: boolean);
    get sni(): string | undefined;
    set sni(value: string | null);
  }

  /**
   * The SDK for the Net service.
   * @category Net
   */
  export type NetSDK = {
    /*
     * Connect to a target.
     * @param info - The information about the target.
     * @returns A promise that resolves when the connection is established.
     */
    connect(info: ConnectionInfo): Promise<Connection>;
    /*
     * Connect to a target.
     * @param url - The URL of the target.
     * @returns A promise that resolves when the connection is established.
     */
    connect(url: string): Promise<Connection>;
  };
}
