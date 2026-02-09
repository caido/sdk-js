import { AIErrorReason } from "./enums.js";
import { Alteration } from "./enums.js";
import { AssistantErrorReason } from "./enums.js";
import { AssistantMessageRole } from "./enums.js";
import { AuthenticationErrorReason } from "./enums.js";
import { AuthenticationScope } from "./enums.js";
import { AuthorizationErrorReason } from "./enums.js";
import { AutomateEntryRequestOrderBy } from "./enums.js";
import { AutomatePayloadStrategy } from "./enums.js";
import { AutomateTaskErrorReason } from "./enums.js";
import { BackupErrorReason } from "./enums.js";
import { BackupStatus } from "./enums.js";
import { CertificateErrorReason } from "./enums.js";
import { CloudErrorReason } from "./enums.js";
import { DataExportFormat } from "./enums.js";
import { DataExportStatus } from "./enums.js";
import { EnvironmentVariableKind } from "./enums.js";
import { FindingOrderBy } from "./enums.js";
import { HostedFileStatus } from "./enums.js";
import { InterceptEntryOrderBy } from "./enums.js";
import { InterceptKind } from "./enums.js";
import { InterceptStatus } from "./enums.js";
import { LogLevel } from "./enums.js";
import { Ordering } from "./enums.js";
import { PermissionDeniedErrorReason } from "./enums.js";
import { PluginErrorReason } from "./enums.js";
import { PluginRuntime } from "./enums.js";
import { ProjectErrorReason } from "./enums.js";
import { ProjectSelectOnStart } from "./enums.js";
import { ProjectStatus } from "./enums.js";
import { RankErrorReason } from "./enums.js";
import { RedirectStrategy } from "./enums.js";
import { RenderFailedErrorReason } from "./enums.js";
import { ReplayEntryOrderBy } from "./enums.js";
import { RequestResponseOrderBy } from "./enums.js";
import { SitemapDescendantsDepth } from "./enums.js";
import { SitemapEntryKind } from "./enums.js";
import { Source } from "./enums.js";
import { StoreErrorReason } from "./enums.js";
import { StreamDirection } from "./enums.js";
import { StreamMessageDirection } from "./enums.js";
import { StreamOrderBy } from "./enums.js";
import { StreamProtocol } from "./enums.js";
import { StreamWsMessageFormat } from "./enums.js";
import { StreamWsMessageOrderBy } from "./enums.js";
import { TaskStatus } from "./enums.js";
import { WorkflowErrorReason } from "./enums.js";
import { WorkflowKind } from "./enums.js";
export type Maybe<T> = T | undefined | null;
export type InputMaybe<T> = T | undefined | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Alias: { input: string; output: string };
  Binary: { input: Uint8Array; output: Uint8Array };
  Blob: { input: string; output: string };
  /**
   * A datetime with timezone offset.
   *
   * The input is a string in RFC3339 format, e.g. "2022-01-12T04:00:19.12345Z"
   * or "2022-01-12T04:00:19+03:00". The output is also a string in RFC3339
   * format, but it is always normalized to the UTC (Z) offset, e.g.
   * "2022-01-12T04:00:19.12345Z".
   */
  DateTime: { input: Date; output: Date };
  Duration: { input: number; output: number };
  HTTPQL: { input: string; output: string };
  Image: { input: string; output: string };
  /** A scalar that can represent any JSON value. */
  JSON: { input: unknown; output: unknown };
  JsonObject: {
    input: Record<string, unknown>;
    output: Record<string, unknown>;
  };
  JsonRaw: { input: string; output: string };
  Port: { input: number; output: number };
  Rank: { input: string; output: string };
  Sensitive: { input: string; output: string };
  Snapshot: { input: number; output: number };
  Timestamp: { input: Date; output: Date };
  Token: { input: string; output: string };
  Upload: { input: File; output: File };
  Uri: { input: string; output: string };
  /** URL is a String implementing the [URL Standard](http://url.spec.whatwg.org/) */
  Url: { input: string; output: string };
  Version: { input: string; output: string };
};

export { AIErrorReason };

export type AiProviderAnthropic = {
  apiKey: Scalars["Sensitive"]["output"];
};

export type AiProviderAnthropicInput = {
  apiKey: Scalars["Sensitive"]["input"];
};

export type AiProviderGoogle = {
  apiKey: Scalars["Sensitive"]["output"];
};

export type AiProviderGoogleInput = {
  apiKey: Scalars["Sensitive"]["input"];
};

export type AiProviderOpenAi = {
  apiKey: Scalars["Sensitive"]["output"];
  url?: Maybe<Scalars["Url"]["output"]>;
};

export type AiProviderOpenAiInput = {
  apiKey: Scalars["Sensitive"]["input"];
  url?: InputMaybe<Scalars["Url"]["input"]>;
};

export type AiProviderOpenRouter = {
  apiKey: Scalars["Sensitive"]["output"];
};

export type AiProviderOpenRouterInput = {
  apiKey: Scalars["Sensitive"]["input"];
};

export type AiProviders = {
  anthropic?: Maybe<AiProviderAnthropic>;
  google?: Maybe<AiProviderGoogle>;
  openai?: Maybe<AiProviderOpenAi>;
  openrouter?: Maybe<AiProviderOpenRouter>;
};

export type AiUserError = UserError & {
  code: Scalars["String"]["output"];
  message: Scalars["String"]["output"];
  reason: AIErrorReason;
};

export type AliasTakenUserError = UserError & {
  alias: Scalars["String"]["output"];
  code: Scalars["String"]["output"];
};

export { Alteration };

export type AnalyticStatus = {
  cloud: Scalars["Boolean"]["output"];
  enabled: Scalars["Boolean"]["output"];
  local: Scalars["Boolean"]["output"];
};

export { AssistantErrorReason };

export type AssistantMessage = {
  content: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  role: AssistantMessageRole;
  session: AssistantSession;
};

/** An edge in a connection. */
export type AssistantMessageEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node: AssistantMessage;
};

export { AssistantMessageRole };

export type AssistantMessageTask = {
  error?: Maybe<AssistantMessageTaskError>;
  id: Scalars["ID"]["output"];
  message?: Maybe<AssistantMessage>;
  session: AssistantSession;
};

export type AssistantMessageTaskError =
  | AssistantUserError
  | AuthenticationUserError
  | CloudUserError
  | OtherUserError;

export type AssistantModel = {
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  tokenCredit: Scalars["Int"]["output"];
};

export type AssistantSession = {
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  messages: Array<AssistantMessage>;
  modelId: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

/** An edge in a connection. */
export type AssistantSessionEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node: AssistantSession;
};

export type AssistantUsage = {
  balance: Scalars["Int"]["output"];
};

export type AssistantUserError = UserError & {
  code: Scalars["String"]["output"];
  reason: AssistantErrorReason;
};

export { AuthenticationErrorReason };

export type AuthenticationRequest = {
  expiresAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  userCode: Scalars["String"]["output"];
  verificationUrl: Scalars["Url"]["output"];
};

export { AuthenticationScope };

export type AuthenticationState = {
  allowGuests: Scalars["Boolean"]["output"];
};

export type AuthenticationToken = {
  accessToken: Scalars["Token"]["output"];
  expiresAt: Scalars["DateTime"]["output"];
  refreshToken?: Maybe<Scalars["Token"]["output"]>;
  scopes: Array<AuthenticationScope>;
};

export type AuthenticationUserError = UserError & {
  code: Scalars["String"]["output"];
  reason: AuthenticationErrorReason;
};

export { AuthorizationErrorReason };

export type AuthorizationUserError = UserError & {
  code: Scalars["String"]["output"];
  reason: AuthorizationErrorReason;
};

export type AutomateConcurrencySetting = {
  delay: Scalars["Int"]["output"];
  workers: Scalars["Int"]["output"];
};

export type AutomateConcurrencySettingInput = {
  delay: Scalars["Int"]["input"];
  workers: Scalars["Int"]["input"];
};

export type AutomateEntry = {
  connection: ConnectionInfo;
  createdAt: Scalars["Timestamp"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  raw: Scalars["Blob"]["output"];
  requests: AutomateEntryRequestConnection;
  requestsByOffset: AutomateEntryRequestConnection;
  session: AutomateSession;
  settings: AutomateSettings;
};

export type AutomateEntryRequestsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  filter?: InputMaybe<Scalars["HTTPQL"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  order?: InputMaybe<AutomateEntryRequestOrderInput>;
};

export type AutomateEntryRequestsByOffsetArgs = {
  filter?: InputMaybe<Scalars["HTTPQL"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  order?: InputMaybe<AutomateEntryRequestOrderInput>;
};

/** An edge in a connection. */
export type AutomateEntryEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node: AutomateEntry;
};

export type AutomateEntryRequest = {
  automateEntryId: Scalars["ID"]["output"];
  error?: Maybe<Scalars["String"]["output"]>;
  payloads: Array<AutomateEntryRequestPayload>;
  request: Request;
  sequenceId: Scalars["ID"]["output"];
};

export type AutomateEntryRequestConnection = {
  count: Count;
  /** A list of edges. */
  edges: Array<AutomateEntryRequestEdge>;
  /** A list of nodes. */
  nodes: Array<AutomateEntryRequest>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  snapshot: Scalars["Snapshot"]["output"];
};

/** An edge in a connection. */
export type AutomateEntryRequestEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node: AutomateEntryRequest;
};

export { AutomateEntryRequestOrderBy };

export type AutomateEntryRequestOrderInput = {
  by: AutomateEntryRequestOrderBy;
  ordering: Ordering;
};

export type AutomateEntryRequestPayload = {
  position?: Maybe<Scalars["Int"]["output"]>;
  raw?: Maybe<Scalars["Blob"]["output"]>;
};

export type AutomateHostedFilePayload = {
  delimiter?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
};

export type AutomateHostedFilePayloadInput = {
  delimiter?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
};

export type AutomateNullPayload = {
  quantity: Scalars["Int"]["output"];
};

export type AutomateNullPayloadInput = {
  quantity: Scalars["Int"]["input"];
};

export type AutomateNumberPayload = {
  increments: Scalars["Int"]["output"];
  minLength: Scalars["Int"]["output"];
  range: Range;
};

export type AutomateNumberPayloadInput = {
  increments: Scalars["Int"]["input"];
  minLength: Scalars["Int"]["input"];
  range: RangeInput;
};

export type AutomatePayload = {
  options: AutomatePayloadOptions;
  preprocessors: Array<AutomatePreprocessor>;
};

export type AutomatePayloadInput = {
  options: AutomatePayloadOptionsInput;
  preprocessors: Array<AutomatePreprocessorInput>;
};

export type AutomatePayloadOptions =
  | AutomateHostedFilePayload
  | AutomateNullPayload
  | AutomateNumberPayload
  | AutomateSimpleListPayload;

export type AutomatePayloadOptionsInput =
  | {
      hostedFile: AutomateHostedFilePayloadInput;
      null?: never;
      number?: never;
      simpleList?: never;
    }
  | {
      hostedFile?: never;
      null: AutomateNullPayloadInput;
      number?: never;
      simpleList?: never;
    }
  | {
      hostedFile?: never;
      null?: never;
      number: AutomateNumberPayloadInput;
      simpleList?: never;
    }
  | {
      hostedFile?: never;
      null?: never;
      number?: never;
      simpleList: AutomateSimpleListPayloadInput;
    };

export { AutomatePayloadStrategy };

export type AutomatePlaceholder = {
  end: Scalars["Int"]["output"];
  start: Scalars["Int"]["output"];
};

export type AutomatePlaceholderInput = {
  end: Scalars["Int"]["input"];
  start: Scalars["Int"]["input"];
};

export type AutomatePrefixPreprocessor = {
  value: Scalars["String"]["output"];
};

export type AutomatePrefixPreprocessorInput = {
  value: Scalars["String"]["input"];
};

export type AutomatePreprocessor = {
  options: AutomatePreprocessorOptions;
};

export type AutomatePreprocessorInput = {
  options: AutomatePreprocessorOptionsInput;
};

export type AutomatePreprocessorOptions =
  | AutomatePrefixPreprocessor
  | AutomateSuffixPreprocessor
  | AutomateUrlEncodePreprocessor
  | AutomateWorkflowPreprocessor;

export type AutomatePreprocessorOptionsInput =
  | {
      prefix: AutomatePrefixPreprocessorInput;
      suffix?: never;
      urlEncode?: never;
      workflow?: never;
    }
  | {
      prefix?: never;
      suffix: AutomateSuffixPreprocessorInput;
      urlEncode?: never;
      workflow?: never;
    }
  | {
      prefix?: never;
      suffix?: never;
      urlEncode: AutomateUrlEncodePreprocessorInput;
      workflow?: never;
    }
  | {
      prefix?: never;
      suffix?: never;
      urlEncode?: never;
      workflow: AutomateWorkflowPreprocessorInput;
    };

export type AutomateRedirectSetting = {
  max: Scalars["Int"]["output"];
  strategy: RedirectStrategy;
};

export type AutomateRedirectSettingInput = {
  max: Scalars["Int"]["input"];
  strategy: RedirectStrategy;
};

export type AutomateRetryOnFailureSetting = {
  backoff: Scalars["Int"]["output"];
  maximumRetries: Scalars["Int"]["output"];
};

export type AutomateRetryOnFailureSettingInput = {
  backoff: Scalars["Int"]["input"];
  maximumRetries: Scalars["Int"]["input"];
};

export type AutomateSession = {
  connection: ConnectionInfo;
  createdAt: Scalars["Timestamp"]["output"];
  entries: Array<AutomateEntry>;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  raw: Scalars["Blob"]["output"];
  settings: AutomateSettings;
};

export type AutomateSessionConnection = {
  count: Count;
  /** A list of edges. */
  edges: Array<AutomateSessionEdge>;
  /** A list of nodes. */
  nodes: Array<AutomateSession>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  snapshot: Scalars["Snapshot"]["output"];
};

/** An edge in a connection. */
export type AutomateSessionEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node: AutomateSession;
};

export type AutomateSettings = {
  closeConnection: Scalars["Boolean"]["output"];
  concurrency: AutomateConcurrencySetting;
  payloads: Array<AutomatePayload>;
  placeholders: Array<AutomatePlaceholder>;
  redirect: AutomateRedirectSetting;
  retryOnFailure: AutomateRetryOnFailureSetting;
  strategy: AutomatePayloadStrategy;
  updateContentLength: Scalars["Boolean"]["output"];
};

export type AutomateSettingsInput = {
  closeConnection: Scalars["Boolean"]["input"];
  concurrency: AutomateConcurrencySettingInput;
  payloads: Array<AutomatePayloadInput>;
  placeholders: Array<AutomatePlaceholderInput>;
  redirect: AutomateRedirectSettingInput;
  retryOnFailure: AutomateRetryOnFailureSettingInput;
  strategy: AutomatePayloadStrategy;
  updateContentLength: Scalars["Boolean"]["input"];
};

export type AutomateSimpleListPayload = {
  list: Array<Scalars["String"]["output"]>;
};

export type AutomateSimpleListPayloadInput = {
  list: Array<Scalars["String"]["input"]>;
};

export type AutomateSuffixPreprocessor = {
  value: Scalars["String"]["output"];
};

export type AutomateSuffixPreprocessorInput = {
  value: Scalars["String"]["input"];
};

export type AutomateTask = {
  entry: AutomateEntry;
  id: Scalars["ID"]["output"];
  paused: Scalars["Boolean"]["output"];
};

export type AutomateTaskConnection = {
  count: Count;
  /** A list of edges. */
  edges: Array<AutomateTaskEdge>;
  /** A list of nodes. */
  nodes: Array<AutomateTask>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  snapshot: Scalars["Snapshot"]["output"];
};

/** An edge in a connection. */
export type AutomateTaskEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node: AutomateTask;
};

export { AutomateTaskErrorReason };

export type AutomateTaskUserError = UserError & {
  code: Scalars["String"]["output"];
  reason: AutomateTaskErrorReason;
};

export type AutomateUrlEncodePreprocessor = {
  charset?: Maybe<Scalars["String"]["output"]>;
  nonAscii: Scalars["Boolean"]["output"];
};

export type AutomateUrlEncodePreprocessorInput = {
  charset?: InputMaybe<Scalars["String"]["input"]>;
  nonAscii: Scalars["Boolean"]["input"];
};

export type AutomateWorkflowPreprocessor = {
  id: Scalars["ID"]["output"];
};

export type AutomateWorkflowPreprocessorInput = {
  id: Scalars["ID"]["input"];
};

export type Backup = {
  createdAt: Scalars["DateTime"]["output"];
  downloadUri?: Maybe<Scalars["Uri"]["output"]>;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  path: Scalars["String"]["output"];
  project?: Maybe<Project>;
  size: Scalars["Int"]["output"];
  status: BackupStatus;
  updatedAt: Scalars["DateTime"]["output"];
};

export { BackupErrorReason };

export type BackupSource =
  | { backupId: Scalars["ID"]["input"]; file?: never }
  | { backupId?: never; file: Scalars["Upload"]["input"] };

export { BackupStatus };

export type BackupTask = {
  backup: Backup;
  id: Scalars["ID"]["output"];
};

export type BackupTaskError =
  | BackupUserError
  | InternalUserError
  | OtherUserError;

export type BackupUserError = UserError & {
  code: Scalars["String"]["output"];
  reason: BackupErrorReason;
};

export type Browser = {
  id: Scalars["ID"]["output"];
  installedAt: Scalars["DateTime"]["output"];
  latest: Scalars["Boolean"]["output"];
  path: Scalars["String"]["output"];
  size: Scalars["Int"]["output"];
  version: Scalars["String"]["output"];
};

export type BrowserRequest = {
  replay: Scalars["String"]["output"];
  showResponse: Scalars["String"]["output"];
};

export type CancelAutomateTaskError = OtherUserError | UnknownIdUserError;

export type CancelAutomateTaskPayload = {
  cancelledId?: Maybe<Scalars["ID"]["output"]>;
  userError?: Maybe<CancelAutomateTaskError>;
};

export type CancelBackupTaskError = OtherUserError | UnknownIdUserError;

export type CancelBackupTaskPayload = {
  cancelledId?: Maybe<Scalars["ID"]["output"]>;
  error?: Maybe<CancelBackupTaskError>;
};

export type CancelRestoreBackupTaskError = OtherUserError | UnknownIdUserError;

export type CancelRestoreBackupTaskPayload = {
  cancelledId?: Maybe<Scalars["ID"]["output"]>;
  error?: Maybe<CancelRestoreBackupTaskError>;
};

export type CancelTaskError = OtherUserError | UnknownIdUserError;

export type CancelTaskPayload = {
  cancelledId?: Maybe<Scalars["ID"]["output"]>;
  error?: Maybe<CancelTaskError>;
};

export type Certificate = {
  p12: Scalars["Binary"]["output"];
};

export type CertificateP12Args = {
  password?: InputMaybe<Scalars["Sensitive"]["input"]>;
};

export { CertificateErrorReason };

export type CertificateInput = { p12: CertificateInputP12 };

export type CertificateInputP12 = {
  file: Scalars["Upload"]["input"];
  password?: InputMaybe<Scalars["Sensitive"]["input"]>;
};

export type CertificateUserError = UserError & {
  code: Scalars["String"]["output"];
  reason: CertificateErrorReason;
};

export type ClearSitemapEntriesPayload = {
  deletedIds: Array<Scalars["ID"]["output"]>;
};

export { CloudErrorReason };

export type CloudStatus = {
  sync: Scalars["Boolean"]["output"];
};

