/**
 * @private
 * Generic analytics event input for tracking.
 */
type AnalyticsEventInput = {
    /**
     * @private
     * The name/kind of the analytics event.
     */
    name: string;
    /**
     * @private
     * The payload data for the analytics event.
     */
    payload: Record<string, unknown>;
};
/**
 * @private
 * Utilities to track analytics events.
 */
export type _AnalyticsSDK = {
    /**
     * @private
     * Track an analytics event.
     * @param event The analytics event to track.
     */
    track: (event: AnalyticsEventInput) => Promise<void>;
};
export {};
