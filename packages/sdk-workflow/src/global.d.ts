import {
  Body as _Body,
  Bytes as _Bytes,
  Finding as _Finding,
  FindingSpec as _FindingSpec,
  FindingsSDK as _FindingsSDK,
  ID as _ID,
  MaybePromise as _MaybePromise,
  Request as _Request,
  RequestResponse as _RequestResponse,
  RequestSpec as _RequestSpec,
  RequestSpecRaw as _RequestSpecRaw,
  RequestsSDK as _RequestsSDK,
  Response as _Response,
} from "caido:utils";

import {
  HttpInput as _HttpInput,
  PassiveInput as _PassiveInput,
  BytesInput as _BytesInput,
  ConvertInput as _ConvertInput,
  Data as _Data,
  Decision as _Decision,
  SDK as _SDK,
} from "caido:workflow";

declare global {
  //@ts-ignore TS2666
  export {
    _Body as Body,
    _Request as Request,
    _RequestSpec as RequestSpec,
    _RequestSpecRaw as RequestSpecRaw,
    _Response as Response,
    _RequestResponse as RequestResponse,
    _Finding as Finding,
    _FindingSpec as FindingSpec,
    _ID as ID,
    _Bytes as Bytes,
    _MaybePromise as MaybePromise,
    _RequestsSDK as RequestsSDK,
    _FindingsSDK as FindingsSDK,
  };

  //@ts-ignore TS2666
  export {
    _HttpInput as HttpInput,
    _PassiveInput as PassiveInput,
    _BytesInput as BytesInput,
    _ConvertInput as ConvertInput,
    _Data as Data,
    _Decision as Decision,
    _SDK as SDK,
  };
}
