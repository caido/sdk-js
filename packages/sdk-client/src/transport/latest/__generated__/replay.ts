import type * as Types from "./types.js";

import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type ReplayEntryHttpFullFragment = {
  __typename: "ReplayEntryHttp";
  createdAt: string;
  error?: string | undefined | null;
  id: string;
  raw?: string;
  connection: {
    __typename: "ConnectionInfo";
    host: string;
    port: number;
    isTLS: boolean;
    SNI?: string | undefined | null;
  };
  request?:
    | {
        id: string;
        host: string;
        port: number;
        method: string;
        path: string;
        query: string;
        isTls: boolean;
        createdAt: string;
        raw?: string;
        metadata: { id: string; color?: string | undefined | null };
        response?:
          | {
              id: string;
              statusCode: number;
              roundtripTime: number;
              length: number;
              createdAt: string;
              raw?: string;
            }
          | undefined
          | null;
      }
    | undefined
    | null;
  session: { id: string } | { id: string } | { id: string };
  settings: {
    placeholders: Array<{
      __typename: "ReplayPlaceholder";
      inputRange: { start: number; end: number };
      outputRange: { start: number; end: number };
      preprocessors: Array<{
        __typename: "ReplayPreprocessor";
        options:
          | {
              __typename: "ReplayEnvironmentPreprocessor";
              variableName: string;
            }
          | { __typename: "ReplayPrefixPreprocessor"; value: string }
          | { __typename: "ReplaySuffixPreprocessor"; value: string }
          | {
              __typename: "ReplayUrlEncodePreprocessor";
              charset?: string | undefined | null;
              nonAscii: boolean;
            }
          | { __typename: "ReplayWorkflowPreprocessor"; id: string };
      }>;
    }>;
  };
};

export type StreamFullFragment = {
  __typename: "Stream";
  id: string;
  host: string;
  port: number;
  path: string;
  isTls: boolean;
  protocol: Types.StreamProtocol;
  direction: Types.StreamDirection;
  source: Types.Source;
  createdAt: string;
};

export type StreamWsMessageFullFragment = {
  __typename: "StreamWsMessage";
  id: string;
  head: {
    id: string;
    alteration: Types.Alteration;
    createdAt: string;
    direction: Types.StreamMessageDirection;
    format: Types.StreamWsMessageFormat;
    length: number;
    raw: string;
  };
  edits: Array<{ id: string; alteration: Types.Alteration }>;
  stream: { id: string };
};

export type ReplayEntryWsFullFragment = {
  __typename: "ReplayEntryWs";
  createdAt: string;
  error?: string | undefined | null;
  id: string;
  http: {
    __typename: "ReplayEntryHttp";
    createdAt: string;
    error?: string | undefined | null;
    id: string;
    raw?: string;
    connection: {
      __typename: "ConnectionInfo";
      host: string;
      port: number;
      isTLS: boolean;
      SNI?: string | undefined | null;
    };
    request?:
      | {
          id: string;
          host: string;
          port: number;
          method: string;
          path: string;
          query: string;
          isTls: boolean;
          createdAt: string;
          raw?: string;
          metadata: { id: string; color?: string | undefined | null };
          response?:
            | {
                id: string;
                statusCode: number;
                roundtripTime: number;
                length: number;
                createdAt: string;
                raw?: string;
              }
            | undefined
            | null;
        }
      | undefined
      | null;
    session: { id: string } | { id: string } | { id: string };
    settings: {
      placeholders: Array<{
        __typename: "ReplayPlaceholder";
        inputRange: { start: number; end: number };
        outputRange: { start: number; end: number };
        preprocessors: Array<{
          __typename: "ReplayPreprocessor";
          options:
            | {
                __typename: "ReplayEnvironmentPreprocessor";
                variableName: string;
              }
            | { __typename: "ReplayPrefixPreprocessor"; value: string }
            | { __typename: "ReplaySuffixPreprocessor"; value: string }
            | {
                __typename: "ReplayUrlEncodePreprocessor";
                charset?: string | undefined | null;
                nonAscii: boolean;
              }
            | { __typename: "ReplayWorkflowPreprocessor"; id: string };
        }>;
      }>;
    };
  };
  session: { id: string } | { id: string } | { id: string };
  messages: Array<{
    __typename: "StreamWsMessage";
    id: string;
    head: {
      id: string;
      alteration: Types.Alteration;
      createdAt: string;
      direction: Types.StreamMessageDirection;
      format: Types.StreamWsMessageFormat;
      length: number;
      raw: string;
    };
    edits: Array<{ id: string; alteration: Types.Alteration }>;
    stream: { id: string };
  }>;
  stream?:
    | {
        __typename: "Stream";
        id: string;
        host: string;
        port: number;
        path: string;
        isTls: boolean;
        protocol: Types.StreamProtocol;
        direction: Types.StreamDirection;
        source: Types.Source;
        createdAt: string;
      }
    | undefined
    | null;
};

export type PipelineStrategyFull_PipelineStrategyLastByteSynchronization_Fragment =
  {
    __typename: "PipelineStrategyLastByteSynchronization";
    failureBehavior: Types.FailureBehavior;
  };

export type PipelineStrategyFull_PipelineStrategySequential_Fragment = {
  __typename: "PipelineStrategySequential";
  abortOnFailure: boolean;
};

export type PipelineStrategyFull_PipelineStrategySinglePacketAttack_Fragment = {
  __typename: "PipelineStrategySinglePacketAttack";
  convertToHttp2: boolean;
  failureBehavior: Types.FailureBehavior;
};

export type PipelineStrategyFullFragment =
  | PipelineStrategyFull_PipelineStrategyLastByteSynchronization_Fragment
  | PipelineStrategyFull_PipelineStrategySequential_Fragment
  | PipelineStrategyFull_PipelineStrategySinglePacketAttack_Fragment;

export type ReplayEntryHttpOnePipelineFullFragment = {
  __typename: "ReplayEntryHttpOnePipeline";
  createdAt: string;
  error?: string | undefined | null;
  id: string;
  rank: string;
  session: { id: string } | { id: string } | { id: string };
  settings: {
    strategy:
      | {
          __typename: "PipelineStrategyLastByteSynchronization";
          failureBehavior: Types.FailureBehavior;
        }
      | { __typename: "PipelineStrategySequential"; abortOnFailure: boolean }
      | {
          __typename: "PipelineStrategySinglePacketAttack";
          convertToHttp2: boolean;
          failureBehavior: Types.FailureBehavior;
        };
  };
  activeHttpEntry?:
    | {
        __typename: "ReplayEntryHttp";
        createdAt: string;
        error?: string | undefined | null;
        id: string;
        raw?: string;
        connection: {
          __typename: "ConnectionInfo";
          host: string;
          port: number;
          isTLS: boolean;
          SNI?: string | undefined | null;
        };
        request?:
          | {
              id: string;
              host: string;
              port: number;
              method: string;
              path: string;
              query: string;
              isTls: boolean;
              createdAt: string;
              raw?: string;
              metadata: { id: string; color?: string | undefined | null };
              response?:
                | {
                    id: string;
                    statusCode: number;
                    roundtripTime: number;
                    length: number;
                    createdAt: string;
                    raw?: string;
                  }
                | undefined
                | null;
            }
          | undefined
          | null;
        session: { id: string } | { id: string } | { id: string };
        settings: {
          placeholders: Array<{
            __typename: "ReplayPlaceholder";
            inputRange: { start: number; end: number };
            outputRange: { start: number; end: number };
            preprocessors: Array<{
              __typename: "ReplayPreprocessor";
              options:
                | {
                    __typename: "ReplayEnvironmentPreprocessor";
                    variableName: string;
                  }
                | { __typename: "ReplayPrefixPreprocessor"; value: string }
                | { __typename: "ReplaySuffixPreprocessor"; value: string }
                | {
                    __typename: "ReplayUrlEncodePreprocessor";
                    charset?: string | undefined | null;
                    nonAscii: boolean;
                  }
                | { __typename: "ReplayWorkflowPreprocessor"; id: string };
            }>;
          }>;
        };
      }
    | undefined
    | null;
  httpEntries: Array<{
    __typename: "ReplayEntryHttp";
    createdAt: string;
    error?: string | undefined | null;
    id: string;
    raw?: string;
    connection: {
      __typename: "ConnectionInfo";
      host: string;
      port: number;
      isTLS: boolean;
      SNI?: string | undefined | null;
    };
    request?:
      | {
          id: string;
          host: string;
          port: number;
          method: string;
          path: string;
          query: string;
          isTls: boolean;
          createdAt: string;
          raw?: string;
          metadata: { id: string; color?: string | undefined | null };
          response?:
            | {
                id: string;
                statusCode: number;
                roundtripTime: number;
                length: number;
                createdAt: string;
                raw?: string;
              }
            | undefined
            | null;
        }
      | undefined
      | null;
    session: { id: string } | { id: string } | { id: string };
    settings: {
      placeholders: Array<{
        __typename: "ReplayPlaceholder";
        inputRange: { start: number; end: number };
        outputRange: { start: number; end: number };
        preprocessors: Array<{
          __typename: "ReplayPreprocessor";
          options:
            | {
                __typename: "ReplayEnvironmentPreprocessor";
                variableName: string;
              }
            | { __typename: "ReplayPrefixPreprocessor"; value: string }
            | { __typename: "ReplaySuffixPreprocessor"; value: string }
            | {
                __typename: "ReplayUrlEncodePreprocessor";
                charset?: string | undefined | null;
                nonAscii: boolean;
              }
            | { __typename: "ReplayWorkflowPreprocessor"; id: string };
        }>;
      }>;
    };
  }>;
};

export type ReplayEntryFull_ReplayEntryHttp_Fragment = {
  __typename: "ReplayEntryHttp";
  id: string;
  createdAt: string;
  error?: string | undefined | null;
  raw?: string;
  session: { id: string } | { id: string } | { id: string };
  connection: {
    __typename: "ConnectionInfo";
    host: string;
    port: number;
    isTLS: boolean;
    SNI?: string | undefined | null;
  };
  request?:
    | {
        id: string;
        host: string;
        port: number;
        method: string;
        path: string;
        query: string;
        isTls: boolean;
        createdAt: string;
        raw?: string;
        metadata: { id: string; color?: string | undefined | null };
        response?:
          | {
              id: string;
              statusCode: number;
              roundtripTime: number;
              length: number;
              createdAt: string;
              raw?: string;
            }
          | undefined
          | null;
      }
    | undefined
    | null;
  settings: {
    placeholders: Array<{
      __typename: "ReplayPlaceholder";
      inputRange: { start: number; end: number };
      outputRange: { start: number; end: number };
      preprocessors: Array<{
        __typename: "ReplayPreprocessor";
        options:
          | {
              __typename: "ReplayEnvironmentPreprocessor";
              variableName: string;
            }
          | { __typename: "ReplayPrefixPreprocessor"; value: string }
          | { __typename: "ReplaySuffixPreprocessor"; value: string }
          | {
              __typename: "ReplayUrlEncodePreprocessor";
              charset?: string | undefined | null;
              nonAscii: boolean;
            }
          | { __typename: "ReplayWorkflowPreprocessor"; id: string };
      }>;
    }>;
  };
};

export type ReplayEntryFull_ReplayEntryHttpOnePipeline_Fragment = {
  __typename: "ReplayEntryHttpOnePipeline";
  id: string;
  createdAt: string;
  error?: string | undefined | null;
  rank: string;
  session: { id: string } | { id: string } | { id: string };
  settings: {
    strategy:
      | {
          __typename: "PipelineStrategyLastByteSynchronization";
          failureBehavior: Types.FailureBehavior;
        }
      | { __typename: "PipelineStrategySequential"; abortOnFailure: boolean }
      | {
          __typename: "PipelineStrategySinglePacketAttack";
          convertToHttp2: boolean;
          failureBehavior: Types.FailureBehavior;
        };
  };
  activeHttpEntry?:
    | {
        __typename: "ReplayEntryHttp";
        createdAt: string;
        error?: string | undefined | null;
        id: string;
        raw?: string;
        connection: {
          __typename: "ConnectionInfo";
          host: string;
          port: number;
          isTLS: boolean;
          SNI?: string | undefined | null;
        };
        request?:
          | {
              id: string;
              host: string;
              port: number;
              method: string;
              path: string;
              query: string;
              isTls: boolean;
              createdAt: string;
              raw?: string;
              metadata: { id: string; color?: string | undefined | null };
              response?:
                | {
                    id: string;
                    statusCode: number;
                    roundtripTime: number;
                    length: number;
                    createdAt: string;
                    raw?: string;
                  }
                | undefined
                | null;
            }
          | undefined
          | null;
        session: { id: string } | { id: string } | { id: string };
        settings: {
          placeholders: Array<{
            __typename: "ReplayPlaceholder";
            inputRange: { start: number; end: number };
            outputRange: { start: number; end: number };
            preprocessors: Array<{
              __typename: "ReplayPreprocessor";
              options:
                | {
                    __typename: "ReplayEnvironmentPreprocessor";
                    variableName: string;
                  }
                | { __typename: "ReplayPrefixPreprocessor"; value: string }
                | { __typename: "ReplaySuffixPreprocessor"; value: string }
                | {
                    __typename: "ReplayUrlEncodePreprocessor";
                    charset?: string | undefined | null;
                    nonAscii: boolean;
                  }
                | { __typename: "ReplayWorkflowPreprocessor"; id: string };
            }>;
          }>;
        };
      }
    | undefined
    | null;
  httpEntries: Array<{
    __typename: "ReplayEntryHttp";
    createdAt: string;
    error?: string | undefined | null;
    id: string;
    raw?: string;
    connection: {
      __typename: "ConnectionInfo";
      host: string;
      port: number;
      isTLS: boolean;
      SNI?: string | undefined | null;
    };
    request?:
      | {
          id: string;
          host: string;
          port: number;
          method: string;
          path: string;
          query: string;
          isTls: boolean;
          createdAt: string;
          raw?: string;
          metadata: { id: string; color?: string | undefined | null };
          response?:
            | {
                id: string;
                statusCode: number;
                roundtripTime: number;
                length: number;
                createdAt: string;
                raw?: string;
              }
            | undefined
            | null;
        }
      | undefined
      | null;
    session: { id: string } | { id: string } | { id: string };
    settings: {
      placeholders: Array<{
        __typename: "ReplayPlaceholder";
        inputRange: { start: number; end: number };
        outputRange: { start: number; end: number };
        preprocessors: Array<{
          __typename: "ReplayPreprocessor";
          options:
            | {
                __typename: "ReplayEnvironmentPreprocessor";
                variableName: string;
              }
            | { __typename: "ReplayPrefixPreprocessor"; value: string }
            | { __typename: "ReplaySuffixPreprocessor"; value: string }
            | {
                __typename: "ReplayUrlEncodePreprocessor";
                charset?: string | undefined | null;
                nonAscii: boolean;
              }
            | { __typename: "ReplayWorkflowPreprocessor"; id: string };
        }>;
      }>;
    };
  }>;
};

export type ReplayEntryFull_ReplayEntryWs_Fragment = {
  __typename: "ReplayEntryWs";
  id: string;
  createdAt: string;
  error?: string | undefined | null;
  session: { id: string } | { id: string } | { id: string };
  http: {
    __typename: "ReplayEntryHttp";
    createdAt: string;
    error?: string | undefined | null;
    id: string;
    raw?: string;
    connection: {
      __typename: "ConnectionInfo";
      host: string;
      port: number;
      isTLS: boolean;
      SNI?: string | undefined | null;
    };
    request?:
      | {
          id: string;
          host: string;
          port: number;
          method: string;
          path: string;
          query: string;
          isTls: boolean;
          createdAt: string;
          raw?: string;
          metadata: { id: string; color?: string | undefined | null };
          response?:
            | {
                id: string;
                statusCode: number;
                roundtripTime: number;
                length: number;
                createdAt: string;
                raw?: string;
              }
            | undefined
            | null;
        }
      | undefined
      | null;
    session: { id: string } | { id: string } | { id: string };
    settings: {
      placeholders: Array<{
        __typename: "ReplayPlaceholder";
        inputRange: { start: number; end: number };
        outputRange: { start: number; end: number };
        preprocessors: Array<{
          __typename: "ReplayPreprocessor";
          options:
            | {
                __typename: "ReplayEnvironmentPreprocessor";
                variableName: string;
              }
            | { __typename: "ReplayPrefixPreprocessor"; value: string }
            | { __typename: "ReplaySuffixPreprocessor"; value: string }
            | {
                __typename: "ReplayUrlEncodePreprocessor";
                charset?: string | undefined | null;
                nonAscii: boolean;
              }
            | { __typename: "ReplayWorkflowPreprocessor"; id: string };
        }>;
      }>;
    };
  };
  messages: Array<{
    __typename: "StreamWsMessage";
    id: string;
    head: {
      id: string;
      alteration: Types.Alteration;
      createdAt: string;
      direction: Types.StreamMessageDirection;
      format: Types.StreamWsMessageFormat;
      length: number;
      raw: string;
    };
    edits: Array<{ id: string; alteration: Types.Alteration }>;
    stream: { id: string };
  }>;
  stream?:
    | {
        __typename: "Stream";
        id: string;
        host: string;
        port: number;
        path: string;
        isTls: boolean;
        protocol: Types.StreamProtocol;
        direction: Types.StreamDirection;
        source: Types.Source;
        createdAt: string;
      }
    | undefined
    | null;
};