export type CloudUser = {
  assistantUsage: AssistantUsage;
  id: Scalars["ID"]["output"];
  plugins: Array<PluginFrontend>;
  profile: UserProfile;
  settings?: Maybe<UserSettings>;
};

export type CloudUserError = UserError & {
  code: Scalars["String"]["output"];
  reason: CloudErrorReason;
};

export type ConnectionInfo = {
  SNI?: Maybe<Scalars["String"]["output"]>;
  host: Scalars["String"]["output"];
  isTLS: Scalars["Boolean"]["output"];
  port: Scalars["Port"]["output"];
};

export type ConnectionInfoInput = {
  SNI?: InputMaybe<Scalars["String"]["input"]>;
  host: Scalars["String"]["input"];
  isTLS: Scalars["Boolean"]["input"];
  port: Scalars["Port"]["input"];
};

export type Count = {
  snapshot: Scalars["Snapshot"]["output"];
  value: Scalars["Int"]["output"];
};

export type CreateAssistantSessionError =
  | CloudUserError
  | OtherUserError
  | PermissionDeniedUserError;

export type CreateAssistantSessionInput = {
  modelId: Scalars["ID"]["input"];
  systemMessage?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateAssistantSessionPayload = {
  error?: Maybe<CreateAssistantSessionError>;
  session?: Maybe<AssistantSession>;
};

export type CreateAutomateSessionInput = {
  requestSource?: InputMaybe<RequestSourceInput>;
};

export type CreateAutomateSessionPayload = {
  session?: Maybe<AutomateSession>;
};

export type CreateBackupError = OtherUserError | TaskInProgressUserError;

export type CreateBackupPayload = {
  error?: Maybe<CreateBackupError>;
  task?: Maybe<BackupTask>;
};

export type CreateDnsRewriteError = OtherUserError | UnknownIdUserError;

export type CreateDnsRewriteInput = {
  allowlist: Array<Scalars["String"]["input"]>;
  denylist: Array<Scalars["String"]["input"]>;
  resolution: DnsResolverInput;
};

export type CreateDnsRewritePayload = {
  error?: Maybe<CreateDnsRewriteError>;
  rewrite?: Maybe<DnsRewrite>;
};

export type CreateDnsUpstreamInput = {
  ip: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};

export type CreateDnsUpstreamPayload = {
  upstream: DnsUpstream;
};

export type CreateEnvironmentError =
  | CloudUserError
  | NameTakenUserError
  | OtherUserError
  | PermissionDeniedUserError;

export type CreateEnvironmentInput = {
  name: Scalars["String"]["input"];
  variables: Array<EnvironmentVariableInput>;
};

export type CreateEnvironmentPayload = {
  environment?: Maybe<Environment>;
  error?: Maybe<CreateEnvironmentError>;
};

export type CreateFilterPresetError =
  | AliasTakenUserError
  | CloudUserError
  | NameTakenUserError
  | OtherUserError
  | PermissionDeniedUserError;

export type CreateFilterPresetInput = {
  alias: Scalars["Alias"]["input"];
  clause: Scalars["HTTPQL"]["input"];
  name: Scalars["String"]["input"];
};

export type CreateFilterPresetPayload = {
  error?: Maybe<CreateFilterPresetError>;
  filter?: Maybe<FilterPreset>;
};

export type CreateFindingError = OtherUserError | UnknownIdUserError;

export type CreateFindingInput = {
  dedupeKey?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  reporter: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type CreateFindingPayload = {
  error?: Maybe<CreateFindingError>;
  finding?: Maybe<Finding>;
};

export type CreateProjectInput = {
  name: Scalars["String"]["input"];
  temporary: Scalars["Boolean"]["input"];
};

export type CreateProjectPayload = {
  error?: Maybe<CreateProjectPayloadError>;
  project?: Maybe<Project>;
};

export type CreateProjectPayloadError =
  | CloudUserError
  | NameTakenUserError
  | OtherUserError
  | PermissionDeniedUserError;

export type CreateReplaySessionCollectionInput = {
  name: Scalars["String"]["input"];
};

export type CreateReplaySessionCollectionPayload = {
  collection?: Maybe<ReplaySessionCollection>;
};

export type CreateReplaySessionInput = {
  collectionId?: InputMaybe<Scalars["ID"]["input"]>;
  requestSource?: InputMaybe<RequestSourceInput>;
};

export type CreateReplaySessionPayload = {
  session?: Maybe<ReplaySession>;
};

export type CreateScopeError = InvalidGlobTermsUserError | OtherUserError;

export type CreateScopeInput = {
  allowlist: Array<Scalars["String"]["input"]>;
  denylist: Array<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
};

export type CreateScopePayload = {
  error?: Maybe<CreateScopeError>;
  scope?: Maybe<Scope>;
};

export type CreateSitemapEntriesError = OtherUserError | UnknownIdUserError;

export type CreateSitemapEntriesPayload = {
  error?: Maybe<CreateSitemapEntriesError>;
};

export type CreateTamperRuleCollectionInput = {
  name: Scalars["String"]["input"];
};

export type CreateTamperRuleCollectionPayload = {
  collection?: Maybe<TamperRuleCollection>;
};

export type CreateTamperRuleError =
  | InvalidHttpqlUserError
  | InvalidRegexUserError
  | OtherUserError;

export type CreateTamperRuleInput = {
  collectionId: Scalars["ID"]["input"];
  condition?: InputMaybe<Scalars["HTTPQL"]["input"]>;
  name: Scalars["String"]["input"];
  section: TamperSectionInput;
  sources: Array<Source>;
};

export type CreateTamperRulePayload = {
  error?: Maybe<CreateTamperRuleError>;
  rule?: Maybe<TamperRule>;
};

export type CreateUpstreamPluginInput = {
  allowlist: Array<Scalars["String"]["input"]>;
  denylist: Array<Scalars["String"]["input"]>;
  enabled: Scalars["Boolean"]["input"];
  pluginId: Scalars["ID"]["input"];
};

export type CreateUpstreamPluginPayload = {
  upstream?: Maybe<UpstreamPlugin>;
};

export type CreateUpstreamProxyHttpInput = {
  allowlist: Array<Scalars["String"]["input"]>;
  auth?: InputMaybe<UpstreamProxyAuthInput>;
  connection: ConnectionInfoInput;
  denylist: Array<Scalars["String"]["input"]>;
  enabled: Scalars["Boolean"]["input"];
};

export type CreateUpstreamProxyHttpPayload = {
  proxy?: Maybe<UpstreamProxyHttp>;
};

export type CreateUpstreamProxySocksInput = {
  allowlist: Array<Scalars["String"]["input"]>;
  auth?: InputMaybe<UpstreamProxyAuthInput>;
  connection: ConnectionInfoInput;
  denylist: Array<Scalars["String"]["input"]>;
  enabled: Scalars["Boolean"]["input"];
  includeDns: Scalars["Boolean"]["input"];
};

export type CreateUpstreamProxySocksPayload = {
  proxy?: Maybe<UpstreamProxySocks>;
};

export type CreateWorkflowError =
  | OtherUserError
  | PermissionDeniedUserError
  | WorkflowUserError;

export type CreateWorkflowInput = {
  definition: Scalars["JsonObject"]["input"];
  global: Scalars["Boolean"]["input"];
};

export type CreateWorkflowPayload = {
  error?: Maybe<CreateWorkflowError>;
  workflow?: Maybe<Workflow>;
};

export type CreatedAssistantMessagePayload = {
  messageEdge: AssistantMessageEdge;
  snapshot: Scalars["Snapshot"]["output"];
};

export type CreatedAssistantMessageTaskPayload = {
  task: AssistantMessageTask;
};

export type CreatedAssistantSessionPayload = {
  sessionEdge: AssistantSessionEdge;
  snapshot: Scalars["Snapshot"]["output"];
};

export type CreatedAuthenticationTokenError =
  | AuthenticationUserError
  | InternalUserError
  | OtherUserError;

export type CreatedAuthenticationTokenPayload = {
  error?: Maybe<CreatedAuthenticationTokenError>;
  token?: Maybe<AuthenticationToken>;
};

export type CreatedAutomateEntryPayload = {
  automateEntryEdge: AutomateEntryEdge;
  snapshot: Scalars["Snapshot"]["output"];
};

export type CreatedAutomateEntryRequestPayload = {
  automateEntryRequestEdge: AutomateEntryRequestEdge;
  snapshot: Scalars["Snapshot"]["output"];
};

export type CreatedAutomateEntryRequestPayloadAutomateEntryRequestEdgeArgs = {
  order?: InputMaybe<AutomateEntryRequestOrderInput>;
};

export type CreatedAutomateSessionPayload = {
  automateSessionEdge: AutomateSessionEdge;
  snapshot: Scalars["Snapshot"]["output"];
};

export type CreatedAutomateTaskPayload = {
  automateTaskEdge: AutomateTaskEdge;
  snapshot: Scalars["Snapshot"]["output"];
};

export type CreatedBackupPayload = {
  backup: Backup;
};

export type CreatedDnsRewritePayload = {
  rewrite: DnsRewrite;
};

export type CreatedDnsUpstreamPayload = {
  upstream: DnsUpstream;
};

export type CreatedDataExportPayload = {
  dataExportEdge: DataExportEdge;
  snapshot: Scalars["Snapshot"]["output"];
};

export type CreatedEnvironmentPayload = {
  environment: Environment;
  snapshot: Scalars["Snapshot"]["output"];
};

export type CreatedFilterPresetPayload = {
  filterEdge: FilterPresetEdge;
};

export type CreatedFindingPayload = {
  findingEdge: FindingEdge;
  snapshot: Scalars["Snapshot"]["output"];
};

export type CreatedFindingPayloadFindingEdgeArgs = {
  order?: InputMaybe<FindingOrderInput>;
};

export type CreatedInterceptEntryPayload = {
  interceptEntryEdge: InterceptEntryEdge;
  snapshot: Scalars["Snapshot"]["output"];
};

export type CreatedInterceptEntryPayloadInterceptEntryEdgeArgs = {
  order?: InputMaybe<InterceptEntryOrderInput>;
};

export type CreatedInterceptMessagePayload = {
  messageEdge: InterceptMessageEdge;
  snapshot: Scalars["Snapshot"]["output"];
};

export type CreatedLogLinesPayload = {
  lines: Array<LogLine>;
};

export type CreatedPluginEventPayload = {
  eventArgs: Array<Scalars["JsonRaw"]["output"]>;
  eventName: Scalars["String"]["output"];
  pluginId: Scalars["ID"]["output"];
};

export type CreatedPluginPackagePayload = {
  package: PluginPackage;
};

export type CreatedProjectPayload = {
  project: Project;
};

export type CreatedReplaySessionCollectionPayload = {
  collectionEdge: ReplaySessionCollectionEdge;
  snapshot: Scalars["Snapshot"]["output"];
};

export type CreatedReplaySessionPayload = {
  sessionEdge: ReplaySessionEdge;
  snapshot: Scalars["Snapshot"]["output"];
};

export type CreatedRequestPayload = {
  requestEdge: RequestEdge;
  snapshot: Scalars["Snapshot"]["output"];
};

export type CreatedRequestPayloadRequestEdgeArgs = {
  order?: InputMaybe<RequestResponseOrderInput>;
};

export type CreatedScopePayload = {
  scopeEdge: ScopeEdge;
  snapshot: Scalars["Snapshot"]["output"];
};

export type CreatedSitemapEntryPayload = {
  ancestorIds: Array<Scalars["ID"]["output"]>;
  requestEdge?: Maybe<RequestEdge>;
  sitemapEntryEdge: SitemapEntryEdge;
  snapshot: Scalars["Snapshot"]["output"];
};

export type CreatedSitemapEntryPayloadRequestEdgeArgs = {
  order?: InputMaybe<RequestResponseOrderInput>;
};

export type CreatedStreamPayload = {
  requestIds: Array<Scalars["ID"]["output"]>;
  snapshot: Scalars["Snapshot"]["output"];
  streamEdge: StreamEdge;
};

export type CreatedStreamPayloadStreamEdgeArgs = {
  order?: InputMaybe<StreamOrderInput>;
};

export type CreatedStreamWsMessagePayload = {
  messageEdge: StreamWsMessageEdge;
  snapshot: Scalars["Snapshot"]["output"];
};

export type CreatedStreamWsMessagePayloadMessageEdgeArgs = {
  order?: InputMaybe<StreamWsMessageOrderInput>;
};

export type CreatedTamperRuleCollectionPayload = {
  collectionEdge: TamperRuleCollectionEdge;
  snapshot: Scalars["Snapshot"]["output"];
};

export type CreatedTamperRulePayload = {
  rule: TamperRule;
  snapshot: Scalars["Snapshot"]["output"];
};

export type CreatedUpstreamPluginPayload = {
  upstream: UpstreamPlugin;
};

export type CreatedUpstreamProxyHttpPayload = {
  proxy: UpstreamProxyHttp;
};

export type CreatedUpstreamProxySocksPayload = {
  proxy: UpstreamProxySocks;
};

export type CreatedWorkflowPayload = {
  workflowEdge: WorkflowEdge;
};

export type CurrentProject = {
  config: ProjectConfig;
  project: Project;
  /** Defines if the selected project is read-only */
  readOnly: Scalars["Boolean"]["output"];
};

export type DnsIpResolver = {
  ip: Scalars["String"]["output"];
};

export type DnsIpResolverInput = {
  ip: Scalars["String"]["input"];
};

export type DnsResolver = DnsIpResolver | DnsUpstreamResolver;

export type DnsResolverInput =
  | { ip: DnsIpResolverInput; upstream?: never }
  | { ip?: never; upstream: DnsUpstreamResolverInput };

export type DnsRewrite = {
  allowlist: Array<Scalars["String"]["output"]>;
  denylist: Array<Scalars["String"]["output"]>;
  enabled: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  rank: Scalars["Rank"]["output"];
  resolution: DnsResolver;
};

export type DnsUpstream = {
  id: Scalars["ID"]["output"];
  ip: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
};

export type DnsUpstreamResolver = {
  id: Scalars["ID"]["output"];
};

export type DnsUpstreamResolverInput = {
  id: Scalars["ID"]["input"];
};

export type DataExport = {
  id: Scalars["ID"]["output"];
};

/** An edge in a connection. */
export type DataExportEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node: DataExport;
};

export { DataExportFormat };

export type DataExportOnDemand = DataExport & {
  downloadUri: Scalars["Uri"]["output"];
  id: Scalars["ID"]["output"];
};

export { DataExportStatus };

export type DataExportStored = DataExport & {
  createdAt: Scalars["DateTime"]["output"];
  downloadUri?: Maybe<Scalars["Uri"]["output"]>;
  error?: Maybe<Scalars["String"]["output"]>;
  format: DataExportFormat;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  path: Scalars["String"]["output"];
  size: Scalars["Int"]["output"];
  status: DataExportStatus;
};

export type DataExportTask = Task & {
  createdAt: Scalars["DateTime"]["output"];
  export: DataExport;
  id: Scalars["ID"]["output"];
};

export type DataImportResult = {
  errors: Array<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  summary?: Maybe<DataImportSummary>;
};

export type DataImportSummary = FindingsSummary | TamperSummary;

export type DeleteAssistantSessionPayload = {
  deletedId?: Maybe<Scalars["ID"]["output"]>;
};

export type DeleteAutomateEntriesPayload = {
  deletedIds: Array<Scalars["ID"]["output"]>;
  errors: Array<DeleteAutomateEntryError>;
};

export type DeleteAutomateEntryError = OtherUserError | TaskInProgressUserError;

export type DeleteAutomateSessionPayload = {
  deletedId?: Maybe<Scalars["ID"]["output"]>;
};

export type DeleteBackupError = OtherUserError | TaskInProgressUserError;

export type DeleteBackupPayload = {
  deletedId?: Maybe<Scalars["ID"]["output"]>;
  error?: Maybe<DeleteBackupError>;
};

export type DeleteBrowserPayload = {
  deletedId?: Maybe<Scalars["ID"]["output"]>;
};

export type DeleteDnsRewritePayload = {
  deletedId: Scalars["ID"]["output"];
};

export type DeleteDnsUpstreamPayload = {
  deletedId: Scalars["ID"]["output"];
};

export type DeleteDataExportError = OtherUserError | TaskInProgressUserError;

export type DeleteDataExportPayload = {
  deletedId?: Maybe<Scalars["ID"]["output"]>;
  userError?: Maybe<DeleteDataExportError>;
};

export type DeleteEnvironmentError = OtherUserError | UnknownIdUserError;

export type DeleteEnvironmentPayload = {
  deletedId?: Maybe<Scalars["ID"]["output"]>;
  error?: Maybe<DeleteEnvironmentError>;
};

export type DeleteFilterPresetPayload = {
  deletedId?: Maybe<Scalars["ID"]["output"]>;
};

export type DeleteFindingsInput =
  | { ids: Array<Scalars["ID"]["input"]>; reporter?: never }
  | { ids?: never; reporter: Scalars["String"]["input"] };

export type DeleteFindingsPayload = {
  deletedIds?: Maybe<Array<Scalars["ID"]["output"]>>;
};

export type DeleteHostedFilePayload = {
  deletedId?: Maybe<Scalars["ID"]["output"]>;
};

export type DeleteInterceptEntriesError =
  | OtherUserError
  | TaskInProgressUserError;

export type DeleteInterceptEntriesPayload = {
  task?: Maybe<DeleteInterceptEntriesTask>;
  userError?: Maybe<DeleteInterceptEntriesError>;
};

export type DeleteInterceptEntriesTask = {
  deletedEntryIds: Array<Scalars["ID"]["output"]>;
  id: Scalars["ID"]["output"];
};

export type DeleteInterceptEntriesTaskError =
  | InternalUserError
  | OtherUserError;

export type DeleteInterceptEntryError = OtherUserError | UnknownIdUserError;

export type DeleteInterceptEntryPayload = {
  deletedId?: Maybe<Scalars["ID"]["output"]>;
  userError?: Maybe<DeleteInterceptEntryError>;
};

export type DeleteProjectPayload = {
  deletedId?: Maybe<Scalars["ID"]["output"]>;
  error?: Maybe<DeleteProjectPayloadError>;
};

export type DeleteProjectPayloadError =
  | OtherUserError
  | ProjectUserError
  | UnknownIdUserError;

export type DeleteReplaySessionCollectionPayload = {
  deletedId?: Maybe<Scalars["ID"]["output"]>;
};

export type DeleteReplaySessionsPayload = {
  deletedIds?: Maybe<Array<Scalars["ID"]["output"]>>;
};

export type DeleteScopePayload = {
  deletedId: Scalars["ID"]["output"];
};

export type DeleteSitemapEntriesError = OtherUserError | UnknownIdUserError;

export type DeleteSitemapEntriesPayload = {
  deletedIds: Array<Scalars["ID"]["output"]>;
  errors: Array<DeleteSitemapEntriesError>;
};

export type DeleteStreamWsMessageTask = Task & {
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
};

export type DeleteTamperRuleCollectionPayload = {
  deletedId?: Maybe<Scalars["ID"]["output"]>;
};

export type DeleteTamperRulePayload = {
  deletedId?: Maybe<Scalars["ID"]["output"]>;
};

export type DeleteUpstreamPluginPayload = {
  deletedId?: Maybe<Scalars["ID"]["output"]>;
};

export type DeleteUpstreamProxyHttpPayload = {
  deletedId?: Maybe<Scalars["ID"]["output"]>;
};

export type DeleteUpstreamProxySocksPayload = {
  deletedId?: Maybe<Scalars["ID"]["output"]>;
};

export type DeleteWorkflowError =
  | OtherUserError
  | ReadOnlyUserError
  | UnknownIdUserError;

export type DeleteWorkflowPayload = {
  deletedId?: Maybe<Scalars["ID"]["output"]>;
  error?: Maybe<DeleteWorkflowError>;
};

export type DeletedAssistantSessionPayload = {
  deletedSessionId: Scalars["ID"]["output"];
  snapshot: Scalars["Snapshot"]["output"];
};

export type DeletedAutomateEntryPayload = {
  deletedAutomateEntryId: Scalars["ID"]["output"];
  snapshot: Scalars["Snapshot"]["output"];
};

export type DeletedAutomateSessionPayload = {
  deletedAutomateSessionId: Scalars["ID"]["output"];
  snapshot: Scalars["Snapshot"]["output"];
};

export type DeletedAutomateTaskError = AutomateTaskUserError | OtherUserError;

export type DeletedAutomateTaskPayload = {
  deletedAutomateTaskId: Scalars["ID"]["output"];
  error?: Maybe<DeletedAutomateTaskError>;
  snapshot: Scalars["Snapshot"]["output"];
  status: TaskStatus;
};

export type DeletedBackupPayload = {
  deletedBackupId: Scalars["ID"]["output"];
};

export type DeletedBrowserPayload = {
  deletedBrowserId: Scalars["ID"]["output"];
};

export type DeletedDnsRewritePayload = {
  deletedId: Scalars["ID"]["output"];
};

export type DeletedDnsUpstreamPayload = {
  deletedId: Scalars["ID"]["output"];
};

export type DeletedDataExportPayload = {
  deletedDataExportId: Scalars["ID"]["output"];
  snapshot: Scalars["Snapshot"]["output"];
};

export type DeletedEnvironmentPayload = {
  deletedEnvironmentId: Scalars["ID"]["output"];
  snapshot: Scalars["Snapshot"]["output"];
};

export type DeletedFilterPresetPayload = {
  deletedFilterId: Scalars["ID"]["output"];
};

export type DeletedFindingsPayload = {
  deletedFindingIds: Array<Scalars["ID"]["output"]>;
  snapshot: Scalars["Snapshot"]["output"];
};

export type DeletedHostedFilePayload = {
  deletedHostedFileId: Scalars["ID"]["output"];
};

export type DeletedInterceptEntryPayload = {
  deletedEntryId: Scalars["ID"]["output"];
  snapshot: Scalars["Snapshot"]["output"];
};

export type DeletedInterceptMessagePayload = {
  deletedMessageId: Scalars["ID"]["output"];
  snapshot: Scalars["Snapshot"]["output"];
};

export type DeletedPluginPackagePayload = {
  deletedPackageId: Scalars["ID"]["output"];
};

export type DeletedProjectPayload = {
  deletedProjectId: Scalars["ID"]["output"];
};

export type DeletedReplaySessionCollectionPayload = {
  deletedCollectionId: Scalars["ID"]["output"];
  snapshot: Scalars["Snapshot"]["output"];
};

export type DeletedReplaySessionPayload = {
  deletedSessionId: Scalars["ID"]["output"];
  snapshot: Scalars["Snapshot"]["output"];
};

export type DeletedScopePayload = {
  deletedScopeId: Scalars["ID"]["output"];
  snapshot: Scalars["Snapshot"]["output"];
};

export type DeletedSitemapEntriesPayload = {
  deletedIds: Array<Scalars["ID"]["output"]>;
  snapshot: Scalars["Snapshot"]["output"];
};

export type DeletedStreamWsMessagesPayload = {
  deletedIds: Array<Scalars["ID"]["output"]>;
};

export type DeletedTamperRuleCollectionPayload = {
  deletedCollectionId: Scalars["ID"]["output"];
  snapshot: Scalars["Snapshot"]["output"];
};

export type DeletedTamperRulePayload = {
  deletedRuleId: Scalars["ID"]["output"];
  snapshot: Scalars["Snapshot"]["output"];
};

export type DeletedUpstreamPluginPayload = {
  deletedUpstreamId: Scalars["ID"]["output"];
};

export type DeletedUpstreamProxyHttpPayload = {
  deletedProxyId: Scalars["ID"]["output"];
};

export type DeletedUpstreamProxySocksPayload = {
  deletedProxyId: Scalars["ID"]["output"];
};

export type DeletedWorkflowPayload = {
  deletedWorkflowId: Scalars["ID"]["output"];
};

export type DropInterceptMessagePayload = {
  droppedId?: Maybe<Scalars["ID"]["output"]>;
};

export type DuplicateAutomateSessionPayload = {
  session?: Maybe<AutomateSession>;
};

export type Environment = {
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  variables: Array<EnvironmentVariable>;
  version: Scalars["Int"]["output"];
};

export type EnvironmentContext = {
  global?: Maybe<Environment>;
  selected?: Maybe<Environment>;
};

export type EnvironmentVariable = {
  kind: EnvironmentVariableKind;
  name: Scalars["String"]["output"];
  value: Scalars["String"]["output"];
};

export type EnvironmentVariableInput = {
  kind: EnvironmentVariableKind;
  name: Scalars["String"]["input"];
  value: Scalars["String"]["input"];
};

export { EnvironmentVariableKind };

export type ExpiredViewerProfilePayload = {
  expiredAt: Scalars["Timestamp"]["output"];
};

export type ExportFindingsError = OtherUserError | PermissionDeniedUserError;

export type ExportFindingsInput =
  | { filter: FilterClauseFindingInput; ids?: never }
  | { filter?: never; ids: Array<Scalars["ID"]["input"]> };

export type ExportFindingsPayload = {
  error?: Maybe<ExportFindingsError>;
  export?: Maybe<DataExportOnDemand>;
};

export type ExportTamperError = OtherUserError | PermissionDeniedUserError;

export type ExportTamperInput = {
  target: TamperExportScopeInput;
};

export type ExportTamperPayload = {
  error?: Maybe<ExportTamperError>;
  export?: Maybe<DataExportOnDemand>;
};

export type FilterClauseFindingInput = {
  reporter?: InputMaybe<Scalars["String"]["input"]>;
};

export type FilterPreset = {
  alias: Scalars["Alias"]["output"];
  clause: Scalars["HTTPQL"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

/** An edge in a connection. */
export type FilterPresetEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node: FilterPreset;
};

export type Finding = {
  createdAt: Scalars["Timestamp"]["output"];
  dedupeKey?: Maybe<Scalars["String"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  hidden: Scalars["Boolean"]["output"];
  host: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  path: Scalars["String"]["output"];
  reporter: Scalars["String"]["output"];
  request: Request;
  title: Scalars["String"]["output"];
};

export type FindingConnection = {
  count: Count;
  /** A list of edges. */
  edges: Array<FindingEdge>;
  /** A list of nodes. */
  nodes: Array<Finding>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  snapshot: Scalars["Snapshot"]["output"];
};

/** An edge in a connection. */
export type FindingEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node: Finding;
};

export { FindingOrderBy };

export type FindingOrderInput = {
  by: FindingOrderBy;
  ordering: Ordering;
};

export type FindingsSummary = {
  findingsImported: Scalars["Int"]["output"];
};

export type FinishedBackupTaskCancelled = {
  taskId: Scalars["ID"]["output"];
};

export type FinishedBackupTaskError = {
  error: BackupTaskError;
  taskId: Scalars["ID"]["output"];
};

export type FinishedBackupTaskPayload =
  | FinishedBackupTaskCancelled
  | FinishedBackupTaskError
  | FinishedBackupTaskSuccess;

export type FinishedBackupTaskSuccess = {
  task: BackupTask;
};

export type FinishedDeleteInterceptEntriesTaskPayload = {
  error?: Maybe<DeleteInterceptEntriesTaskError>;
  task: DeleteInterceptEntriesTask;
};

export type FinishedRestoreBackupTaskCancelled = {
  taskId: Scalars["ID"]["output"];
};

export type FinishedRestoreBackupTaskError = {
  error: RestoreBackupTaskError;
  taskId: Scalars["ID"]["output"];
};

export type FinishedRestoreBackupTaskPayload =
  | FinishedRestoreBackupTaskCancelled
  | FinishedRestoreBackupTaskError
  | FinishedRestoreBackupTaskSuccess;

export type FinishedRestoreBackupTaskSuccess = {
  task: RestoreBackupTask;
};

export type FinishedTaskPayload = {
  error?: Maybe<UserError>;
  status: TaskStatus;
  task: Task;
};

export type ForwardInterceptMessageInput =
  | {
      request: ForwardInterceptRequestMessageInput;
      response?: never;
      streamWs?: never;
    }
  | {
      request?: never;
      response: ForwardInterceptResponseMessageInput;
      streamWs?: never;
    }
  | {
      request?: never;
      response?: never;
      streamWs: ForwardInterceptStreamWsMessageInput;
    };

export type ForwardInterceptMessagePayload = {
  forwardedId?: Maybe<Scalars["ID"]["output"]>;
};

export type ForwardInterceptRequestMessageInput = {
  updateContentLength: Scalars["Boolean"]["input"];
  updateRaw: Scalars["Blob"]["input"];
};

export type ForwardInterceptResponseMessageInput = {
  updateContentLength: Scalars["Boolean"]["input"];
  updateRaw: Scalars["Blob"]["input"];
};

export type ForwardInterceptStreamWsMessageInput = {
  updateRaw: Scalars["Blob"]["input"];
};

export type GlobalConfig = {
  address: Scalars["String"]["output"];
  project: GlobalConfigProject;
};

export type GlobalConfigProject = {
  selectOnStart: ProjectSelectOnStart;
  selectProjectId?: Maybe<Scalars["ID"]["output"]>;
};

export type GlobalizeWorkflowError =
  | OtherUserError
  | ReadOnlyUserError
  | UnknownIdUserError
  | WorkflowUserError;

export type GlobalizeWorkflowPayload = {
  error?: Maybe<GlobalizeWorkflowError>;
  workflow?: Maybe<Workflow>;
};

export type GuestAuthenticationError =
  | OtherUserError
  | PermissionDeniedUserError;

export type GuestAuthenticationPayload = {
  error?: Maybe<GuestAuthenticationError>;
  token?: Maybe<AuthenticationToken>;
};

export type GuestUser = {
  id: Scalars["ID"]["output"];
  plugins: Array<PluginFrontend>;
  settings?: Maybe<UserSettings>;
};

export type HideFindingsInput =
  | { ids: Array<Scalars["ID"]["input"]>; reporter?: never }
  | { ids?: never; reporter: Scalars["String"]["input"] };

export type HideFindingsPayload = {
  findings?: Maybe<Array<Finding>>;
};

export type HostedFile = {
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  path: Scalars["String"]["output"];
  size: Scalars["Int"]["output"];
  status: HostedFileStatus;
  updatedAt: Scalars["DateTime"]["output"];
};

export { HostedFileStatus };

export type ImportCertificateError = CertificateUserError | OtherUserError;

export type ImportCertificateInput = {
  certificate: CertificateInput;
};

export type ImportCertificatePayload = {
  error?: Maybe<ImportCertificateError>;
};

export type ImportDataInput =
  | { findings: ImportFindingsInput; tamper?: never }
  | { findings?: never; tamper: ImportTamperRuleInput };

export type ImportFindingsInput = {
  file: Scalars["Upload"]["input"];
};

export type ImportTamperRuleInput = {
  file: Scalars["Upload"]["input"];
};

export type InstallBrowserError =
  | CloudUserError
  | OtherUserError
  | UnsupportedPlatformUserError;

export type InstallBrowserPayload = {
  browser?: Maybe<Browser>;
  error?: Maybe<InstallBrowserError>;
};

export type InstallPluginPackageError =
  | CloudUserError
  | OtherUserError
  | PluginUserError
  | StoreUserError;

export type InstallPluginPackageInput = {
  force?: InputMaybe<Scalars["Boolean"]["input"]>;
  source: PluginPackageSource;
};

export type InstallPluginPackagePayload = {
  error?: Maybe<InstallPluginPackageError>;
  package?: Maybe<PluginPackage>;
};

export type InstanceSettings = {
  aiProviders: AiProviders;
  analytic: AnalyticStatus;
  onboarding: OnboardingState;
};

export type InterceptEntry = {
  id: Scalars["ID"]["output"];
  request: Request;
};

export type InterceptEntryConnection = {
  count: Count;
  /** A list of edges. */
  edges: Array<InterceptEntryEdge>;
  /** A list of nodes. */
  nodes: Array<InterceptEntry>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  snapshot: Scalars["Snapshot"]["output"];
};

/** An edge in a connection. */
export type InterceptEntryEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node: InterceptEntry;
};

export type InterceptEntryOffset = {
  offset: Scalars["Int"]["output"];
  snapshot: Scalars["Snapshot"]["output"];
};

export { InterceptEntryOrderBy };

export type InterceptEntryOrderInput = {
  by: InterceptEntryOrderBy;
  ordering: Ordering;
};

export { InterceptKind };

export type InterceptMessage = {
  id: Scalars["ID"]["output"];
};

export type InterceptMessageConnection = {
  count: Count;
  /** A list of edges. */
  edges: Array<InterceptMessageEdge>;
  /** A list of nodes. */
  nodes: Array<InterceptMessage>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  snapshot: Scalars["Snapshot"]["output"];
};

/** An edge in a connection. */
export type InterceptMessageEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node: InterceptMessage;
};

