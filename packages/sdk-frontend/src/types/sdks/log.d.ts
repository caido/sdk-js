/**
 * Utilities to log messages to the console.
 * @category Log
 */
export type LogSDK = {
    /**
     * Log info message with variable arguments
     */
    info: (...data: unknown[]) => void;
    /**
     * Log warning message with variable arguments
     */
    warn: (...data: unknown[]) => void;
    /**
     * Log debug message with variable arguments
     */
    debug: (...data: unknown[]) => void;
    /**
     * Log error message with variable arguments
     */
    error: (...data: unknown[]) => void;
};