export type ReplayEntryFullFragment =
  | ReplayEntryFull_ReplayEntryHttp_Fragment
  | ReplayEntryFull_ReplayEntryHttpOnePipeline_Fragment
  | ReplayEntryFull_ReplayEntryWs_Fragment;

export type ReplayPlaceholderFullFragment = {
  __typename: "ReplayPlaceholder";
  inputRange: { start: number; end: number };
  outputRange: { start: number; end: number };
  preprocessors: Array<{
    __typename: "ReplayPreprocessor";
    options:
      | { __typename: "ReplayEnvironmentPreprocessor"; variableName: string }
      | { __typename: "ReplayPrefixPreprocessor"; value: string }
      | { __typename: "ReplaySuffixPreprocessor"; value: string }
      | {
          __typename: "ReplayUrlEncodePreprocessor";
          charset?: string | undefined | null;
          nonAscii: boolean;
        }
      | { __typename: "ReplayWorkflowPreprocessor"; id: string };
  }>;
};

export type ReplayPrefixPreprocessorFullFragment = {
  __typename: "ReplayPrefixPreprocessor";
  value: string;
};

export type ReplaySuffixPreprocessorFullFragment = {
  __typename: "ReplaySuffixPreprocessor";
  value: string;
};

export type ReplayUrlEncodePreprocessorFullFragment = {
  __typename: "ReplayUrlEncodePreprocessor";
  charset?: string | undefined | null;
  nonAscii: boolean;
};

export type ReplayWorkflowPreprocessorFullFragment = {
  __typename: "ReplayWorkflowPreprocessor";
  id: string;
};

export type ReplayEnvironmentPreprocessorFullFragment = {
  __typename: "ReplayEnvironmentPreprocessor";
  variableName: string;
};

export type ReplayPreprocessorFullFragment = {
  __typename: "ReplayPreprocessor";
  options:
    | { __typename: "ReplayEnvironmentPreprocessor"; variableName: string }
    | { __typename: "ReplayPrefixPreprocessor"; value: string }
    | { __typename: "ReplaySuffixPreprocessor"; value: string }
    | {
        __typename: "ReplayUrlEncodePreprocessor";
        charset?: string | undefined | null;
        nonAscii: boolean;
      }
    | { __typename: "ReplayWorkflowPreprocessor"; id: string };
};

export type ReplaySessionHttpMetaFragment = {
  __typename: "ReplaySessionHttp";
  id: string;
  name: string;
  rank: string;
  collection: { id: string };
  activeEntry?:
    | { id: string }
    | { id: string }
    | { id: string }
    | undefined
    | null;
  entries: {
    edges: Array<{ node: { id: string } | { id: string } | { id: string } }>;
  };
  settings?:
    | { connectionClose: boolean; updateContentLength: boolean }
    | undefined
    | null;
};

export type ReplaySessionWsMetaFragment = {
  __typename: "ReplaySessionWs";
  id: string;
  name: string;
  rank: string;
  collection: { id: string };
  activeEntry?:
    | { id: string }
    | { id: string }
    | { id: string }
    | undefined
    | null;
  entries: {
    edges: Array<{ node: { id: string } | { id: string } | { id: string } }>;
  };
};

export type ReplaySessionHttpOnePipelineMetaFragment = {
  __typename: "ReplaySessionHttpOnePipeline";
  id: string;
  name: string;
  rank: string;
  collection: { id: string };
  activeEntry?:
    | { id: string }
    | { id: string }
    | { id: string }
    | undefined
    | null;
  entries: {
    edges: Array<{ node: { id: string } | { id: string } | { id: string } }>;
  };
  settings?:
    | {
        strategy:
          | {
              __typename: "PipelineStrategyLastByteSynchronization";
              failureBehavior: Types.FailureBehavior;
            }
          | {
              __typename: "PipelineStrategySequential";
              abortOnFailure: boolean;
            }
          | {
              __typename: "PipelineStrategySinglePacketAttack";
              convertToHttp2: boolean;
              failureBehavior: Types.FailureBehavior;
            };
      }
    | undefined
    | null;
};

export type ReplaySessionMeta_ReplaySessionHttp_Fragment = {
  __typename: "ReplaySessionHttp";
  id: string;
  name: string;
  rank: string;
  collection: { id: string };
  activeEntry?:
    | { id: string }
    | { id: string }
    | { id: string }
    | undefined
    | null;
  entries: {
    edges: Array<{ node: { id: string } | { id: string } | { id: string } }>;
  };
  settings?:
    | { connectionClose: boolean; updateContentLength: boolean }
    | undefined
    | null;
};

export type ReplaySessionMeta_ReplaySessionHttpOnePipeline_Fragment = {
  __typename: "ReplaySessionHttpOnePipeline";
  id: string;
  name: string;
  rank: string;
  collection: { id: string };
  activeEntry?:
    | { id: string }
    | { id: string }
    | { id: string }
    | undefined
    | null;
  entries: {
    edges: Array<{ node: { id: string } | { id: string } | { id: string } }>;
  };
  settings?:
    | {
        strategy:
          | {
              __typename: "PipelineStrategyLastByteSynchronization";
              failureBehavior: Types.FailureBehavior;
            }
          | {
              __typename: "PipelineStrategySequential";
              abortOnFailure: boolean;
            }
          | {
              __typename: "PipelineStrategySinglePacketAttack";
              convertToHttp2: boolean;
              failureBehavior: Types.FailureBehavior;
            };
      }
    | undefined
    | null;
};

export type ReplaySessionMeta_ReplaySessionWs_Fragment = {
  __typename: "ReplaySessionWs";
  id: string;
  name: string;
  rank: string;
  collection: { id: string };
  activeEntry?:
    | { id: string }
    | { id: string }
    | { id: string }
    | undefined
    | null;
  entries: {
    edges: Array<{ node: { id: string } | { id: string } | { id: string } }>;
  };
};

export type ReplaySessionMetaFragment =
  | ReplaySessionMeta_ReplaySessionHttp_Fragment
  | ReplaySessionMeta_ReplaySessionHttpOnePipeline_Fragment
  | ReplaySessionMeta_ReplaySessionWs_Fragment;

export type ReplaySessionCollectionMetaFragment = { id: string; name: string };

export type ReplayEntryQueryVariables = Types.Exact<{
  id: Types.Scalars["ID"]["input"];
  sessionKind: Types.ReplaySessionKind;
  includeReplayRaw: Types.Scalars["Boolean"]["input"];
  includeRequestRaw: Types.Scalars["Boolean"]["input"];
  includeResponseRaw: Types.Scalars["Boolean"]["input"];
}>;

export type ReplayEntryQuery = {
  replayEntry?:
    | {
        __typename: "ReplayEntryHttp";
        id: string;
        createdAt: string;
        error?: string | undefined | null;
        raw?: string;
        session: { id: string } | { id: string } | { id: string };
        connection: {
          __typename: "ConnectionInfo";
          host: string;
          port: number;
          isTLS: boolean;
          SNI?: string | undefined | null;
        };
        request?:
          | {
              id: string;
              host: string;
              port: number;
              method: string;
              path: string;
              query: string;
              isTls: boolean;
              createdAt: string;
              raw?: string;
              metadata: { id: string; color?: string | undefined | null };
              response?:
                | {
                    id: string;
                    statusCode: number;
                    roundtripTime: number;
                    length: number;
                    createdAt: string;
                    raw?: string;
                  }
                | undefined
                | null;
            }
          | undefined
          | null;
        settings: {
          placeholders: Array<{
            __typename: "ReplayPlaceholder";
            inputRange: { start: number; end: number };
            outputRange: { start: number; end: number };
            preprocessors: Array<{
              __typename: "ReplayPreprocessor";
              options:
                | {
                    __typename: "ReplayEnvironmentPreprocessor";
                    variableName: string;
                  }
                | { __typename: "ReplayPrefixPreprocessor"; value: string }
                | { __typename: "ReplaySuffixPreprocessor"; value: string }
                | {
                    __typename: "ReplayUrlEncodePreprocessor";
                    charset?: string | undefined | null;
                    nonAscii: boolean;
                  }
                | { __typename: "ReplayWorkflowPreprocessor"; id: string };
            }>;
          }>;
        };
      }
    | {
        __typename: "ReplayEntryHttpOnePipeline";
        id: string;
        createdAt: string;
        error?: string | undefined | null;
        rank: string;
        session: { id: string } | { id: string } | { id: string };
        settings: {
          strategy:
            | {
                __typename: "PipelineStrategyLastByteSynchronization";
                failureBehavior: Types.FailureBehavior;
              }
            | {
                __typename: "PipelineStrategySequential";
                abortOnFailure: boolean;
              }
            | {
                __typename: "PipelineStrategySinglePacketAttack";
                convertToHttp2: boolean;
                failureBehavior: Types.FailureBehavior;
              };
        };
        activeHttpEntry?:
          | {
              __typename: "ReplayEntryHttp";
              createdAt: string;
              error?: string | undefined | null;
              id: string;
              raw?: string;
              connection: {
                __typename: "ConnectionInfo";
                host: string;
                port: number;
                isTLS: boolean;
                SNI?: string | undefined | null;
              };
              request?:
                | {
                    id: string;
                    host: string;
                    port: number;
                    method: string;
                    path: string;
                    query: string;
                    isTls: boolean;
                    createdAt: string;
                    raw?: string;
                    metadata: { id: string; color?: string | undefined | null };
                    response?:
                      | {
                          id: string;
                          statusCode: number;
                          roundtripTime: number;
                          length: number;
                          createdAt: string;
                          raw?: string;
                        }
                      | undefined
                      | null;
                  }
                | undefined
                | null;
              session: { id: string } | { id: string } | { id: string };
              settings: {
                placeholders: Array<{
                  __typename: "ReplayPlaceholder";
                  inputRange: { start: number; end: number };
                  outputRange: { start: number; end: number };
                  preprocessors: Array<{
                    __typename: "ReplayPreprocessor";
                    options:
                      | {
                          __typename: "ReplayEnvironmentPreprocessor";
                          variableName: string;
                        }
                      | {
                          __typename: "ReplayPrefixPreprocessor";
                          value: string;
                        }
                      | {
                          __typename: "ReplaySuffixPreprocessor";
                          value: string;
                        }
                      | {
                          __typename: "ReplayUrlEncodePreprocessor";
                          charset?: string | undefined | null;
                          nonAscii: boolean;
                        }
                      | {
                          __typename: "ReplayWorkflowPreprocessor";
                          id: string;
                        };
                  }>;
                }>;
              };
            }
          | undefined
          | null;
        httpEntries: Array<{
          __typename: "ReplayEntryHttp";
          createdAt: string;
          error?: string | undefined | null;
          id: string;
          raw?: string;
          connection: {
            __typename: "ConnectionInfo";
            host: string;
            port: number;
            isTLS: boolean;
            SNI?: string | undefined | null;
          };
          request?:
            | {
                id: string;
                host: string;
                port: number;
                method: string;
                path: string;
                query: string;
                isTls: boolean;
                createdAt: string;
                raw?: string;
                metadata: { id: string; color?: string | undefined | null };
                response?:
                  | {
                      id: string;
                      statusCode: number;
                      roundtripTime: number;
                      length: number;
                      createdAt: string;
                      raw?: string;
                    }
                  | undefined
                  | null;
              }
            | undefined
            | null;
          session: { id: string } | { id: string } | { id: string };
          settings: {
            placeholders: Array<{
              __typename: "ReplayPlaceholder";
              inputRange: { start: number; end: number };
              outputRange: { start: number; end: number };
              preprocessors: Array<{
                __typename: "ReplayPreprocessor";
                options:
                  | {
                      __typename: "ReplayEnvironmentPreprocessor";
                      variableName: string;
                    }
                  | { __typename: "ReplayPrefixPreprocessor"; value: string }
                  | { __typename: "ReplaySuffixPreprocessor"; value: string }
                  | {
                      __typename: "ReplayUrlEncodePreprocessor";
                      charset?: string | undefined | null;
                      nonAscii: boolean;
                    }
                  | { __typename: "ReplayWorkflowPreprocessor"; id: string };
              }>;
            }>;
          };
        }>;
      }
    | {
        __typename: "ReplayEntryWs";
        id: string;
        createdAt: string;
        error?: string | undefined | null;
        session: { id: string } | { id: string } | { id: string };
        http: {
          __typename: "ReplayEntryHttp";
          createdAt: string;
          error?: string | undefined | null;
          id: string;
          raw?: string;
          connection: {
            __typename: "ConnectionInfo";
            host: string;
            port: number;
            isTLS: boolean;
            SNI?: string | undefined | null;
          };
          request?:
            | {
                id: string;
                host: string;
                port: number;
                method: string;
                path: string;
                query: string;
                isTls: boolean;
                createdAt: string;
                raw?: string;
                metadata: { id: string; color?: string | undefined | null };
                response?:
                  | {
                      id: string;
                      statusCode: number;
                      roundtripTime: number;
                      length: number;
                      createdAt: string;
                      raw?: string;
                    }
                  | undefined
                  | null;
              }
            | undefined
            | null;
          session: { id: string } | { id: string } | { id: string };
          settings: {
            placeholders: Array<{
              __typename: "ReplayPlaceholder";
              inputRange: { start: number; end: number };
              outputRange: { start: number; end: number };
              preprocessors: Array<{
                __typename: "ReplayPreprocessor";
                options:
                  | {
                      __typename: "ReplayEnvironmentPreprocessor";
                      variableName: string;
                    }
                  | { __typename: "ReplayPrefixPreprocessor"; value: string }
                  | { __typename: "ReplaySuffixPreprocessor"; value: string }
                  | {
                      __typename: "ReplayUrlEncodePreprocessor";
                      charset?: string | undefined | null;
                      nonAscii: boolean;
                    }
                  | { __typename: "ReplayWorkflowPreprocessor"; id: string };
              }>;
            }>;
          };
        };
        messages: Array<{
          __typename: "StreamWsMessage";
          id: string;
          head: {
            id: string;
            alteration: Types.Alteration;
            createdAt: string;
            direction: Types.StreamMessageDirection;
            format: Types.StreamWsMessageFormat;
            length: number;
            raw: string;
          };
          edits: Array<{ id: string; alteration: Types.Alteration }>;
          stream: { id: string };
        }>;
        stream?:
          | {
              __typename: "Stream";
              id: string;
              host: string;
              port: number;
              path: string;
              isTls: boolean;
              protocol: Types.StreamProtocol;
              direction: Types.StreamDirection;
              source: Types.Source;
              createdAt: string;
            }
          | undefined
          | null;
      }
    | undefined
    | null;
};

export type ReplaySessionsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
  after?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
  last?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
  before?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
}>;

export type ReplaySessionsQuery = {
  replaySessions: {
    edges: Array<{
      cursor: string;
      node:
        | {
            __typename: "ReplaySessionHttp";
            id: string;
            name: string;
            rank: string;
            collection: { id: string };
            activeEntry?:
              | { id: string }
              | { id: string }
              | { id: string }
              | undefined
              | null;
            entries: {
              edges: Array<{
                node: { id: string } | { id: string } | { id: string };
              }>;
            };
            settings?:
              | { connectionClose: boolean; updateContentLength: boolean }
              | undefined
              | null;
          }
        | {
            __typename: "ReplaySessionHttpOnePipeline";
            id: string;
            name: string;
            rank: string;
            collection: { id: string };
            activeEntry?:
              | { id: string }
              | { id: string }
              | { id: string }
              | undefined
              | null;
            entries: {
              edges: Array<{
                node: { id: string } | { id: string } | { id: string };
              }>;
            };
            settings?:
              | {
                  strategy:
                    | {
                        __typename: "PipelineStrategyLastByteSynchronization";
                        failureBehavior: Types.FailureBehavior;
                      }
                    | {
                        __typename: "PipelineStrategySequential";
                        abortOnFailure: boolean;
                      }
                    | {
                        __typename: "PipelineStrategySinglePacketAttack";
                        convertToHttp2: boolean;
                        failureBehavior: Types.FailureBehavior;
                      };
                }
              | undefined
              | null;
          }
        | {
            __typename: "ReplaySessionWs";
            id: string;
            name: string;
            rank: string;
            collection: { id: string };
            activeEntry?:
              | { id: string }
              | { id: string }
              | { id: string }
              | undefined
              | null;
            entries: {
              edges: Array<{
                node: { id: string } | { id: string } | { id: string };
              }>;
            };
          };
    }>;
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | undefined | null;
      endCursor?: string | undefined | null;
    };
  };
};

export type ReplaySessionEntriesQueryVariables = Types.Exact<{
  id: Types.Scalars["ID"]["input"];
  after?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
  before?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
  first?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
  last?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
  includeReplayRaw: Types.Scalars["Boolean"]["input"];
  includeRequestRaw: Types.Scalars["Boolean"]["input"];
  includeResponseRaw: Types.Scalars["Boolean"]["input"];
}>;

