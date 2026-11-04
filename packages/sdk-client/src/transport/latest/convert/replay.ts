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
import { PipelineStrategyKind } from "@/types/index.js";

export const mapToPipelineStrategy = (
  data: PipelineStrategyFullFragment,
): PipelineStrategy => {
  switch (data.__typename) {
    case "PipelineStrategySequential":
      return {
        kind: PipelineStrategyKind.Sequential,
        abortOnFailure: data.abortOnFailure,
      };
    case "PipelineStrategyLastByteSynchronization":
      return {
        kind: PipelineStrategyKind.LastByteSynchronization,
        failureBehavior: data.failureBehavior,
      };
    case "PipelineStrategySinglePacketAttack":
      return {
        kind: PipelineStrategyKind.SinglePacketAttack,
        convertToHttp2: data.convertToHttp2,
        failureBehavior: data.failureBehavior,
      };
  }
};

export const mapToPipelineStrategyInput = (
  strategy: PipelineStrategy,
): PipelineStrategyInput => {
  switch (strategy.kind) {
    case PipelineStrategyKind.Sequential:
      return { sequential: { abortOnFailure: strategy.abortOnFailure } };
    case PipelineStrategyKind.LastByteSynchronization:
      return {
        lastByteSynchronization: {
          failureBehavior: strategy.failureBehavior,
        },
      };
    case PipelineStrategyKind.SinglePacketAttack:
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
    edits: data.edits.map((edit) => ({
      id: edit.id,
      alteration: edit.alteration,
    })),
  };
};
