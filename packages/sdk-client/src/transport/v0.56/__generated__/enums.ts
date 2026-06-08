export const AIErrorReason = {
  InvalidAuthentication: "INVALID_AUTHENTICATION",
  ProviderNotConfigured: "PROVIDER_NOT_CONFIGURED",
  RequestMalformed: "REQUEST_MALFORMED",
} as const;

export type AIErrorReason = (typeof AIErrorReason)[keyof typeof AIErrorReason];
export const Alteration = {
  Manual: "MANUAL",
  None: "NONE",
  Tamper: "TAMPER",
} as const;

export type Alteration = (typeof Alteration)[keyof typeof Alteration];
export const AssistantErrorReason = {
  ContextExceeded: "CONTEXT_EXCEEDED",
  InvalidModel: "INVALID_MODEL",
  Offline: "OFFLINE",
  QuotaExceeded: "QUOTA_EXCEEDED",
  Unknown: "UNKNOWN",
} as const;

export type AssistantErrorReason =
  (typeof AssistantErrorReason)[keyof typeof AssistantErrorReason];
export const AssistantMessageRole = {
  Assistant: "ASSISTANT",
  System: "SYSTEM",
  User: "USER",
} as const;

export type AssistantMessageRole =
  (typeof AssistantMessageRole)[keyof typeof AssistantMessageRole];
export const AuthenticationErrorReason = {
  Denied: "DENIED",
  Expired: "EXPIRED",
  Invalid: "INVALID",
  StaleDate: "STALE_DATE",
} as const;

export type AuthenticationErrorReason =
  (typeof AuthenticationErrorReason)[keyof typeof AuthenticationErrorReason];
export const AuthenticationScope = {
  Assistant: "ASSISTANT",
  Offline: "OFFLINE",
  ProfileRead: "PROFILE_READ",
} as const;

export type AuthenticationScope =
  (typeof AuthenticationScope)[keyof typeof AuthenticationScope];
export const AuthorizationErrorReason = {
  Forbidden: "FORBIDDEN",
  InvalidToken: "INVALID_TOKEN",
  MissingScope: "MISSING_SCOPE",
} as const;

export type AuthorizationErrorReason =
  (typeof AuthorizationErrorReason)[keyof typeof AuthorizationErrorReason];
export const AutomateEntryRequestOrderBy = {
  Id: "ID",
  Payload_0: "PAYLOAD_0",
  Payload_1: "PAYLOAD_1",
  Payload_2: "PAYLOAD_2",
  Payload_3: "PAYLOAD_3",
  Payload_4: "PAYLOAD_4",
  Position: "POSITION",
  RespLength: "RESP_LENGTH",
  RespRoundtripTime: "RESP_ROUNDTRIP_TIME",
  RespStatusCode: "RESP_STATUS_CODE",
} as const;

export type AutomateEntryRequestOrderBy =
  (typeof AutomateEntryRequestOrderBy)[keyof typeof AutomateEntryRequestOrderBy];
export const AutomatePayloadStrategy = {
  All: "ALL",
  Matrix: "MATRIX",
  Parallel: "PARALLEL",
  Sequential: "SEQUENTIAL",
} as const;

export type AutomatePayloadStrategy =
  (typeof AutomatePayloadStrategy)[keyof typeof AutomatePayloadStrategy];
export const AutomateTaskErrorReason = {
  Internal: "INTERNAL",
  InvalidHostedFile: "INVALID_HOSTED_FILE",
} as const;

export type AutomateTaskErrorReason =
  (typeof AutomateTaskErrorReason)[keyof typeof AutomateTaskErrorReason];
export const BackupErrorReason = {
  Invalid: "INVALID",
  NotDone: "NOT_DONE",
} as const;

export type BackupErrorReason =
  (typeof BackupErrorReason)[keyof typeof BackupErrorReason];
export const BackupStatus = {
  Done: "DONE",
  Error: "ERROR",
  Processing: "PROCESSING",
} as const;

export type BackupStatus = (typeof BackupStatus)[keyof typeof BackupStatus];
export const CertificateErrorReason = {
  InvalidCertificate: "INVALID_CERTIFICATE",
  InvalidP12: "INVALID_P12",
  InvalidPassword: "INVALID_PASSWORD",
  InvalidPrivateKey: "INVALID_PRIVATE_KEY",
} as const;

export type CertificateErrorReason =
  (typeof CertificateErrorReason)[keyof typeof CertificateErrorReason];
export const CloudErrorReason = {
  Unavailable: "UNAVAILABLE",
  Unexpected: "UNEXPECTED",
} as const;

export type CloudErrorReason =
  (typeof CloudErrorReason)[keyof typeof CloudErrorReason];
export const DataExportFormat = {
  Csv: "CSV",
  Json: "JSON",
} as const;

export type DataExportFormat =
  (typeof DataExportFormat)[keyof typeof DataExportFormat];