export type ReplaySessionEntriesQuery = {
  replaySession?:
    | {
        __typename: "ReplaySessionHttp";
        entries: {
          edges: Array<{
            cursor: string;
            node:
              | {
                  __typename: "ReplayEntryHttp";
                  id: string;
                  createdAt: string;
                  error?: string | undefined | null;
                  raw?: string;
                  session: { id: string } | { id: string } | { id: string };
                  connection: {
                    __typename: "ConnectionInfo";
                    host: string;
                    port: number;
                    isTLS: boolean;
                    SNI?: string | undefined | null;
                  };
                  request?:
                    | {
                        id: string;
                        host: string;
                        port: number;
                        method: string;
                        path: string;
                        query: string;
                        isTls: boolean;
                        createdAt: string;
                        raw?: string;
                        metadata: {
                          id: string;
                          color?: string | undefined | null;
                        };
                        response?:
                          | {
                              id: string;
                              statusCode: number;
                              roundtripTime: number;
                              length: number;
                              createdAt: string;
                              raw?: string;
                            }
                          | undefined
                          | null;
                      }
                    | undefined
                    | null;
                  settings: {
                    placeholders: Array<{
                      __typename: "ReplayPlaceholder";
                      inputRange: { start: number; end: number };
                      outputRange: { start: number; end: number };
                      preprocessors: Array<{
                        __typename: "ReplayPreprocessor";
                        options:
                          | {
                              __typename: "ReplayEnvironmentPreprocessor";
                              variableName: string;
                            }
                          | {
                              __typename: "ReplayPrefixPreprocessor";
                              value: string;
                            }
                          | {
                              __typename: "ReplaySuffixPreprocessor";
                              value: string;
                            }
                          | {
                              __typename: "ReplayUrlEncodePreprocessor";
                              charset?: string | undefined | null;
                              nonAscii: boolean;
                            }
                          | {
                              __typename: "ReplayWorkflowPreprocessor";
                              id: string;
                            };
                      }>;
                    }>;
                  };
                }
              | {
                  __typename: "ReplayEntryHttpOnePipeline";
                  id: string;
                  createdAt: string;
                  error?: string | undefined | null;
                  rank: string;
                  session: { id: string } | { id: string } | { id: string };
                  settings: {
                    strategy:
                      | {
                          __typename: "PipelineStrategyLastByteSynchronization";
                          failureBehavior: Types.FailureBehavior;
                        }
                      | {
                          __typename: "PipelineStrategySequential";
                          abortOnFailure: boolean;
                        }
                      | {
                          __typename: "PipelineStrategySinglePacketAttack";
                          convertToHttp2: boolean;
                          failureBehavior: Types.FailureBehavior;
                        };
                  };
                  activeHttpEntry?:
                    | {
                        __typename: "ReplayEntryHttp";
                        createdAt: string;
                        error?: string | undefined | null;
                        id: string;
                        raw?: string;
                        connection: {
                          __typename: "ConnectionInfo";
                          host: string;
                          port: number;
                          isTLS: boolean;
                          SNI?: string | undefined | null;
                        };
                        request?:
                          | {
                              id: string;
                              host: string;
                              port: number;
                              method: string;
                              path: string;
                              query: string;
                              isTls: boolean;
                              createdAt: string;
                              raw?: string;
                              metadata: {
                                id: string;
                                color?: string | undefined | null;
                              };
                              response?:
                                | {
                                    id: string;
                                    statusCode: number;
                                    roundtripTime: number;
                                    length: number;
                                    createdAt: string;
                                    raw?: string;
                                  }
                                | undefined
                                | null;
                            }
                          | undefined
                          | null;
                        session:
                          | { id: string }
                          | { id: string }
                          | { id: string };
                        settings: {
                          placeholders: Array<{
                            __typename: "ReplayPlaceholder";
                            inputRange: { start: number; end: number };
                            outputRange: { start: number; end: number };
                            preprocessors: Array<{
                              __typename: "ReplayPreprocessor";
                              options:
                                | {
                                    __typename: "ReplayEnvironmentPreprocessor";
                                    variableName: string;
                                  }
                                | {
                                    __typename: "ReplayPrefixPreprocessor";
                                    value: string;
                                  }
                                | {
                                    __typename: "ReplaySuffixPreprocessor";
                                    value: string;
                                  }
                                | {
                                    __typename: "ReplayUrlEncodePreprocessor";
                                    charset?: string | undefined | null;
                                    nonAscii: boolean;
                                  }
                                | {
                                    __typename: "ReplayWorkflowPreprocessor";
                                    id: string;
                                  };
                            }>;
                          }>;
                        };
                      }
                    | undefined
                    | null;
                  httpEntries: Array<{
                    __typename: "ReplayEntryHttp";
                    createdAt: string;
                    error?: string | undefined | null;
                    id: string;
                    raw?: string;
                    connection: {
                      __typename: "ConnectionInfo";
                      host: string;
                      port: number;
                      isTLS: boolean;
                      SNI?: string | undefined | null;
                    };
                    request?:
                      | {
                          id: string;
                          host: string;
                          port: number;
                          method: string;
                          path: string;
                          query: string;
                          isTls: boolean;
                          createdAt: string;
                          raw?: string;
                          metadata: {
                            id: string;
                            color?: string | undefined | null;
                          };
                          response?:
                            | {
                                id: string;
                                statusCode: number;
                                roundtripTime: number;
                                length: number;
                                createdAt: string;
                                raw?: string;
                              }
                            | undefined
                            | null;
                        }
                      | undefined
                      | null;
                    session: { id: string } | { id: string } | { id: string };
                    settings: {
                      placeholders: Array<{
                        __typename: "ReplayPlaceholder";
                        inputRange: { start: number; end: number };
                        outputRange: { start: number; end: number };
                        preprocessors: Array<{
                          __typename: "ReplayPreprocessor";
                          options:
                            | {
                                __typename: "ReplayEnvironmentPreprocessor";
                                variableName: string;
                              }
                            | {
                                __typename: "ReplayPrefixPreprocessor";
                                value: string;
                              }
                            | {
                                __typename: "ReplaySuffixPreprocessor";
                                value: string;
                              }
                            | {
                                __typename: "ReplayUrlEncodePreprocessor";
                                charset?: string | undefined | null;
                                nonAscii: boolean;
                              }
                            | {
                                __typename: "ReplayWorkflowPreprocessor";
                                id: string;
                              };
                        }>;
                      }>;
                    };
                  }>;
                }
              | {
                  __typename: "ReplayEntryWs";
                  id: string;
                  createdAt: string;
                  error?: string | undefined | null;
                  session: { id: string } | { id: string } | { id: string };
                  http: {
                    __typename: "ReplayEntryHttp";
                    createdAt: string;
                    error?: string | undefined | null;
                    id: string;
                    raw?: string;
                    connection: {
                      __typename: "ConnectionInfo";
                      host: string;
                      port: number;
                      isTLS: boolean;
                      SNI?: string | undefined | null;
                    };
                    request?:
                      | {
                          id: string;
                          host: string;
                          port: number;
                          method: string;
                          path: string;
                          query: string;
                          isTls: boolean;
                          createdAt: string;
                          raw?: string;
                          metadata: {
                            id: string;
                            color?: string | undefined | null;
                          };
                          response?:
                            | {
                                id: string;
                                statusCode: number;
                                roundtripTime: number;
                                length: number;
                                createdAt: string;
                                raw?: string;
                              }
                            | undefined
                            | null;
                        }
                      | undefined
                      | null;
                    session: { id: string } | { id: string } | { id: string };
                    settings: {
                      placeholders: Array<{
                        __typename: "ReplayPlaceholder";
                        inputRange: { start: number; end: number };
                        outputRange: { start: number; end: number };
                        preprocessors: Array<{
                          __typename: "ReplayPreprocessor";
                          options:
                            | {
                                __typename: "ReplayEnvironmentPreprocessor";
                                variableName: string;
                              }
                            | {
                                __typename: "ReplayPrefixPreprocessor";
                                value: string;
                              }
                            | {
                                __typename: "ReplaySuffixPreprocessor";
                                value: string;
                              }
                            | {
                                __typename: "ReplayUrlEncodePreprocessor";
                                charset?: string | undefined | null;
                                nonAscii: boolean;
                              }
                            | {
                                __typename: "ReplayWorkflowPreprocessor";
                                id: string;
                              };
                        }>;
                      }>;
                    };
                  };
                  messages: Array<{
                    __typename: "StreamWsMessage";
                    id: string;
                    head: {
                      id: string;
                      alteration: Types.Alteration;
                      createdAt: string;
                      direction: Types.StreamMessageDirection;
                      format: Types.StreamWsMessageFormat;
                      length: number;
                      raw: string;
                    };
                    edits: Array<{ id: string; alteration: Types.Alteration }>;
                    stream: { id: string };
                  }>;
                  stream?:
                    | {
                        __typename: "Stream";
                        id: string;
                        host: string;
                        port: number;
                        path: string;
                        isTls: boolean;
                        protocol: Types.StreamProtocol;
                        direction: Types.StreamDirection;
                        source: Types.Source;
                        createdAt: string;
                      }
                    | undefined
                    | null;
                };
          }>;
          pageInfo: {
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            startCursor?: string | undefined | null;
            endCursor?: string | undefined | null;
          };
        };
      }
    | {
        __typename: "ReplaySessionHttpOnePipeline";
        entries: {
          edges: Array<{
            cursor: string;
            node:
              | {
                  __typename: "ReplayEntryHttp";
                  id: string;
                  createdAt: string;
                  error?: string | undefined | null;
                  raw?: string;
                  session: { id: string } | { id: string } | { id: string };
                  connection: {
                    __typename: "ConnectionInfo";
                    host: string;
                    port: number;
                    isTLS: boolean;
                    SNI?: string | undefined | null;
                  };
                  request?:
                    | {
                        id: string;
                        host: string;
                        port: number;
                        method: string;
                        path: string;
                        query: string;
                        isTls: boolean;
                        createdAt: string;
                        raw?: string;
                        metadata: {
                          id: string;
                          color?: string | undefined | null;
                        };
                        response?:
                          | {
                              id: string;
                              statusCode: number;
                              roundtripTime: number;
                              length: number;
                              createdAt: string;
                              raw?: string;
                            }
                          | undefined
                          | null;
                      }
                    | undefined
                    | null;
                  settings: {
                    placeholders: Array<{
                      __typename: "ReplayPlaceholder";
                      inputRange: { start: number; end: number };
                      outputRange: { start: number; end: number };
                      preprocessors: Array<{
                        __typename: "ReplayPreprocessor";
                        options:
                          | {
                              __typename: "ReplayEnvironmentPreprocessor";
                              variableName: string;
                            }
                          | {
                              __typename: "ReplayPrefixPreprocessor";
                              value: string;
                            }
                          | {
                              __typename: "ReplaySuffixPreprocessor";
                              value: string;
                            }
                          | {
                              __typename: "ReplayUrlEncodePreprocessor";
                              charset?: string | undefined | null;
                              nonAscii: boolean;
                            }
                          | {
                              __typename: "ReplayWorkflowPreprocessor";
                              id: string;
                            };
                      }>;
                    }>;
                  };
                }
              | {
                  __typename: "ReplayEntryHttpOnePipeline";
                  id: string;
                  createdAt: string;
                  error?: string | undefined | null;
                  rank: string;
                  session: { id: string } | { id: string } | { id: string };
                  settings: {
                    strategy:
                      | {
                          __typename: "PipelineStrategyLastByteSynchronization";
                          failureBehavior: Types.FailureBehavior;
                        }
                      | {
                          __typename: "PipelineStrategySequential";
                          abortOnFailure: boolean;
                        }
                      | {
                          __typename: "PipelineStrategySinglePacketAttack";
                          convertToHttp2: boolean;
                          failureBehavior: Types.FailureBehavior;
                        };
                  };
                  activeHttpEntry?:
                    | {
                        __typename: "ReplayEntryHttp";
                        createdAt: string;
                        error?: string | undefined | null;
                        id: string;
                        raw?: string;
                        connection: {
                          __typename: "ConnectionInfo";
                          host: string;
                          port: number;
                          isTLS: boolean;
                          SNI?: string | undefined | null;
                        };
                        request?:
                          | {
                              id: string;
                              host: string;
                              port: number;
                              method: string;
                              path: string;
                              query: string;
                              isTls: boolean;
                              createdAt: string;
                              raw?: string;
                              metadata: {
                                id: string;
                                color?: string | undefined | null;
                              };
                              response?:
                                | {
                                    id: string;
                                    statusCode: number;
                                    roundtripTime: number;
                                    length: number;
                                    createdAt: string;
                                    raw?: string;
                                  }
                                | undefined
                                | null;
                            }
                          | undefined
                          | null;
                        session:
                          | { id: string }
                          | { id: string }
                          | { id: string };
                        settings: {
                          placeholders: Array<{
                            __typename: "ReplayPlaceholder";
                            inputRange: { start: number; end: number };
                            outputRange: { start: number; end: number };
                            preprocessors: Array<{
                              __typename: "ReplayPreprocessor";
                              options:
                                | {
                                    __typename: "ReplayEnvironmentPreprocessor";
                                    variableName: string;
                                  }
                                | {
                                    __typename: "ReplayPrefixPreprocessor";
                                    value: string;
                                  }
                                | {
                                    __typename: "ReplaySuffixPreprocessor";
                                    value: string;
                                  }
                                | {
                                    __typename: "ReplayUrlEncodePreprocessor";
                                    charset?: string | undefined | null;
                                    nonAscii: boolean;
                                  }
                                | {
                                    __typename: "ReplayWorkflowPreprocessor";
                                    id: string;
                                  };
                            }>;
                          }>;
                        };
                      }
                    | undefined
                    | null;
                  httpEntries: Array<{
                    __typename: "ReplayEntryHttp";
                    createdAt: string;
                    error?: string | undefined | null;
                    id: string;
                    raw?: string;
                    connection: {
                      __typename: "ConnectionInfo";
                      host: string;
                      port: number;
                      isTLS: boolean;
                      SNI?: string | undefined | null;
                    };
                    request?:
                      | {
                          id: string;
                          host: string;
                          port: number;
                          method: string;
                          path: string;
                          query: string;
                          isTls: boolean;
                          createdAt: string;
                          raw?: string;
                          metadata: {
                            id: string;
                            color?: string | undefined | null;
                          };
                          response?:
                            | {
                                id: string;
                                statusCode: number;
                                roundtripTime: number;
                                length: number;
                                createdAt: string;
                                raw?: string;
                              }
                            | undefined
                            | null;
                        }
                      | undefined
                      | null;
                    session: { id: string } | { id: string } | { id: string };
                    settings: {
                      placeholders: Array<{
                        __typename: "ReplayPlaceholder";
                        inputRange: { start: number; end: number };
                        outputRange: { start: number; end: number };
                        preprocessors: Array<{
                          __typename: "ReplayPreprocessor";
                          options:
                            | {
                                __typename: "ReplayEnvironmentPreprocessor";
                                variableName: string;
                              }
                            | {
                                __typename: "ReplayPrefixPreprocessor";
                                value: string;
                              }
                            | {
                                __typename: "ReplaySuffixPreprocessor";
                                value: string;
                              }
                            | {
                                __typename: "ReplayUrlEncodePreprocessor";
                                charset?: string | undefined | null;
                                nonAscii: boolean;
                              }
                            | {
                                __typename: "ReplayWorkflowPreprocessor";
                                id: string;
                              };
                        }>;
                      }>;
                    };
                  }>;
                }
              | {
                  __typename: "ReplayEntryWs";
                  id: string;
                  createdAt: string;
                  error?: string | undefined | null;
                  session: { id: string } | { id: string } | { id: string };
                  http: {
                    __typename: "ReplayEntryHttp";
                    createdAt: string;
                    error?: string | undefined | null;
                    id: string;
                    raw?: string;
                    connection: {
                      __typename: "ConnectionInfo";
                      host: string;
                      port: number;
                      isTLS: boolean;
                      SNI?: string | undefined | null;
                    };
                    request?:
                      | {
                          id: string;
                          host: string;
                          port: number;
                          method: string;
                          path: string;
                          query: string;
                          isTls: boolean;
                          createdAt: string;
                          raw?: string;
                          metadata: {
                            id: string;
                            color?: string | undefined | null;
                          };
                          response?:
                            | {
                                id: string;
                                statusCode: number;
                                roundtripTime: number;
                                length: number;
                                createdAt: string;
                                raw?: string;
                              }
                            | undefined
                            | null;
                        }
                      | undefined
                      | null;
                    session: { id: string } | { id: string } | { id: string };
                    settings: {
                      placeholders: Array<{
                        __typename: "ReplayPlaceholder";
                        inputRange: { start: number; end: number };
                        outputRange: { start: number; end: number };
                        preprocessors: Array<{
                          __typename: "ReplayPreprocessor";
                          options:
                            | {
                                __typename: "ReplayEnvironmentPreprocessor";
                                variableName: string;
                              }
                            | {
                                __typename: "ReplayPrefixPreprocessor";
                                value: string;
                              }
                            | {
                                __typename: "ReplaySuffixPreprocessor";
                                value: string;
                              }
                            | {
                                __typename: "ReplayUrlEncodePreprocessor";
                                charset?: string | undefined | null;
                                nonAscii: boolean;
                              }
                            | {
                                __typename: "ReplayWorkflowPreprocessor";
                                id: string;
                              };
                        }>;
                      }>;
                    };
                  };
                  messages: Array<{
                    __typename: "StreamWsMessage";
                    id: string;
                    head: {
                      id: string;
                      alteration: Types.Alteration;
                      createdAt: string;
                      direction: Types.StreamMessageDirection;
                      format: Types.StreamWsMessageFormat;
                      length: number;
                      raw: string;
                    };
                    edits: Array<{ id: string; alteration: Types.Alteration }>;
                    stream: { id: string };
                  }>;
                  stream?:
                    | {
                        __typename: "Stream";
                        id: string;
                        host: string;
                        port: number;
                        path: string;
                        isTls: boolean;
                        protocol: Types.StreamProtocol;
                        direction: Types.StreamDirection;
                        source: Types.Source;
                        createdAt: string;
                      }
                    | undefined
                    | null;
                };
          }>;
          pageInfo: {
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            startCursor?: string | undefined | null;
            endCursor?: string | undefined | null;
          };
        };
      }
    | {
        __typename: "ReplaySessionWs";
        entries: {
          edges: Array<{
            cursor: string;
            node:
              | {
                  __typename: "ReplayEntryHttp";
                  id: string;
                  createdAt: string;
                  error?: string | undefined | null;
                  raw?: string;
                  session: { id: string } | { id: string } | { id: string };
                  connection: {
                    __typename: "ConnectionInfo";
                    host: string;
                    port: number;
                    isTLS: boolean;
                    SNI?: string | undefined | null;
                  };
                  request?:
                    | {
                        id: string;
                        host: string;
                        port: number;
                        method: string;
                        path: string;
                        query: string;
                        isTls: boolean;
                        createdAt: string;
                        raw?: string;
                        metadata: {
                          id: string;
                          color?: string | undefined | null;
                        };
                        response?:
                          | {
                              id: string;
                              statusCode: number;
                              roundtripTime: number;
                              length: number;
                              createdAt: string;
                              raw?: string;
                            }
                          | undefined
                          | null;
                      }
                    | undefined
                    | null;
                  settings: {
                    placeholders: Array<{
                      __typename: "ReplayPlaceholder";
                      inputRange: { start: number; end: number };
                      outputRange: { start: number; end: number };
                      preprocessors: Array<{
                        __typename: "ReplayPreprocessor";
                        options:
                          | {
                              __typename: "ReplayEnvironmentPreprocessor";
                              variableName: string;
                            }
                          | {
                              __typename: "ReplayPrefixPreprocessor";
                              value: string;
                            }
                          | {
                              __typename: "ReplaySuffixPreprocessor";
                              value: string;
                            }
                          | {
                              __typename: "ReplayUrlEncodePreprocessor";
                              charset?: string | undefined | null;
                              nonAscii: boolean;
                            }
                          | {
                              __typename: "ReplayWorkflowPreprocessor";
                              id: string;
                            };
                      }>;
                    }>;
                  };
                }
              | {
                  __typename: "ReplayEntryHttpOnePipeline";
                  id: string;
                  createdAt: string;
                  error?: string | undefined | null;
                  rank: string;
                  session: { id: string } | { id: string } | { id: string };
                  settings: {
                    strategy:
                      | {
                          __typename: "PipelineStrategyLastByteSynchronization";
                          failureBehavior: Types.FailureBehavior;
                        }
                      | {
                          __typename: "PipelineStrategySequential";
                          abortOnFailure: boolean;
                        }
                      | {
                          __typename: "PipelineStrategySinglePacketAttack";
                          convertToHttp2: boolean;
                          failureBehavior: Types.FailureBehavior;
                        };
                  };
                  activeHttpEntry?:
                    | {
                        __typename: "ReplayEntryHttp";
                        createdAt: string;
                        error?: string | undefined | null;
                        id: string;
                        raw?: string;
                        connection: {
                          __typename: "ConnectionInfo";
                          host: string;
                          port: number;
                          isTLS: boolean;
                          SNI?: string | undefined | null;
                        };
                        request?:
                          | {
                              id: string;
                              host: string;
                              port: number;
                              method: string;
                              path: string;
                              query: string;
                              isTls: boolean;
                              createdAt: string;
                              raw?: string;
                              metadata: {
                                id: string;
                                color?: string | undefined | null;
                              };
                              response?:
                                | {
                                    id: string;
                                    statusCode: number;
                                    roundtripTime: number;
                                    length: number;
                                    createdAt: string;
                                    raw?: string;
                                  }
                                | undefined
                                | null;
                            }
                          | undefined
                          | null;
                        session:
                          | { id: string }
                          | { id: string }
                          | { id: string };
                        settings: {
                          placeholders: Array<{
                            __typename: "ReplayPlaceholder";
                            inputRange: { start: number; end: number };
                            outputRange: { start: number; end: number };
                            preprocessors: Array<{
                              __typename: "ReplayPreprocessor";
                              options:
                                | {
                                    __typename: "ReplayEnvironmentPreprocessor";
                                    variableName: string;
                                  }
                                | {
                                    __typename: "ReplayPrefixPreprocessor";
                                    value: string;
                                  }
                                | {
                                    __typename: "ReplaySuffixPreprocessor";
                                    value: string;
                                  }
                                | {
                                    __typename: "ReplayUrlEncodePreprocessor";
                                    charset?: string | undefined | null;
                                    nonAscii: boolean;
                                  }
                                | {
                                    __typename: "ReplayWorkflowPreprocessor";
                                    id: string;
                                  };
                            }>;
                          }>;
                        };
                      }
                    | undefined
                    | null;
                  httpEntries: Array<{
                    __typename: "ReplayEntryHttp";
                    createdAt: string;
                    error?: string | undefined | null;
                    id: string;
                    raw?: string;
                    connection: {
                      __typename: "ConnectionInfo";
                      host: string;
                      port: number;
                      isTLS: boolean;
                      SNI?: string | undefined | null;
                    };
                    request?:
                      | {
                          id: string;
                          host: string;
                          port: number;
                          method: string;
                          path: string;
                          query: string;
                          isTls: boolean;
                          createdAt: string;
                          raw?: string;
                          metadata: {
                            id: string;
                            color?: string | undefined | null;
                          };
                          response?:
                            | {
                                id: string;
                                statusCode: number;
                                roundtripTime: number;
                                length: number;
                                createdAt: string;
                                raw?: string;
                              }
                            | undefined
                            | null;
                        }
                      | undefined
                      | null;
                    session: { id: string } | { id: string } | { id: string };
                    settings: {
                      placeholders: Array<{
                        __typename: "ReplayPlaceholder";
                        inputRange: { start: number; end: number };
                        outputRange: { start: number; end: number };
                        preprocessors: Array<{
                          __typename: "ReplayPreprocessor";
                          options:
                            | {
                                __typename: "ReplayEnvironmentPreprocessor";
                                variableName: string;
                              }
                            | {
                                __typename: "ReplayPrefixPreprocessor";
                                value: string;
                              }
                            | {
                                __typename: "ReplaySuffixPreprocessor";
                                value: string;
                              }
                            | {
                                __typename: "ReplayUrlEncodePreprocessor";
                                charset?: string | undefined | null;
                                nonAscii: boolean;
                              }
                            | {
                                __typename: "ReplayWorkflowPreprocessor";
                                id: string;
                              };
                        }>;
                      }>;
                    };
                  }>;
                }
              | {
                  __typename: "ReplayEntryWs";
                  id: string;
                  createdAt: string;
                  error?: string | undefined | null;
                  session: { id: string } | { id: string } | { id: string };
                  http: {
                    __typename: "ReplayEntryHttp";
                    createdAt: string;
                    error?: string | undefined | null;
                    id: string;
                    raw?: string;
                    connection: {
                      __typename: "ConnectionInfo";
                      host: string;
                      port: number;
                      isTLS: boolean;
                      SNI?: string | undefined | null;
                    };
                    request?:
                      | {
                          id: string;
                          host: string;
                          port: number;
                          method: string;
                          path: string;
                          query: string;
                          isTls: boolean;
                          createdAt: string;
                          raw?: string;
                          metadata: {
                            id: string;
                            color?: string | undefined | null;
                          };
                          response?:
                            | {
                                id: string;
                                statusCode: number;
                                roundtripTime: number;
                                length: number;
                                createdAt: string;
                                raw?: string;
                              }
                            | undefined
                            | null;
                        }
                      | undefined
                      | null;
                    session: { id: string } | { id: string } | { id: string };
                    settings: {
                      placeholders: Array<{
                        __typename: "ReplayPlaceholder";
                        inputRange: { start: number; end: number };
                        outputRange: { start: number; end: number };
                        preprocessors: Array<{
                          __typename: "ReplayPreprocessor";
                          options:
                            | {
                                __typename: "ReplayEnvironmentPreprocessor";
                                variableName: string;
                              }
                            | {
                                __typename: "ReplayPrefixPreprocessor";
                                value: string;
                              }
                            | {
                                __typename: "ReplaySuffixPreprocessor";
                                value: string;
                              }
                            | {
                                __typename: "ReplayUrlEncodePreprocessor";
                                charset?: string | undefined | null;
                                nonAscii: boolean;
                              }
                            | {
                                __typename: "ReplayWorkflowPreprocessor";
                                id: string;
                              };
                        }>;
                      }>;
                    };
                  };
                  messages: Array<{
                    __typename: "StreamWsMessage";
                    id: string;
                    head: {
                      id: string;
                      alteration: Types.Alteration;
                      createdAt: string;
                      direction: Types.StreamMessageDirection;
                      format: Types.StreamWsMessageFormat;
                      length: number;
                      raw: string;
                    };
                    edits: Array<{ id: string; alteration: Types.Alteration }>;
                    stream: { id: string };
                  }>;
                  stream?:
                    | {
                        __typename: "Stream";
                        id: string;
                        host: string;
                        port: number;
                        path: string;
                        isTls: boolean;
                        protocol: Types.StreamProtocol;
                        direction: Types.StreamDirection;
                        source: Types.Source;
                        createdAt: string;
                      }
                    | undefined
                    | null;
                };
          }>;
          pageInfo: {
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            startCursor?: string | undefined | null;
            endCursor?: string | undefined | null;
          };
        };
      }
    | undefined
    | null;
};

