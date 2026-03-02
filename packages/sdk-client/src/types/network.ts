/**
 * Connection info input.
 */
export type ConnectionInfoInput = {
  host: string;
  port: number;
  isTLS: boolean;
  SNI?: string;
};

/**
 * Connection info.
 */
export type ConnectionInfo = {
  host: string;
  port: number;
  isTLS: boolean;
  SNI: string | undefined;
};
