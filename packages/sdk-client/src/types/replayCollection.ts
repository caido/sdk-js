import type { ID } from "./index.js";

/**
 * Options for creating a replay session collection.
 * @category Replay
 */
export type CreateReplaySessionCollectionOptions = {
  name: string;
};

/**
 * Options for ranking (move after/before).
 * @category Replay
 */
export type RankInput = {
  afterId?: ID;
  beforeId?: ID;
};