export const DataExportStatus = {
  Cancelled: "CANCELLED",
  Done: "DONE",
  Error: "ERROR",
  Processing: "PROCESSING",
} as const;

export type DataExportStatus =
  (typeof DataExportStatus)[keyof typeof DataExportStatus];
export const EnvironmentVariableKind = {
  Plain: "PLAIN",
  Secret: "SECRET",
} as const;

export type EnvironmentVariableKind =
  (typeof EnvironmentVariableKind)[keyof typeof EnvironmentVariableKind];
export const FindingOrderBy = {
  CreatedAt: "CREATED_AT",
  Host: "HOST",
  Id: "ID",
  Path: "PATH",
  Reporter: "REPORTER",
  Title: "TITLE",
} as const;

export type FindingOrderBy =
  (typeof FindingOrderBy)[keyof typeof FindingOrderBy];
export const HostedFileStatus = {
  Error: "ERROR",
  Ready: "READY",
} as const;

export type HostedFileStatus =
  (typeof HostedFileStatus)[keyof typeof HostedFileStatus];
export const InterceptEntryOrderBy = {
  Id: "ID",
  ReqCreatedAt: "REQ_CREATED_AT",
  ReqFileExtension: "REQ_FILE_EXTENSION",
  ReqHost: "REQ_HOST",
  ReqMethod: "REQ_METHOD",
  ReqPath: "REQ_PATH",
  ReqQuery: "REQ_QUERY",
  RespLength: "RESP_LENGTH",
  RespRoundtripTime: "RESP_ROUNDTRIP_TIME",
  RespStatusCode: "RESP_STATUS_CODE",
} as const;

export type InterceptEntryOrderBy =
  (typeof InterceptEntryOrderBy)[keyof typeof InterceptEntryOrderBy];
export const InterceptKind = {
  Request: "REQUEST",
  Response: "RESPONSE",
  StreamWs: "STREAM_WS",
} as const;

export type InterceptKind = (typeof InterceptKind)[keyof typeof InterceptKind];
export const InterceptStatus = {
  Paused: "PAUSED",
  Running: "RUNNING",
} as const;

export type InterceptStatus =
  (typeof InterceptStatus)[keyof typeof InterceptStatus];
export const LogLevel = {
  Debug: "DEBUG",
  Error: "ERROR",
  Info: "INFO",
  Trace: "TRACE",
  Warn: "WARN",
} as const;

export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];
export const Ordering = {
  Asc: "ASC",
  Desc: "DESC",
} as const;

export type Ordering = (typeof Ordering)[keyof typeof Ordering];
export const PermissionDeniedErrorReason = {
  Entitlement: "ENTITLEMENT",
  GuestUser: "GUEST_USER",
  ScriptUser: "SCRIPT_USER",
} as const;

export type PermissionDeniedErrorReason =
  (typeof PermissionDeniedErrorReason)[keyof typeof PermissionDeniedErrorReason];
export const PluginErrorReason = {
  AlreadyInstalled: "ALREADY_INSTALLED",
  InvalidManifest: "INVALID_MANIFEST",
  InvalidOperation: "INVALID_OPERATION",
  InvalidPackage: "INVALID_PACKAGE",
  MissingFile: "MISSING_FILE",
} as const;

export type PluginErrorReason =
  (typeof PluginErrorReason)[keyof typeof PluginErrorReason];
export const PluginRuntime = {
  Javascript: "JAVASCRIPT",
} as const;

export type PluginRuntime = (typeof PluginRuntime)[keyof typeof PluginRuntime];
export const ProjectErrorReason = {
  Deleting: "DELETING",
  Exporting: "EXPORTING",
  InvalidVersion: "INVALID_VERSION",
  NotReady: "NOT_READY",
  TooRecent: "TOO_RECENT",
} as const;

export type ProjectErrorReason =
  (typeof ProjectErrorReason)[keyof typeof ProjectErrorReason];
export const ProjectSelectOnStart = {
  LastUsed: "LAST_USED",
  Nothing: "NOTHING",
  Selected: "SELECTED",
} as const;

export type ProjectSelectOnStart =
  (typeof ProjectSelectOnStart)[keyof typeof ProjectSelectOnStart];
export const ProjectStatus = {
  Error: "ERROR",
  Ready: "READY",
  Restoring: "RESTORING",
} as const;

export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus];
export const RankErrorReason = {
  ConcurrentUpdate: "CONCURRENT_UPDATE",
  InvalidAfterBefore: "INVALID_AFTER_BEFORE",
  NotEnabled: "NOT_ENABLED",
} as const;

export type RankErrorReason =
  (typeof RankErrorReason)[keyof typeof RankErrorReason];
export const RedirectStrategy = {
  Always: "ALWAYS",
  InScope: "IN_SCOPE",
  Never: "NEVER",
  SameSite: "SAME_SITE",
} as const;