export type InterceptOptions = {
  request: InterceptRequestOptions;
  response: InterceptResponseOptions;
  scope?: Maybe<InterceptScopeOptions>;
  streamWs: InterceptStreamWsOptions;
};

export type InterceptOptionsInput = {
  request: InterceptRequestOptionsInput;
  response: InterceptResponseOptionsInput;
  scope?: InputMaybe<InterceptScopeOptionsInput>;
  streamWs: InterceptStreamWsOptionsInput;
};

export type InterceptRequestMessage = InterceptMessage & {
  id: Scalars["ID"]["output"];
  request: Request;
};

export type InterceptRequestOptions = {
  enabled: Scalars["Boolean"]["output"];
  filter?: Maybe<Scalars["HTTPQL"]["output"]>;
};

export type InterceptRequestOptionsInput = {
  enabled: Scalars["Boolean"]["input"];
  filter?: InputMaybe<Scalars["HTTPQL"]["input"]>;
};

export type InterceptResponseMessage = InterceptMessage & {
  id: Scalars["ID"]["output"];
  request: Request;
  response: Response;
};

export type InterceptResponseOptions = {
  enabled: Scalars["Boolean"]["output"];
  filter?: Maybe<Scalars["HTTPQL"]["output"]>;
};

export type InterceptResponseOptionsInput = {
  enabled: Scalars["Boolean"]["input"];
  filter?: InputMaybe<Scalars["HTTPQL"]["input"]>;
};

export type InterceptScopeOptions = {
  scopeId: Scalars["ID"]["output"];
};

export type InterceptScopeOptionsInput = {
  scopeId: Scalars["ID"]["input"];
};

export { InterceptStatus };

export type InterceptStreamWsMessage = InterceptMessage & {
  id: Scalars["ID"]["output"];
  message: StreamWsMessage;
};

export type InterceptStreamWsOptions = {
  enabled: Scalars["Boolean"]["output"];
};

export type InterceptStreamWsOptionsInput = {
  enabled: Scalars["Boolean"]["input"];
};

export type InternalUserError = UserError & {
  code: Scalars["String"]["output"];
  message: Scalars["String"]["output"];
};

export type InvalidGlobTermsUserError = UserError & {
  code: Scalars["String"]["output"];
  terms: Array<Scalars["String"]["output"]>;
};

export type InvalidHttpqlUserError = UserError & {
  code: Scalars["String"]["output"];
  query: Scalars["String"]["output"];
};

export type InvalidRegexUserError = UserError & {
  code: Scalars["String"]["output"];
  term: Scalars["String"]["output"];
};

export type LocalizeWorkflowError =
  | OtherUserError
  | ReadOnlyUserError
  | UnknownIdUserError
  | WorkflowUserError;

export type LocalizeWorkflowPayload = {
  error?: Maybe<LocalizeWorkflowError>;
  workflow?: Maybe<Workflow>;
};

export { LogLevel };

export type LogLine = {
  level: LogLevel;
  message: Scalars["String"]["output"];
  target: Scalars["String"]["output"];
  timestamp: Scalars["Timestamp"]["output"];
};

export type LogoutError = CloudUserError | OtherUserError;

export type LogoutPayload = {
  error?: Maybe<LogoutError>;
  success: Scalars["Boolean"]["output"];
};

export type MoveReplaySessionPayload = {
  session?: Maybe<ReplaySession>;
};

export type MoveTamperRulePayload = {
  rule?: Maybe<TamperRule>;
};