export type ReplaySessionQueryVariables = Types.Exact<{
  id: Types.Scalars["ID"]["input"];
}>;

export type ReplaySessionQuery = {
  replaySession?:
    | {
        __typename: "ReplaySessionHttp";
        id: string;
        name: string;
        rank: string;
        collection: { id: string };
        activeEntry?:
          | { id: string }
          | { id: string }
          | { id: string }
          | undefined
          | null;
        entries: {
          edges: Array<{
            node: { id: string } | { id: string } | { id: string };
          }>;
        };
        settings?:
          | { connectionClose: boolean; updateContentLength: boolean }
          | undefined
          | null;
      }
    | {
        __typename: "ReplaySessionHttpOnePipeline";
        id: string;
        name: string;
        rank: string;
        collection: { id: string };
        activeEntry?:
          | { id: string }
          | { id: string }
          | { id: string }
          | undefined
          | null;
        entries: {
          edges: Array<{
            node: { id: string } | { id: string } | { id: string };
          }>;
        };
        settings?:
          | {
              strategy:
                | {
                    __typename: "PipelineStrategyLastByteSynchronization";
                    failureBehavior: Types.FailureBehavior;
                  }
                | {
                    __typename: "PipelineStrategySequential";
                    abortOnFailure: boolean;
                  }
                | {
                    __typename: "PipelineStrategySinglePacketAttack";
                    convertToHttp2: boolean;
                    failureBehavior: Types.FailureBehavior;
                  };
            }
          | undefined
          | null;
      }
    | {
        __typename: "ReplaySessionWs";
        id: string;
        name: string;
        rank: string;
        collection: { id: string };
        activeEntry?:
          | { id: string }
          | { id: string }
          | { id: string }
          | undefined
          | null;
        entries: {
          edges: Array<{
            node: { id: string } | { id: string } | { id: string };
          }>;
        };
      }
    | undefined
    | null;
};

export type ReplaySessionCollectionsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
  after?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
  last?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
  before?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
}>;

export type ReplaySessionCollectionsQuery = {
  replaySessionCollections: {
    edges: Array<{ cursor: string; node: { id: string; name: string } }>;
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor?: string | undefined | null;
      endCursor?: string | undefined | null;
    };
  };
};

export type CreateReplaySessionMutationVariables = Types.Exact<{
  input: Types.CreateReplaySessionInput;
}>;

export type CreateReplaySessionMutation = {
  createReplaySession: {
    error?:
      | {
          __typename: "CloudUserError";
          code: string;
          cloudReason: Types.CloudErrorReason;
        }
      | { __typename: "OtherUserError"; code: string }
      | {
          __typename: "PermissionDeniedUserError";
          code: string;
          permissionReason: Types.PermissionDeniedErrorReason;
        }
      | undefined
      | null;
    session?:
      | {
          __typename: "ReplaySessionHttp";
          id: string;
          name: string;
          rank: string;
          collection: { id: string };
          activeEntry?:
            | { id: string }
            | { id: string }
            | { id: string }
            | undefined
            | null;
          entries: {
            edges: Array<{
              node: { id: string } | { id: string } | { id: string };
            }>;
          };
          settings?:
            | { connectionClose: boolean; updateContentLength: boolean }
            | undefined
            | null;
        }
      | {
          __typename: "ReplaySessionHttpOnePipeline";
          id: string;
          name: string;
          rank: string;
          collection: { id: string };
          activeEntry?:
            | { id: string }
            | { id: string }
            | { id: string }
            | undefined
            | null;
          entries: {
            edges: Array<{
              node: { id: string } | { id: string } | { id: string };
            }>;
          };
          settings?:
            | {
                strategy:
                  | {
                      __typename: "PipelineStrategyLastByteSynchronization";
                      failureBehavior: Types.FailureBehavior;
                    }
                  | {
                      __typename: "PipelineStrategySequential";
                      abortOnFailure: boolean;
                    }
                  | {
                      __typename: "PipelineStrategySinglePacketAttack";
                      convertToHttp2: boolean;
                      failureBehavior: Types.FailureBehavior;
                    };
              }
            | undefined
            | null;
        }
      | {
          __typename: "ReplaySessionWs";
          id: string;
          name: string;
          rank: string;
          collection: { id: string };
          activeEntry?:
            | { id: string }
            | { id: string }
            | { id: string }
            | undefined
            | null;
          entries: {
            edges: Array<{
              node: { id: string } | { id: string } | { id: string };
            }>;
          };
        }
      | undefined
      | null;
  };
};

export type CreateReplayPipelineHttpOneSessionMutationVariables = Types.Exact<{
  input: Types.CreateReplayPipelineSessionInput;
}>;

export type CreateReplayPipelineHttpOneSessionMutation = {
  createReplayPipelineHttpOneSession: {
    error?:
      | {
          __typename: "CloudUserError";
          code: string;
          cloudReason: Types.CloudErrorReason;
        }
      | { __typename: "OtherUserError"; code: string }
      | {
          __typename: "PermissionDeniedUserError";
          code: string;
          permissionReason: Types.PermissionDeniedErrorReason;
        }
      | undefined
      | null;
    session?:
      | {
          __typename: "ReplaySessionHttpOnePipeline";
          id: string;
          name: string;
          rank: string;
          collection: { id: string };
          activeEntry?:
            | { id: string }
            | { id: string }
            | { id: string }
            | undefined
            | null;
          entries: {
            edges: Array<{
              node: { id: string } | { id: string } | { id: string };
            }>;
          };
          settings?:
            | {
                strategy:
                  | {
                      __typename: "PipelineStrategyLastByteSynchronization";
                      failureBehavior: Types.FailureBehavior;
                    }
                  | {
                      __typename: "PipelineStrategySequential";
                      abortOnFailure: boolean;
                    }
                  | {
                      __typename: "PipelineStrategySinglePacketAttack";
                      convertToHttp2: boolean;
                      failureBehavior: Types.FailureBehavior;
                    };
              }
            | undefined
            | null;
        }
      | undefined
      | null;
  };
};

export type CreateReplaySessionCollectionMutationVariables = Types.Exact<{
  input: Types.CreateReplaySessionCollectionInput;
}>;

export type CreateReplaySessionCollectionMutation = {
  createReplaySessionCollection: {
    collection?: { id: string; name: string } | undefined | null;
  };
};

export type DeleteReplaySessionsMutationVariables = Types.Exact<{
  ids: Array<Types.Scalars["ID"]["input"]> | Types.Scalars["ID"]["input"];
}>;

export type DeleteReplaySessionsMutation = {
  deleteReplaySessions: { deletedIds?: Array<string> | undefined | null };
};

export type DeleteReplaySessionCollectionMutationVariables = Types.Exact<{
  id: Types.Scalars["ID"]["input"];
}>;

export type DeleteReplaySessionCollectionMutation = {
  deleteReplaySessionCollection: { deletedId?: string | undefined | null };
};

export type MoveReplaySessionMutationVariables = Types.Exact<{
  id: Types.Scalars["ID"]["input"];
  collectionId: Types.Scalars["ID"]["input"];
}>;