export type RedirectStrategy =
  (typeof RedirectStrategy)[keyof typeof RedirectStrategy];
export const RenderFailedErrorReason = {
  Internal: "INTERNAL",
  NoBrowser: "NO_BROWSER",
  NoData: "NO_DATA",
  Timeout: "TIMEOUT",
} as const;

export type RenderFailedErrorReason =
  (typeof RenderFailedErrorReason)[keyof typeof RenderFailedErrorReason];
export const ReplayEntryOrderBy = {
  Id: "ID",
} as const;

export type ReplayEntryOrderBy =
  (typeof ReplayEntryOrderBy)[keyof typeof ReplayEntryOrderBy];
export const RequestResponseOrderBy = {
  CreatedAt: "CREATED_AT",
  FileExtension: "FILE_EXTENSION",
  Host: "HOST",
  Id: "ID",
  Method: "METHOD",
  Path: "PATH",
  Query: "QUERY",
  RespLength: "RESP_LENGTH",
  RespRoundtripTime: "RESP_ROUNDTRIP_TIME",
  RespStatusCode: "RESP_STATUS_CODE",
  Source: "SOURCE",
} as const;

export type RequestResponseOrderBy =
  (typeof RequestResponseOrderBy)[keyof typeof RequestResponseOrderBy];
export const SitemapDescendantsDepth = {
  All: "ALL",
  Direct: "DIRECT",
} as const;

export type SitemapDescendantsDepth =
  (typeof SitemapDescendantsDepth)[keyof typeof SitemapDescendantsDepth];
export const SitemapEntryKind = {
  Directory: "DIRECTORY",
  Domain: "DOMAIN",
  Request: "REQUEST",
  RequestBody: "REQUEST_BODY",
  RequestQuery: "REQUEST_QUERY",
} as const;

export type SitemapEntryKind =
  (typeof SitemapEntryKind)[keyof typeof SitemapEntryKind];
export const Source = {
  Automate: "AUTOMATE",
  Import: "IMPORT",
  Intercept: "INTERCEPT",
  Plugin: "PLUGIN",
  Replay: "REPLAY",
  Sample: "SAMPLE",
  Workflow: "WORKFLOW",
} as const;

export type Source = (typeof Source)[keyof typeof Source];
export const StoreErrorReason = {
  FileUnavailable: "FILE_UNAVAILABLE",
  InvalidPublicKey: "INVALID_PUBLIC_KEY",
  InvalidSignature: "INVALID_SIGNATURE",
  PackageTooLarge: "PACKAGE_TOO_LARGE",
  PackageUnknown: "PACKAGE_UNKNOWN",
} as const;

export type StoreErrorReason =
  (typeof StoreErrorReason)[keyof typeof StoreErrorReason];
export const StreamDirection = {
  Both: "BOTH",
  Client: "CLIENT",
  Server: "SERVER",
} as const;

export type StreamDirection =
  (typeof StreamDirection)[keyof typeof StreamDirection];
export const StreamMessageDirection = {
  Client: "CLIENT",
  Server: "SERVER",
} as const;

export type StreamMessageDirection =
  (typeof StreamMessageDirection)[keyof typeof StreamMessageDirection];
export const StreamOrderBy = {
  Id: "ID",
} as const;

export type StreamOrderBy = (typeof StreamOrderBy)[keyof typeof StreamOrderBy];
export const StreamProtocol = {
  Sse: "SSE",
  Ws: "WS",
} as const;

export type StreamProtocol =
  (typeof StreamProtocol)[keyof typeof StreamProtocol];
export const StreamWsMessageFormat = {
  Binary: "BINARY",
  Text: "TEXT",
} as const;

export type StreamWsMessageFormat =
  (typeof StreamWsMessageFormat)[keyof typeof StreamWsMessageFormat];
export const StreamWsMessageOrderBy = {
  Id: "ID",
} as const;

export type StreamWsMessageOrderBy =
  (typeof StreamWsMessageOrderBy)[keyof typeof StreamWsMessageOrderBy];
export const TaskStatus = {
  Cancelled: "CANCELLED",
  Done: "DONE",
  Error: "ERROR",
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
export const WorkflowErrorReason = {
  ExecutionError: "EXECUTION_ERROR",
  InvalidInput: "INVALID_INPUT",
  InvalidProperty: "INVALID_PROPERTY",
  InvalidTrigger: "INVALID_TRIGGER",
  InvalidWorkflow: "INVALID_WORKFLOW",
} as const;

export type WorkflowErrorReason =
  (typeof WorkflowErrorReason)[keyof typeof WorkflowErrorReason];
export const WorkflowKind = {
  Active: "ACTIVE",
  Convert: "CONVERT",
  Passive: "PASSIVE",
} as const;

export type WorkflowKind = (typeof WorkflowKind)[keyof typeof WorkflowKind];