export type MutationRoot = {
  cancelAutomateTask: CancelAutomateTaskPayload;
  cancelBackupTask: CancelBackupTaskPayload;
  cancelRestoreBackupTask: CancelRestoreBackupTaskPayload;
  cancelTask: CancelTaskPayload;
  clearSitemapEntries: ClearSitemapEntriesPayload;
  createAssistantSession: CreateAssistantSessionPayload;
  createAutomateSession: CreateAutomateSessionPayload;
  createBackup: CreateBackupPayload;
  createDnsRewrite: CreateDnsRewritePayload;
  createDnsUpstream: CreateDnsUpstreamPayload;
  createEnvironment: CreateEnvironmentPayload;
  createFilterPreset: CreateFilterPresetPayload;
  createFinding: CreateFindingPayload;
  createProject: CreateProjectPayload;
  createReplaySession: CreateReplaySessionPayload;
  createReplaySessionCollection: CreateReplaySessionCollectionPayload;
  createScope: CreateScopePayload;
  createSitemapEntries: CreateSitemapEntriesPayload;
  createTamperRule: CreateTamperRulePayload;
  createTamperRuleCollection: CreateTamperRuleCollectionPayload;
  createUpstreamPlugin: CreateUpstreamPluginPayload;
  createUpstreamProxyHttp: CreateUpstreamProxyHttpPayload;
  createUpstreamProxySocks: CreateUpstreamProxySocksPayload;
  createWorkflow: CreateWorkflowPayload;
  deleteAssistantSession: DeleteAssistantSessionPayload;
  deleteAutomateEntries: DeleteAutomateEntriesPayload;
  deleteAutomateSession: DeleteAutomateSessionPayload;
  deleteBackup: DeleteBackupPayload;
  deleteBrowser: DeleteBrowserPayload;
  deleteDataExport: DeleteDataExportPayload;
  deleteDnsRewrite: DeleteDnsRewritePayload;
  deleteDnsUpstream: DeleteDnsUpstreamPayload;
  deleteEnvironment: DeleteEnvironmentPayload;
  deleteFilterPreset: DeleteFilterPresetPayload;
  deleteFindings: DeleteFindingsPayload;
  deleteHostedFile: DeleteHostedFilePayload;
  deleteInterceptEntries: DeleteInterceptEntriesPayload;
  deleteInterceptEntry: DeleteInterceptEntryPayload;
  deleteProject: DeleteProjectPayload;
  deleteReplaySessionCollection: DeleteReplaySessionCollectionPayload;
  deleteReplaySessions: DeleteReplaySessionsPayload;
  deleteScope: DeleteScopePayload;
  deleteSitemapEntries: DeleteSitemapEntriesPayload;
  deleteTamperRule: DeleteTamperRulePayload;
  deleteTamperRuleCollection: DeleteTamperRuleCollectionPayload;
  deleteUpstreamPlugin: DeleteUpstreamPluginPayload;
  deleteUpstreamProxyHttp: DeleteUpstreamProxyHttpPayload;
  deleteUpstreamProxySocks: DeleteUpstreamProxySocksPayload;
  deleteWorkflow: DeleteWorkflowPayload;
  dropInterceptMessage: DropInterceptMessagePayload;
  duplicateAutomateSession: DuplicateAutomateSessionPayload;
  exportFindings: ExportFindingsPayload;
  exportTamper: ExportTamperPayload;
  forwardInterceptMessage: ForwardInterceptMessagePayload;
  globalizeWorkflow: GlobalizeWorkflowPayload;
  hideFindings: HideFindingsPayload;
  importCertificate: ImportCertificatePayload;
  importData: DataImportResult;
  installBrowser: InstallBrowserPayload;
  installPluginPackage: InstallPluginPackagePayload;
  localizeWorkflow: LocalizeWorkflowPayload;
  loginAsGuest: GuestAuthenticationPayload;
  logout: LogoutPayload;
  moveReplaySession: MoveReplaySessionPayload;
  moveTamperRule: MoveTamperRulePayload;
  pauseAutomateTask: PauseAutomateTaskPayload;
  pauseIntercept: PauseInterceptPayload;
  persistProject: PersistProjectPayload;
  rankDnsRewrite: RankDnsRewritePayload;
  rankReplaySession: RankReplaySessionPayload;
  rankReplaySessionCollection: RankReplaySessionCollectionPayload;
  rankTamperRule: RankTamperRulePayload;
  rankUpstreamPlugin: RankUpstreamPluginPayload;
  rankUpstreamProxyHttp: RankUpstreamProxyHttpPayload;
  rankUpstreamProxySocks: RankUpstreamProxySocksPayload;
  refreshAuthenticationToken: RefreshAuthenticationTokenPayload;
  regenerateCertificate: RegenerateCertificatePayload;
  renameAssistantSession: RenameAssistantSessionPayload;
  renameAutomateEntry: RenameAutomateEntryPayload;
  renameAutomateSession: RenameAutomateSessionPayload;
  renameBackup: RenameBackupPayload;
  renameDataExport: RenameDataExportPayload;
  renameHostedFile: RenameHostedFilePayload;
  renameProject: RenameProjectPayload;
  renameReplaySession: RenameReplaySessionPayload;
  renameReplaySessionCollection: RenameReplaySessionCollectionPayload;
  renameScope: RenameScopePayload;
  renameTamperRule: RenameTamperRulePayload;
  renameTamperRuleCollection: RenameTamperRuleCollectionPayload;
  renameWorkflow: RenameWorkflowPayload;
  renderRequest: RenderRequestPayload;
  restoreBackup: RestoreBackupPayload;
  resumeAutomateTask: ResumeAutomateTaskPayload;
  resumeIntercept: ResumeInterceptPayload;
  runActiveWorkflow: RunActiveWorkflowPayload;
  runConvertWorkflow: RunConvertWorkflowPayload;
  selectEnvironment: SelectEnvironmentPayload;
  selectProject: SelectProjectPayload;
  sendAssistantMessage: SendAssistantMessagePayload;
  /** @deprecated Remove usage, no replacement */
  setActiveReplaySessionEntry: SetActiveReplaySessionEntryPayload;
  setGlobalConfigPort: SetConfigPortPayload;
  setGlobalConfigProject: SetConfigProjectPayload;
  setInstanceSettings: SetInstanceSettingsPayload;
  setInterceptOptions: SetInterceptOptionsPayload;
  setPluginData: SetPluginDataPayload;
  setProjectConfigStream: SetProjectConfigStreamPayload;
  startAuthenticationFlow: StartAuthenticationFlowPayload;
  startAutomateTask: StartAutomateTaskPayload;
  startDeleteStreamWsMessageTask: StartDeleteStreamWsMessageTaskPayload;
  startExportRequestsTask: StartExportRequestsTaskPayload;
  startReplayTask: StartReplayTaskPayload;
  testAiProvider: TestAiProviderPayload;
  testTamperRule: TestTamperRulePayload;
  testUpstreamProxyHttp: TestUpstreamProxyHttpPayload;
  testUpstreamProxySocks: TestUpstreamProxySocksPayload;
  testWorkflowActive: TestWorkflowActivePayload;
  testWorkflowConvert: TestWorkflowConvertPayload;
  testWorkflowPassive: TestWorkflowPassivePayload;
  toggleDnsRewrite: ToggleDnsRewritePayload;
  togglePlugin: TogglePluginPayload;
  toggleTamperRule: ToggleTamperRulePayload;
  toggleUpstreamPlugin: ToggleUpstreamPluginPayload;
  toggleUpstreamProxyHttp: ToggleUpstreamProxyHttpPayload;
  toggleUpstreamProxySocks: ToggleUpstreamProxySocksPayload;
  toggleWorkflow: ToggleWorkflowPayload;
  track: TrackPayload;
  uninstallPluginPackage: UninstallPluginPackagePayload;
  updateAutomateSession: UpdateAutomateSessionPayload;
  updateBrowser: UpdateBrowserPayload;
  updateDnsRewrite: UpdateDnsRewritePayload;
  updateDnsUpstream: UpdateDnsUpstreamPayload;
  updateEnvironment: UpdateEnvironmentPayload;
  updateFilterPreset: UpdateFilterPresetPayload;
  updateFinding: UpdateFindingPayload;
  updateRequestMetadata: UpdateRequestMetadataPayload;
  updateScope: UpdateScopePayload;
  updateTamperRule: UpdateTamperRulePayload;
  updateUpstreamPlugin: UpdateUpstreamPluginPayload;
  updateUpstreamProxyHttp: UpdateUpstreamProxyHttpPayload;
  updateUpstreamProxySocks: UpdateUpstreamProxySocksPayload;
  updateViewerSettings: UpdateViewerSettingsPayload;
  updateWorkflow: UpdateWorkflowPayload;
  uploadHostedFile: UploadHostedFilePayload;
};

export type MutationRootCancelAutomateTaskArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRootCancelBackupTaskArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRootCancelRestoreBackupTaskArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRootCancelTaskArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRootCreateAssistantSessionArgs = {
  input: CreateAssistantSessionInput;
};

export type MutationRootCreateAutomateSessionArgs = {
  input: CreateAutomateSessionInput;
};

export type MutationRootCreateBackupArgs = {
  projectId: Scalars["ID"]["input"];
};

export type MutationRootCreateDnsRewriteArgs = {
  input: CreateDnsRewriteInput;
};

export type MutationRootCreateDnsUpstreamArgs = {
  input: CreateDnsUpstreamInput;
};

export type MutationRootCreateEnvironmentArgs = {
  input: CreateEnvironmentInput;
};

export type MutationRootCreateFilterPresetArgs = {
  input: CreateFilterPresetInput;
};

export type MutationRootCreateFindingArgs = {
  input: CreateFindingInput;
  requestId: Scalars["ID"]["input"];
};

export type MutationRootCreateProjectArgs = {
  input: CreateProjectInput;
};

export type MutationRootCreateReplaySessionArgs = {
  input: CreateReplaySessionInput;
};

export type MutationRootCreateReplaySessionCollectionArgs = {
  input: CreateReplaySessionCollectionInput;
};

export type MutationRootCreateScopeArgs = {
  input: CreateScopeInput;
};

export type MutationRootCreateSitemapEntriesArgs = {
  requestId: Scalars["ID"]["input"];
};

export type MutationRootCreateTamperRuleArgs = {
  input: CreateTamperRuleInput;
};

export type MutationRootCreateTamperRuleCollectionArgs = {
  input: CreateTamperRuleCollectionInput;
};

export type MutationRootCreateUpstreamPluginArgs = {
  input: CreateUpstreamPluginInput;
};

export type MutationRootCreateUpstreamProxyHttpArgs = {
  input: CreateUpstreamProxyHttpInput;
};

export type MutationRootCreateUpstreamProxySocksArgs = {
  input: CreateUpstreamProxySocksInput;
};

export type MutationRootCreateWorkflowArgs = {
  input: CreateWorkflowInput;
};

export type MutationRootDeleteAssistantSessionArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRootDeleteAutomateEntriesArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type MutationRootDeleteAutomateSessionArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRootDeleteBackupArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRootDeleteDataExportArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRootDeleteDnsRewriteArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRootDeleteDnsUpstreamArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRootDeleteEnvironmentArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRootDeleteFilterPresetArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRootDeleteFindingsArgs = {
  input?: InputMaybe<DeleteFindingsInput>;
};

export type MutationRootDeleteHostedFileArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRootDeleteInterceptEntriesArgs = {
  filter?: InputMaybe<Scalars["HTTPQL"]["input"]>;
  scopeId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type MutationRootDeleteInterceptEntryArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRootDeleteProjectArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRootDeleteReplaySessionCollectionArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRootDeleteReplaySessionsArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type MutationRootDeleteScopeArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRootDeleteSitemapEntriesArgs = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type MutationRootDeleteTamperRuleArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRootDeleteTamperRuleCollectionArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRootDeleteUpstreamPluginArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRootDeleteUpstreamProxyHttpArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRootDeleteUpstreamProxySocksArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRootDeleteWorkflowArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRootDropInterceptMessageArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRootDuplicateAutomateSessionArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRootExportFindingsArgs = {
  input: ExportFindingsInput;
};

export type MutationRootExportTamperArgs = {
  input: ExportTamperInput;
};

export type MutationRootForwardInterceptMessageArgs = {
  id: Scalars["ID"]["input"];
  input?: InputMaybe<ForwardInterceptMessageInput>;
};

export type MutationRootGlobalizeWorkflowArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRootHideFindingsArgs = {
  input?: InputMaybe<HideFindingsInput>;
};

export type MutationRootImportCertificateArgs = {
  input: ImportCertificateInput;
};

export type MutationRootImportDataArgs = {
  input: ImportDataInput;
};

export type MutationRootInstallPluginPackageArgs = {
  input: InstallPluginPackageInput;
};

export type MutationRootLocalizeWorkflowArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRootMoveReplaySessionArgs = {
  collectionId: Scalars["ID"]["input"];
  id: Scalars["ID"]["input"];
};

export type MutationRootMoveTamperRuleArgs = {
  collectionId: Scalars["ID"]["input"];
  id: Scalars["ID"]["input"];
};

export type MutationRootPauseAutomateTaskArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRootPersistProjectArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRootRankDnsRewriteArgs = {
  id: Scalars["ID"]["input"];
  input: RankInput;
};

export type MutationRootRankReplaySessionArgs = {
  id: Scalars["ID"]["input"];
  input: RankInput;
};

export type MutationRootRankReplaySessionCollectionArgs = {
  id: Scalars["ID"]["input"];
  input: RankInput;
};

export type MutationRootRankTamperRuleArgs = {
  id: Scalars["ID"]["input"];
  input: RankTamperRuleInput;
};

export type MutationRootRankUpstreamPluginArgs = {
  id: Scalars["ID"]["input"];
  input: RankInput;
};

export type MutationRootRankUpstreamProxyHttpArgs = {
  id: Scalars["ID"]["input"];
  input: RankInput;
};

export type MutationRootRankUpstreamProxySocksArgs = {
  id: Scalars["ID"]["input"];
  input: RankInput;
};

export type MutationRootRefreshAuthenticationTokenArgs = {
  refreshToken: Scalars["Token"]["input"];
};

export type MutationRootRenameAssistantSessionArgs = {
  id: Scalars["ID"]["input"];
  name: Scalars["String"]["input"];
};

export type MutationRootRenameAutomateEntryArgs = {
  id: Scalars["ID"]["input"];
  name: Scalars["String"]["input"];
};

export type MutationRootRenameAutomateSessionArgs = {
  id: Scalars["ID"]["input"];
  name: Scalars["String"]["input"];
};

export type MutationRootRenameBackupArgs = {
  id: Scalars["ID"]["input"];
  name: Scalars["String"]["input"];
};

export type MutationRootRenameDataExportArgs = {
  id: Scalars["ID"]["input"];
  name: Scalars["String"]["input"];
};

export type MutationRootRenameHostedFileArgs = {
  id: Scalars["ID"]["input"];
  name: Scalars["String"]["input"];
};

export type MutationRootRenameProjectArgs = {
  id: Scalars["ID"]["input"];
  name: Scalars["String"]["input"];
};

export type MutationRootRenameReplaySessionArgs = {
  id: Scalars["ID"]["input"];
  name: Scalars["String"]["input"];
};

export type MutationRootRenameReplaySessionCollectionArgs = {
  id: Scalars["ID"]["input"];
  name: Scalars["String"]["input"];
};

export type MutationRootRenameScopeArgs = {
  id: Scalars["ID"]["input"];
  name: Scalars["String"]["input"];
};

export type MutationRootRenameTamperRuleArgs = {
  id: Scalars["ID"]["input"];
  name: Scalars["String"]["input"];
};

export type MutationRootRenameTamperRuleCollectionArgs = {
  id: Scalars["ID"]["input"];
  name: Scalars["String"]["input"];
};

export type MutationRootRenameWorkflowArgs = {
  id: Scalars["ID"]["input"];
  name: Scalars["String"]["input"];
};

export type MutationRootRenderRequestArgs = {
  id: Scalars["ID"]["input"];
  input: RenderRequestInput;
};

export type MutationRootRestoreBackupArgs = {
  input: RestoreBackupInput;
};

export type MutationRootResumeAutomateTaskArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRootRunActiveWorkflowArgs = {
  id: Scalars["ID"]["input"];
  input: RunActiveWorkflowInput;
};

export type MutationRootRunConvertWorkflowArgs = {
  id: Scalars["ID"]["input"];
  input: Scalars["Blob"]["input"];
};

export type MutationRootSelectEnvironmentArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type MutationRootSelectProjectArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRootSendAssistantMessageArgs = {
  message?: InputMaybe<Scalars["String"]["input"]>;
  sessionId: Scalars["ID"]["input"];
};

export type MutationRootSetActiveReplaySessionEntryArgs = {
  entryId: Scalars["ID"]["input"];
  id: Scalars["ID"]["input"];
};

export type MutationRootSetGlobalConfigPortArgs = {
  input: Scalars["Int"]["input"];
};

export type MutationRootSetGlobalConfigProjectArgs = {
  input: SetConfigProjectInput;
};

export type MutationRootSetInstanceSettingsArgs = {
  input: SetInstanceSettingsInput;
};

export type MutationRootSetInterceptOptionsArgs = {
  input: InterceptOptionsInput;
};

export type MutationRootSetPluginDataArgs = {
  data: Scalars["JSON"]["input"];
  id: Scalars["ID"]["input"];
};

export type MutationRootSetProjectConfigStreamArgs = {
  input: ProjectConfigStreamInput;
};

export type MutationRootStartAutomateTaskArgs = {
  automateSessionId: Scalars["ID"]["input"];
};

export type MutationRootStartDeleteStreamWsMessageTaskArgs = {
  input: StartDeleteStreamWsMessageTaskInput;
};

export type MutationRootStartExportRequestsTaskArgs = {
  input: StartExportRequestsTaskInput;
};

export type MutationRootStartReplayTaskArgs = {
  input: StartReplayTaskInput;
  sessionId: Scalars["ID"]["input"];
};

export type MutationRootTestAiProviderArgs = {
  input: TestAiProviderInput;
};

export type MutationRootTestTamperRuleArgs = {
  input: TestTamperRuleInput;
};

export type MutationRootTestUpstreamProxyHttpArgs = {
  input: TestUpstreamProxyHttpInput;
};

export type MutationRootTestUpstreamProxySocksArgs = {
  input: TestUpstreamProxySocksInput;
};

export type MutationRootTestWorkflowActiveArgs = {
  input: TestWorkflowActiveInput;
};

export type MutationRootTestWorkflowConvertArgs = {
  input: TestWorkflowConvertInput;
};

export type MutationRootTestWorkflowPassiveArgs = {
  input: TestWorkflowPassiveInput;
};

export type MutationRootToggleDnsRewriteArgs = {
  enabled: Scalars["Boolean"]["input"];
  id: Scalars["ID"]["input"];
};

export type MutationRootTogglePluginArgs = {
  enabled: Scalars["Boolean"]["input"];
  id: Scalars["ID"]["input"];
};

export type MutationRootToggleTamperRuleArgs = {
  enabled: Scalars["Boolean"]["input"];
  id: Scalars["ID"]["input"];
};

export type MutationRootToggleUpstreamPluginArgs = {
  enabled: Scalars["Boolean"]["input"];
  id: Scalars["ID"]["input"];
};

export type MutationRootToggleUpstreamProxyHttpArgs = {
  enabled: Scalars["Boolean"]["input"];
  id: Scalars["ID"]["input"];
};

export type MutationRootToggleUpstreamProxySocksArgs = {
  enabled: Scalars["Boolean"]["input"];
  id: Scalars["ID"]["input"];
};

export type MutationRootToggleWorkflowArgs = {
  enabled: Scalars["Boolean"]["input"];
  id: Scalars["ID"]["input"];
};

export type MutationRootTrackArgs = {
  input: TrackInput;
};

export type MutationRootUninstallPluginPackageArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationRootUpdateAutomateSessionArgs = {
  id: Scalars["ID"]["input"];
  input: UpdateAutomateSessionInput;
};

export type MutationRootUpdateDnsRewriteArgs = {
  id: Scalars["ID"]["input"];
  input: UpdateDnsRewriteInput;
};

export type MutationRootUpdateDnsUpstreamArgs = {
  id: Scalars["ID"]["input"];
  input: UpdateDnsUpstreamInput;
};

export type MutationRootUpdateEnvironmentArgs = {
  id: Scalars["ID"]["input"];
  input: UpdateEnvironmentInput;
};

export type MutationRootUpdateFilterPresetArgs = {
  id: Scalars["ID"]["input"];
  input: UpdateFilterPresetInput;
};

export type MutationRootUpdateFindingArgs = {
  id: Scalars["ID"]["input"];
  input: UpdateFindingInput;
};

export type MutationRootUpdateRequestMetadataArgs = {
  id: Scalars["ID"]["input"];
  input: UpdateRequestMetadataInput;
};

export type MutationRootUpdateScopeArgs = {
  id: Scalars["ID"]["input"];
  input: UpdateScopeInput;
};

export type MutationRootUpdateTamperRuleArgs = {
  id: Scalars["ID"]["input"];
  input: UpdateTamperRuleInput;
};

export type MutationRootUpdateUpstreamPluginArgs = {
  id: Scalars["ID"]["input"];
  input: UpdateUpstreamPluginInput;
};

export type MutationRootUpdateUpstreamProxyHttpArgs = {
  id: Scalars["ID"]["input"];
  input: UpdateUpstreamProxyHttpInput;
};

export type MutationRootUpdateUpstreamProxySocksArgs = {
  id: Scalars["ID"]["input"];
  input: UpdateUpstreamProxySocksInput;
};

export type MutationRootUpdateViewerSettingsArgs = {
  input: UpdateViewerSettingsInput;
};

export type MutationRootUpdateWorkflowArgs = {
  id: Scalars["ID"]["input"];
  input: UpdateWorkflowInput;
};

export type MutationRootUploadHostedFileArgs = {
  input: UploadHostedFileInput;
};

export type NameTakenUserError = UserError & {
  code: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
};

export type NewerVersionUserError = UserError & {
  code: Scalars["String"]["output"];
  version: Scalars["Int"]["output"];
};

export type OnboardingState = {
  analytic: Scalars["Boolean"]["output"];
};

export { Ordering };

export type OtherUserError = UserError & {
  code: Scalars["String"]["output"];
};

/** Information about pagination in a connection */
export type PageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars["String"]["output"]>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars["Boolean"]["output"];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars["Boolean"]["output"];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars["String"]["output"]>;
};