export type MoveReplaySessionMutation = {
  moveReplaySession: {
    session?:
      | {
          __typename: "ReplaySessionHttp";
          id: string;
          name: string;
          rank: string;
          collection: { id: string };
          activeEntry?:
            | { id: string }
            | { id: string }
            | { id: string }
            | undefined
            | null;
          entries: {
            edges: Array<{
              node: { id: string } | { id: string } | { id: string };
            }>;
          };
          settings?:
            | { connectionClose: boolean; updateContentLength: boolean }
            | undefined
            | null;
        }
      | {
          __typename: "ReplaySessionHttpOnePipeline";
          id: string;
          name: string;
          rank: string;
          collection: { id: string };
          activeEntry?:
            | { id: string }
            | { id: string }
            | { id: string }
            | undefined
            | null;
          entries: {
            edges: Array<{
              node: { id: string } | { id: string } | { id: string };
            }>;
          };
          settings?:
            | {
                strategy:
                  | {
                      __typename: "PipelineStrategyLastByteSynchronization";
                      failureBehavior: Types.FailureBehavior;
                    }
                  | {
                      __typename: "PipelineStrategySequential";
                      abortOnFailure: boolean;
                    }
                  | {
                      __typename: "PipelineStrategySinglePacketAttack";
                      convertToHttp2: boolean;
                      failureBehavior: Types.FailureBehavior;
                    };
              }
            | undefined
            | null;
        }
      | {
          __typename: "ReplaySessionWs";
          id: string;
          name: string;
          rank: string;
          collection: { id: string };
          activeEntry?:
            | { id: string }
            | { id: string }
            | { id: string }
            | undefined
            | null;
          entries: {
            edges: Array<{
              node: { id: string } | { id: string } | { id: string };
            }>;
          };
        }
      | undefined
      | null;
  };
};

export type RenameReplaySessionMutationVariables = Types.Exact<{
  id: Types.Scalars["ID"]["input"];
  name: Types.Scalars["String"]["input"];
}>;

export type RenameReplaySessionMutation = {
  renameReplaySession: {
    session?:
      | {
          __typename: "ReplaySessionHttp";
          id: string;
          name: string;
          rank: string;
          collection: { id: string };
          activeEntry?:
            | { id: string }
            | { id: string }
            | { id: string }
            | undefined
            | null;
          entries: {
            edges: Array<{
              node: { id: string } | { id: string } | { id: string };
            }>;
          };
          settings?:
            | { connectionClose: boolean; updateContentLength: boolean }
            | undefined
            | null;
        }
      | {
          __typename: "ReplaySessionHttpOnePipeline";
          id: string;
          name: string;
          rank: string;
          collection: { id: string };
          activeEntry?:
            | { id: string }
            | { id: string }
            | { id: string }
            | undefined
            | null;
          entries: {
            edges: Array<{
              node: { id: string } | { id: string } | { id: string };
            }>;
          };
          settings?:
            | {
                strategy:
                  | {
                      __typename: "PipelineStrategyLastByteSynchronization";
                      failureBehavior: Types.FailureBehavior;
                    }
                  | {
                      __typename: "PipelineStrategySequential";
                      abortOnFailure: boolean;
                    }
                  | {
                      __typename: "PipelineStrategySinglePacketAttack";
                      convertToHttp2: boolean;
                      failureBehavior: Types.FailureBehavior;
                    };
              }
            | undefined
            | null;
        }
      | {
          __typename: "ReplaySessionWs";
          id: string;
          name: string;
          rank: string;
          collection: { id: string };
          activeEntry?:
            | { id: string }
            | { id: string }
            | { id: string }
            | undefined
            | null;
          entries: {
            edges: Array<{
              node: { id: string } | { id: string } | { id: string };
            }>;
          };
        }
      | undefined
      | null;
  };
};

export type RenameReplaySessionCollectionMutationVariables = Types.Exact<{
  id: Types.Scalars["ID"]["input"];
  name: Types.Scalars["String"]["input"];
}>;

export type RenameReplaySessionCollectionMutation = {
  renameReplaySessionCollection: {
    collection?: { id: string; name: string } | undefined | null;
  };
};

export type SetActiveReplaySessionEntryMutationVariables = Types.Exact<{
  id: Types.Scalars["ID"]["input"];
  entryId: Types.Scalars["ID"]["input"];
}>;

export type SetActiveReplaySessionEntryMutation = {
  setActiveReplaySessionEntry: {
    session?:
      | {
          __typename: "ReplaySessionHttp";
          id: string;
          name: string;
          rank: string;
          collection: { id: string };
          activeEntry?:
            | { id: string }
            | { id: string }
            | { id: string }
            | undefined
            | null;
          entries: {
            edges: Array<{
              node: { id: string } | { id: string } | { id: string };
            }>;
          };
          settings?:
            | { connectionClose: boolean; updateContentLength: boolean }
            | undefined
            | null;
        }
      | {
          __typename: "ReplaySessionHttpOnePipeline";
          id: string;
          name: string;
          rank: string;
          collection: { id: string };
          activeEntry?:
            | { id: string }
            | { id: string }
            | { id: string }
            | undefined
            | null;
          entries: {
            edges: Array<{
              node: { id: string } | { id: string } | { id: string };
            }>;
          };
          settings?:
            | {
                strategy:
                  | {
                      __typename: "PipelineStrategyLastByteSynchronization";
                      failureBehavior: Types.FailureBehavior;
                    }
                  | {
                      __typename: "PipelineStrategySequential";
                      abortOnFailure: boolean;
                    }
                  | {
                      __typename: "PipelineStrategySinglePacketAttack";
                      convertToHttp2: boolean;
                      failureBehavior: Types.FailureBehavior;
                    };
              }
            | undefined
            | null;
        }
      | {
          __typename: "ReplaySessionWs";
          id: string;
          name: string;
          rank: string;
          collection: { id: string };
          activeEntry?:
            | { id: string }
            | { id: string }
            | { id: string }
            | undefined
            | null;
          entries: {
            edges: Array<{
              node: { id: string } | { id: string } | { id: string };
            }>;
          };
        }
      | undefined
      | null;
  };
};

export type SetActiveReplayPipelineEntryHttpEntryMutationVariables =
  Types.Exact<{
    id: Types.Scalars["ID"]["input"];
    httpEntryId: Types.Scalars["ID"]["input"];
  }>;

export type SetActiveReplayPipelineEntryHttpEntryMutation = {
  setActiveReplayPipelineEntryHttpEntry: {
    entry?: { id: string } | undefined | null;
  };
};

export type UpdateReplayEntryDraftMutationVariables = Types.Exact<{
  id: Types.Scalars["ID"]["input"];
  input: Types.UpdateReplayEntryDraftInput;
}>;

export type UpdateReplayEntryDraftMutation = {
  updateReplayEntryDraft: {
    entry?: { id: string } | { id: string } | { id: string } | undefined | null;
  };
};

export type UpdateReplayEntryHttpOnePipelineDraftHttpEntriesMutationVariables =
  Types.Exact<{
    id: Types.Scalars["ID"]["input"];
    input: Types.UpdateReplayEntryHttpOnePipelineDraftHttpEntriesInput;
  }>;

export type UpdateReplayEntryHttpOnePipelineDraftHttpEntriesMutation = {
  updateReplayEntryHttpOnePipelineDraftHttpEntries: {
    entry?: { id: string } | { id: string } | { id: string } | undefined | null;
  };
};

export type UpdateReplaySessionSettingsMutationVariables = Types.Exact<{
  id: Types.Scalars["ID"]["input"];
  input: Types.ReplaySessionSettingsInput;
}>;

export type UpdateReplaySessionSettingsMutation = {
  updateReplaySessionSettings: {
    session?:
      | { id: string }
      | { id: string }
      | { id: string }
      | undefined
      | null;
  };
};

export type StartReplayTaskMutationVariables = Types.Exact<{
  sessionId: Types.Scalars["ID"]["input"];
}>;

export type StartReplayTaskMutation = {
  startReplayTask: {
    error?:
      | {
          __typename: "CloudUserError";
          code: string;
          cloudReason: Types.CloudErrorReason;
        }
      | { __typename: "OtherUserError"; code: string }
      | {
          __typename: "PermissionDeniedUserError";
          code: string;
          permissionReason: Types.PermissionDeniedErrorReason;
        }
      | { __typename: "TaskInProgressUserError"; taskId: string; code: string }
      | { __typename: "UnknownIdUserError"; id: string; code: string }
      | undefined
      | null;
    task?:
      | {
          __typename: "ReplayTask";
          id: string;
          createdAt: string;
          replayEntry: { id: string } | { id: string } | { id: string };
        }
      | undefined
      | null;
  };
};

export type SendReplayTaskMessageMutationVariables = Types.Exact<{
  task: Types.Scalars["ID"]["input"];
  input: Types.SendReplayTaskMessageInput;
}>;

export type SendReplayTaskMessageMutation = {
  sendReplayTaskMessage: {
    error?:
      | {
          __typename: "CloudUserError";
          code: string;
          cloudReason: Types.CloudErrorReason;
        }
      | { __typename: "OtherUserError"; code: string }
      | {
          __typename: "PermissionDeniedUserError";
          code: string;
          permissionReason: Types.PermissionDeniedErrorReason;
        }
      | { __typename: "UnknownIdUserError"; id: string; code: string }
      | undefined
      | null;
    message?:
      | {
          __typename: "StreamWsMessage";
          id: string;
          head: {
            id: string;
            alteration: Types.Alteration;
            createdAt: string;
            direction: Types.StreamMessageDirection;
            format: Types.StreamWsMessageFormat;
            length: number;
            raw: string;
          };
          edits: Array<{ id: string; alteration: Types.Alteration }>;
          stream: { id: string };
        }
      | undefined
      | null;
  };
};

export type SendReplayTaskMessageDraftMutationVariables = Types.Exact<{
  task: Types.Scalars["ID"]["input"];
}>;

export type SendReplayTaskMessageDraftMutation = {
  sendReplayTaskMessageDraft: {
    error?:
      | {
          __typename: "CloudUserError";
          code: string;
          cloudReason: Types.CloudErrorReason;
        }
      | { __typename: "OtherUserError"; code: string }
      | {
          __typename: "PermissionDeniedUserError";
          code: string;
          permissionReason: Types.PermissionDeniedErrorReason;
        }
      | { __typename: "UnknownIdUserError"; id: string; code: string }
      | undefined
      | null;
    message?:
      | {
          __typename: "StreamWsMessage";
          id: string;
          head: {
            id: string;
            alteration: Types.Alteration;
            createdAt: string;
            direction: Types.StreamMessageDirection;
            format: Types.StreamWsMessageFormat;
            length: number;
            raw: string;
          };
          edits: Array<{ id: string; alteration: Types.Alteration }>;
          stream: { id: string };
        }
      | undefined
      | null;
  };
};

export type StopReplayWsTasksMutationVariables = Types.Exact<{
  taskIds: Array<Types.Scalars["ID"]["input"]> | Types.Scalars["ID"]["input"];
}>;

export type StopReplayWsTasksMutation = {
  stopReplayWsTasks: {
    error?:
      | { __typename: "OtherUserError"; code: string }
      | { __typename: "UnknownIdUserError"; id: string; code: string }
      | undefined
      | null;
  };
};

export type UpdatedReplayEntryWsSubscriptionVariables = Types.Exact<{
  includeReplayRaw: Types.Scalars["Boolean"]["input"];
  includeRequestRaw: Types.Scalars["Boolean"]["input"];
  includeResponseRaw: Types.Scalars["Boolean"]["input"];
}>;

export type UpdatedReplayEntryWsSubscription = {
  updatedReplayEntryWs: {
    snapshot: number;
    entry?:
      | {
          __typename: "ReplayEntryWs";
          createdAt: string;
          error?: string | undefined | null;
          id: string;
          http: {
            __typename: "ReplayEntryHttp";
            createdAt: string;
            error?: string | undefined | null;
            id: string;
            raw?: string;
            connection: {
              __typename: "ConnectionInfo";
              host: string;
              port: number;
              isTLS: boolean;
              SNI?: string | undefined | null;
            };
            request?:
              | {
                  id: string;
                  host: string;
                  port: number;
                  method: string;
                  path: string;
                  query: string;
                  isTls: boolean;
                  createdAt: string;
                  raw?: string;
                  metadata: { id: string; color?: string | undefined | null };
                  response?:
                    | {
                        id: string;
                        statusCode: number;
                        roundtripTime: number;
                        length: number;
                        createdAt: string;
                        raw?: string;
                      }
                    | undefined
                    | null;
                }
              | undefined
              | null;
            session: { id: string } | { id: string } | { id: string };
            settings: {
              placeholders: Array<{
                __typename: "ReplayPlaceholder";
                inputRange: { start: number; end: number };
                outputRange: { start: number; end: number };
                preprocessors: Array<{
                  __typename: "ReplayPreprocessor";
                  options:
                    | {
                        __typename: "ReplayEnvironmentPreprocessor";
                        variableName: string;
                      }
                    | { __typename: "ReplayPrefixPreprocessor"; value: string }
                    | { __typename: "ReplaySuffixPreprocessor"; value: string }
                    | {
                        __typename: "ReplayUrlEncodePreprocessor";
                        charset?: string | undefined | null;
                        nonAscii: boolean;
                      }
                    | { __typename: "ReplayWorkflowPreprocessor"; id: string };
                }>;
              }>;
            };
          };
          session: { id: string } | { id: string } | { id: string };
          messages: Array<{
            __typename: "StreamWsMessage";
            id: string;
            head: {
              id: string;
              alteration: Types.Alteration;
              createdAt: string;
              direction: Types.StreamMessageDirection;
              format: Types.StreamWsMessageFormat;
              length: number;
              raw: string;
            };
            edits: Array<{ id: string; alteration: Types.Alteration }>;
            stream: { id: string };
          }>;
          stream?:
            | {
                __typename: "Stream";
                id: string;
                host: string;
                port: number;
                path: string;
                isTls: boolean;
                protocol: Types.StreamProtocol;
                direction: Types.StreamDirection;
                source: Types.Source;
                createdAt: string;
              }
            | undefined
            | null;
        }
      | undefined
      | null;
  };
};

export const ReplayPrefixPreprocessorFullFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayPrefixPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayPrefixPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "value" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReplayPrefixPreprocessorFullFragment, unknown>;
export const ReplaySuffixPreprocessorFullFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySuffixPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySuffixPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "value" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReplaySuffixPreprocessorFullFragment, unknown>;
export const ReplayUrlEncodePreprocessorFullFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayUrlEncodePreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayUrlEncodePreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "charset" } },
          { kind: "Field", name: { kind: "Name", value: "nonAscii" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReplayUrlEncodePreprocessorFullFragment, unknown>;
export const ReplayWorkflowPreprocessorFullFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayWorkflowPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayWorkflowPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReplayWorkflowPreprocessorFullFragment, unknown>;
export const ReplayEnvironmentPreprocessorFullFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayEnvironmentPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayEnvironmentPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "variableName" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ReplayEnvironmentPreprocessorFullFragment,
  unknown
>;
export const ReplayPreprocessorFullFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "options" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ReplayPrefixPreprocessor" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayPrefixPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ReplaySuffixPreprocessor" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplaySuffixPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: {
                      kind: "Name",
                      value: "ReplayUrlEncodePreprocessor",
                    },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayUrlEncodePreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ReplayWorkflowPreprocessor" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayWorkflowPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: {
                      kind: "Name",
                      value: "ReplayEnvironmentPreprocessor",
                    },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayEnvironmentPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayPrefixPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayPrefixPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "value" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySuffixPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySuffixPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "value" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayUrlEncodePreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayUrlEncodePreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "charset" } },
          { kind: "Field", name: { kind: "Name", value: "nonAscii" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayWorkflowPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayWorkflowPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayEnvironmentPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayEnvironmentPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "variableName" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReplayPreprocessorFullFragment, unknown>;
export const ReplayPlaceholderFullFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayPlaceholderFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayPlaceholder" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "inputRange" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "RangeFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "outputRange" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "RangeFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "preprocessors" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplayPreprocessorFull" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayPrefixPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayPrefixPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "value" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySuffixPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySuffixPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "value" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayUrlEncodePreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayUrlEncodePreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "charset" } },
          { kind: "Field", name: { kind: "Name", value: "nonAscii" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayWorkflowPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayWorkflowPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayEnvironmentPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayEnvironmentPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "variableName" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RangeFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Range" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "start" } },
          { kind: "Field", name: { kind: "Name", value: "end" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "options" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ReplayPrefixPreprocessor" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayPrefixPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ReplaySuffixPreprocessor" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplaySuffixPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: {
                      kind: "Name",
                      value: "ReplayUrlEncodePreprocessor",
                    },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayUrlEncodePreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ReplayWorkflowPreprocessor" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayWorkflowPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: {
                      kind: "Name",
                      value: "ReplayEnvironmentPreprocessor",
                    },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayEnvironmentPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReplayPlaceholderFullFragment, unknown>;
export const ReplayEntryHttpFullFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayEntryHttpFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayEntryHttp" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "connection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ConnectionInfoFull" },
                },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "error" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "raw" },
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "include" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "if" },
                    value: {
                      kind: "Variable",
                      name: { kind: "Name", value: "includeReplayRaw" },
                    },
                  },
                ],
              },
            ],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "request" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "RequestFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "session" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "settings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "placeholders" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "ReplayPlaceholderFull" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ResponseFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Response" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "statusCode" } },
          { kind: "Field", name: { kind: "Name", value: "roundtripTime" } },
          { kind: "Field", name: { kind: "Name", value: "length" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "raw" },
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "include" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "if" },
                    value: {
                      kind: "Variable",
                      name: { kind: "Name", value: "includeResponseRaw" },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RangeFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Range" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "start" } },
          { kind: "Field", name: { kind: "Name", value: "end" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayPrefixPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayPrefixPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "value" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySuffixPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySuffixPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "value" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayUrlEncodePreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayUrlEncodePreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "charset" } },
          { kind: "Field", name: { kind: "Name", value: "nonAscii" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayWorkflowPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayWorkflowPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayEnvironmentPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayEnvironmentPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "variableName" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "options" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ReplayPrefixPreprocessor" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayPrefixPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ReplaySuffixPreprocessor" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplaySuffixPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: {
                      kind: "Name",
                      value: "ReplayUrlEncodePreprocessor",
                    },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayUrlEncodePreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ReplayWorkflowPreprocessor" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayWorkflowPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: {
                      kind: "Name",
                      value: "ReplayEnvironmentPreprocessor",
                    },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayEnvironmentPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ConnectionInfoFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ConnectionInfo" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "host" } },
          { kind: "Field", name: { kind: "Name", value: "port" } },
          { kind: "Field", name: { kind: "Name", value: "isTLS" } },
          { kind: "Field", name: { kind: "Name", value: "SNI" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RequestFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Request" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "host" } },
          { kind: "Field", name: { kind: "Name", value: "port" } },
          { kind: "Field", name: { kind: "Name", value: "method" } },
          { kind: "Field", name: { kind: "Name", value: "path" } },
          { kind: "Field", name: { kind: "Name", value: "query" } },
          { kind: "Field", name: { kind: "Name", value: "isTls" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "metadata" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "color" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "raw" },
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "include" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "if" },
                    value: {
                      kind: "Variable",
                      name: { kind: "Name", value: "includeRequestRaw" },
                    },
                  },
                ],
              },
            ],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "response" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ResponseFull" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayPlaceholderFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayPlaceholder" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "inputRange" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "RangeFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "outputRange" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "RangeFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "preprocessors" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplayPreprocessorFull" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReplayEntryHttpFullFragment, unknown>;
