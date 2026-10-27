import { decodeBlob } from "./blob.js";

import type {
  PipelineStrategyFullFragment,
  PipelineStrategyInput,
  StreamFullFragment,
  StreamWsMessageFullFragment,
} from "@/graphql/index.js";
import type {
  PipelineStrategy,
  ReplayStream,
  ReplayWsMessage,
} from "@/types/index.js";

export const mapToPipelineStrategy = (
  data: PipelineStrategyFullFragment,
): PipelineStrategy => {
  switch (data.__typename) {
    case "PipelineStrategySequential":
      return { kind: "sequential", abortOnFailure: data.abortOnFailure };
    case "PipelineStrategyLastByteSynchronization":
      return {
        kind: "lastByteSynchronization",
        failureBehavior: data.failureBehavior,
      };
    case "PipelineStrategySinglePacketAttack":
      return {
        kind: "singlePacketAttack",
        convertToHttp2: data.convertToHttp2,
        failureBehavior: data.failureBehavior,
      };
  }
};

export const mapToPipelineStrategyInput = (
  strategy: PipelineStrategy,
): PipelineStrategyInput => {
  switch (strategy.kind) {
    case "sequential":
      return { sequential: { abortOnFailure: strategy.abortOnFailure } };
    case "lastByteSynchronization":
      return {
        lastByteSynchronization: {
          failureBehavior: strategy.failureBehavior,
        },
      };
    case "singlePacketAttack":
      return {
        singlePacketAttack: {
          convertToHttp2: strategy.convertToHttp2,
          failureBehavior: strategy.failureBehavior,
        },
      };
  }
};

export const mapToReplayStream = (data: StreamFullFragment): ReplayStream => {
  return {
    id: data.id,
    host: data.host,
    port: data.port,
    path: data.path,
    isTls: data.isTls,
    protocol: data.protocol,
    direction: data.direction,
    source: data.source,
    createdAt: new Date(data.createdAt),
  };
};

export const mapToReplayWsMessage = (
  data: StreamWsMessageFullFragment,
): ReplayWsMessage => {
  return {
    id: data.id,
    direction: data.head.direction,
    format: data.head.format,
    raw: decodeBlob(data.head.raw),
    length: data.head.length,
    alteration: data.head.alteration,
    createdAt: new Date(data.head.createdAt),
    streamId: data.stream.id,
    editIds: data.edits.map((edit) => edit.id),
  };
};