export type PauseAutomateTaskError = OtherUserError | UnknownIdUserError;

export type PauseAutomateTaskPayload = {
  automateTask?: Maybe<AutomateTask>;
  userError?: Maybe<PauseAutomateTaskError>;
};

export type PauseInterceptPayload = {
  status: InterceptStatus;
};

export { PermissionDeniedErrorReason };

export type PermissionDeniedUserError = UserError & {
  code: Scalars["String"]["output"];
  reason: PermissionDeniedErrorReason;
};

export type PersistProjectPayload = {
  error?: Maybe<PersistProjectPayloadError>;
  project?: Maybe<Project>;
};

export type PersistProjectPayloadError =
  | OtherUserError
  | PermissionDeniedUserError
  | UnknownIdUserError;

export type Plugin = {
  enabled: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  manifestId: Scalars["ID"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  package: PluginPackage;
};

export type PluginAuthor = {
  email?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  url?: Maybe<Scalars["String"]["output"]>;
};

export type PluginBackend = Plugin & {
  enabled: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  manifestId: Scalars["ID"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  package: PluginPackage;
  runtime: PluginRuntime;
  state: PluginState;
};

export { PluginErrorReason };

export type PluginFrontend = Plugin & {
  assets?: Maybe<Scalars["String"]["output"]>;
  backend?: Maybe<PluginBackend>;
  data?: Maybe<Scalars["JSON"]["output"]>;
  enabled: Scalars["Boolean"]["output"];
  entrypoint?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  manifestId: Scalars["ID"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  package: PluginPackage;
  style?: Maybe<Scalars["String"]["output"]>;
};

export type PluginLinks = {
  sponsor?: Maybe<Scalars["Url"]["output"]>;
};

export type PluginPackage = {
  author?: Maybe<PluginAuthor>;
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  installedAt: Scalars["DateTime"]["output"];
  links?: Maybe<PluginLinks>;
  manifestId: Scalars["ID"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  plugins: Array<Plugin>;
  version: Scalars["String"]["output"];
};

export type PluginPackageSource =
  | { file: Scalars["Upload"]["input"]; manifestId?: never; url?: never }
  | { file?: never; manifestId: Scalars["ID"]["input"]; url?: never }
  | { file?: never; manifestId?: never; url: Scalars["Url"]["input"] };

export { PluginRuntime };

export type PluginState = {
  error?: Maybe<Scalars["String"]["output"]>;
  running: Scalars["Boolean"]["output"];
};

export type PluginUserError = UserError & {
  code: Scalars["String"]["output"];
  reason: PluginErrorReason;
};

export type PluginWorkflow = Plugin & {
  enabled: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  manifestId: Scalars["ID"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  package: PluginPackage;
  workflow?: Maybe<Workflow>;
};

export type Project = {
  backups: Array<Backup>;
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  path: Scalars["String"]["output"];
  /** Defines if the project would be read-only if selected by the caller */
  readOnly: Scalars["Boolean"]["output"];
  size: Scalars["Int"]["output"];
  status: ProjectStatus;
  temporary: Scalars["Boolean"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  version: Scalars["String"]["output"];
};

export type ProjectConfig = {
  stream: ProjectConfigStream;
};

export type ProjectConfigStream = {
  stripExtension: Scalars["Boolean"]["output"];
};

export type ProjectConfigStreamInput = {
  stripExtension: Scalars["Boolean"]["input"];
};

export { ProjectErrorReason };

export { ProjectSelectOnStart };

export { ProjectStatus };

export type ProjectUserError = UserError & {
  code: Scalars["String"]["output"];
  reason: ProjectErrorReason;
};

export type QueryRoot = {
  assistantModels: Array<AssistantModel>;
  assistantSession?: Maybe<AssistantSession>;
  assistantSessions: Array<AssistantSession>;
  authenticationState: AuthenticationState;
  automateEntry?: Maybe<AutomateEntry>;
  automateSession?: Maybe<AutomateSession>;
  automateSessions: AutomateSessionConnection;
  automateTasks: AutomateTaskConnection;
  backup?: Maybe<Backup>;
  backupTasks: Array<BackupTask>;
  backups: Array<Backup>;
  browser?: Maybe<Browser>;
  currentProject?: Maybe<CurrentProject>;
  dataExport?: Maybe<DataExport>;
  dataExports: Array<DataExport>;
  dnsRewrites: Array<DnsRewrite>;
  dnsUpstreams: Array<DnsUpstream>;
  environment?: Maybe<Environment>;
  environmentContext: EnvironmentContext;
  environments: Array<Environment>;
  filterPreset?: Maybe<FilterPreset>;
  filterPresets: Array<FilterPreset>;
  finding?: Maybe<Finding>;
  findingReporters: Array<Scalars["String"]["output"]>;
  findings: FindingConnection;
  findingsByOffset: FindingConnection;
  globalConfig: GlobalConfig;
  hostedFiles: Array<HostedFile>;
  instanceSettings: InstanceSettings;
  interceptEntries: InterceptEntryConnection;
  interceptEntriesByOffset: InterceptEntryConnection;
  interceptEntry?: Maybe<InterceptEntry>;
  interceptEntryOffset?: Maybe<InterceptEntryOffset>;
  interceptMessages: InterceptMessageConnection;
  interceptOptions: InterceptOptions;
  interceptStatus: InterceptStatus;
  pluginPackages: Array<PluginPackage>;
  projects: Array<Project>;
  replayEntry?: Maybe<ReplayEntry>;
  replaySession?: Maybe<ReplaySession>;
  replaySessionCollections: ReplaySessionCollectionConnection;
  replaySessions: ReplaySessionConnection;
  request?: Maybe<Request>;
  requestOffset?: Maybe<RequestOffset>;
  requests: RequestConnection;
  requestsByOffset: RequestConnection;
  response?: Maybe<Response>;
  restoreBackupTasks: Array<RestoreBackupTask>;
  runtime: Runtime;
  scope?: Maybe<Scope>;
  scopes: Array<Scope>;
  sitemapDescendantEntries: SitemapEntryConnection;
  sitemapEntry?: Maybe<SitemapEntry>;
  sitemapRootEntries: SitemapEntryConnection;
  store: Store;
  stream?: Maybe<Stream>;
  streamWsMessage?: Maybe<StreamWsMessage>;
  streamWsMessageEdit?: Maybe<StreamWsMessageEdit>;
  streamWsMessages: StreamWsMessageConnection;
  streamWsMessagesByOffset: StreamWsMessageConnection;
  streams: StreamConnection;
  streamsByOffset: StreamConnection;
  tamperRule?: Maybe<TamperRule>;
  tamperRuleCollection?: Maybe<TamperRuleCollection>;
  tamperRuleCollections: Array<TamperRuleCollection>;
  tasks: Array<Task>;
  upstreamPlugins: Array<UpstreamPlugin>;
  upstreamProxiesHttp: Array<UpstreamProxyHttp>;
  upstreamProxiesSocks: Array<UpstreamProxySocks>;
  viewer: User;
  workflow?: Maybe<Workflow>;
  workflowNodeDefinitions: Array<WorkflowNodeDefinition>;
  workflows: Array<Workflow>;
};

export type QueryRootAssistantSessionArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryRootAutomateEntryArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryRootAutomateSessionArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryRootAutomateSessionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryRootAutomateTasksArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryRootBackupArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryRootDataExportArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryRootEnvironmentArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryRootFilterPresetArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryRootFindingArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryRootFindingsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  filter?: InputMaybe<FilterClauseFindingInput>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  order?: InputMaybe<FindingOrderInput>;
};

export type QueryRootFindingsByOffsetArgs = {
  filter?: InputMaybe<FilterClauseFindingInput>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  order?: InputMaybe<FindingOrderInput>;
};

export type QueryRootInterceptEntriesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  filter?: InputMaybe<Scalars["HTTPQL"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  order?: InputMaybe<InterceptEntryOrderInput>;
  scopeId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryRootInterceptEntriesByOffsetArgs = {
  filter?: InputMaybe<Scalars["HTTPQL"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  order?: InputMaybe<InterceptEntryOrderInput>;
  scopeId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryRootInterceptEntryArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryRootInterceptEntryOffsetArgs = {
  filter?: InputMaybe<Scalars["HTTPQL"]["input"]>;
  id: Scalars["ID"]["input"];
  order?: InputMaybe<InterceptEntryOrderInput>;
  scopeId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryRootInterceptMessagesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  kind: InterceptKind;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryRootReplayEntryArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryRootReplaySessionArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryRootReplaySessionCollectionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryRootReplaySessionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryRootRequestArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryRootRequestOffsetArgs = {
  filter?: InputMaybe<Scalars["HTTPQL"]["input"]>;
  id: Scalars["ID"]["input"];
  order?: InputMaybe<RequestResponseOrderInput>;
  scopeId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryRootRequestsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  filter?: InputMaybe<Scalars["HTTPQL"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  order?: InputMaybe<RequestResponseOrderInput>;
  scopeId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryRootRequestsByOffsetArgs = {
  filter?: InputMaybe<Scalars["HTTPQL"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  order?: InputMaybe<RequestResponseOrderInput>;
  scopeId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryRootResponseArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryRootScopeArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryRootSitemapDescendantEntriesArgs = {
  depth: SitemapDescendantsDepth;
  parentId: Scalars["ID"]["input"];
};

export type QueryRootSitemapEntryArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryRootSitemapRootEntriesArgs = {
  scopeId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryRootStreamArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryRootStreamWsMessageArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryRootStreamWsMessageEditArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryRootStreamWsMessagesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  order?: InputMaybe<StreamWsMessageOrderInput>;
  streamId: Scalars["ID"]["input"];
};

export type QueryRootStreamWsMessagesByOffsetArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  order?: InputMaybe<StreamWsMessageOrderInput>;
  streamId: Scalars["ID"]["input"];
};

export type QueryRootStreamsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  order?: InputMaybe<StreamOrderInput>;
  protocol: StreamProtocol;
  scopeId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryRootStreamsByOffsetArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  order?: InputMaybe<StreamOrderInput>;
  protocol: StreamProtocol;
  scopeId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryRootTamperRuleArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryRootTamperRuleCollectionArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryRootWorkflowArgs = {
  id: Scalars["ID"]["input"];
};

export type Range = {
  end: Scalars["Int"]["output"];
  start: Scalars["Int"]["output"];
};

export type RangeInput = {
  end: Scalars["Int"]["input"];
  start: Scalars["Int"]["input"];
};

export type RankDnsRewritePayload = {
  rewrite: DnsRewrite;
};

export { RankErrorReason };

export type RankInput = {
  afterId?: InputMaybe<Scalars["ID"]["input"]>;
  beforeId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type RankReplaySessionCollectionPayload = {
  collection?: Maybe<ReplaySessionCollection>;
  error?: Maybe<RankSessionCollectionPayloadError>;
};

export type RankReplaySessionPayload = {
  error?: Maybe<RankSessionPayloadError>;
  session?: Maybe<ReplaySession>;
};

export type RankSessionCollectionPayloadError =
  | OtherUserError
  | RankUserError
  | UnknownIdUserError;

export type RankSessionPayloadError =
  | OtherUserError
  | RankUserError
  | UnknownIdUserError;

export type RankTamperRuleError =
  | OtherUserError
  | RankUserError
  | UnknownIdUserError;

export type RankTamperRuleInput = {
  afterId?: InputMaybe<Scalars["ID"]["input"]>;
  beforeId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type RankTamperRulePayload = {
  error?: Maybe<RankTamperRuleError>;
  rule?: Maybe<TamperRule>;
};

export type RankUpstreamPluginPayload = {
  upstream?: Maybe<UpstreamPlugin>;
};

export type RankUpstreamProxyHttpPayload = {
  proxy?: Maybe<UpstreamProxyHttp>;
};

export type RankUpstreamProxySocksPayload = {
  proxy?: Maybe<UpstreamProxySocks>;
};

export type RankUserError = UserError & {
  code: Scalars["String"]["output"];
  reason: RankErrorReason;
};

export type ReadOnlyUserError = UserError & {
  code: Scalars["String"]["output"];
};

export { RedirectStrategy };

export type RefreshAuthenticationTokenError =
  | AuthenticationUserError
  | CloudUserError
  | InternalUserError
  | OtherUserError;

export type RefreshAuthenticationTokenPayload = {
  error?: Maybe<RefreshAuthenticationTokenError>;
  token?: Maybe<AuthenticationToken>;
};

export type RegenerateCertificatePayload = {
  success: Scalars["Boolean"]["output"];
};

export type Release = {
  links: Array<ReleaseLink>;
  releasedAt: Scalars["DateTime"]["output"];
  version: Scalars["String"]["output"];
};

export type ReleaseLink = {
  display: Scalars["String"]["output"];
  link: Scalars["String"]["output"];
  platform: Scalars["String"]["output"];
};

export type RenameAssistantSessionPayload = {
  session?: Maybe<AssistantSession>;
};

export type RenameAutomateEntryPayload = {
  entry?: Maybe<AutomateEntry>;
};

export type RenameAutomateSessionPayload = {
  session?: Maybe<AutomateSession>;
};

export type RenameBackupPayload = {
  backup?: Maybe<Backup>;
};

export type RenameDataExportPayload = {
  export?: Maybe<DataExport>;
};

export type RenameHostedFilePayload = {
  hostedFile?: Maybe<HostedFile>;
};

export type RenameProjectPayload = {
  error?: Maybe<RenameProjectPayloadError>;
  project?: Maybe<Project>;
};

export type RenameProjectPayloadError =
  | NameTakenUserError
  | OtherUserError
  | UnknownIdUserError;

export type RenameReplaySessionCollectionPayload = {
  collection?: Maybe<ReplaySessionCollection>;
};

export type RenameReplaySessionPayload = {
  session?: Maybe<ReplaySession>;
};

export type RenameScopePayload = {
  scope: Scope;
};

export type RenameTamperRuleCollectionPayload = {
  collection?: Maybe<TamperRuleCollection>;
};

export type RenameTamperRulePayload = {
  rule?: Maybe<TamperRule>;
};

export type RenameWorkflowError =
  | OtherUserError
  | ReadOnlyUserError
  | UnknownIdUserError;

export type RenameWorkflowPayload = {
  error?: Maybe<RenameWorkflowError>;
  workflow?: Maybe<Workflow>;
};

export { RenderFailedErrorReason };

export type RenderFailedUserError = UserError & {
  code: Scalars["String"]["output"];
  reason: RenderFailedErrorReason;
};

export type RenderRequestError = OtherUserError | RenderFailedUserError;

export type RenderRequestInput = {
  height: Scalars["Int"]["input"];
  width: Scalars["Int"]["input"];
};

export type RenderRequestPayload = {
  error?: Maybe<RenderRequestError>;
  render?: Maybe<Scalars["Image"]["output"]>;
};

export type ReplayEntry = {
  connection: ConnectionInfo;
  createdAt: Scalars["Timestamp"]["output"];
  error?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  raw: Scalars["Blob"]["output"];
  request?: Maybe<Request>;
  session: ReplaySession;
  settings: ReplayEntrySettings;
};

export type ReplayEntryConnection = {
  count: Count;
  /** A list of edges. */
  edges: Array<ReplayEntryEdge>;
  /** A list of nodes. */
  nodes: Array<ReplayEntry>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  snapshot: Scalars["Snapshot"]["output"];
};

/** An edge in a connection. */
export type ReplayEntryEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node: ReplayEntry;
};

export { ReplayEntryOrderBy };

export type ReplayEntryOrderInput = {
  by: ReplayEntryOrderBy;
  ordering: Ordering;
};

export type ReplayEntrySettings = {
  placeholders: Array<ReplayPlaceholder>;
};

export type ReplayEntrySettingsInput = {
  connectionClose: Scalars["Boolean"]["input"];
  placeholders: Array<ReplayPlaceholderInput>;
  updateContentLength: Scalars["Boolean"]["input"];
};

export type ReplayEnvironmentPreprocessor = {
  variableName: Scalars["String"]["output"];
};

export type ReplayEnvironmentPreprocessorInput = {
  variableName: Scalars["String"]["input"];
};

export type ReplayPlaceholder = {
  inputRange: Range;
  outputRange: Range;
  preprocessors: Array<ReplayPreprocessor>;
};

export type ReplayPlaceholderInput = {
  inputRange: RangeInput;
  outputRange: RangeInput;
  preprocessors: Array<ReplayPreprocessorInput>;
};

export type ReplayPrefixPreprocessor = {
  value: Scalars["String"]["output"];
};

export type ReplayPrefixPreprocessorInput = {
  value: Scalars["String"]["input"];
};

export type ReplayPreprocessor = {
  options: ReplayPreprocessorOptions;
};

export type ReplayPreprocessorInput = {
  options: ReplayPreprocessorOptionsInput;
};

export type ReplayPreprocessorOptions =
  | ReplayEnvironmentPreprocessor
  | ReplayPrefixPreprocessor
  | ReplaySuffixPreprocessor
  | ReplayUrlEncodePreprocessor
  | ReplayWorkflowPreprocessor;

export type ReplayPreprocessorOptionsInput =
  | {
      environment: ReplayEnvironmentPreprocessorInput;
      prefix?: never;
      suffix?: never;
      urlEncode?: never;
      workflow?: never;
    }
  | {
      environment?: never;
      prefix: ReplayPrefixPreprocessorInput;
      suffix?: never;
      urlEncode?: never;
      workflow?: never;
    }
  | {
      environment?: never;
      prefix?: never;
      suffix: ReplaySuffixPreprocessorInput;
      urlEncode?: never;
      workflow?: never;
    }
  | {
      environment?: never;
      prefix?: never;
      suffix?: never;
      urlEncode: ReplayUrlEncodePreprocessorInput;
      workflow?: never;
    }
  | {
      environment?: never;
      prefix?: never;
      suffix?: never;
      urlEncode?: never;
      workflow: ReplayWorkflowPreprocessorInput;
    };

export type ReplaySession = {
  activeEntry?: Maybe<ReplayEntry>;
  collection: ReplaySessionCollection;
  entries: ReplayEntryConnection;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  rank: Scalars["Rank"]["output"];
};

export type ReplaySessionEntriesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  order?: InputMaybe<ReplayEntryOrderInput>;
};

export type ReplaySessionCollection = {
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  rank: Scalars["Rank"]["output"];
  sessions: Array<ReplaySession>;
};

export type ReplaySessionCollectionConnection = {
  count: Count;
  /** A list of edges. */
  edges: Array<ReplaySessionCollectionEdge>;
  /** A list of nodes. */
  nodes: Array<ReplaySessionCollection>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  snapshot: Scalars["Snapshot"]["output"];
};

/** An edge in a connection. */
export type ReplaySessionCollectionEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node: ReplaySessionCollection;
};

export type ReplaySessionConnection = {
  count: Count;
  /** A list of edges. */
  edges: Array<ReplaySessionEdge>;
  /** A list of nodes. */
  nodes: Array<ReplaySession>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  snapshot: Scalars["Snapshot"]["output"];
};

/** An edge in a connection. */
export type ReplaySessionEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node: ReplaySession;
};

export type ReplaySuffixPreprocessor = {
  value: Scalars["String"]["output"];
};

export type ReplaySuffixPreprocessorInput = {
  value: Scalars["String"]["input"];
};

export type ReplayTask = Task & {
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  replayEntry: ReplayEntry;
};

export type ReplayUrlEncodePreprocessor = {
  charset?: Maybe<Scalars["String"]["output"]>;
  nonAscii: Scalars["Boolean"]["output"];
};

export type ReplayUrlEncodePreprocessorInput = {
  charset?: InputMaybe<Scalars["String"]["input"]>;
  nonAscii: Scalars["Boolean"]["input"];
};

export type ReplayWorkflowPreprocessor = {
  id: Scalars["ID"]["output"];
};

export type ReplayWorkflowPreprocessorInput = {
  id: Scalars["ID"]["input"];
};

export type Request = {
  alteration: Alteration;
  browser: BrowserRequest;
  createdAt: Scalars["Timestamp"]["output"];
  edited: Scalars["Boolean"]["output"];
  edits: Array<Request>;
  fileExtension?: Maybe<Scalars["String"]["output"]>;
  host: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  isTls: Scalars["Boolean"]["output"];
  length: Scalars["Int"]["output"];
  metadata: RequestMetadata;
  method: Scalars["String"]["output"];
  path: Scalars["String"]["output"];
  port: Scalars["Port"]["output"];
  query: Scalars["String"]["output"];
  raw: Scalars["Blob"]["output"];
  response?: Maybe<Response>;
  sni?: Maybe<Scalars["String"]["output"]>;
  source: Source;
  stream?: Maybe<Stream>;
};

export type RequestConnection = {
  count: Count;
  /** A list of edges. */
  edges: Array<RequestEdge>;
  /** A list of nodes. */
  nodes: Array<Request>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  snapshot: Scalars["Snapshot"]["output"];
};

/** An edge in a connection. */
export type RequestEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node: Request;
};

export type RequestMetadata = {
  color?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
};

export type RequestOffset = {
  offset: Scalars["Int"]["output"];
  snapshot: Scalars["Snapshot"]["output"];
};

export type RequestRawInput = {
  connectionInfo: ConnectionInfoInput;
  raw: Scalars["Blob"]["input"];
};

export { RequestResponseOrderBy };

export type RequestResponseOrderInput = {
  by: RequestResponseOrderBy;
  ordering: Ordering;
};

export type RequestSourceInput =
  | { id: Scalars["ID"]["input"]; raw?: never }
  | { id?: never; raw: RequestRawInput };

export type Response = {
  alteration: Alteration;
  createdAt: Scalars["Timestamp"]["output"];
  edited: Scalars["Boolean"]["output"];
  edits: Array<Response>;
  id: Scalars["ID"]["output"];
  length: Scalars["Int"]["output"];
  raw: Scalars["Blob"]["output"];
  roundtripTime: Scalars["Int"]["output"];
  statusCode: Scalars["Int"]["output"];
};

export type ResponseRawInput = {
  raw: Scalars["Blob"]["input"];
};

export type RestoreBackupError =
  | NameTakenUserError
  | OtherUserError
  | PermissionDeniedUserError;

export type RestoreBackupInput = {
  name: Scalars["String"]["input"];
  source: BackupSource;
};

export type RestoreBackupPayload = {
  error?: Maybe<RestoreBackupError>;
  task?: Maybe<RestoreBackupTask>;
};

export type RestoreBackupTask = {
  backup?: Maybe<Backup>;
  id: Scalars["ID"]["output"];
  project: Project;
};

export type RestoreBackupTaskError =
  | BackupUserError
  | InternalUserError
  | OtherUserError;

export type ResumeAutomateTaskError = OtherUserError | UnknownIdUserError;

export type ResumeAutomateTaskPayload = {
  automateTask?: Maybe<AutomateTask>;
  userError?: Maybe<ResumeAutomateTaskError>;
};

export type ResumeInterceptPayload = {
  status: InterceptStatus;
};

export type RunActiveWorkflowError =
  | OtherUserError
  | PermissionDeniedUserError
  | UnknownIdUserError;

export type RunActiveWorkflowInput = {
  requestId: Scalars["ID"]["input"];
};

export type RunActiveWorkflowPayload = {
  error?: Maybe<RunActiveWorkflowError>;
  task?: Maybe<WorkflowTask>;
};

export type RunConvertWorkflowError =
  | OtherUserError
  | PermissionDeniedUserError
  | WorkflowUserError;

export type RunConvertWorkflowPayload = {
  error?: Maybe<RunConvertWorkflowError>;
  output?: Maybe<Scalars["Blob"]["output"]>;
};

export type Runtime = {
  availableUpdate?: Maybe<Release>;
  certificate: Certificate;
  cloudStatus: CloudStatus;
  logs: Scalars["Uri"]["output"];
  platform: Scalars["String"]["output"];
  version: Scalars["String"]["output"];
  workspace?: Maybe<Workspace>;
};

export type Scope = {
  allowlist: Array<Scalars["String"]["output"]>;
  denylist: Array<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  indexed: Scalars["Boolean"]["output"];
  name: Scalars["String"]["output"];
};

/** An edge in a connection. */
export type ScopeEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node: Scope;
};

export type ScriptUser = {
  id: Scalars["ID"]["output"];
};

export type SelectEnvironmentError = OtherUserError | UnknownIdUserError;

export type SelectEnvironmentPayload = {
  environment?: Maybe<Environment>;
  error?: Maybe<SelectEnvironmentError>;
};

export type SelectProjectPayload = {
  currentProject?: Maybe<CurrentProject>;
  error?: Maybe<SelectProjectPayloadError>;
};

export type SelectProjectPayloadError =
  | OtherUserError
  | ProjectUserError
  | UnknownIdUserError;

export type SendAssistantMessageError =
  | CloudUserError
  | OtherUserError
  | PermissionDeniedUserError
  | TaskInProgressUserError;

export type SendAssistantMessagePayload = {
  error?: Maybe<SendAssistantMessageError>;
  task?: Maybe<AssistantMessageTask>;
};

export type SetActiveReplaySessionEntryPayload = {
  session?: Maybe<ReplaySession>;
};

export type SetConfigPortPayload = {
  config: GlobalConfig;
};

export type SetConfigProjectInput = {
  selectOnStart: ProjectSelectOnStart;
  selectProjectId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type SetConfigProjectPayload = {
  config: GlobalConfig;
};

export type SetInstanceSettingsInput =
  | {
      aiProvider: SettingsAiProviderInput;
      analytics?: never;
      onboarding?: never;
    }
  | { aiProvider?: never; analytics: SettingsAnalyticInput; onboarding?: never }
  | {
      aiProvider?: never;
      analytics?: never;
      onboarding: SettingsOnboardingInput;
    };

export type SetInstanceSettingsPayload = {
  settings: InstanceSettings;
};

export type SetInterceptOptionsPayload = {
  options: InterceptOptions;
};

export type SetPluginDataError =
  | OtherUserError
  | PluginUserError
  | UnknownIdUserError;

export type SetPluginDataPayload = {
  error?: Maybe<SetPluginDataError>;
  plugin?: Maybe<Plugin>;
};

export type SetProjectConfigStreamPayload = {
  config: ProjectConfigStream;
};

export type SettingsAiProviderInput =
  | {
      anthropic: AiProviderAnthropicInput;
      google?: never;
      openai?: never;
      openrouter?: never;
    }
  | {
      anthropic?: never;
      google: AiProviderGoogleInput;
      openai?: never;
      openrouter?: never;
    }
  | {
      anthropic?: never;
      google?: never;
      openai: AiProviderOpenAiInput;
      openrouter?: never;
    }
  | {
      anthropic?: never;
      google?: never;
      openai?: never;
      openrouter: AiProviderOpenRouterInput;
    };

export type SettingsAnalyticInput = {
  enabled: Scalars["Boolean"]["input"];
};

export type SettingsOnboardingInput = {
  analytic: Scalars["Boolean"]["input"];
};

export { SitemapDescendantsDepth };

export type SitemapEntry = {
  hasDescendants: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  kind: SitemapEntryKind;
  label: Scalars["String"]["output"];
  metadata?: Maybe<SitemapEntryMetadata>;
  parentId?: Maybe<Scalars["ID"]["output"]>;
  request?: Maybe<Request>;
  requests: RequestConnection;
};

export type SitemapEntryRequestsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  order?: InputMaybe<RequestResponseOrderInput>;
};

export type SitemapEntryConnection = {
  count: Count;
  /** A list of edges. */
  edges: Array<SitemapEntryEdge>;
  /** A list of nodes. */
  nodes: Array<SitemapEntry>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  snapshot: Scalars["Snapshot"]["output"];
};

/** An edge in a connection. */
export type SitemapEntryEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node: SitemapEntry;
};

export { SitemapEntryKind };

export type SitemapEntryMetadata = SitemapEntryMetadataDomain;

export type SitemapEntryMetadataDomain = {
  isTls: Scalars["Boolean"]["output"];
  port: Scalars["Port"]["output"];
};

export { Source };

export type StartAuthenticationFlowError =
  | AuthenticationUserError
  | CloudUserError
  | InternalUserError
  | OtherUserError;

export type StartAuthenticationFlowPayload = {
  error?: Maybe<StartAuthenticationFlowError>;
  request?: Maybe<AuthenticationRequest>;
};

export type StartAutomateTaskPayload = {
  automateTask?: Maybe<AutomateTask>;
};

export type StartDeleteStreamWsMessageTaskInput = {
  ids: Array<Scalars["ID"]["input"]>;
};

export type StartDeleteStreamWsMessageTaskPayload = {
  task?: Maybe<DeleteStreamWsMessageTask>;
};

export type StartExportRequestsTaskInput = {
  filter?: InputMaybe<Scalars["HTTPQL"]["input"]>;
  format: DataExportFormat;
  includeRaw: Scalars["Boolean"]["input"];
  scopeId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type StartExportRequestsTaskPayload = {
  error?: Maybe<StartExportRequestsTaskPayloadError>;
  task?: Maybe<DataExportTask>;
};

export type StartExportRequestsTaskPayloadError =
  | OtherUserError
  | PermissionDeniedUserError;

export type StartReplayTaskError =
  | CloudUserError
  | OtherUserError
  | PermissionDeniedUserError
  | TaskInProgressUserError;

export type StartReplayTaskInput = {
  connection: ConnectionInfoInput;
  raw: Scalars["Blob"]["input"];
  settings: ReplayEntrySettingsInput;
};

export type StartReplayTaskPayload = {
  error?: Maybe<StartReplayTaskError>;
  task?: Maybe<ReplayTask>;
};

export type StartedBackupTaskPayload = {
  task: BackupTask;
};

export type StartedDeleteInterceptEntriesTaskPayload = {
  task: DeleteInterceptEntriesTask;
};

export type StartedRestoreBackupTaskPayload = {
  task: RestoreBackupTask;
};

export type StartedTaskPayload = {
  task: Task;
};

export type Store = {
  pluginPackages: Array<StorePluginPackage>;
};

export { StoreErrorReason };

export type StorePluginPackage = {
  author?: Maybe<StorePluginPackageAuthor>;
  description?: Maybe<Scalars["String"]["output"]>;
  downloads: Scalars["Int"]["output"];
  license: Scalars["String"]["output"];
  manifestId: Scalars["ID"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  official: Scalars["Boolean"]["output"];
  repository: Scalars["Url"]["output"];
  version: Scalars["Version"]["output"];
};

export type StorePluginPackageAuthor = {
  email?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  url?: Maybe<Scalars["String"]["output"]>;
};

export type StoreUserError = UserError & {
  code: Scalars["String"]["output"];
  reason: StoreErrorReason;
};

export type Stream = {
  createdAt: Scalars["Timestamp"]["output"];
  direction: StreamDirection;
  host: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  isTls: Scalars["Boolean"]["output"];
  path: Scalars["String"]["output"];
  port: Scalars["Port"]["output"];
  protocol: StreamProtocol;
  source: Source;
};

export type StreamConnection = {
  count: Count;
  /** A list of edges. */
  edges: Array<StreamEdge>;
  /** A list of nodes. */
  nodes: Array<Stream>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  snapshot: Scalars["Snapshot"]["output"];
};

export { StreamDirection };

/** An edge in a connection. */
export type StreamEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node: Stream;
};

export { StreamMessageDirection };

export { StreamOrderBy };

export type StreamOrderInput = {
  by: StreamOrderBy;
  ordering: Ordering;
};

export { StreamProtocol };

export type StreamWsMessage = {
  edits: Array<StreamWsMessageEditRef>;
  head: StreamWsMessageEdit;
  id: Scalars["ID"]["output"];
  stream: Stream;
};

export type StreamWsMessageConnection = {
  count: Count;
  /** A list of edges. */
  edges: Array<StreamWsMessageEdge>;
  /** A list of nodes. */
  nodes: Array<StreamWsMessage>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  snapshot: Scalars["Snapshot"]["output"];
};

/** An edge in a connection. */
export type StreamWsMessageEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node: StreamWsMessage;
};

export type StreamWsMessageEdit = {
  alteration: Alteration;
  createdAt: Scalars["Timestamp"]["output"];
  direction: StreamMessageDirection;
  format: StreamWsMessageFormat;
  id: Scalars["ID"]["output"];
  length: Scalars["Int"]["output"];
  raw: Scalars["Blob"]["output"];
};

export type StreamWsMessageEditRef = {
  alteration: Alteration;
  id: Scalars["ID"]["output"];
};

export { StreamWsMessageFormat };

export { StreamWsMessageOrderBy };

export type StreamWsMessageOrderInput = {
  by: StreamWsMessageOrderBy;
  ordering: Ordering;
};

export type SubscriptionRoot = {
  createdAssistantMessage: CreatedAssistantMessagePayload;
  createdAssistantMessageTask: CreatedAssistantMessageTaskPayload;
  createdAssistantSession: CreatedAssistantSessionPayload;
  createdAuthenticationToken: CreatedAuthenticationTokenPayload;
  createdAutomateEntry: CreatedAutomateEntryPayload;
  createdAutomateEntryRequest: CreatedAutomateEntryRequestPayload;
  createdAutomateSession: CreatedAutomateSessionPayload;
  createdAutomateTask: CreatedAutomateTaskPayload;
  createdBackup: CreatedBackupPayload;
  createdDataExport: CreatedDataExportPayload;
  createdDnsRewrite: CreatedDnsRewritePayload;
  createdDnsUpstream: CreatedDnsUpstreamPayload;
  createdEnvironment: CreatedEnvironmentPayload;
  createdFilterPreset: CreatedFilterPresetPayload;
  createdFinding: CreatedFindingPayload;
  createdInterceptEntry: CreatedInterceptEntryPayload;
  createdInterceptMessage: CreatedInterceptMessagePayload;
  createdLogLines: CreatedLogLinesPayload;
  createdPluginEvent: CreatedPluginEventPayload;
  createdPluginPackage: CreatedPluginPackagePayload;
  createdProject: CreatedProjectPayload;
  createdReplaySession: CreatedReplaySessionPayload;
  createdReplaySessionCollection: CreatedReplaySessionCollectionPayload;
  createdRequest: CreatedRequestPayload;
  createdScope: CreatedScopePayload;
  createdSitemapEntry: CreatedSitemapEntryPayload;
  createdStream: CreatedStreamPayload;
  createdStreamWsMessage: CreatedStreamWsMessagePayload;
  createdTamperRule: CreatedTamperRulePayload;
  createdTamperRuleCollection: CreatedTamperRuleCollectionPayload;
  createdUpstreamPlugin: CreatedUpstreamPluginPayload;
  createdUpstreamProxyHttp: CreatedUpstreamProxyHttpPayload;
  createdUpstreamProxySocks: CreatedUpstreamProxySocksPayload;
  createdWorkflow: CreatedWorkflowPayload;
  deletedAssistantSession: DeletedAssistantSessionPayload;
  deletedAutomateEntry: DeletedAutomateEntryPayload;
  deletedAutomateSession: DeletedAutomateSessionPayload;
  deletedAutomateTask: DeletedAutomateTaskPayload;
  deletedBackup: DeletedBackupPayload;
  deletedBrowser: DeletedBrowserPayload;
  deletedDataExport: DeletedDataExportPayload;
  deletedDnsRewrite: DeletedDnsRewritePayload;
  deletedDnsUpstream: DeletedDnsUpstreamPayload;
  deletedEnvironment: DeletedEnvironmentPayload;
  deletedFilterPreset: DeletedFilterPresetPayload;
  deletedFindings: DeletedFindingsPayload;
  deletedHostedFile: DeletedHostedFilePayload;
  deletedInterceptEntry: DeletedInterceptEntryPayload;
  deletedInterceptMessage: DeletedInterceptMessagePayload;
  deletedPluginPackage: DeletedPluginPackagePayload;
  deletedProject: DeletedProjectPayload;
  deletedReplaySession: DeletedReplaySessionPayload;
  deletedReplaySessionCollection: DeletedReplaySessionCollectionPayload;
  deletedScope: DeletedScopePayload;
  deletedSitemapEntry: DeletedSitemapEntriesPayload;
  deletedStreamWsMessages: DeletedStreamWsMessagesPayload;
  deletedTamperRule: DeletedTamperRulePayload;
  deletedTamperRuleCollection: DeletedTamperRuleCollectionPayload;
  deletedUpstreamPlugin: DeletedUpstreamPluginPayload;
  deletedUpstreamProxyHttp: DeletedUpstreamProxyHttpPayload;
  deletedUpstreamProxySocks: DeletedUpstreamProxySocksPayload;
  deletedWorkflow: DeletedWorkflowPayload;
  expiredViewerProfile: ExpiredViewerProfilePayload;
  finishedBackupTask: FinishedBackupTaskPayload;
  finishedDeleteInterceptEntriesTask: FinishedDeleteInterceptEntriesTaskPayload;
  finishedRestoreBackupTask: FinishedRestoreBackupTaskPayload;
  finishedTask: FinishedTaskPayload;
  installedBrowser: UploadedBrowserPayload;
  startedBackupTask: StartedBackupTaskPayload;
  startedDeleteInterceptEntriesTask: StartedDeleteInterceptEntriesTaskPayload;
  startedRestoreBackupTask: StartedRestoreBackupTaskPayload;
  startedTask: StartedTaskPayload;
  updatedAssistantMessageTask: UpdatedAssistantMessageTaskPayload;
  updatedAssistantSession: UpdatedAssistantSessionPayload;
  updatedAutomateEntry: UpdatedAutomateEntryPayload;
  updatedAutomateSession: UpdatedAutomateSessionPayload;
  updatedAutomateTask: UpdatedAutomateTaskPayload;
  updatedBackup: UpdatedBackupPayload;
  updatedBrowser: UpdatedBrowserPayload;
  updatedCloudStatus: UpdatedCloudStatusPayload;
  updatedDataExport: UpdatedDataExportPayload;
  updatedDeleteInterceptEntriesTask: UpdatedDeleteInterceptEntriesTaskPayload;
  updatedDnsRewrite: UpdatedDnsRewritePayload;
  updatedDnsUpstream: UpdatedDnsUpstreamPayload;
  updatedEnvironment: UpdatedEnvironmentPayload;
  updatedEnvironmentContext: UpdatedEnvironmentContextPayload;
  updatedFilterPreset: UpdatedFilterPresetPayload;
  updatedFindings: UpdatedFindingsPayload;
  updatedHostedFile: UpdatedHostedFilePayload;
  updatedInstanceSettings: UpdatedInstanceSettingsPayload;
  updatedInterceptEntry: UpdatedInterceptEntryPayload;
  updatedInterceptOptions: UpdatedInterceptOptionsPayload;
  updatedInterceptStatus: UpdatedInterceptStatusPayload;
  updatedPlugin: UpdatedPluginPayload;
  updatedPluginPackage: UpdatedPluginPackagePayload;
  updatedProject: UpdatedProjectPayload;
  updatedReplaySession: UpdatedReplaySessionPayload;
  updatedReplaySessionCollection: UpdatedReplaySessionCollectionPayload;
  updatedRequest: UpdatedRequestPayload;
  updatedRequestMetadata: UpdatedRequestMetadataPayload;
  updatedScope: UpdatedScopePayload;
  updatedSitemapEntry: UpdatedSitemapEntryPayload;
  updatedStreamWsMessage: UpdatedStreamWsMessagePayload;
  updatedTamperRule: UpdatedTamperRulePayload;
  updatedTamperRuleCollection: UpdatedTamperRuleCollectionPayload;
  updatedUpstreamPlugin: UpdatedUpstreamPluginPayload;
  updatedUpstreamProxyHttp: UpdatedUpstreamProxyHttpPayload;
  updatedUpstreamProxySocks: UpdatedUpstreamProxySocksPayload;
  updatedViewerAssistantUsage: UpdatedViewerAssistantUsagePayload;
  updatedViewerProfile: UpdatedViewerProfilePayload;
  updatedViewerSettings: UpdatedViewerSettingsPayload;
  updatedWorkflow: UpdatedWorkflowPayload;
  uploadedHostedFile: UploadedHostedFilePayload;
};

export type SubscriptionRootCreatedAuthenticationTokenArgs = {
  requestId: Scalars["ID"]["input"];
};

export type SubscriptionRootCreatedAutomateEntryRequestArgs = {
  filter?: InputMaybe<Scalars["HTTPQL"]["input"]>;
};

export type SubscriptionRootCreatedInterceptEntryArgs = {
  filter?: InputMaybe<Scalars["HTTPQL"]["input"]>;
  scopeId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type SubscriptionRootCreatedLogLinesArgs = {
  duration: Scalars["Duration"]["input"];
};

export type SubscriptionRootCreatedRequestArgs = {
  filter?: InputMaybe<Scalars["HTTPQL"]["input"]>;
  scopeId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type SubscriptionRootCreatedSitemapEntryArgs = {
  scopeId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type SubscriptionRootCreatedStreamArgs = {
  protocol: StreamProtocol;
  scopeId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type SubscriptionRootUpdatedInterceptEntryArgs = {
  filter?: InputMaybe<Scalars["HTTPQL"]["input"]>;
  scopeId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type SubscriptionRootUpdatedRequestArgs = {
  filter?: InputMaybe<Scalars["HTTPQL"]["input"]>;
  scopeId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type SubscriptionRootUpdatedSitemapEntryArgs = {
  scopeId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type TamperExportScopeInput =
  | { collections: Array<Scalars["ID"]["input"]>; rules?: never }
  | { collections?: never; rules: Array<Scalars["ID"]["input"]> };

export type TamperMatcherFull = {
  full: Scalars["Boolean"]["output"];
};

export type TamperMatcherFullInput = {
  full: Scalars["Boolean"]["input"];
};

export type TamperMatcherName = {
  name: Scalars["String"]["output"];
};

export type TamperMatcherNameInput = {
  name: Scalars["String"]["input"];
};

export type TamperMatcherRaw =
  | TamperMatcherFull
  | TamperMatcherRegex
  | TamperMatcherValue;

export type TamperMatcherRawInput =
  | { full: TamperMatcherFullInput; regex?: never; value?: never }
  | { full?: never; regex: TamperMatcherRegexInput; value?: never }
  | { full?: never; regex?: never; value: TamperMatcherValueInput };

export type TamperMatcherRegex = {
  regex: Scalars["String"]["output"];
};

export type TamperMatcherRegexInput = {
  regex: Scalars["String"]["input"];
};

export type TamperMatcherValue = {
  value: Scalars["String"]["output"];
};

export type TamperMatcherValueInput = {
  value: Scalars["String"]["input"];
};

export type TamperOperationAll = TamperOperationAllRaw;

export type TamperOperationAllInput = { raw: TamperOperationAllRawInput };

export type TamperOperationAllRaw = {
  matcher: TamperMatcherRaw;
  replacer: TamperReplacer;
};

export type TamperOperationAllRawInput = {
  matcher: TamperMatcherRawInput;
  replacer: TamperReplacerInput;
};

export type TamperOperationBody = TamperOperationBodyRaw;

export type TamperOperationBodyInput = { raw: TamperOperationBodyRawInput };

export type TamperOperationBodyRaw = {
  matcher: TamperMatcherRaw;
  replacer: TamperReplacer;
};

export type TamperOperationBodyRawInput = {
  matcher: TamperMatcherRawInput;
  replacer: TamperReplacerInput;
};

export type TamperOperationFirstLine = TamperOperationFirstLineRaw;

export type TamperOperationFirstLineInput = {
  raw: TamperOperationFirstLineRawInput;
};

export type TamperOperationFirstLineRaw = {
  matcher: TamperMatcherRaw;
  replacer: TamperReplacer;
};

export type TamperOperationFirstLineRawInput = {
  matcher: TamperMatcherRawInput;
  replacer: TamperReplacerInput;
};

export type TamperOperationHeader =
  | TamperOperationHeaderAdd
  | TamperOperationHeaderRaw
  | TamperOperationHeaderRemove
  | TamperOperationHeaderUpdate;

export type TamperOperationHeaderAdd = {
  matcher: TamperMatcherName;
  replacer: TamperReplacer;
};

export type TamperOperationHeaderAddInput = {
  matcher: TamperMatcherNameInput;
  replacer: TamperReplacerInput;
};

export type TamperOperationHeaderInput =
  | {
      add: TamperOperationHeaderAddInput;
      raw?: never;
      remove?: never;
      update?: never;
    }
  | {
      add?: never;
      raw: TamperOperationHeaderRawInput;
      remove?: never;
      update?: never;
    }
  | {
      add?: never;
      raw?: never;
      remove: TamperOperationHeaderRemoveInput;
      update?: never;
    }
  | {
      add?: never;
      raw?: never;
      remove?: never;
      update: TamperOperationHeaderUpdateInput;
    };

export type TamperOperationHeaderRaw = {
  matcher: TamperMatcherRaw;
  replacer: TamperReplacer;
};

export type TamperOperationHeaderRawInput = {
  matcher: TamperMatcherRawInput;
  replacer: TamperReplacerInput;
};

export type TamperOperationHeaderRemove = {
  matcher: TamperMatcherName;
};

export type TamperOperationHeaderRemoveInput = {
  matcher: TamperMatcherNameInput;
};

export type TamperOperationHeaderUpdate = {
  matcher: TamperMatcherName;
  replacer: TamperReplacer;
};

export type TamperOperationHeaderUpdateInput = {
  matcher: TamperMatcherNameInput;
  replacer: TamperReplacerInput;
};

export type TamperOperationMethod = TamperOperationMethodUpdate;

export type TamperOperationMethodInput = {
  update: TamperOperationMethodUpdateInput;
};

export type TamperOperationMethodUpdate = {
  replacer: TamperReplacer;
};

export type TamperOperationMethodUpdateInput = {
  replacer: TamperReplacerInput;
};

export type TamperOperationPath = TamperOperationPathRaw;

export type TamperOperationPathInput = { raw: TamperOperationPathRawInput };

export type TamperOperationPathRaw = {
  matcher: TamperMatcherRaw;
  replacer: TamperReplacer;
};

export type TamperOperationPathRawInput = {
  matcher: TamperMatcherRawInput;
  replacer: TamperReplacerInput;
};

export type TamperOperationQuery =
  | TamperOperationQueryAdd
  | TamperOperationQueryRaw
  | TamperOperationQueryRemove
  | TamperOperationQueryUpdate;

export type TamperOperationQueryAdd = {
  matcher: TamperMatcherName;
  replacer: TamperReplacer;
};

export type TamperOperationQueryAddInput = {
  matcher: TamperMatcherNameInput;
  replacer: TamperReplacerInput;
};

export type TamperOperationQueryInput =
  | {
      add: TamperOperationQueryAddInput;
      raw?: never;
      remove?: never;
      update?: never;
    }
  | {
      add?: never;
      raw: TamperOperationQueryRawInput;
      remove?: never;
      update?: never;
    }
  | {
      add?: never;
      raw?: never;
      remove: TamperOperationQueryRemoveInput;
      update?: never;
    }
  | {
      add?: never;
      raw?: never;
      remove?: never;
      update: TamperOperationQueryUpdateInput;
    };

export type TamperOperationQueryRaw = {
  matcher: TamperMatcherRaw;
  replacer: TamperReplacer;
};

export type TamperOperationQueryRawInput = {
  matcher: TamperMatcherRawInput;
  replacer: TamperReplacerInput;
};

export type TamperOperationQueryRemove = {
  matcher: TamperMatcherName;
};

export type TamperOperationQueryRemoveInput = {
  matcher: TamperMatcherNameInput;
};

export type TamperOperationQueryUpdate = {
  matcher: TamperMatcherName;
  replacer: TamperReplacer;
};

export type TamperOperationQueryUpdateInput = {
  matcher: TamperMatcherNameInput;
  replacer: TamperReplacerInput;
};

export type TamperOperationSni = TamperOperationSniRaw;

export type TamperOperationSniInput = { raw: TamperOperationSniRawInput };

export type TamperOperationSniRaw = {
  replacer: TamperReplacer;
};

export type TamperOperationSniRawInput = {
  replacer: TamperReplacerInput;
};

export type TamperOperationStatusCode = TamperOperationStatusCodeUpdate;

export type TamperOperationStatusCodeInput = {
  update: TamperOperationStatusCodeUpdateInput;
};

export type TamperOperationStatusCodeUpdate = {
  replacer: TamperReplacer;
};

export type TamperOperationStatusCodeUpdateInput = {
  replacer: TamperReplacerInput;
};

export type TamperReplacer = TamperReplacerTerm | TamperReplacerWorkflow;

export type TamperReplacerInput =
  | { term: TamperReplacerTermInput; workflow?: never }
  | { term?: never; workflow: TamperReplacerWorkflowInput };

export type TamperReplacerTerm = {
  term: Scalars["String"]["output"];
};

export type TamperReplacerTermInput = {
  term: Scalars["String"]["input"];
};

export type TamperReplacerWorkflow = {
  id: Scalars["ID"]["output"];
};

export type TamperReplacerWorkflowInput = {
  id: Scalars["ID"]["input"];
};

export type TamperRule = {
  collection: TamperRuleCollection;
  condition?: Maybe<Scalars["HTTPQL"]["output"]>;
  enable?: Maybe<TamperRuleEnable>;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  section: TamperSection;
  sources: Array<Source>;
};

export type TamperRuleCollection = {
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  rules: Array<TamperRule>;
};

/** An edge in a connection. */
export type TamperRuleCollectionEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node: TamperRuleCollection;
};

export type TamperRuleEnable = {
  rank: Scalars["Rank"]["output"];
};

export type TamperSection =
  | TamperSectionRequestAll
  | TamperSectionRequestBody
  | TamperSectionRequestFirstLine
  | TamperSectionRequestHeader
  | TamperSectionRequestMethod
  | TamperSectionRequestPath
  | TamperSectionRequestQuery
  | TamperSectionRequestSni
  | TamperSectionResponseAll
  | TamperSectionResponseBody
  | TamperSectionResponseFirstLine
  | TamperSectionResponseHeader
  | TamperSectionResponseStatusCode;

export type TamperSectionInput =
  | {
      requestAll: TamperSectionRequestAllInput;
      requestBody?: never;
      requestFirstLine?: never;
      requestHeader?: never;
      requestMethod?: never;
      requestPath?: never;
      requestQuery?: never;
      requestSNI?: never;
      responseAll?: never;
      responseBody?: never;
      responseFirstLine?: never;
      responseHeader?: never;
      responseStatusCode?: never;
    }
  | {
      requestAll?: never;
      requestBody: TamperSectionRequestBodyInput;
      requestFirstLine?: never;
      requestHeader?: never;
      requestMethod?: never;
      requestPath?: never;
      requestQuery?: never;
      requestSNI?: never;
      responseAll?: never;
      responseBody?: never;
      responseFirstLine?: never;
      responseHeader?: never;
      responseStatusCode?: never;
    }
  | {
      requestAll?: never;
      requestBody?: never;
      requestFirstLine: TamperSectionRequestFirstLineInput;
      requestHeader?: never;
      requestMethod?: never;
      requestPath?: never;
      requestQuery?: never;
      requestSNI?: never;
      responseAll?: never;
      responseBody?: never;
      responseFirstLine?: never;
      responseHeader?: never;
      responseStatusCode?: never;
    }
  | {
      requestAll?: never;
      requestBody?: never;
      requestFirstLine?: never;
      requestHeader: TamperSectionRequestHeaderInput;
      requestMethod?: never;
      requestPath?: never;
      requestQuery?: never;
      requestSNI?: never;
      responseAll?: never;
      responseBody?: never;
      responseFirstLine?: never;
      responseHeader?: never;
      responseStatusCode?: never;
    }
  | {
      requestAll?: never;
      requestBody?: never;
      requestFirstLine?: never;
      requestHeader?: never;
      requestMethod: TamperSectionRequestMethodInput;
      requestPath?: never;
      requestQuery?: never;
      requestSNI?: never;
      responseAll?: never;
      responseBody?: never;
      responseFirstLine?: never;
      responseHeader?: never;
      responseStatusCode?: never;
    }
  | {
      requestAll?: never;
      requestBody?: never;
      requestFirstLine?: never;
      requestHeader?: never;
      requestMethod?: never;
      requestPath: TamperSectionRequestPathInput;
      requestQuery?: never;
      requestSNI?: never;
      responseAll?: never;
      responseBody?: never;
      responseFirstLine?: never;
      responseHeader?: never;
      responseStatusCode?: never;
    }
  | {
      requestAll?: never;
      requestBody?: never;
      requestFirstLine?: never;
      requestHeader?: never;
      requestMethod?: never;
      requestPath?: never;
      requestQuery: TamperSectionRequestQueryInput;
      requestSNI?: never;
      responseAll?: never;
      responseBody?: never;
      responseFirstLine?: never;
      responseHeader?: never;
      responseStatusCode?: never;
    }
  | {
      requestAll?: never;
      requestBody?: never;
      requestFirstLine?: never;
      requestHeader?: never;
      requestMethod?: never;
      requestPath?: never;
      requestQuery?: never;
      requestSNI: TamperSectionRequestSniInput;
      responseAll?: never;
      responseBody?: never;
      responseFirstLine?: never;
      responseHeader?: never;
      responseStatusCode?: never;
    }
  | {
      requestAll?: never;
      requestBody?: never;
      requestFirstLine?: never;
      requestHeader?: never;
      requestMethod?: never;
      requestPath?: never;
      requestQuery?: never;
      requestSNI?: never;
      responseAll: TamperSectionResponseAllInput;
      responseBody?: never;
      responseFirstLine?: never;
      responseHeader?: never;
      responseStatusCode?: never;
    }
  | {
      requestAll?: never;
      requestBody?: never;
      requestFirstLine?: never;
      requestHeader?: never;
      requestMethod?: never;
      requestPath?: never;
      requestQuery?: never;
      requestSNI?: never;
      responseAll?: never;
      responseBody: TamperSectionResponseBodyInput;
      responseFirstLine?: never;
      responseHeader?: never;
      responseStatusCode?: never;
    }
  | {
      requestAll?: never;
      requestBody?: never;
      requestFirstLine?: never;
      requestHeader?: never;
      requestMethod?: never;
      requestPath?: never;
      requestQuery?: never;
      requestSNI?: never;
      responseAll?: never;
      responseBody?: never;
      responseFirstLine: TamperSectionResponseFirstLineInput;
      responseHeader?: never;
      responseStatusCode?: never;
    }
  | {
      requestAll?: never;
      requestBody?: never;
      requestFirstLine?: never;
      requestHeader?: never;
      requestMethod?: never;
      requestPath?: never;
      requestQuery?: never;
      requestSNI?: never;
      responseAll?: never;
      responseBody?: never;
      responseFirstLine?: never;
      responseHeader: TamperSectionResponseHeaderInput;
      responseStatusCode?: never;
    }
  | {
      requestAll?: never;
      requestBody?: never;
      requestFirstLine?: never;
      requestHeader?: never;
      requestMethod?: never;
      requestPath?: never;
      requestQuery?: never;
      requestSNI?: never;
      responseAll?: never;
      responseBody?: never;
      responseFirstLine?: never;
      responseHeader?: never;
      responseStatusCode: TamperSectionResponseStatusCodeInput;
    };

export type TamperSectionRequestAll = {
  operation: TamperOperationAll;
};

export type TamperSectionRequestAllInput = {
  operation: TamperOperationAllInput;
};

export type TamperSectionRequestBody = {
  operation: TamperOperationBody;
};

export type TamperSectionRequestBodyInput = {
  operation: TamperOperationBodyInput;
};

export type TamperSectionRequestFirstLine = {
  operation: TamperOperationFirstLine;
};

export type TamperSectionRequestFirstLineInput = {
  operation: TamperOperationFirstLineInput;
};

export type TamperSectionRequestHeader = {
  operation: TamperOperationHeader;
};

export type TamperSectionRequestHeaderInput = {
  operation: TamperOperationHeaderInput;
};

export type TamperSectionRequestMethod = {
  operation: TamperOperationMethod;
};

export type TamperSectionRequestMethodInput = {
  operation: TamperOperationMethodInput;
};

export type TamperSectionRequestPath = {
  operation: TamperOperationPath;
};

export type TamperSectionRequestPathInput = {
  operation: TamperOperationPathInput;
};

export type TamperSectionRequestQuery = {
  operation: TamperOperationQuery;
};

export type TamperSectionRequestQueryInput = {
  operation: TamperOperationQueryInput;
};

export type TamperSectionRequestSni = {
  operation: TamperOperationSni;
};

export type TamperSectionRequestSniInput = {
  operation: TamperOperationSniInput;
};

export type TamperSectionResponseAll = {
  operation: TamperOperationAll;
};

export type TamperSectionResponseAllInput = {
  operation: TamperOperationAllInput;
};

export type TamperSectionResponseBody = {
  operation: TamperOperationBody;
};

export type TamperSectionResponseBodyInput = {
  operation: TamperOperationBodyInput;
};

export type TamperSectionResponseFirstLine = {
  operation: TamperOperationFirstLine;
};

export type TamperSectionResponseFirstLineInput = {
  operation: TamperOperationFirstLineInput;
};

export type TamperSectionResponseHeader = {
  operation: TamperOperationHeader;
};

export type TamperSectionResponseHeaderInput = {
  operation: TamperOperationHeaderInput;
};

export type TamperSectionResponseStatusCode = {
  operation: TamperOperationStatusCode;
};

export type TamperSectionResponseStatusCodeInput = {
  operation: TamperOperationStatusCodeInput;
};

export type TamperSummary = {
  collectionsCreated: Scalars["Int"]["output"];
  rulesImported: Scalars["Int"]["output"];
};

export type Task = {
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
};

export type TaskInProgressUserError = UserError & {
  code: Scalars["String"]["output"];
  taskId: Scalars["ID"]["output"];
};

export { TaskStatus };

export type TestAiProviderError = AiUserError | OtherUserError;

export type TestAiProviderInput =
  | {
      anthropic: AiProviderAnthropicInput;
      google?: never;
      openai?: never;
      openrouter?: never;
    }
  | {
      anthropic?: never;
      google: AiProviderGoogleInput;
      openai?: never;
      openrouter?: never;
    }
  | {
      anthropic?: never;
      google?: never;
      openai: AiProviderOpenAiInput;
      openrouter?: never;
    }
  | {
      anthropic?: never;
      google?: never;
      openai?: never;
      openrouter: AiProviderOpenRouterInput;
    };

export type TestAiProviderPayload = {
  error?: Maybe<TestAiProviderError>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

export type TestTamperRuleError = InvalidRegexUserError | OtherUserError;

export type TestTamperRuleInput = {
  raw: Scalars["Blob"]["input"];
  section: TamperSectionInput;
};

export type TestTamperRulePayload = {
  error?: Maybe<TestTamperRuleError>;
  raw?: Maybe<Scalars["Blob"]["output"]>;
};

export type TestUpstreamProxyHttpInput = {
  auth?: InputMaybe<UpstreamProxyAuthInput>;
  connection: ConnectionInfoInput;
};

export type TestUpstreamProxyHttpPayload = {
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

export type TestUpstreamProxySocksInput = {
  auth?: InputMaybe<UpstreamProxyAuthInput>;
  connection: ConnectionInfoInput;
  includeDns: Scalars["Boolean"]["input"];
};

export type TestUpstreamProxySocksPayload = {
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

export type TestWorkflowActiveError =
  | OtherUserError
  | PermissionDeniedUserError
  | WorkflowUserError;

export type TestWorkflowActiveInput = {
  definition: Scalars["JsonObject"]["input"];
  request: RequestRawInput;
  response?: InputMaybe<ResponseRawInput>;
};

export type TestWorkflowActivePayload = {
  error?: Maybe<TestWorkflowActiveError>;
  runState?: Maybe<Scalars["JsonObject"]["output"]>;
};

export type TestWorkflowConvertError =
  | OtherUserError
  | PermissionDeniedUserError
  | WorkflowUserError;

export type TestWorkflowConvertInput = {
  data: Scalars["Blob"]["input"];
  definition: Scalars["JsonObject"]["input"];
};

export type TestWorkflowConvertPayload = {
  error?: Maybe<TestWorkflowConvertError>;
  output?: Maybe<Scalars["Blob"]["output"]>;
  runState?: Maybe<Scalars["JsonObject"]["output"]>;
};

export type TestWorkflowPassiveError =
  | OtherUserError
  | PermissionDeniedUserError
  | WorkflowUserError;

export type TestWorkflowPassiveInput = {
  definition: Scalars["JsonObject"]["input"];
  request: RequestRawInput;
  response?: InputMaybe<ResponseRawInput>;
};

export type TestWorkflowPassivePayload = {
  error?: Maybe<TestWorkflowPassiveError>;
  runState?: Maybe<Scalars["JsonObject"]["output"]>;
};

export type ToggleDnsRewritePayload = {
  rewrite: DnsRewrite;
};

export type TogglePluginError =
  | OtherUserError
  | PluginUserError
  | UnknownIdUserError;

export type TogglePluginPayload = {
  error?: Maybe<TogglePluginError>;
  plugin?: Maybe<Plugin>;
};

export type ToggleTamperRuleError = OtherUserError | UnknownIdUserError;

export type ToggleTamperRulePayload = {
  error?: Maybe<ToggleTamperRuleError>;
  rule?: Maybe<TamperRule>;
};

export type ToggleUpstreamPluginPayload = {
  upstream?: Maybe<UpstreamPlugin>;
};

export type ToggleUpstreamProxyHttpPayload = {
  proxy?: Maybe<UpstreamProxyHttp>;
};

export type ToggleUpstreamProxySocksPayload = {
  proxy?: Maybe<UpstreamProxySocks>;
};

export type ToggleWorkflowError = OtherUserError | UnknownIdUserError;

export type ToggleWorkflowPayload = {
  error?: Maybe<ToggleWorkflowError>;
  workflow?: Maybe<Workflow>;
};

export type TrackInput = {
  createdAt: Scalars["Timestamp"]["input"];
  name: Scalars["String"]["input"];
  value: Scalars["JsonObject"]["input"];
};

export type TrackPayload = {
  success: Scalars["Boolean"]["output"];
};

export type UninstallPluginPackageError = OtherUserError | UnknownIdUserError;

export type UninstallPluginPackagePayload = {
  deletedId?: Maybe<Scalars["ID"]["output"]>;
  error?: Maybe<UninstallPluginPackageError>;
};

export type UnknownIdUserError = UserError & {
  code: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
};

export type UnsupportedPlatformUserError = UserError & {
  code: Scalars["String"]["output"];
};

export type UpdateAutomateSessionError =
  | CloudUserError
  | OtherUserError
  | PermissionDeniedUserError;

export type UpdateAutomateSessionInput = {
  connection: ConnectionInfoInput;
  raw: Scalars["Blob"]["input"];
  settings: AutomateSettingsInput;
};

export type UpdateAutomateSessionPayload = {
  error?: Maybe<UpdateAutomateSessionError>;
  session?: Maybe<AutomateSession>;
};

export type UpdateBrowserError =
  | CloudUserError
  | OtherUserError
  | RenderFailedUserError
  | UnsupportedPlatformUserError;

export type UpdateBrowserPayload = {
  browser?: Maybe<Browser>;
  error?: Maybe<UpdateBrowserError>;
};

export type UpdateDnsRewriteError = OtherUserError | UnknownIdUserError;

export type UpdateDnsRewriteInput = {
  allowlist: Array<Scalars["String"]["input"]>;
  denylist: Array<Scalars["String"]["input"]>;
  resolution: DnsResolverInput;
};

export type UpdateDnsRewritePayload = {
  error?: Maybe<UpdateDnsRewriteError>;
  rewrite?: Maybe<DnsRewrite>;
};

export type UpdateDnsUpstreamInput = {
  ip: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};

export type UpdateDnsUpstreamPayload = {
  upstream: DnsUpstream;
};

export type UpdateEnvironmentError =
  | NameTakenUserError
  | NewerVersionUserError
  | OtherUserError
  | PermissionDeniedUserError
  | UnknownIdUserError;

export type UpdateEnvironmentInput = {
  name: Scalars["String"]["input"];
  variables: Array<EnvironmentVariableInput>;
  version: Scalars["Int"]["input"];
};

export type UpdateEnvironmentPayload = {
  environment?: Maybe<Environment>;
  error?: Maybe<UpdateEnvironmentError>;
};

export type UpdateFilterPresetError =
  | AliasTakenUserError
  | NameTakenUserError
  | OtherUserError;

export type UpdateFilterPresetInput = {
  alias: Scalars["Alias"]["input"];
  clause: Scalars["HTTPQL"]["input"];
  name: Scalars["String"]["input"];
};

export type UpdateFilterPresetPayload = {
  error?: Maybe<UpdateFilterPresetError>;
  filter?: Maybe<FilterPreset>;
};

export type UpdateFindingError = OtherUserError | UnknownIdUserError;

export type UpdateFindingInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  hidden?: InputMaybe<Scalars["Boolean"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateFindingPayload = {
  error?: Maybe<UpdateFindingError>;
  finding?: Maybe<Finding>;
};

export type UpdateRequestMetadataInput = {
  color?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateRequestMetadataPayload = {
  metadata?: Maybe<RequestMetadata>;
  snapshot?: Maybe<Scalars["Snapshot"]["output"]>;
};

export type UpdateScopeError = InvalidGlobTermsUserError | OtherUserError;

export type UpdateScopeInput = {
  allowlist: Array<Scalars["String"]["input"]>;
  denylist: Array<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
};

export type UpdateScopePayload = {
  error?: Maybe<UpdateScopeError>;
  scope?: Maybe<Scope>;
};

export type UpdateTamperRuleError =
  | InvalidHttpqlUserError
  | InvalidRegexUserError
  | OtherUserError
  | UnknownIdUserError;

export type UpdateTamperRuleInput = {
  condition?: InputMaybe<Scalars["HTTPQL"]["input"]>;
  name: Scalars["String"]["input"];
  section: TamperSectionInput;
  sources: Array<Source>;
};

export type UpdateTamperRulePayload = {
  error?: Maybe<UpdateTamperRuleError>;
  rule?: Maybe<TamperRule>;
};

export type UpdateUpstreamPluginInput = {
  allowlist: Array<Scalars["String"]["input"]>;
  denylist: Array<Scalars["String"]["input"]>;
  enabled: Scalars["Boolean"]["input"];
  pluginId: Scalars["ID"]["input"];
};

export type UpdateUpstreamPluginPayload = {
  upstream?: Maybe<UpstreamPlugin>;
};

export type UpdateUpstreamProxyHttpInput = {
  allowlist: Array<Scalars["String"]["input"]>;
  auth?: InputMaybe<UpstreamProxyAuthInput>;
  connection: ConnectionInfoInput;
  denylist: Array<Scalars["String"]["input"]>;
  enabled: Scalars["Boolean"]["input"];
};

export type UpdateUpstreamProxyHttpPayload = {
  proxy?: Maybe<UpstreamProxyHttp>;
};

export type UpdateUpstreamProxySocksInput = {
  allowlist: Array<Scalars["String"]["input"]>;
  auth?: InputMaybe<UpstreamProxyAuthInput>;
  connection: ConnectionInfoInput;
  denylist: Array<Scalars["String"]["input"]>;
  enabled: Scalars["Boolean"]["input"];
  includeDns: Scalars["Boolean"]["input"];
};

export type UpdateUpstreamProxySocksPayload = {
  proxy?: Maybe<UpstreamProxySocks>;
};

export type UpdateViewerSettingsInput = {
  data: Scalars["JSON"]["input"];
  migrations: Scalars["JSON"]["input"];
};

export type UpdateViewerSettingsPayload = {
  settings?: Maybe<UserSettings>;
};

export type UpdateWorkflowError =
  | OtherUserError
  | ReadOnlyUserError
  | UnknownIdUserError
  | WorkflowUserError;

export type UpdateWorkflowInput = {
  definition: Scalars["JsonObject"]["input"];
};

export type UpdateWorkflowPayload = {
  error?: Maybe<UpdateWorkflowError>;
  workflow?: Maybe<Workflow>;
};

export type UpdatedAssistantMessageTaskPayload = {
  task: AssistantMessageTask;
};

export type UpdatedAssistantSessionPayload = {
  sessionEdge: AssistantSessionEdge;
  snapshot: Scalars["Snapshot"]["output"];
};

export type UpdatedAutomateEntryPayload = {
  automateEntryEdge: AutomateEntryEdge;
  snapshot: Scalars["Snapshot"]["output"];
};

export type UpdatedAutomateSessionPayload = {
  automateSessionEdge: AutomateSessionEdge;
  snapshot: Scalars["Snapshot"]["output"];
};

export type UpdatedAutomateTaskPayload = {
  automateTaskEdge: AutomateTaskEdge;
  snapshot: Scalars["Snapshot"]["output"];
};

export type UpdatedBackupPayload = {
  backup: Backup;
};

export type UpdatedBrowserPayload = {
  browser: Browser;
};

export type UpdatedCloudStatusPayload = {
  cloudStatus: CloudStatus;
};

export type UpdatedDnsRewritePayload = {
  rewrite: DnsRewrite;
};

export type UpdatedDnsUpstreamPayload = {
  upstream: DnsUpstream;
};

export type UpdatedDataExportPayload = {
  dataExportEdge: DataExportEdge;
  snapshot: Scalars["Snapshot"]["output"];
};

export type UpdatedDeleteInterceptEntriesTaskPayload = {
  snapshot: Scalars["Snapshot"]["output"];
  task: DeleteInterceptEntriesTask;
};

export type UpdatedEnvironmentContextPayload = {
  environmentContext: EnvironmentContext;
};

export type UpdatedEnvironmentPayload = {
  environment: Environment;
  snapshot: Scalars["Snapshot"]["output"];
};

export type UpdatedFilterPresetPayload = {
  filterEdge: FilterPresetEdge;
};

export type UpdatedFindingPayload = {
  findingEdge: FindingEdge;
  snapshot: Scalars["Snapshot"]["output"];
};

export type UpdatedFindingPayloadFindingEdgeArgs = {
  order?: InputMaybe<FindingOrderInput>;
};

export type UpdatedFindingsPayload = {
  findings: Array<UpdatedFindingPayload>;
};

export type UpdatedHostedFilePayload = {
  hostedFile: HostedFile;
};

export type UpdatedInstanceSettingsPayload = {
  settings: InstanceSettings;
};

export type UpdatedInterceptEntryPayload = {
  interceptEntryEdge: InterceptEntryEdge;
  snapshot: Scalars["Snapshot"]["output"];
};

export type UpdatedInterceptEntryPayloadInterceptEntryEdgeArgs = {
  order?: InputMaybe<InterceptEntryOrderInput>;
};

export type UpdatedInterceptOptionsPayload = {
  options: InterceptOptions;
};

export type UpdatedInterceptStatusPayload = {
  status: InterceptStatus;
};

export type UpdatedPluginPackagePayload = {
  package: PluginPackage;
};

export type UpdatedPluginPayload = {
  plugin: Plugin;
};

export type UpdatedProjectPayload = {
  project: Project;
};

export type UpdatedReplaySessionCollectionPayload = {
  collectionEdge: ReplaySessionCollectionEdge;
  snapshot: Scalars["Snapshot"]["output"];
};

export type UpdatedReplaySessionPayload = {
  sessionEdge: ReplaySessionEdge;
  snapshot: Scalars["Snapshot"]["output"];
};

export type UpdatedRequestMetadataPayload = {
  metadata: RequestMetadata;
  snapshot: Scalars["Snapshot"]["output"];
};

export type UpdatedRequestPayload = {
  requestEdge: RequestEdge;
  snapshot: Scalars["Snapshot"]["output"];
};

export type UpdatedRequestPayloadRequestEdgeArgs = {
  order?: InputMaybe<RequestResponseOrderInput>;
};

export type UpdatedScopePayload = {
  scopeEdge: ScopeEdge;
  snapshot: Scalars["Snapshot"]["output"];
};

export type UpdatedSitemapEntryPayload = {
  ancestorIds: Array<Scalars["ID"]["output"]>;
  oldRequest?: Maybe<Request>;
  requestEdge: RequestEdge;
  sitemapEntryEdge: SitemapEntryEdge;
  snapshot: Scalars["Snapshot"]["output"];
};

export type UpdatedSitemapEntryPayloadRequestEdgeArgs = {
  order?: InputMaybe<RequestResponseOrderInput>;
};

export type UpdatedStreamWsMessagePayload = {
  messageEdge: StreamWsMessageEdge;
  snapshot: Scalars["Snapshot"]["output"];
};

export type UpdatedStreamWsMessagePayloadMessageEdgeArgs = {
  order?: InputMaybe<StreamWsMessageOrderInput>;
};

export type UpdatedTamperRuleCollectionPayload = {
  collectionEdge: TamperRuleCollectionEdge;
  snapshot: Scalars["Snapshot"]["output"];
};

export type UpdatedTamperRulePayload = {
  rule: TamperRule;
  snapshot: Scalars["Snapshot"]["output"];
};

export type UpdatedUpstreamPluginPayload = {
  upstream: UpstreamPlugin;
};

export type UpdatedUpstreamProxyHttpPayload = {
  proxy: UpstreamProxyHttp;
};

export type UpdatedUpstreamProxySocksPayload = {
  proxy: UpstreamProxySocks;
};

export type UpdatedViewerAssistantUsagePayload = {
  usage: AssistantUsage;
};

export type UpdatedViewerProfilePayload = {
  profile: UserProfile;
};

export type UpdatedViewerSettingsPayload = {
  settings: UserSettings;
};

export type UpdatedWorkflowPayload = {
  workflowEdge: WorkflowEdge;
};

export type UploadHostedFileInput = {
  file: Scalars["Upload"]["input"];
  name: Scalars["String"]["input"];
};

export type UploadHostedFilePayload = {
  hostedFile?: Maybe<HostedFile>;
};

export type UploadedBrowserPayload = {
  browser: Browser;
};

export type UploadedHostedFilePayload = {
  hostedFile: HostedFile;
};

export type UpstreamPlugin = {
  allowlist: Array<Scalars["String"]["output"]>;
  denylist: Array<Scalars["String"]["output"]>;
  enabled: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  plugin: PluginBackend;
  rank: Scalars["Rank"]["output"];
};

export type UpstreamProxyAuth = UpstreamProxyAuthBasic;

export type UpstreamProxyAuthBasic = {
  password: Scalars["Sensitive"]["output"];
  username: Scalars["String"]["output"];
};

export type UpstreamProxyAuthBasicInput = {
  password: Scalars["Sensitive"]["input"];
  username: Scalars["String"]["input"];
};

export type UpstreamProxyAuthInput = { basic: UpstreamProxyAuthBasicInput };

export type UpstreamProxyHttp = {
  allowlist: Array<Scalars["String"]["output"]>;
  auth?: Maybe<UpstreamProxyAuth>;
  connection: ConnectionInfo;
  denylist: Array<Scalars["String"]["output"]>;
  enabled: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  rank: Scalars["Rank"]["output"];
};

export type UpstreamProxySocks = {
  allowlist: Array<Scalars["String"]["output"]>;
  auth?: Maybe<UpstreamProxyAuth>;
  connection: ConnectionInfo;
  denylist: Array<Scalars["String"]["output"]>;
  enabled: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  includeDns: Scalars["Boolean"]["output"];
  rank: Scalars["Rank"]["output"];
};

export type User = CloudUser | GuestUser | ScriptUser;

export type UserEntitlement = {
  name: Scalars["String"]["output"];
};

export type UserError = {
  code: Scalars["String"]["output"];
};

export type UserIdentity = {
  email: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
};

export type UserProfile = {
  identity: UserIdentity;
  subscription: UserSubscription;
};

export type UserSettings = {
  data: Scalars["JSON"]["output"];
  migrations: Scalars["JSON"]["output"];
};

export type UserSubscription = {
  entitlements: Array<UserEntitlement>;
  plan: UserSubscriptionPlan;
};

export type UserSubscriptionPlan = {
  name: Scalars["String"]["output"];
};

export type Workflow = {
  createdAt: Scalars["DateTime"]["output"];
  definition: Scalars["JsonObject"]["output"];
  enabled: Scalars["Boolean"]["output"];
  global: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  kind: WorkflowKind;
  name: Scalars["String"]["output"];
  readOnly: Scalars["Boolean"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

/** An edge in a connection. */
export type WorkflowEdge = {
  /** A cursor for use in pagination */
  cursor: Scalars["String"]["output"];
  /** The item at the end of the edge */
  node: Workflow;
};

export { WorkflowErrorReason };

export { WorkflowKind };

export type WorkflowNodeDefinition = {
  raw: Scalars["JsonObject"]["output"];
};

export type WorkflowTask = Task & {
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["ID"]["output"];
  workflow: Workflow;
};

export type WorkflowUserError = UserError & {
  code: Scalars["String"]["output"];
  message: Scalars["String"]["output"];
  node?: Maybe<Scalars["String"]["output"]>;
  reason: WorkflowErrorReason;
};

export type Workspace = {
  generation: Scalars["Int"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};