export const StreamWsMessageFullFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "StreamWsMessageFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "StreamWsMessage" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "head" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "alteration" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "direction" } },
                { kind: "Field", name: { kind: "Name", value: "format" } },
                { kind: "Field", name: { kind: "Name", value: "length" } },
                { kind: "Field", name: { kind: "Name", value: "raw" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "edits" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "alteration" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "stream" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<StreamWsMessageFullFragment, unknown>;
export const StreamFullFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "StreamFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Stream" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "host" } },
          { kind: "Field", name: { kind: "Name", value: "port" } },
          { kind: "Field", name: { kind: "Name", value: "path" } },
          { kind: "Field", name: { kind: "Name", value: "isTls" } },
          { kind: "Field", name: { kind: "Name", value: "protocol" } },
          { kind: "Field", name: { kind: "Name", value: "direction" } },
          { kind: "Field", name: { kind: "Name", value: "source" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<StreamFullFragment, unknown>;
export const ReplayEntryWsFullFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayEntryWsFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayEntryWs" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "error" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "http" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplayEntryHttpFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "session" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "messages" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "StreamWsMessageFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "stream" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "StreamFull" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ConnectionInfoFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ConnectionInfo" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "host" } },
          { kind: "Field", name: { kind: "Name", value: "port" } },
          { kind: "Field", name: { kind: "Name", value: "isTLS" } },
          { kind: "Field", name: { kind: "Name", value: "SNI" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ResponseFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Response" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "statusCode" } },
          { kind: "Field", name: { kind: "Name", value: "roundtripTime" } },
          { kind: "Field", name: { kind: "Name", value: "length" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "raw" },
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "include" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "if" },
                    value: {
                      kind: "Variable",
                      name: { kind: "Name", value: "includeResponseRaw" },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RequestFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Request" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "host" } },
          { kind: "Field", name: { kind: "Name", value: "port" } },
          { kind: "Field", name: { kind: "Name", value: "method" } },
          { kind: "Field", name: { kind: "Name", value: "path" } },
          { kind: "Field", name: { kind: "Name", value: "query" } },
          { kind: "Field", name: { kind: "Name", value: "isTls" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "metadata" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "color" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "raw" },
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "include" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "if" },
                    value: {
                      kind: "Variable",
                      name: { kind: "Name", value: "includeRequestRaw" },
                    },
                  },
                ],
              },
            ],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "response" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ResponseFull" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RangeFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Range" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "start" } },
          { kind: "Field", name: { kind: "Name", value: "end" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayPrefixPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayPrefixPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "value" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySuffixPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySuffixPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "value" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayUrlEncodePreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayUrlEncodePreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "charset" } },
          { kind: "Field", name: { kind: "Name", value: "nonAscii" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayWorkflowPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayWorkflowPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayEnvironmentPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayEnvironmentPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "variableName" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "options" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ReplayPrefixPreprocessor" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayPrefixPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ReplaySuffixPreprocessor" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplaySuffixPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: {
                      kind: "Name",
                      value: "ReplayUrlEncodePreprocessor",
                    },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayUrlEncodePreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ReplayWorkflowPreprocessor" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayWorkflowPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: {
                      kind: "Name",
                      value: "ReplayEnvironmentPreprocessor",
                    },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayEnvironmentPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayPlaceholderFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayPlaceholder" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "inputRange" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "RangeFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "outputRange" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "RangeFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "preprocessors" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplayPreprocessorFull" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayEntryHttpFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayEntryHttp" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "connection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ConnectionInfoFull" },
                },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "error" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "raw" },
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "include" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "if" },
                    value: {
                      kind: "Variable",
                      name: { kind: "Name", value: "includeReplayRaw" },
                    },
                  },
                ],
              },
            ],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "request" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "RequestFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "session" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "settings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "placeholders" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "ReplayPlaceholderFull" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "StreamWsMessageFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "StreamWsMessage" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "head" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "alteration" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "direction" } },
                { kind: "Field", name: { kind: "Name", value: "format" } },
                { kind: "Field", name: { kind: "Name", value: "length" } },
                { kind: "Field", name: { kind: "Name", value: "raw" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "edits" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "alteration" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "stream" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "StreamFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Stream" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "host" } },
          { kind: "Field", name: { kind: "Name", value: "port" } },
          { kind: "Field", name: { kind: "Name", value: "path" } },
          { kind: "Field", name: { kind: "Name", value: "isTls" } },
          { kind: "Field", name: { kind: "Name", value: "protocol" } },
          { kind: "Field", name: { kind: "Name", value: "direction" } },
          { kind: "Field", name: { kind: "Name", value: "source" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReplayEntryWsFullFragment, unknown>;
export const PipelineStrategyFullFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PipelineStrategyFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "PipelineStrategy" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "PipelineStrategySequential" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "abortOnFailure" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "PipelineStrategyLastByteSynchronization",
              },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "failureBehavior" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "PipelineStrategySinglePacketAttack",
              },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "convertToHttp2" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "failureBehavior" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PipelineStrategyFullFragment, unknown>;
export const ReplayEntryHttpOnePipelineFullFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayEntryHttpOnePipelineFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayEntryHttpOnePipeline" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "error" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "session" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "settings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "strategy" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PipelineStrategyFull" },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "activeHttpEntry" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplayEntryHttpFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "httpEntries" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplayEntryHttpFull" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ConnectionInfoFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ConnectionInfo" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "host" } },
          { kind: "Field", name: { kind: "Name", value: "port" } },
          { kind: "Field", name: { kind: "Name", value: "isTLS" } },
          { kind: "Field", name: { kind: "Name", value: "SNI" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ResponseFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Response" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "statusCode" } },
          { kind: "Field", name: { kind: "Name", value: "roundtripTime" } },
          { kind: "Field", name: { kind: "Name", value: "length" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "raw" },
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "include" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "if" },
                    value: {
                      kind: "Variable",
                      name: { kind: "Name", value: "includeResponseRaw" },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RequestFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Request" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "host" } },
          { kind: "Field", name: { kind: "Name", value: "port" } },
          { kind: "Field", name: { kind: "Name", value: "method" } },
          { kind: "Field", name: { kind: "Name", value: "path" } },
          { kind: "Field", name: { kind: "Name", value: "query" } },
          { kind: "Field", name: { kind: "Name", value: "isTls" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "metadata" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "color" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "raw" },
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "include" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "if" },
                    value: {
                      kind: "Variable",
                      name: { kind: "Name", value: "includeRequestRaw" },
                    },
                  },
                ],
              },
            ],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "response" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ResponseFull" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RangeFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Range" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "start" } },
          { kind: "Field", name: { kind: "Name", value: "end" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayPrefixPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayPrefixPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "value" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySuffixPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySuffixPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "value" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayUrlEncodePreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayUrlEncodePreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "charset" } },
          { kind: "Field", name: { kind: "Name", value: "nonAscii" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayWorkflowPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayWorkflowPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayEnvironmentPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayEnvironmentPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "variableName" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "options" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ReplayPrefixPreprocessor" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayPrefixPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ReplaySuffixPreprocessor" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplaySuffixPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: {
                      kind: "Name",
                      value: "ReplayUrlEncodePreprocessor",
                    },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayUrlEncodePreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ReplayWorkflowPreprocessor" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayWorkflowPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: {
                      kind: "Name",
                      value: "ReplayEnvironmentPreprocessor",
                    },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayEnvironmentPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayPlaceholderFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayPlaceholder" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "inputRange" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "RangeFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "outputRange" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "RangeFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "preprocessors" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplayPreprocessorFull" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PipelineStrategyFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "PipelineStrategy" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "PipelineStrategySequential" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "abortOnFailure" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "PipelineStrategyLastByteSynchronization",
              },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "failureBehavior" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "PipelineStrategySinglePacketAttack",
              },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "convertToHttp2" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "failureBehavior" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayEntryHttpFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayEntryHttp" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "connection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ConnectionInfoFull" },
                },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "error" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "raw" },
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "include" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "if" },
                    value: {
                      kind: "Variable",
                      name: { kind: "Name", value: "includeReplayRaw" },
                    },
                  },
                ],
              },
            ],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "request" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "RequestFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "session" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "settings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "placeholders" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "ReplayPlaceholderFull" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReplayEntryHttpOnePipelineFullFragment, unknown>;
export const ReplayEntryFullFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayEntryFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayEntry" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "error" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "session" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "ReplayEntryHttp" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplayEntryHttpFull" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "ReplayEntryWs" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplayEntryWsFull" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "ReplayEntryHttpOnePipeline" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: {
                    kind: "Name",
                    value: "ReplayEntryHttpOnePipelineFull",
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ConnectionInfoFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ConnectionInfo" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "host" } },
          { kind: "Field", name: { kind: "Name", value: "port" } },
          { kind: "Field", name: { kind: "Name", value: "isTLS" } },
          { kind: "Field", name: { kind: "Name", value: "SNI" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ResponseFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Response" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "statusCode" } },
          { kind: "Field", name: { kind: "Name", value: "roundtripTime" } },
          { kind: "Field", name: { kind: "Name", value: "length" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "raw" },
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "include" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "if" },
                    value: {
                      kind: "Variable",
                      name: { kind: "Name", value: "includeResponseRaw" },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RequestFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Request" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "host" } },
          { kind: "Field", name: { kind: "Name", value: "port" } },
          { kind: "Field", name: { kind: "Name", value: "method" } },
          { kind: "Field", name: { kind: "Name", value: "path" } },
          { kind: "Field", name: { kind: "Name", value: "query" } },
          { kind: "Field", name: { kind: "Name", value: "isTls" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "metadata" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "color" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "raw" },
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "include" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "if" },
                    value: {
                      kind: "Variable",
                      name: { kind: "Name", value: "includeRequestRaw" },
                    },
                  },
                ],
              },
            ],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "response" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ResponseFull" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RangeFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Range" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "start" } },
          { kind: "Field", name: { kind: "Name", value: "end" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayPrefixPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayPrefixPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "value" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySuffixPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySuffixPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "value" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayUrlEncodePreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayUrlEncodePreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "charset" } },
          { kind: "Field", name: { kind: "Name", value: "nonAscii" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayWorkflowPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayWorkflowPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayEnvironmentPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayEnvironmentPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "variableName" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "options" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ReplayPrefixPreprocessor" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayPrefixPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ReplaySuffixPreprocessor" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplaySuffixPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: {
                      kind: "Name",
                      value: "ReplayUrlEncodePreprocessor",
                    },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayUrlEncodePreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ReplayWorkflowPreprocessor" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayWorkflowPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: {
                      kind: "Name",
                      value: "ReplayEnvironmentPreprocessor",
                    },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayEnvironmentPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayPlaceholderFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayPlaceholder" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "inputRange" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "RangeFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "outputRange" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "RangeFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "preprocessors" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplayPreprocessorFull" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayEntryHttpFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayEntryHttp" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "connection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ConnectionInfoFull" },
                },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "error" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "raw" },
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "include" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "if" },
                    value: {
                      kind: "Variable",
                      name: { kind: "Name", value: "includeReplayRaw" },
                    },
                  },
                ],
              },
            ],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "request" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "RequestFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "session" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "settings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "placeholders" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "ReplayPlaceholderFull" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "StreamWsMessageFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "StreamWsMessage" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "head" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "alteration" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "direction" } },
                { kind: "Field", name: { kind: "Name", value: "format" } },
                { kind: "Field", name: { kind: "Name", value: "length" } },
                { kind: "Field", name: { kind: "Name", value: "raw" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "edits" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "alteration" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "stream" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "StreamFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Stream" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "host" } },
          { kind: "Field", name: { kind: "Name", value: "port" } },
          { kind: "Field", name: { kind: "Name", value: "path" } },
          { kind: "Field", name: { kind: "Name", value: "isTls" } },
          { kind: "Field", name: { kind: "Name", value: "protocol" } },
          { kind: "Field", name: { kind: "Name", value: "direction" } },
          { kind: "Field", name: { kind: "Name", value: "source" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PipelineStrategyFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "PipelineStrategy" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "PipelineStrategySequential" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "abortOnFailure" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "PipelineStrategyLastByteSynchronization",
              },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "failureBehavior" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "PipelineStrategySinglePacketAttack",
              },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "convertToHttp2" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "failureBehavior" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayEntryWsFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayEntryWs" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "error" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "http" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplayEntryHttpFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "session" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "messages" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "StreamWsMessageFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "stream" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "StreamFull" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayEntryHttpOnePipelineFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayEntryHttpOnePipeline" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "error" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "session" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "settings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "strategy" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PipelineStrategyFull" },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "activeHttpEntry" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplayEntryHttpFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "httpEntries" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplayEntryHttpFull" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReplayEntryFullFragment, unknown>;
export const ReplaySessionHttpMetaFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionHttpMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySessionHttp" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "collection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "activeEntry" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "entries" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "last" },
                value: { kind: "IntValue", value: "1" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "settings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "connectionClose" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "updateContentLength" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReplaySessionHttpMetaFragment, unknown>;
export const ReplaySessionWsMetaFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionWsMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySessionWs" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "collection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "activeEntry" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "entries" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "last" },
                value: { kind: "IntValue", value: "1" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReplaySessionWsMetaFragment, unknown>;
export const ReplaySessionHttpOnePipelineMetaFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionHttpOnePipelineMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySessionHttpOnePipeline" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "collection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "activeEntry" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "entries" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "last" },
                value: { kind: "IntValue", value: "1" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "settings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "strategy" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PipelineStrategyFull" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PipelineStrategyFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "PipelineStrategy" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "PipelineStrategySequential" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "abortOnFailure" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "PipelineStrategyLastByteSynchronization",
              },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "failureBehavior" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "PipelineStrategySinglePacketAttack",
              },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "convertToHttp2" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "failureBehavior" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReplaySessionHttpOnePipelineMetaFragment, unknown>;
export const ReplaySessionMetaFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySession" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "ReplaySessionHttp" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplaySessionHttpMeta" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "ReplaySessionWs" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplaySessionWsMeta" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "ReplaySessionHttpOnePipeline" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: {
                    kind: "Name",
                    value: "ReplaySessionHttpOnePipelineMeta",
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PipelineStrategyFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "PipelineStrategy" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "PipelineStrategySequential" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "abortOnFailure" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "PipelineStrategyLastByteSynchronization",
              },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "failureBehavior" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "PipelineStrategySinglePacketAttack",
              },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "convertToHttp2" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "failureBehavior" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionHttpMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySessionHttp" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "collection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "activeEntry" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "entries" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "last" },
                value: { kind: "IntValue", value: "1" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "settings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "connectionClose" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "updateContentLength" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionWsMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySessionWs" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "collection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "activeEntry" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "entries" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "last" },
                value: { kind: "IntValue", value: "1" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionHttpOnePipelineMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySessionHttpOnePipeline" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "collection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "activeEntry" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "entries" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "last" },
                value: { kind: "IntValue", value: "1" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "settings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "strategy" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PipelineStrategyFull" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReplaySessionMetaFragment, unknown>;
export const ReplaySessionCollectionMetaFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionCollectionMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySessionCollection" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReplaySessionCollectionMetaFragment, unknown>;
export const ReplayEntryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ReplayEntry" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "sessionKind" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ReplaySessionKind" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "includeReplayRaw" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "includeRequestRaw" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "includeResponseRaw" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "replayEntry" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "sessionKind" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "sessionKind" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplayEntryFull" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ConnectionInfoFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ConnectionInfo" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "host" } },
          { kind: "Field", name: { kind: "Name", value: "port" } },
          { kind: "Field", name: { kind: "Name", value: "isTLS" } },
          { kind: "Field", name: { kind: "Name", value: "SNI" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ResponseFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Response" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "statusCode" } },
          { kind: "Field", name: { kind: "Name", value: "roundtripTime" } },
          { kind: "Field", name: { kind: "Name", value: "length" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "raw" },
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "include" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "if" },
                    value: {
                      kind: "Variable",
                      name: { kind: "Name", value: "includeResponseRaw" },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RequestFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Request" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "host" } },
          { kind: "Field", name: { kind: "Name", value: "port" } },
          { kind: "Field", name: { kind: "Name", value: "method" } },
          { kind: "Field", name: { kind: "Name", value: "path" } },
          { kind: "Field", name: { kind: "Name", value: "query" } },
          { kind: "Field", name: { kind: "Name", value: "isTls" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "metadata" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "color" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "raw" },
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "include" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "if" },
                    value: {
                      kind: "Variable",
                      name: { kind: "Name", value: "includeRequestRaw" },
                    },
                  },
                ],
              },
            ],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "response" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ResponseFull" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RangeFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Range" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "start" } },
          { kind: "Field", name: { kind: "Name", value: "end" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayPrefixPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayPrefixPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "value" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySuffixPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySuffixPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "value" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayUrlEncodePreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayUrlEncodePreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "charset" } },
          { kind: "Field", name: { kind: "Name", value: "nonAscii" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayWorkflowPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayWorkflowPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayEnvironmentPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayEnvironmentPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "variableName" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "options" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ReplayPrefixPreprocessor" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayPrefixPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ReplaySuffixPreprocessor" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplaySuffixPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: {
                      kind: "Name",
                      value: "ReplayUrlEncodePreprocessor",
                    },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayUrlEncodePreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ReplayWorkflowPreprocessor" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayWorkflowPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: {
                      kind: "Name",
                      value: "ReplayEnvironmentPreprocessor",
                    },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayEnvironmentPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayPlaceholderFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayPlaceholder" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "inputRange" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "RangeFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "outputRange" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "RangeFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "preprocessors" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplayPreprocessorFull" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayEntryHttpFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayEntryHttp" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "connection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ConnectionInfoFull" },
                },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "error" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "raw" },
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "include" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "if" },
                    value: {
                      kind: "Variable",
                      name: { kind: "Name", value: "includeReplayRaw" },
                    },
                  },
                ],
              },
            ],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "request" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "RequestFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "session" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "settings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "placeholders" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "ReplayPlaceholderFull" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "StreamWsMessageFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "StreamWsMessage" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "head" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "alteration" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "direction" } },
                { kind: "Field", name: { kind: "Name", value: "format" } },
                { kind: "Field", name: { kind: "Name", value: "length" } },
                { kind: "Field", name: { kind: "Name", value: "raw" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "edits" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "alteration" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "stream" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "StreamFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Stream" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "host" } },
          { kind: "Field", name: { kind: "Name", value: "port" } },
          { kind: "Field", name: { kind: "Name", value: "path" } },
          { kind: "Field", name: { kind: "Name", value: "isTls" } },
          { kind: "Field", name: { kind: "Name", value: "protocol" } },
          { kind: "Field", name: { kind: "Name", value: "direction" } },
          { kind: "Field", name: { kind: "Name", value: "source" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayEntryWsFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayEntryWs" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "error" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "http" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplayEntryHttpFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "session" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "messages" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "StreamWsMessageFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "stream" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "StreamFull" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PipelineStrategyFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "PipelineStrategy" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "PipelineStrategySequential" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "abortOnFailure" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "PipelineStrategyLastByteSynchronization",
              },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "failureBehavior" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "PipelineStrategySinglePacketAttack",
              },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "convertToHttp2" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "failureBehavior" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayEntryHttpOnePipelineFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayEntryHttpOnePipeline" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "error" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "session" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "settings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "strategy" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PipelineStrategyFull" },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "activeHttpEntry" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplayEntryHttpFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "httpEntries" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplayEntryHttpFull" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayEntryFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayEntry" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "error" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "session" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "ReplayEntryHttp" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplayEntryHttpFull" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "ReplayEntryWs" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplayEntryWsFull" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "ReplayEntryHttpOnePipeline" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: {
                    kind: "Name",
                    value: "ReplayEntryHttpOnePipelineFull",
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReplayEntryQuery, ReplayEntryQueryVariables>;
export const ReplaySessionsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ReplaySessions" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "first" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "after" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "last" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "before" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "replaySessions" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "first" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "after" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "last" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "last" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "before" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "before" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "cursor" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: {
                                kind: "Name",
                                value: "ReplaySessionMeta",
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "hasNextPage" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "hasPreviousPage" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "startCursor" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "endCursor" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionHttpMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySessionHttp" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "collection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "activeEntry" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "entries" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "last" },
                value: { kind: "IntValue", value: "1" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "settings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "connectionClose" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "updateContentLength" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionWsMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySessionWs" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "collection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "activeEntry" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "entries" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "last" },
                value: { kind: "IntValue", value: "1" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PipelineStrategyFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "PipelineStrategy" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "PipelineStrategySequential" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "abortOnFailure" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "PipelineStrategyLastByteSynchronization",
              },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "failureBehavior" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "PipelineStrategySinglePacketAttack",
              },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "convertToHttp2" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "failureBehavior" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionHttpOnePipelineMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySessionHttpOnePipeline" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "collection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "activeEntry" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "entries" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "last" },
                value: { kind: "IntValue", value: "1" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "settings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "strategy" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PipelineStrategyFull" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySession" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "ReplaySessionHttp" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplaySessionHttpMeta" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "ReplaySessionWs" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplaySessionWsMeta" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "ReplaySessionHttpOnePipeline" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: {
                    kind: "Name",
                    value: "ReplaySessionHttpOnePipelineMeta",
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReplaySessionsQuery, ReplaySessionsQueryVariables>;
export const ReplaySessionEntriesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ReplaySessionEntries" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "after" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "before" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "first" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "last" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "includeReplayRaw" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "includeRequestRaw" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "includeResponseRaw" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "replaySession" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ReplaySessionHttp" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "entries" },
                        arguments: [
                          {
                            kind: "Argument",
                            name: { kind: "Name", value: "after" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "after" },
                            },
                          },
                          {
                            kind: "Argument",
                            name: { kind: "Name", value: "before" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "before" },
                            },
                          },
                          {
                            kind: "Argument",
                            name: { kind: "Name", value: "first" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "first" },
                            },
                          },
                          {
                            kind: "Argument",
                            name: { kind: "Name", value: "last" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "last" },
                            },
                          },
                        ],
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "edges" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "cursor" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "node" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "FragmentSpread",
                                          name: {
                                            kind: "Name",
                                            value: "ReplayEntryFull",
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "pageInfo" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "hasNextPage",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "hasPreviousPage",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "startCursor",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "endCursor" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ReplaySessionWs" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "entries" },
                        arguments: [
                          {
                            kind: "Argument",
                            name: { kind: "Name", value: "after" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "after" },
                            },
                          },
                          {
                            kind: "Argument",
                            name: { kind: "Name", value: "before" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "before" },
                            },
                          },
                          {
                            kind: "Argument",
                            name: { kind: "Name", value: "first" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "first" },
                            },
                          },
                          {
                            kind: "Argument",
                            name: { kind: "Name", value: "last" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "last" },
                            },
                          },
                        ],
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "edges" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "cursor" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "node" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "FragmentSpread",
                                          name: {
                                            kind: "Name",
                                            value: "ReplayEntryFull",
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "pageInfo" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "hasNextPage",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "hasPreviousPage",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "startCursor",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "endCursor" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: {
                      kind: "Name",
                      value: "ReplaySessionHttpOnePipeline",
                    },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "entries" },
                        arguments: [
                          {
                            kind: "Argument",
                            name: { kind: "Name", value: "after" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "after" },
                            },
                          },
                          {
                            kind: "Argument",
                            name: { kind: "Name", value: "before" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "before" },
                            },
                          },
                          {
                            kind: "Argument",
                            name: { kind: "Name", value: "first" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "first" },
                            },
                          },
                          {
                            kind: "Argument",
                            name: { kind: "Name", value: "last" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "last" },
                            },
                          },
                        ],
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "edges" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "cursor" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "node" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "FragmentSpread",
                                          name: {
                                            kind: "Name",
                                            value: "ReplayEntryFull",
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "pageInfo" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "hasNextPage",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "hasPreviousPage",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "startCursor",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "endCursor" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ConnectionInfoFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ConnectionInfo" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "host" } },
          { kind: "Field", name: { kind: "Name", value: "port" } },
          { kind: "Field", name: { kind: "Name", value: "isTLS" } },
          { kind: "Field", name: { kind: "Name", value: "SNI" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ResponseFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Response" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "statusCode" } },
          { kind: "Field", name: { kind: "Name", value: "roundtripTime" } },
          { kind: "Field", name: { kind: "Name", value: "length" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "raw" },
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "include" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "if" },
                    value: {
                      kind: "Variable",
                      name: { kind: "Name", value: "includeResponseRaw" },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RequestFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Request" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "host" } },
          { kind: "Field", name: { kind: "Name", value: "port" } },
          { kind: "Field", name: { kind: "Name", value: "method" } },
          { kind: "Field", name: { kind: "Name", value: "path" } },
          { kind: "Field", name: { kind: "Name", value: "query" } },
          { kind: "Field", name: { kind: "Name", value: "isTls" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "metadata" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "color" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "raw" },
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "include" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "if" },
                    value: {
                      kind: "Variable",
                      name: { kind: "Name", value: "includeRequestRaw" },
                    },
                  },
                ],
              },
            ],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "response" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ResponseFull" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RangeFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Range" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "start" } },
          { kind: "Field", name: { kind: "Name", value: "end" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayPrefixPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayPrefixPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "value" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySuffixPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySuffixPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "value" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayUrlEncodePreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayUrlEncodePreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "charset" } },
          { kind: "Field", name: { kind: "Name", value: "nonAscii" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayWorkflowPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayWorkflowPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayEnvironmentPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayEnvironmentPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "variableName" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "options" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ReplayPrefixPreprocessor" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayPrefixPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ReplaySuffixPreprocessor" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplaySuffixPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: {
                      kind: "Name",
                      value: "ReplayUrlEncodePreprocessor",
                    },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayUrlEncodePreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ReplayWorkflowPreprocessor" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayWorkflowPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: {
                      kind: "Name",
                      value: "ReplayEnvironmentPreprocessor",
                    },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayEnvironmentPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayPlaceholderFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayPlaceholder" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "inputRange" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "RangeFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "outputRange" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "RangeFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "preprocessors" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplayPreprocessorFull" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayEntryHttpFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayEntryHttp" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "connection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ConnectionInfoFull" },
                },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "error" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "raw" },
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "include" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "if" },
                    value: {
                      kind: "Variable",
                      name: { kind: "Name", value: "includeReplayRaw" },
                    },
                  },
                ],
              },
            ],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "request" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "RequestFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "session" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "settings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "placeholders" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "ReplayPlaceholderFull" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "StreamWsMessageFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "StreamWsMessage" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "head" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "alteration" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "direction" } },
                { kind: "Field", name: { kind: "Name", value: "format" } },
                { kind: "Field", name: { kind: "Name", value: "length" } },
                { kind: "Field", name: { kind: "Name", value: "raw" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "edits" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "alteration" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "stream" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "StreamFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Stream" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "host" } },
          { kind: "Field", name: { kind: "Name", value: "port" } },
          { kind: "Field", name: { kind: "Name", value: "path" } },
          { kind: "Field", name: { kind: "Name", value: "isTls" } },
          { kind: "Field", name: { kind: "Name", value: "protocol" } },
          { kind: "Field", name: { kind: "Name", value: "direction" } },
          { kind: "Field", name: { kind: "Name", value: "source" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayEntryWsFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayEntryWs" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "error" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "http" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplayEntryHttpFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "session" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "messages" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "StreamWsMessageFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "stream" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "StreamFull" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PipelineStrategyFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "PipelineStrategy" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "PipelineStrategySequential" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "abortOnFailure" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "PipelineStrategyLastByteSynchronization",
              },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "failureBehavior" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "PipelineStrategySinglePacketAttack",
              },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "convertToHttp2" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "failureBehavior" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayEntryHttpOnePipelineFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayEntryHttpOnePipeline" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "error" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "session" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "settings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "strategy" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PipelineStrategyFull" },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "activeHttpEntry" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplayEntryHttpFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "httpEntries" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplayEntryHttpFull" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayEntryFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayEntry" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "error" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "session" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "ReplayEntryHttp" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplayEntryHttpFull" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "ReplayEntryWs" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplayEntryWsFull" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "ReplayEntryHttpOnePipeline" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: {
                    kind: "Name",
                    value: "ReplayEntryHttpOnePipelineFull",
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ReplaySessionEntriesQuery,
  ReplaySessionEntriesQueryVariables
>;
export const ReplaySessionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ReplaySession" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "replaySession" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplaySessionMeta" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionHttpMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySessionHttp" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "collection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "activeEntry" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "entries" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "last" },
                value: { kind: "IntValue", value: "1" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "settings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "connectionClose" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "updateContentLength" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionWsMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySessionWs" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "collection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "activeEntry" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "entries" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "last" },
                value: { kind: "IntValue", value: "1" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PipelineStrategyFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "PipelineStrategy" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "PipelineStrategySequential" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "abortOnFailure" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "PipelineStrategyLastByteSynchronization",
              },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "failureBehavior" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "PipelineStrategySinglePacketAttack",
              },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "convertToHttp2" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "failureBehavior" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionHttpOnePipelineMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySessionHttpOnePipeline" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "collection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "activeEntry" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "entries" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "last" },
                value: { kind: "IntValue", value: "1" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "settings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "strategy" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PipelineStrategyFull" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySession" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "ReplaySessionHttp" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplaySessionHttpMeta" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "ReplaySessionWs" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplaySessionWsMeta" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "ReplaySessionHttpOnePipeline" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: {
                    kind: "Name",
                    value: "ReplaySessionHttpOnePipelineMeta",
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ReplaySessionQuery, ReplaySessionQueryVariables>;
export const ReplaySessionCollectionsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ReplaySessionCollections" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "first" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "after" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "last" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "before" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "replaySessionCollections" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "first" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "after" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "last" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "last" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "before" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "before" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "cursor" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: {
                                kind: "Name",
                                value: "ReplaySessionCollectionMeta",
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "hasNextPage" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "hasPreviousPage" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "startCursor" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "endCursor" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionCollectionMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySessionCollection" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ReplaySessionCollectionsQuery,
  ReplaySessionCollectionsQueryVariables
>;
export const CreateReplaySessionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateReplaySession" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateReplaySessionInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createReplaySession" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "error" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "PermissionDeniedUserError",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: {
                                kind: "Name",
                                value: "PermissionDeniedUserErrorFull",
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "CloudUserError" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: {
                                kind: "Name",
                                value: "CloudUserErrorFull",
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "OtherUserError" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: {
                                kind: "Name",
                                value: "OtherUserErrorFull",
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "session" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "ReplaySessionMeta" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "UserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "code" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionHttpMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySessionHttp" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "collection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "activeEntry" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "entries" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "last" },
                value: { kind: "IntValue", value: "1" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "settings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "connectionClose" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "updateContentLength" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionWsMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySessionWs" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "collection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "activeEntry" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "entries" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "last" },
                value: { kind: "IntValue", value: "1" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PipelineStrategyFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "PipelineStrategy" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "PipelineStrategySequential" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "abortOnFailure" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "PipelineStrategyLastByteSynchronization",
              },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "failureBehavior" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "PipelineStrategySinglePacketAttack",
              },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "convertToHttp2" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "failureBehavior" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionHttpOnePipelineMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySessionHttpOnePipeline" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "collection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "activeEntry" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "entries" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "last" },
                value: { kind: "IntValue", value: "1" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "settings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "strategy" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PipelineStrategyFull" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PermissionDeniedUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "PermissionDeniedUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "permissionReason" },
            name: { kind: "Name", value: "reason" },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CloudUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "CloudUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "cloudReason" },
            name: { kind: "Name", value: "reason" },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "OtherUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "OtherUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySession" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "ReplaySessionHttp" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplaySessionHttpMeta" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "ReplaySessionWs" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplaySessionWsMeta" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "ReplaySessionHttpOnePipeline" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: {
                    kind: "Name",
                    value: "ReplaySessionHttpOnePipelineMeta",
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateReplaySessionMutation,
  CreateReplaySessionMutationVariables
>;
export const CreateReplayPipelineHttpOneSessionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateReplayPipelineHttpOneSession" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateReplayPipelineSessionInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createReplayPipelineHttpOneSession" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "error" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "PermissionDeniedUserError",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: {
                                kind: "Name",
                                value: "PermissionDeniedUserErrorFull",
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "CloudUserError" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: {
                                kind: "Name",
                                value: "CloudUserErrorFull",
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "OtherUserError" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: {
                                kind: "Name",
                                value: "OtherUserErrorFull",
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "session" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplaySessionHttpOnePipelineMeta",
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "UserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "code" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PipelineStrategyFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "PipelineStrategy" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "PipelineStrategySequential" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "abortOnFailure" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "PipelineStrategyLastByteSynchronization",
              },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "failureBehavior" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "PipelineStrategySinglePacketAttack",
              },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "convertToHttp2" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "failureBehavior" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PermissionDeniedUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "PermissionDeniedUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "permissionReason" },
            name: { kind: "Name", value: "reason" },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CloudUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "CloudUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "cloudReason" },
            name: { kind: "Name", value: "reason" },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "OtherUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "OtherUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionHttpOnePipelineMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySessionHttpOnePipeline" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "collection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "activeEntry" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "entries" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "last" },
                value: { kind: "IntValue", value: "1" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "settings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "strategy" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PipelineStrategyFull" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateReplayPipelineHttpOneSessionMutation,
  CreateReplayPipelineHttpOneSessionMutationVariables
>;
export const CreateReplaySessionCollectionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateReplaySessionCollection" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "CreateReplaySessionCollectionInput",
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createReplaySessionCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "collection" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplaySessionCollectionMeta",
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionCollectionMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySessionCollection" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateReplaySessionCollectionMutation,
  CreateReplaySessionCollectionMutationVariables
>;
export const DeleteReplaySessionsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteReplaySessions" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "ID" },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteReplaySessions" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "ids" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ids" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "deletedIds" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteReplaySessionsMutation,
  DeleteReplaySessionsMutationVariables
>;
export const DeleteReplaySessionCollectionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteReplaySessionCollection" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteReplaySessionCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "deletedId" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteReplaySessionCollectionMutation,
  DeleteReplaySessionCollectionMutationVariables
>;
export const MoveReplaySessionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "MoveReplaySession" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "collectionId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "moveReplaySession" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "collectionId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "collectionId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "session" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "ReplaySessionMeta" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionHttpMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySessionHttp" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "collection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "activeEntry" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "entries" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "last" },
                value: { kind: "IntValue", value: "1" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "settings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "connectionClose" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "updateContentLength" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionWsMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySessionWs" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "collection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "activeEntry" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "entries" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "last" },
                value: { kind: "IntValue", value: "1" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PipelineStrategyFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "PipelineStrategy" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "PipelineStrategySequential" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "abortOnFailure" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "PipelineStrategyLastByteSynchronization",
              },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "failureBehavior" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "PipelineStrategySinglePacketAttack",
              },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "convertToHttp2" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "failureBehavior" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionHttpOnePipelineMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySessionHttpOnePipeline" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "collection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "activeEntry" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "entries" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "last" },
                value: { kind: "IntValue", value: "1" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "settings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "strategy" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PipelineStrategyFull" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySession" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "ReplaySessionHttp" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplaySessionHttpMeta" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "ReplaySessionWs" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplaySessionWsMeta" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "ReplaySessionHttpOnePipeline" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: {
                    kind: "Name",
                    value: "ReplaySessionHttpOnePipelineMeta",
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  MoveReplaySessionMutation,
  MoveReplaySessionMutationVariables
>;
export const RenameReplaySessionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RenameReplaySession" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "renameReplaySession" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "session" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "ReplaySessionMeta" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionHttpMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySessionHttp" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "collection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "activeEntry" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "entries" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "last" },
                value: { kind: "IntValue", value: "1" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "settings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "connectionClose" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "updateContentLength" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionWsMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySessionWs" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "collection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "activeEntry" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "entries" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "last" },
                value: { kind: "IntValue", value: "1" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PipelineStrategyFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "PipelineStrategy" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "PipelineStrategySequential" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "abortOnFailure" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "PipelineStrategyLastByteSynchronization",
              },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "failureBehavior" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "PipelineStrategySinglePacketAttack",
              },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "convertToHttp2" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "failureBehavior" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionHttpOnePipelineMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySessionHttpOnePipeline" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "collection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "activeEntry" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "entries" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "last" },
                value: { kind: "IntValue", value: "1" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "settings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "strategy" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PipelineStrategyFull" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySession" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "ReplaySessionHttp" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplaySessionHttpMeta" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "ReplaySessionWs" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplaySessionWsMeta" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "ReplaySessionHttpOnePipeline" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: {
                    kind: "Name",
                    value: "ReplaySessionHttpOnePipelineMeta",
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RenameReplaySessionMutation,
  RenameReplaySessionMutationVariables
>;
export const RenameReplaySessionCollectionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RenameReplaySessionCollection" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "renameReplaySessionCollection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "collection" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplaySessionCollectionMeta",
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionCollectionMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySessionCollection" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RenameReplaySessionCollectionMutation,
  RenameReplaySessionCollectionMutationVariables
>;
export const SetActiveReplaySessionEntryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SetActiveReplaySessionEntry" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "entryId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "setActiveReplaySessionEntry" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "entryId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "entryId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "session" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "ReplaySessionMeta" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionHttpMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySessionHttp" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "collection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "activeEntry" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "entries" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "last" },
                value: { kind: "IntValue", value: "1" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "settings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "connectionClose" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "updateContentLength" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionWsMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySessionWs" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "collection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "activeEntry" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "entries" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "last" },
                value: { kind: "IntValue", value: "1" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PipelineStrategyFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "PipelineStrategy" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "PipelineStrategySequential" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "abortOnFailure" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "PipelineStrategyLastByteSynchronization",
              },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "failureBehavior" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "PipelineStrategySinglePacketAttack",
              },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "convertToHttp2" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "failureBehavior" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionHttpOnePipelineMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySessionHttpOnePipeline" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "collection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "activeEntry" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "entries" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "last" },
                value: { kind: "IntValue", value: "1" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "settings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "strategy" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "PipelineStrategyFull" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySessionMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySession" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "rank" } },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "ReplaySessionHttp" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplaySessionHttpMeta" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "ReplaySessionWs" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplaySessionWsMeta" },
                },
              ],
            },
          },
          {
            kind: "InlineFragment",
            typeCondition: {
              kind: "NamedType",
              name: { kind: "Name", value: "ReplaySessionHttpOnePipeline" },
            },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: {
                    kind: "Name",
                    value: "ReplaySessionHttpOnePipelineMeta",
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SetActiveReplaySessionEntryMutation,
  SetActiveReplaySessionEntryMutationVariables
>;
export const SetActiveReplayPipelineEntryHttpEntryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SetActiveReplayPipelineEntryHttpEntry" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "httpEntryId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: {
              kind: "Name",
              value: "setActiveReplayPipelineEntryHttpEntry",
            },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "httpEntryId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "httpEntryId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "entry" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SetActiveReplayPipelineEntryHttpEntryMutation,
  SetActiveReplayPipelineEntryHttpEntryMutationVariables
>;
export const UpdateReplayEntryDraftDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateReplayEntryDraft" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateReplayEntryDraftInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateReplayEntryDraft" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "entry" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateReplayEntryDraftMutation,
  UpdateReplayEntryDraftMutationVariables
>;
export const UpdateReplayEntryHttpOnePipelineDraftHttpEntriesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: {
        kind: "Name",
        value: "UpdateReplayEntryHttpOnePipelineDraftHttpEntries",
      },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "UpdateReplayEntryHttpOnePipelineDraftHttpEntriesInput",
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: {
              kind: "Name",
              value: "updateReplayEntryHttpOnePipelineDraftHttpEntries",
            },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "entry" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateReplayEntryHttpOnePipelineDraftHttpEntriesMutation,
  UpdateReplayEntryHttpOnePipelineDraftHttpEntriesMutationVariables
>;
export const UpdateReplaySessionSettingsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateReplaySessionSettings" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ReplaySessionSettingsInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateReplaySessionSettings" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "session" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateReplaySessionSettingsMutation,
  UpdateReplaySessionSettingsMutationVariables
>;
export const StartReplayTaskDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "StartReplayTask" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "sessionId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "startReplayTask" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "sessionId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "sessionId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "error" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "CloudUserError" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: {
                                kind: "Name",
                                value: "CloudUserErrorFull",
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "PermissionDeniedUserError",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: {
                                kind: "Name",
                                value: "PermissionDeniedUserErrorFull",
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "TaskInProgressUserError",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: {
                                kind: "Name",
                                value: "TaskInProgressUserErrorFull",
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "UnknownIdUserError" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: {
                                kind: "Name",
                                value: "UnknownIdUserErrorFull",
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "OtherUserError" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: {
                                kind: "Name",
                                value: "OtherUserErrorFull",
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "task" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "ReplayTaskMeta" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "UserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "code" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "TaskMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Task" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CloudUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "CloudUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "cloudReason" },
            name: { kind: "Name", value: "reason" },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PermissionDeniedUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "PermissionDeniedUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "permissionReason" },
            name: { kind: "Name", value: "reason" },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "TaskInProgressUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "TaskInProgressUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
          { kind: "Field", name: { kind: "Name", value: "taskId" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UnknownIdUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "UnknownIdUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
          { kind: "Field", name: { kind: "Name", value: "id" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "OtherUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "OtherUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayTaskMeta" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayTask" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "FragmentSpread", name: { kind: "Name", value: "TaskMeta" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "replayEntry" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  StartReplayTaskMutation,
  StartReplayTaskMutationVariables
>;
export const SendReplayTaskMessageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SendReplayTaskMessage" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "task" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "SendReplayTaskMessageInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "sendReplayTaskMessage" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "task" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "task" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "error" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "UnknownIdUserError" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: {
                                kind: "Name",
                                value: "UnknownIdUserErrorFull",
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "PermissionDeniedUserError",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: {
                                kind: "Name",
                                value: "PermissionDeniedUserErrorFull",
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "CloudUserError" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: {
                                kind: "Name",
                                value: "CloudUserErrorFull",
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "OtherUserError" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: {
                                kind: "Name",
                                value: "OtherUserErrorFull",
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "message" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "StreamWsMessage" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: {
                                kind: "Name",
                                value: "StreamWsMessageFull",
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "UserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "code" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UnknownIdUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "UnknownIdUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
          { kind: "Field", name: { kind: "Name", value: "id" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PermissionDeniedUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "PermissionDeniedUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "permissionReason" },
            name: { kind: "Name", value: "reason" },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CloudUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "CloudUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "cloudReason" },
            name: { kind: "Name", value: "reason" },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "OtherUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "OtherUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "StreamWsMessageFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "StreamWsMessage" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "head" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "alteration" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "direction" } },
                { kind: "Field", name: { kind: "Name", value: "format" } },
                { kind: "Field", name: { kind: "Name", value: "length" } },
                { kind: "Field", name: { kind: "Name", value: "raw" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "edits" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "alteration" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "stream" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SendReplayTaskMessageMutation,
  SendReplayTaskMessageMutationVariables
>;
export const SendReplayTaskMessageDraftDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SendReplayTaskMessageDraft" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "task" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "sendReplayTaskMessageDraft" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "task" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "task" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "error" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "UnknownIdUserError" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: {
                                kind: "Name",
                                value: "UnknownIdUserErrorFull",
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: {
                            kind: "Name",
                            value: "PermissionDeniedUserError",
                          },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: {
                                kind: "Name",
                                value: "PermissionDeniedUserErrorFull",
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "CloudUserError" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: {
                                kind: "Name",
                                value: "CloudUserErrorFull",
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "OtherUserError" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: {
                                kind: "Name",
                                value: "OtherUserErrorFull",
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "message" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "StreamWsMessage" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: {
                                kind: "Name",
                                value: "StreamWsMessageFull",
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "UserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "code" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UnknownIdUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "UnknownIdUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
          { kind: "Field", name: { kind: "Name", value: "id" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PermissionDeniedUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "PermissionDeniedUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "permissionReason" },
            name: { kind: "Name", value: "reason" },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "CloudUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "CloudUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "cloudReason" },
            name: { kind: "Name", value: "reason" },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "OtherUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "OtherUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "StreamWsMessageFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "StreamWsMessage" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "head" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "alteration" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "direction" } },
                { kind: "Field", name: { kind: "Name", value: "format" } },
                { kind: "Field", name: { kind: "Name", value: "length" } },
                { kind: "Field", name: { kind: "Name", value: "raw" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "edits" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "alteration" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "stream" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SendReplayTaskMessageDraftMutation,
  SendReplayTaskMessageDraftMutationVariables
>;
export const StopReplayWsTasksDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "StopReplayWsTasks" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "taskIds" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "ID" },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "stopReplayWsTasks" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "taskIds" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "taskIds" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "error" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "__typename" },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "UnknownIdUserError" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: {
                                kind: "Name",
                                value: "UnknownIdUserErrorFull",
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "OtherUserError" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: {
                                kind: "Name",
                                value: "OtherUserErrorFull",
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "UserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "code" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UnknownIdUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "UnknownIdUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
          { kind: "Field", name: { kind: "Name", value: "id" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "OtherUserErrorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "OtherUserError" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "UserErrorFull" },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  StopReplayWsTasksMutation,
  StopReplayWsTasksMutationVariables
>;
export const UpdatedReplayEntryWsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "subscription",
      name: { kind: "Name", value: "UpdatedReplayEntryWs" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "includeReplayRaw" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "includeRequestRaw" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "includeResponseRaw" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updatedReplayEntryWs" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "entry" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "ReplayEntryWsFull" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "snapshot" } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ConnectionInfoFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ConnectionInfo" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "host" } },
          { kind: "Field", name: { kind: "Name", value: "port" } },
          { kind: "Field", name: { kind: "Name", value: "isTLS" } },
          { kind: "Field", name: { kind: "Name", value: "SNI" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ResponseFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Response" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "statusCode" } },
          { kind: "Field", name: { kind: "Name", value: "roundtripTime" } },
          { kind: "Field", name: { kind: "Name", value: "length" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "raw" },
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "include" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "if" },
                    value: {
                      kind: "Variable",
                      name: { kind: "Name", value: "includeResponseRaw" },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RequestFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Request" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "host" } },
          { kind: "Field", name: { kind: "Name", value: "port" } },
          { kind: "Field", name: { kind: "Name", value: "method" } },
          { kind: "Field", name: { kind: "Name", value: "path" } },
          { kind: "Field", name: { kind: "Name", value: "query" } },
          { kind: "Field", name: { kind: "Name", value: "isTls" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "metadata" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "color" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "raw" },
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "include" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "if" },
                    value: {
                      kind: "Variable",
                      name: { kind: "Name", value: "includeRequestRaw" },
                    },
                  },
                ],
              },
            ],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "response" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ResponseFull" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RangeFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Range" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "start" } },
          { kind: "Field", name: { kind: "Name", value: "end" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayPrefixPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayPrefixPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "value" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplaySuffixPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplaySuffixPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "value" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayUrlEncodePreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayUrlEncodePreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "charset" } },
          { kind: "Field", name: { kind: "Name", value: "nonAscii" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayWorkflowPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayWorkflowPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayEnvironmentPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayEnvironmentPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "variableName" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayPreprocessorFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayPreprocessor" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "options" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ReplayPrefixPreprocessor" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayPrefixPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ReplaySuffixPreprocessor" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplaySuffixPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: {
                      kind: "Name",
                      value: "ReplayUrlEncodePreprocessor",
                    },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayUrlEncodePreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ReplayWorkflowPreprocessor" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayWorkflowPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: {
                      kind: "Name",
                      value: "ReplayEnvironmentPreprocessor",
                    },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: {
                          kind: "Name",
                          value: "ReplayEnvironmentPreprocessorFull",
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayPlaceholderFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayPlaceholder" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "inputRange" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "RangeFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "outputRange" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "RangeFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "preprocessors" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplayPreprocessorFull" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayEntryHttpFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayEntryHttp" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "connection" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ConnectionInfoFull" },
                },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "error" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "raw" },
            directives: [
              {
                kind: "Directive",
                name: { kind: "Name", value: "include" },
                arguments: [
                  {
                    kind: "Argument",
                    name: { kind: "Name", value: "if" },
                    value: {
                      kind: "Variable",
                      name: { kind: "Name", value: "includeReplayRaw" },
                    },
                  },
                ],
              },
            ],
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "request" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "RequestFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "session" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "settings" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "placeholders" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "ReplayPlaceholderFull" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "StreamWsMessageFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "StreamWsMessage" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "head" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "alteration" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "direction" } },
                { kind: "Field", name: { kind: "Name", value: "format" } },
                { kind: "Field", name: { kind: "Name", value: "length" } },
                { kind: "Field", name: { kind: "Name", value: "raw" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "edits" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "alteration" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "stream" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "StreamFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Stream" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "host" } },
          { kind: "Field", name: { kind: "Name", value: "port" } },
          { kind: "Field", name: { kind: "Name", value: "path" } },
          { kind: "Field", name: { kind: "Name", value: "isTls" } },
          { kind: "Field", name: { kind: "Name", value: "protocol" } },
          { kind: "Field", name: { kind: "Name", value: "direction" } },
          { kind: "Field", name: { kind: "Name", value: "source" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReplayEntryWsFull" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ReplayEntryWs" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "__typename" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "error" } },
          { kind: "Field", name: { kind: "Name", value: "id" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "http" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "ReplayEntryHttpFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "session" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "messages" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "StreamWsMessageFull" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "stream" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "StreamFull" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdatedReplayEntryWsSubscription,
  UpdatedReplayEntryWsSubscriptionVariables
>;
