// Do not edit, this file was auto-generated (Abaca 0.10.10)

const DEFAULT_ACCEPT = "application/json;q=1, text/*;q=0.5";

const DEFAULT_CONTENT_TYPE = "application/json";

type AsyncOrSync<V> = V | Promise<V>;

type Has<N extends number | string | symbol, V> = {
  readonly [K in N]: V;
};

type Get<O, N extends keyof O | string, D = never> = O extends Has<
  N,
  infer V
>
  ? V & {}
  : D;

type Lookup<
  O,
  N extends keyof O | string,
  D = undefined
> = O extends Has<N, infer V>
  ? V & {}
  : O extends Partial<Has<N, infer V>>
  ? (V & {}) | undefined
  : D;

type Exact<T, V> = T extends V
  ? Exclude<keyof T, keyof V> extends never
    ? T
    : never
  : never;

type Values<O> = O[keyof O];

type KeysOfValues<O> = Values<{
  [K in keyof O]: O[K] extends never ? never : keyof O[K];
}>;
type OperationTypes<N extends string = string> = {
  readonly [K in N]: OperationType;
};

interface OperationType<
  R extends ResponsesType = {},
  P extends ParametersType = {}
> {
  readonly parameters?: P;
  readonly requestBody?: {readonly content: ContentTypes};
  readonly responses: R;
}

interface ParametersType<P = {}, Q = {}, H = {}> {
  readonly path?: P;
  readonly query?: Q;
  readonly headers?: H;
}

type ResponsesType = {
  readonly [C in ResponseCode]?:
    | never
    | {
        readonly content: ContentTypes;
      };
};

type ResponseCodeRange = '2XX' | '3XX' | '4XX' | '5XX';

type ResponseCode = number | ResponseCodeRange | 'default' | string;

interface ContentTypes {
  readonly [M: MimeType]: ContentType;
}

type MimeType = string;

type ContentType = unknown;

type OperationDefinitions<O> = {
  readonly [K in keyof O]: OperationDefinition;
};

type OperationMethod =
  | 'get'
  | 'put'
  | 'post'
  | 'delete'
  | 'options'
  | 'head'
  | 'patch'
  | 'trace';

interface OperationDefinition {
  readonly path: string;
  readonly method: OperationMethod;
  readonly parameters: {readonly [name: string]: ParameterDefinition};
  readonly body?: BodyDefinition;
  readonly responses: {readonly [code: ResponseCode]: ReadonlyArray<MimeType>};
}

interface ParameterDefinition {
  readonly location: ParameterLocation;
  readonly required: boolean;
}

type ParameterLocation = 'header' | 'path' | 'query';

interface BodyDefinition {
  readonly required: boolean;
  readonly types: ReadonlyArray<MimeType>;
}

type Asyncify<V extends ReadonlyArray<any>> = V extends ReadonlyArray<
  infer I
>
  ? AsyncIterable<I>
  : never;

type WithMimeTypeGlobs<M extends MimeType> =
  | M
  | MimeTypePrefixes<M>
  | '*/*';

const FALLBACK_MIME_TYPE = '*/*';

const FORM_MIME_TYPE = 'application/x-www-form-urlencoded';
const JSON_MIME_TYPE = 'application/json';
const JSON_SEQ_MIME_TYPE = 'application/json-seq';
const OCTET_STREAM_MIME_TIME = 'application/octet-stream';

const MULTIPART_MIME_TYPE = 'multipart/*';
const MULTIPART_FORM_MIME_TYPE = 'multipart/form-data';

const PLAIN_MIME_TYPE = 'text/plain';
const TEXT_MIME_TYPE = 'text/*';

type MimeTypePrefixes<M extends MimeType> =
  M extends `${infer P}/${infer _S}` ? `${P}/*` : never;

type SplitMimeTypes<G extends MimeType> =
  G extends `${infer G1}, ${infer G2}`
    ? ExtractMimeType<G1> | SplitMimeTypes<G2>
    : ExtractMimeType<G>;

type ExtractMimeType<G extends MimeType> = G extends `${infer M};${string}`
  ? M
  : G;

type ValuesMatchingMimeTypes<O, G extends MimeType> = Values<{
  [M in keyof O & MimeType]: SplitMimeTypes<G> &
    WithMimeTypeGlobs<M> extends never
    ? never
    : O[M];
}>;

function contentTypeMatches(
  exact: MimeType,
  accepted: Iterable<MimeType>
): boolean {
  for (const item of accepted) {
    if (exact === item || item === FALLBACK_MIME_TYPE) {
      return true;
    }
    const got = exact.split('/');
    const want = item.split('/');
    if (got[0] === want[0] && (got[1] === want[1] || want[1] === '*')) {
      return true;
    }
  }
  return false;
}

class ByMimeType<V> {
  private constructor(private readonly entries: Map<MimeType, V>) {}

  static create<V>(fallback: V): ByMimeType<V> {
    return new ByMimeType(new Map([[FALLBACK_MIME_TYPE, fallback]]));
  }

  add(key: MimeType, val: V): void {
    this.entries.set(key, val);
  }

  addAll(items: Record<MimeType, V> | undefined): void {
    for (const [key, val] of Object.entries(items ?? {})) {
      this.add(key, val);
    }
  }

  getBest(key: MimeType): V {
    const exact = this.entries.get(key);
    if (exact) {
      return exact;
    }
    const partial = this.entries.get(key.replace(/\/.+/, '/*'));
    if (partial) {
      return partial;
    }
    return this.entries.get(FALLBACK_MIME_TYPE)!;
  }
}

type BodyContent<O extends OperationType> = Exclude<
  Lookup<O, 'requestBody'>,
  undefined
>['content'];

type BodyMimeTypes<O extends OperationType> =
  BodyContent<O> extends never ? never : keyof BodyContent<O> & MimeType;

type AllBodyMimeTypes<O extends OperationTypes> = Values<{
  [K in keyof O]: BodyMimeTypes<O[K]>;
}>;

type BodiesMatchingMimeType<
  O extends OperationTypes<keyof O & string>,
  G extends MimeType
> = Values<{
  [K in keyof O]: ValuesMatchingMimeTypes<BodyContent<O[K]>, G>;
}>;

type AllResponseMimeTypes<O extends OperationTypes<keyof O & string>> =
  Values<{
    [K in keyof O]: ResponseMimeTypes<O[K]['responses']>;
  }> &
    MimeType;

type ResponseMimeTypes<
  R extends ResponsesType,
  C extends keyof R = keyof R
> = KeysOfValues<{
  [P in C]: Get<R[P], 'content'>;
}> &
  MimeType;

type AllResponsesMatchingMimeType<
  O extends OperationTypes,
  G extends MimeType
> = Values<{
  [K in keyof O]: ResponsesMatchingMimeType<O[K]['responses'], G>;
}>;

type ResponsesMatchingMimeType<
  R extends ResponsesType,
  G extends MimeType
> = Values<{
  [C in keyof R]: R[C] extends Has<'content', infer O>
    ? ValuesMatchingMimeTypes<O, G>
    : never;
}>;

class ResponseClauseMatcher {
  private constructor(
    private readonly data: ReadonlyMap<ResponseCode, ReadonlySet<MimeType>>
  ) {}

  static create(
    responses: OperationDefinition['responses']
  ): ResponseClauseMatcher {
    const data = new Map<ResponseCode, ReadonlySet<MimeType>>();
    for (const [code, mtypes] of Object.entries(responses)) {
      const ncode = +code;
      data.set(isNaN(ncode) ? code : ncode, new Set(mtypes));
    }
    return new ResponseClauseMatcher(data);
  }

  getBest(status: number): ResponseClause {
    const code = this.getBestCode(status);
    return {code, declared: this.data.get(code)};
  }

  private getBestCode(status: number): ResponseCode {
    const {data} = this;
    if (data.has(status)) {
      return status;
    }
    const partial = ((status / 100) | 0) + 'XX';
    if (data.has(partial)) {
      return partial;
    }
    return 'default';
  }

  acceptable(accepted: Iterable<MimeType>): boolean {
    for (const mtypes of this.data.values()) {
      if (!mtypes.size) {
        continue;
      }
      let overlap = false;
      for (const mtype of mtypes) {
        if (contentTypeMatches(mtype, accepted)) {
          overlap = true;
          break;
        }
      }
      if (!overlap) {
        return false;
      }
    }
    return true;
  }
}

function isResponseTypeValid(args: {
  readonly value: MimeType | undefined;
  readonly declared: ReadonlySet<MimeType> | undefined;
  readonly accepted: ReadonlySet<MimeType>;
}): boolean {
  const {value, declared, accepted} = args;
  if (declared == null) {
    return value == null || contentTypeMatches(value, accepted);
  }
  if (!declared.size) {
    return value == null;
  }
  if (value == null || !declared.has(value)) {
    return false;
  }
  return contentTypeMatches(value, accepted);
}

function acceptedMimeTypes(header: string): ReadonlySet<MimeType> {
  const mtypes = new Set<MimeType>();
  for (const item of header.split(',')) {
    const mtype = item.split(';')[0]!.trim();
    if (mtype && !mtypes.has(mtype)) {
      mtypes.add(mtype);
    }
  }
  return mtypes;
}

interface ResponseClause {
  readonly code: ResponseCode;
  readonly declared?: ReadonlySet<MimeType>;
}

interface SdkConfigFor<
  O extends OperationTypes<keyof O & string>,
  F extends BaseFetch = typeof fetch
> {
  /** API server address. */
  readonly address: Address;

  /** Global request headers, overridable in individual requests. */
  readonly headers?: RequestHeaders;

  /**
   * Other global request options. These can similarly be overriden in
   * individual fetch calls.
   */
  readonly options?: RequestOptions<F>;

  /** Underlying fetch method. */
  readonly fetch?: FetchOption<F>;

  /** Global request body encoders. */
  readonly encoders?: EncodersFor<O, F>;

  /** Global response decoders. */
  readonly decoders?: DecodersFor<O, F>;

  /**
   * Unexpected response coercion. The default will ignore bodies of responses
   * which do not have any declared content and throw an error otherwise.
   */
  readonly coercer?: Coercer<F>;
}

type Address = string | URL | AddressInfo;

interface AddressInfo {
  // net.AddressInfo
  readonly address: string;
  readonly port: number;
}

type RequestHeaders = Record<string, string>;

interface BaseInit<B = any> {
  readonly body?: B;
  readonly headers: RequestHeaders;
  readonly method: string;
}

interface BaseResponse {
  readonly status: number;
  readonly headers: {
    get(name: string): string | null | undefined;
  };
  text(): Promise<string>;
}

type BaseFetch = (url: string, init: BaseInit) => Promise<BaseResponse>;

type FetchOption<F extends BaseFetch = typeof fetch> = (
  url: string,
  init: BaseInit<BodyInitFor<F>> & RequestOptions<F>
) => Promise<ResponseFor<F>>;

type RequestOptions<F> = Omit<
  RequestInitFor<F>,
  'body' | 'headers' | 'method'
>;

type RequestInitFor<F> = F extends (url: any, init?: infer R) => any
  ? R
  : never;

type EncodersFor<O extends OperationTypes, F extends BaseFetch> = {
  readonly [K in WithMimeTypeGlobs<AllBodyMimeTypes<O>>]?: Encoder<
    BodiesMatchingMimeType<O, K>,
    F
  >;
};

type Encoder<B = any, F extends BaseFetch = typeof fetch> = (
  body: B,
  ctx: EncoderContext<F>
) => AsyncOrSync<BodyInitFor<F>>;

type BodyInitFor<F> = Lookup<RequestInitFor<F>, 'body', unknown>;

interface EncoderContext<F> {
  readonly operationId: string;
  readonly contentType: string;
  readonly headers: RequestHeaders;
  readonly options?: RequestOptions<F>;
}

type DecodersFor<O extends OperationTypes, F extends BaseFetch> = {
  readonly [K in WithMimeTypeGlobs<AllResponseMimeTypes<O>>]?: Decoder<
    AllResponsesMatchingMimeType<O, K>,
    F
  >;
};

type Decoder<R = any, F extends BaseFetch = typeof fetch> = (
  res: ResponseFor<F>,
  ctx: DecoderContext<F>
) => AsyncOrSync<R>;

type ResponseFor<F> = F extends (
  url: any,
  init?: any
) => Promise<infer R>
  ? R
  : never;

interface DecoderContext<F> {
  readonly operationId: string;
  readonly contentType: string;
  readonly headers: RequestHeaders;
  readonly options?: RequestOptions<F>;
}

type Coercer<F extends BaseFetch> = (
  res: ResponseFor<F>,
  ctx: CoercerContext
) => AsyncOrSync<MimeType | undefined>;

interface CoercerContext {
  readonly path: string;
  readonly method: string;
  readonly received: MimeType | undefined;
  readonly accepted: ReadonlySet<MimeType>;
  readonly declared: ReadonlySet<MimeType> | undefined; // undefined if implicit
}

type DA = typeof DEFAULT_ACCEPT;
type DM = typeof DEFAULT_CONTENT_TYPE;

const binaryEncoder: Encoder<Blob> = (body) => body;
const binaryDecoder: Decoder<Blob> = (res) => res.blob();

const jsonEncoder: Encoder = (body) => JSON.stringify(body);
const jsonDecoder: Decoder = (res) => res.json();

const textEncoder: Encoder = (body) => (body == null ? '' : '' + body);
const textDecoder: Decoder<string> = (res) => res.text();

// This doesn't supported nested objects. See also
// https://stackoverflow.com/a/37562814 for information on why we can return the
// params directly.
const formEncoder: Encoder = (body) => {
  const params = new URLSearchParams();
  for (const [key, val] of Object.entries(body)) {
    if (Array.isArray(val)) {
      for (const elem of val) {
        params.append(key, '' + elem);
      }
    } else {
      params.set(key, '' + val);
    }
  }
  return params;
};

const multipartFormEncoder: Encoder = (body) => {
  const form = new FormData();
  if (!body || typeof body != 'object') {
    throw new Error('Unsupported multipart-form input: ' + body);
  }
  for (const [key, val] of Object.entries(body)) {
    form.set(
      key,
      typeof val == 'string' || val instanceof Blob
        ? val
        : new Blob([JSON.stringify(val)], {type: JSON_MIME_TYPE})
    );
  }
  return form;
};

const fallbackEncoder: Encoder = (_body, ctx) => {
  throw new Error('Unsupported request content-type: ' + ctx.contentType);
};
const fallbackDecoder: Decoder<never> = (_res, ctx) => {
  throw new Error('Unsupported response content-type: ' + ctx.contentType);
};

const defaultCoercer: Coercer<BaseFetch> = async (res, ctx) => {
  const mtype = ctx.received;
  if (
    (mtype && ctx.declared == null) ||
    (mtype === PLAIN_MIME_TYPE && !ctx.declared?.has(mtype))
  ) {
    await res.text(); // Consume response body.
    return undefined;
  }
  throw new Error(
    `Unexpected ${ctx.method.toUpperCase()} ${ctx.path} response content ` +
      `type ${mtype} for status ${res.status} (accepted: ` +
      `[${[...ctx.accepted]}], declared: ` +
      `${ctx.declared ? `[${[...ctx.declared]}]` : '<none>'})`
  );
};

type Input<O, F extends BaseFetch> = O extends OperationType<infer R, infer P>
  ? CommonInput<F> &
      MaybeBodyInput<Lookup<Lookup<O, 'requestBody'>, 'content'>, F> &
      MaybeAcceptInput<R, F> &
      MaybeParamInput<P>
  : never;

interface CommonInput<F> {
  readonly headers?: RequestHeaders;
  readonly options?: RequestOptions<F>;
}

type MaybeBodyInput<B, F extends BaseFetch> = [B] extends [undefined]
  ? {}
  : undefined extends B
  ? BodyInput<Exclude<B, undefined>, F> | {readonly body?: never}
  : BodyInput<B, F>;

type BodyInput<B, F extends BaseFetch> =
  | DefaultBodyInput<B, F>
  | CustomBodyInput<B, F>;

type DefaultBodyInput<B, F extends BaseFetch> = DM extends keyof B
  ? {
      readonly headers?: {'content-type'?: DM};
      readonly body: B[DM];
      readonly encoder?: Encoder<B[DM], F>;
    }
  : never;

type CustomBodyInput<B, F extends BaseFetch> = Values<{
  [K in keyof B & MimeType]: {
    readonly headers: {'content-type': K};
    readonly body: B[K];
    readonly encoder?: Encoder<B[K], F>;
  };
}>;

type MaybeAcceptInput<
  R extends ResponsesType,
  F extends BaseFetch
> = ResponseMimeTypes<R> extends never
  ? {}
  :
      | DefaultAcceptInput<R, F>
      | SimpleAcceptInput<R, F>
      | CustomAcceptInput<R, F>;

type DefaultAcceptInput<
  R extends ResponsesType,
  F extends BaseFetch
> = SplitMimeTypes<DA> & WithMimeTypeGlobs<ResponseMimeTypes<R>> extends never
  ? never
  : {
      readonly headers?: {readonly accept?: DA};
      readonly decoder?: AcceptDecoder<R, F, DA>;
    };

type SimpleAcceptInput<R extends ResponsesType, F extends BaseFetch> = Values<{
  [M in WithMimeTypeGlobs<ResponseMimeTypes<R>> & string]: {
    readonly headers: {readonly accept: M};
    readonly decoder?: AcceptDecoder<R, F, M>;
  };
}>;

type CustomAcceptInput<R extends ResponsesType, F extends BaseFetch> = Values<{
  [M in WithMimeTypeGlobs<ResponseMimeTypes<R>> & string]: {
    readonly headers: {readonly accept: PrefixedMimeType<M>};
    readonly decoder?: AcceptDecoder<R, F, ResponseMimeTypes<R>>;
  };
}>;

type PrefixedMimeType<M extends MimeType> = `${M}${string}`;

type AcceptDecoder<
  R extends ResponsesType,
  F extends BaseFetch,
  M extends MimeType
> = Decoder<ResponsesMatchingMimeType<R, M>, F>;

type MaybeParamInput<P extends ParametersType> = MaybeParam<
  Lookup<P, 'path', {}> & Lookup<P, 'query', {}> & Lookup<P, 'headers', {}>
>;

type MaybeParam<V> = keyof V extends never
  ? {}
  : {} extends V
  ? {readonly params?: V}
  : {readonly params: V};

type Output<
  O extends OperationType,
  F extends BaseFetch,
  X
> = O extends OperationType<infer R>
  ? CommonOutput<F> & DataOutput<GetHeader<X, 'accept', DA> & MimeType, R>
  : never;

type GetHeader<X, H extends string, D> = X extends HasHeader<H, infer V>
  ? V
  : D;

interface HasHeader<H extends string, V extends string> {
  readonly headers: {
    readonly [K in H]: V;
  };
}

interface CommonOutput<F> {
  readonly code: ResponseCode;
  readonly raw: ResponseFor<F>;
}

type DataOutput<M extends MimeType, R extends ResponsesType> =
  | ExpectedDataOutput<M, R>
  | MaybeUnknownOutput<R>;

type ExpectedDataOutput<M extends MimeType, R extends ResponsesType> = Values<{
  [C in keyof R]: R[C] extends Has<'content', infer O>
    ? WithCode<C, ValuesMatchingMimeTypes<O, M>>
    : CodedData<C, undefined>;
}>;

type WithCode<C, D> = CodedData<C, D extends never ? undefined : D>;

interface CodedData<C, D = unknown> {
  readonly code: C;
  readonly data: D;
}

type MaybeUnknownOutput<R extends ResponsesType> = 'default' extends keyof R
  ? never
  : CodedData<'default'>;

type SdkFor<
  O extends OperationTypes<keyof O & string>,
  F extends BaseFetch = typeof fetch
> = {
  readonly [K in keyof O]: SdkFunction<O[K], F, Input<O[K], F>>;
};

// We use this convoluted approach instead of a union of overloaded function
// interfaces (or types) to allow reference lookups to see-through this
// definition and link directly to the underlying operation type.
type SdkFunction<
  O extends OperationType,
  F extends BaseFetch,
  I extends Input<OperationType, F>
> = {} extends I
  ? <X extends I = I>(
      args?: X & NeverAdditional<I, X>
    ) => Promise<Output<O, F, Exact<I, X> extends never ? X : {}>>
  : <X extends I>(args: X & NeverAdditional<I, X>) => Promise<Output<O, F, X>>;

type NeverAdditional<I, X> = I extends boolean | null | number | string
  ? I
  : unknown extends I
  ? unknown
  : I extends ReadonlyArray<infer E>
  ? X extends ReadonlyArray<infer F>
    ? ReadonlyArray<NeverAdditional<E, F>>
    : never
  : {
      readonly [K in keyof X]: K extends keyof I
        ? NeverAdditional<I[K], NonNullable<X[K]>>
        : never;
    };

function createSdkFor<
  O extends OperationTypes<keyof O & string>,
  F extends BaseFetch
>(
  operations: OperationDefinitions<O>,
  config: SdkConfigFor<O, F>
): SdkFor<O, F> {
  const realFetch: BaseFetch = (config.fetch as any) ?? fetch;

  const target = config.address;
  const root =
    typeof target == 'string' || target instanceof URL
      ? target.toString().replace(/\/+$/, '')
      : `http://${
          target.address.includes(':') ? `[${target.address}]` : target.address
        }:${target.port}`;

  const base: any = config.options ?? {};
  const baseHeaders = config.headers;
  const coercer: Coercer<any> = config.coercer ?? defaultCoercer;

  const encoders = ByMimeType.create<Encoder>(fallbackEncoder);
  encoders.add(MULTIPART_FORM_MIME_TYPE, multipartFormEncoder);
  encoders.add(FORM_MIME_TYPE, formEncoder);
  encoders.add(JSON_MIME_TYPE, jsonEncoder);
  encoders.add(OCTET_STREAM_MIME_TIME, binaryEncoder);
  encoders.add(TEXT_MIME_TYPE, textEncoder);
  encoders.addAll(config.encoders as any);

  const decoders = ByMimeType.create<Decoder>(fallbackDecoder);
  decoders.add(JSON_MIME_TYPE, jsonDecoder);
  decoders.add(OCTET_STREAM_MIME_TIME, binaryDecoder);
  decoders.add(TEXT_MIME_TYPE, textDecoder);
  decoders.addAll(config.decoders as any);

  const fetchers: any = {};
  for (const [id, op] of Object.entries<OperationDefinition>(operations)) {
    const clauseMatcher = ResponseClauseMatcher.create(op.responses);
    fetchers[id] = async (init: any): Promise<any> => {
      const {body: rawBody, encoder, decoder, ...input} = init ?? {};
      const params = input?.params ?? {};

      const url = new URL(
        root + formatPath(op.path, params),
        typeof document == 'undefined' ? undefined : document.baseURI
      );
      const paramHeaders: any = {};
      for (const [name, val] of Object.entries<any>(params)) {
        switch (op.parameters[name]?.location) {
          case 'header':
            paramHeaders[name] = encodeURIComponent(val);
            break;
          case 'query':
            url.searchParams.set(name, encodeURIComponent(val));
            break;
        }
      }

      const accept = init?.headers?.['accept'] ?? DEFAULT_ACCEPT;
      const requestType =
        init?.headers?.['content-type'] ?? DEFAULT_CONTENT_TYPE;
      const headers = {
        ...baseHeaders,
        ...init?.headers,
        ...paramHeaders,
        'content-type': requestType,
        accept,
      };

      let body;
      if (rawBody !== undefined) {
        const encode = encoder ?? encoders.getBest(requestType);
        body = await encode(rawBody, {
          operationId: id,
          contentType: requestType,
          headers,
          options: init?.options,
        });
      }
      if (body === undefined || body instanceof FormData) {
        delete headers['content-type'];
      }

      const res = await realFetch('' + url, {
        ...base,
        ...input.options,
        headers,
        method: op.method,
        body,
      });

      let responseType =
        res.headers.get('content-type')?.split(';')?.[0] || undefined;
      const accepted = acceptedMimeTypes(accept);
      const {code, declared} = clauseMatcher.getBest(res.status);
      if (!isResponseTypeValid({value: responseType, declared, accepted})) {
        responseType = await coercer(res, {
          path: op.path,
          method: op.method,
          received: responseType,
          declared,
          accepted,
        });
      }

      let data;
      if (responseType) {
        const decode = decoder ?? decoders.getBest(responseType);
        data = await decode(res, {
          operationId: id,
          contentType: responseType,
          headers,
          options: init?.options,
        });
      }
      const ret = {code, data};
      // Add the raw response as non-enumerable property so that it doesn't get
      // displayed in error messages.
      Object.defineProperty(ret, 'raw', {value: res});
      return ret;
    };
  }
  return fetchers;
}

function formatPath(p: string, o: Record<string, unknown>): string {
  return p.replace(/{[^}]+}/, (s) => {
    const r = o[s.slice(1, -1)];
    return r == null ? s : '' + r;
  });
}

type RequestBodyFor<
  O extends OperationType,
  M extends BodyMimeTypes<O> = BodyMimeTypes<O>
> = Lookup<Lookup<Lookup<O, 'requestBody'>, 'content'>, M, never>;

type RequestParametersFor<O extends OperationType> = Lookup<
  O['parameters'],
  'path',
  {}
> &
  Lookup<O['parameters'], 'query', {}> &
  Lookup<O['parameters'], 'headers', {}>;

type ResponseDataFor<
  O extends OperationType,
  C extends keyof O['responses'],
  M extends ResponseMimeTypes<O['responses'], C> = ResponseMimeTypes<
    O['responses'],
    C
  >
> = Get<Lookup<O['responses'][C], 'content'>, M>;

interface paths {
  "/albums": {
    /**
     * Get Several Albums
     *
     * @description Get Spotify catalog information for multiple albums identified by their Spotify IDs.
     */
    get: operations["get-multiple-albums"];
  };
  "/albums/{id}": {
    /**
     * Get Album
     *
     * @description Get Spotify catalog information for a single album.
     */
    get: operations["get-an-album"];
  };
  "/albums/{id}/tracks": {
    /**
     * Get Album Tracks
     *
     * @description Get Spotify catalog information about an album’s tracks.
     * Optional parameters can be used to limit the number of tracks returned.
     */
    get: operations["get-an-albums-tracks"];
  };
  "/artists": {
    /**
     * Get Several Artists
     *
     * @description Get Spotify catalog information for several artists based on their Spotify IDs.
     */
    get: operations["get-multiple-artists"];
  };
  "/artists/{id}": {
    /**
     * Get Artist
     *
     * @description Get Spotify catalog information for a single artist identified by their unique Spotify ID.
     */
    get: operations["get-an-artist"];
  };
  "/artists/{id}/albums": {
    /**
     * Get Artist's Albums
     *
     * @description Get Spotify catalog information about an artist's albums.
     */
    get: operations["get-an-artists-albums"];
  };
  "/artists/{id}/related-artists": {
    /**
     * Get Artist's Related Artists
     *
     * @description Get Spotify catalog information about artists similar to a given artist. Similarity is based on analysis of the Spotify community's [listening history](http://news.spotify.com/se/2010/02/03/related-artists/).
     */
    get: operations["get-an-artists-related-artists"];
  };
  "/artists/{id}/top-tracks": {
    /**
     * Get Artist's Top Tracks
     *
     * @description Get Spotify catalog information about an artist's top tracks by country.
     */
    get: operations["get-an-artists-top-tracks"];
  };
  "/audio-analysis/{id}": {
    /**
     * Get Track's Audio Analysis
     *
     * @description Get a low-level audio analysis for a track in the Spotify catalog. The audio analysis describes the track’s structure and musical content, including rhythm, pitch, and timbre.
     */
    get: operations["get-audio-analysis"];
  };
  "/audio-features": {
    /**
     * Get Tracks' Audio Features
     *
     * @description Get audio features for multiple tracks based on their Spotify IDs.
     */
    get: operations["get-several-audio-features"];
  };
  "/audio-features/{id}": {
    /**
     * Get Track's Audio Features
     *
     * @description Get audio feature information for a single track identified by its unique
     * Spotify ID.
     */
    get: operations["get-audio-features"];
  };
  "/audiobooks": {
    /**
     * Get Several Audiobooks
     *
     * @description Get Spotify catalog information for several audiobooks identified by their Spotify IDs.<br />
     * **Note: Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.**
     */
    get: operations["get-multiple-audiobooks"];
  };
  "/audiobooks/{id}": {
    /**
     * Get an Audiobook
     *
     * @description Get Spotify catalog information for a single audiobook.<br />
     * **Note: Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.**
     */
    get: operations["get-an-audiobook"];
  };
  "/audiobooks/{id}/chapters": {
    /**
     * Get Audiobook Chapters
     *
     * @description Get Spotify catalog information about an audiobook's chapters.<br />
     * **Note: Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.**
     */
    get: operations["get-audiobook-chapters"];
  };
  "/browse/categories": {
    /**
     * Get Several Browse Categories
     *
     * @description Get a list of categories used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).
     */
    get: operations["get-categories"];
  };
  "/browse/categories/{category_id}": {
    /**
     * Get Single Browse Category
     *
     * @description Get a single category used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).
     */
    get: operations["get-a-category"];
  };
  "/browse/categories/{category_id}/playlists": {
    /**
     * Get Category's Playlists
     *
     * @description Get a list of Spotify playlists tagged with a particular category.
     */
    get: operations["get-a-categories-playlists"];
  };
  "/browse/featured-playlists": {
    /**
     * Get Featured Playlists
     *
     * @description Get a list of Spotify featured playlists (shown, for example, on a Spotify player's 'Browse' tab).
     */
    get: operations["get-featured-playlists"];
  };
  "/browse/new-releases": {
    /**
     * Get New Releases
     *
     * @description Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab).
     */
    get: operations["get-new-releases"];
  };
  "/chapters": {
    /**
     * Get Several Chapters
     *
     * @description Get Spotify catalog information for several chapters identified by their Spotify IDs.<br />
     * **Note: Chapters are only available for the US, UK, Ireland, New Zealand and Australia markets.**
     */
    get: operations["get-several-chapters"];
  };
  "/chapters/{id}": {
    /**
     * Get a Chapter
     *
     * @description Get Spotify catalog information for a single chapter.<br />
     * **Note: Chapters are only available for the US, UK, Ireland, New Zealand and Australia markets.**
     */
    get: operations["get-a-chapter"];
  };
  "/episodes": {
    /**
     * Get Several Episodes
     *
     * @description Get Spotify catalog information for several episodes based on their Spotify IDs.
     */
    get: operations["get-multiple-episodes"];
  };
  "/episodes/{id}": {
    /**
     * Get Episode
     *
     * @description Get Spotify catalog information for a single episode identified by its
     * unique Spotify ID.
     */
    get: operations["get-an-episode"];
  };
  "/markets": {
    /**
     * Get Available Markets
     *
     * @description Get the list of markets where Spotify is available.
     */
    get: operations["get-available-markets"];
  };
  "/me": {
    /**
     * Get Current User's Profile
     *
     * @description Get detailed profile information about the current user (including the
     * current user's username).
     */
    get: operations["get-current-users-profile"];
  };
  "/me/albums": {
    /**
     * Get User's Saved Albums
     *
     * @description Get a list of the albums saved in the current Spotify user's 'Your Music' library.
     */
    get: operations["get-users-saved-albums"];
    /**
     * Save Albums for Current User
     *
     * @description Save one or more albums to the current user's 'Your Music' library.
     */
    put: operations["save-albums-user"];
    /**
     * Remove Users' Saved Albums
     *
     * @description Remove one or more albums from the current user's 'Your Music' library.
     */
    delete: operations["remove-albums-user"];
  };
  "/me/albums/contains": {
    /**
     * Check User's Saved Albums
     *
     * @description Check if one or more albums is already saved in the current Spotify user's 'Your Music' library.
     */
    get: operations["check-users-saved-albums"];
  };
  "/me/audiobooks": {
    /**
     * Get User's Saved Audiobooks
     *
     * @description Get a list of the audiobooks saved in the current Spotify user's 'Your Music' library.
     */
    get: operations["get-users-saved-audiobooks"];
    /**
     * Save Audiobooks for Current User
     *
     * @description Save one or more audiobooks to the current Spotify user's library.
     */
    put: operations["save-audiobooks-user"];
    /**
     * Remove User's Saved Audiobooks
     *
     * @description Remove one or more audiobooks from the Spotify user's library.
     */
    delete: operations["remove-audiobooks-user"];
  };
  "/me/audiobooks/contains": {
    /**
     * Check User's Saved Audiobooks
     *
     * @description Check if one or more audiobooks are already saved in the current Spotify user's library.
     */
    get: operations["check-users-saved-audiobooks"];
  };
  "/me/episodes": {
    /**
     * Get User's Saved Episodes
     *
     * @description Get a list of the episodes saved in the current Spotify user's library.<br/>
     * This API endpoint is in __beta__ and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
     */
    get: operations["get-users-saved-episodes"];
    /**
     * Save Episodes for Current User
     *
     * @description Save one or more episodes to the current user's library.<br/>
     * This API endpoint is in __beta__ and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
     */
    put: operations["save-episodes-user"];
    /**
     * Remove User's Saved Episodes
     *
     * @description Remove one or more episodes from the current user's library.<br/>
     * This API endpoint is in __beta__ and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
     */
    delete: operations["remove-episodes-user"];
  };
  "/me/episodes/contains": {
    /**
     * Check User's Saved Episodes
     *
     * @description Check if one or more episodes is already saved in the current Spotify user's 'Your Episodes' library.<br/>
     * This API endpoint is in __beta__ and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer)..
     */
    get: operations["check-users-saved-episodes"];
  };
  "/me/following": {
    /**
     * Get Followed Artists
     *
     * @description Get the current user's followed artists.
     */
    get: operations["get-followed"];
    /**
     * Follow Artists or Users
     *
     * @description Add the current user as a follower of one or more artists or other Spotify users.
     */
    put: operations["follow-artists-users"];
    /**
     * Unfollow Artists or Users
     *
     * @description Remove the current user as a follower of one or more artists or other Spotify users.
     */
    delete: operations["unfollow-artists-users"];
  };
  "/me/following/contains": {
    /**
     * Check If User Follows Artists or Users
     *
     * @description Check to see if the current user is following one or more artists or other Spotify users.
     */
    get: operations["check-current-user-follows"];
  };
  "/me/player": {
    /**
     * Get Playback State
     *
     * @description Get information about the user’s current playback state, including track or episode, progress, and active device.
     */
    get: operations["get-information-about-the-users-current-playback"];
    /**
     * Transfer Playback
     *
     * @description Transfer playback to a new device and determine if it should start playing.
     */
    put: operations["transfer-a-users-playback"];
  };
  "/me/player/currently-playing": {
    /**
     * Get Currently Playing Track
     *
     * @description Get the object currently being played on the user's Spotify account.
     */
    get: operations["get-the-users-currently-playing-track"];
  };
  "/me/player/devices": {
    /**
     * Get Available Devices
     *
     * @description Get information about a user’s available devices.
     */
    get: operations["get-a-users-available-devices"];
  };
  "/me/player/next": {
    /**
     * Skip To Next
     *
     * @description Skips to next track in the user’s queue.
     */
    post: operations["skip-users-playback-to-next-track"];
  };
  "/me/player/pause": {
    /**
     * Pause Playback
     *
     * @description Pause playback on the user's account.
     */
    put: operations["pause-a-users-playback"];
  };
  "/me/player/play": {
    /**
     * Start/Resume Playback
     *
     * @description Start a new context or resume current playback on the user's active device.
     */
    put: operations["start-a-users-playback"];
  };
  "/me/player/previous": {
    /**
     * Skip To Previous
     *
     * @description Skips to previous track in the user’s queue.
     */
    post: operations["skip-users-playback-to-previous-track"];
  };
  "/me/player/queue": {
    /**
     * Get the User's Queue
     *
     * @description Get the list of objects that make up the user's queue.
     */
    get: operations["get-queue"];
    /**
     * Add Item to Playback Queue
     *
     * @description Add an item to the end of the user's current playback queue.
     */
    post: operations["add-to-queue"];
  };
  "/me/player/recently-played": {
    /**
     * Get Recently Played Tracks
     *
     * @description Get tracks from the current user's recently played tracks.
     * _**Note**: Currently doesn't support podcast episodes._
     */
    get: operations["get-recently-played"];
  };
  "/me/player/repeat": {
    /**
     * Set Repeat Mode
     *
     * @description Set the repeat mode for the user's playback. Options are repeat-track,
     * repeat-context, and off.
     */
    put: operations["set-repeat-mode-on-users-playback"];
  };
  "/me/player/seek": {
    /**
     * Seek To Position
     *
     * @description Seeks to the given position in the user’s currently playing track.
     */
    put: operations["seek-to-position-in-currently-playing-track"];
  };
  "/me/player/shuffle": {
    /**
     * Toggle Playback Shuffle
     *
     * @description Toggle shuffle on or off for user’s playback.
     */
    put: operations["toggle-shuffle-for-users-playback"];
  };
  "/me/player/volume": {
    /**
     * Set Playback Volume
     *
     * @description Set the volume for the user’s current playback device.
     */
    put: operations["set-volume-for-users-playback"];
  };
  "/me/playlists": {
    /**
     * Get Current User's Playlists
     *
     * @description Get a list of the playlists owned or followed by the current Spotify
     * user.
     */
    get: operations["get-a-list-of-current-users-playlists"];
  };
  "/me/shows": {
    /**
     * Get User's Saved Shows
     *
     * @description Get a list of shows saved in the current Spotify user's library. Optional parameters can be used to limit the number of shows returned.
     */
    get: operations["get-users-saved-shows"];
    /**
     * Save Shows for Current User
     *
     * @description Save one or more shows to current Spotify user's library.
     */
    put: operations["save-shows-user"];
    /**
     * Remove User's Saved Shows
     *
     * @description Delete one or more shows from current Spotify user's library.
     */
    delete: operations["remove-shows-user"];
  };
  "/me/shows/contains": {
    /**
     * Check User's Saved Shows
     *
     * @description Check if one or more shows is already saved in the current Spotify user's library.
     */
    get: operations["check-users-saved-shows"];
  };
  "/me/top/artists": {
    /**
     * Get User's Top Artists
     *
     * @description Get the current user's top artists based on calculated affinity.
     */
    get: operations["get-users-top-artists"];
  };
  "/me/top/tracks": {
    /**
     * Get User's Top Tracks
     *
     * @description Get the current user's top tracks based on calculated affinity.
     */
    get: operations["get-users-top-tracks"];
  };
  "/me/tracks": {
    /**
     * Get User's Saved Tracks
     *
     * @description Get a list of the songs saved in the current Spotify user's 'Your Music' library.
     */
    get: operations["get-users-saved-tracks"];
    /**
     * Save Tracks for Current User
     *
     * @description Save one or more tracks to the current user's 'Your Music' library.
     */
    put: operations["save-tracks-user"];
    /**
     * Remove User's Saved Tracks
     *
     * @description Remove one or more tracks from the current user's 'Your Music' library.
     */
    delete: operations["remove-tracks-user"];
  };
  "/me/tracks/contains": {
    /**
     * Check User's Saved Tracks
     *
     * @description Check if one or more tracks is already saved in the current Spotify user's 'Your Music' library.
     */
    get: operations["check-users-saved-tracks"];
  };
  "/playlists/{playlist_id}": {
    /**
     * Get Playlist
     *
     * @description Get a playlist owned by a Spotify user.
     */
    get: operations["get-playlist"];
    /**
     * Change Playlist Details
     *
     * @description Change a playlist's name and public/private state. (The user must, of
     * course, own the playlist.)
     */
    put: operations["change-playlist-details"];
  };
  "/playlists/{playlist_id}/followers": {
    /**
     * Follow Playlist
     *
     * @description Add the current user as a follower of a playlist.
     */
    put: operations["follow-playlist"];
    /**
     * Unfollow Playlist
     *
     * @description Remove the current user as a follower of a playlist.
     */
    delete: operations["unfollow-playlist"];
  };
  "/playlists/{playlist_id}/followers/contains": {
    /**
     * Check if Users Follow Playlist
     *
     * @description Check to see if one or more Spotify users are following a specified playlist.
     */
    get: operations["check-if-user-follows-playlist"];
  };
  "/playlists/{playlist_id}/images": {
    /**
     * Get Playlist Cover Image
     *
     * @description Get the current image associated with a specific playlist.
     */
    get: operations["get-playlist-cover"];
    /**
     * Add Custom Playlist Cover Image
     *
     * @description Replace the image used to represent a specific playlist.
     */
    put: operations["upload-custom-playlist-cover"];
  };
  "/playlists/{playlist_id}/tracks": {
    /**
     * Get Playlist Items
     *
     * @description Get full details of the items of a playlist owned by a Spotify user.
     */
    get: operations["get-playlists-tracks"];
    /**
     * Update Playlist Items
     *
     * @description Either reorder or replace items in a playlist depending on the request's parameters.
     * To reorder items, include `range_start`, `insert_before`, `range_length` and `snapshot_id` in the request's body.
     * To replace items, include `uris` as either a query parameter or in the request's body.
     * Replacing items in a playlist will overwrite its existing items. This operation can be used for replacing or clearing items in a playlist.
     * <br/>
     * **Note**: Replace and reorder are mutually exclusive operations which share the same endpoint, but have different parameters.
     * These operations can't be applied together in a single request.
     */
    put: operations["reorder-or-replace-playlists-tracks"];
    /**
     * Add Items to Playlist
     *
     * @description Add one or more items to a user's playlist.
     */
    post: operations["add-tracks-to-playlist"];
    /**
     * Remove Playlist Items
     *
     * @description Remove one or more items from a user's playlist.
     */
    delete: operations["remove-tracks-playlist"];
  };
  "/recommendations": {
    /**
     * Get Recommendations
     *
     * @description Recommendations are generated based on the available information for a given seed entity and matched against similar artists and tracks. If there is sufficient information about the provided seeds, a list of tracks will be returned together with pool size details.
     *
     * For artists and tracks that are very new or obscure there might not be enough data to generate a list of tracks.
     */
    get: operations["get-recommendations"];
  };
  "/recommendations/available-genre-seeds": {
    /**
     * Get Available Genre Seeds
     *
     * @description Retrieve a list of available genres seed parameter values for [recommendations](/documentation/web-api/reference/get-recommendations).
     */
    get: operations["get-recommendation-genres"];
  };
  "/search": {
    /**
     * Search for Item
     *
     * @description Get Spotify catalog information about albums, artists, playlists, tracks, shows, episodes or audiobooks
     * that match a keyword string.<br />
     * **Note: Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.**
     */
    get: operations["search"];
  };
  "/shows": {
    /**
     * Get Several Shows
     *
     * @description Get Spotify catalog information for several shows based on their Spotify IDs.
     */
    get: operations["get-multiple-shows"];
  };
  "/shows/{id}": {
    /**
     * Get Show
     *
     * @description Get Spotify catalog information for a single show identified by its
     * unique Spotify ID.
     */
    get: operations["get-a-show"];
  };
  "/shows/{id}/episodes": {
    /**
     * Get Show Episodes
     *
     * @description Get Spotify catalog information about an show’s episodes. Optional parameters can be used to limit the number of episodes returned.
     */
    get: operations["get-a-shows-episodes"];
  };
  "/tracks": {
    /**
     * Get Several Tracks
     *
     * @description Get Spotify catalog information for multiple tracks based on their Spotify IDs.
     */
    get: operations["get-several-tracks"];
  };
  "/tracks/{id}": {
    /**
     * Get Track
     *
     * @description Get Spotify catalog information for a single track identified by its
     * unique Spotify ID.
     */
    get: operations["get-track"];
  };
  "/users/{user_id}": {
    /**
     * Get User's Profile
     *
     * @description Get public profile information about a Spotify user.
     */
    get: operations["get-users-profile"];
  };
  "/users/{user_id}/playlists": {
    /**
     * Get User's Playlists
     *
     * @description Get a list of the playlists owned or followed by a Spotify user.
     */
    get: operations["get-list-users-playlists"];
    /**
     * Create Playlist
     *
     * @description Create a playlist for a Spotify user. (The playlist will be empty until
     * you [add tracks](/documentation/web-api/reference/add-tracks-to-playlist).)
     */
    post: operations["create-playlist"];
  };
}

type webhooks = Record<string, never>;

interface components {
  schemas: {
    readonly AlbumBase: {
      /**
       * @description The type of the album.
       *
       * @example compilation
       * @enum {string}
       */
      readonly album_type: "album" | "single" | "compilation";
      /**
       * @description The markets in which the album is available: [ISO 3166-1 alpha-2 country codes](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). _**NOTE**: an album is considered available in a market when at least 1 of its tracks is available in that market._
       *
       * @example [
       *   "CA",
       *   "BR",
       *   "IT"
       * ]
       */
      readonly available_markets: readonly string[];
      /** @description Known external URLs for this album. */
      readonly external_urls: {
        /** @description The [Spotify URL](/documentation/web-api/concepts/spotify-uris-ids) for the object. */
        readonly spotify?: string;
        [key: string]: unknown;
      };
      /** @description A link to the Web API endpoint providing full details of the album. */
      readonly href: string;
      /**
       * @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the album.
       *
       * @example 2up3OPMp9Tb4dAKM2erWXQ
       */
      readonly id: string;
      /** @description The cover art for the album in various sizes, widest first. */
      readonly images: readonly ({
          /**
           * @description The image height in pixels.
           *
           * @example 300
           */
          readonly height: number | null;
          /**
           * @description The source URL of the image.
           *
           * @example https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228
           */
          readonly url: string;
          /**
           * @description The image width in pixels.
           *
           * @example 300
           */
          readonly width: number | null;
          [key: string]: unknown;
        })[];
      /** @description The name of the album. In case of an album takedown, the value may be an empty string. */
      readonly name: string;
      /**
       * @description The date the album was first released.
       *
       * @example 1981-12
       */
      readonly release_date: string;
      /**
       * @description The precision with which `release_date` value is known.
       *
       * @example year
       * @enum {string}
       */
      readonly release_date_precision: "year" | "month" | "day";
      /** @description Included in the response when a content restriction is applied. */
      readonly restrictions?: {
        /**
         * @description The reason for the restriction. Albums may be restricted if the content is not available in a given market, to the user's subscription type, or when the user's account is set to not play explicit content.
         * Additional reasons may be added in the future.
         *
         * @enum {string}
         */
        readonly reason?: "market" | "product" | "explicit";
        [key: string]: unknown;
      };
      /**
       * @description The number of tracks in the album.
       * @example 9
       */
      readonly total_tracks: number;
      /**
       * @description The object type.
       *
       * @enum {string}
       */
      readonly type: "album";
      /**
       * @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the album.
       *
       * @example spotify:album:2up3OPMp9Tb4dAKM2erWXQ
       */
      readonly uri: string;
      [key: string]: unknown;
    };
    readonly AlbumObject: ({
      /**
       * @description The type of the album.
       *
       * @example compilation
       * @enum {string}
       */
      readonly album_type: "album" | "single" | "compilation";
      /**
       * @description The markets in which the album is available: [ISO 3166-1 alpha-2 country codes](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). _**NOTE**: an album is considered available in a market when at least 1 of its tracks is available in that market._
       *
       * @example [
       *   "CA",
       *   "BR",
       *   "IT"
       * ]
       */
      readonly available_markets: readonly string[];
      /** @description Known external URLs for this album. */
      readonly external_urls: {
        /** @description The [Spotify URL](/documentation/web-api/concepts/spotify-uris-ids) for the object. */
        readonly spotify?: string;
        [key: string]: unknown;
      };
      /** @description A link to the Web API endpoint providing full details of the album. */
      readonly href: string;
      /**
       * @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the album.
       *
       * @example 2up3OPMp9Tb4dAKM2erWXQ
       */
      readonly id: string;
      /** @description The cover art for the album in various sizes, widest first. */
      readonly images: readonly ({
          /**
           * @description The image height in pixels.
           *
           * @example 300
           */
          readonly height: number | null;
          /**
           * @description The source URL of the image.
           *
           * @example https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228
           */
          readonly url: string;
          /**
           * @description The image width in pixels.
           *
           * @example 300
           */
          readonly width: number | null;
          [key: string]: unknown;
        })[];
      /** @description The name of the album. In case of an album takedown, the value may be an empty string. */
      readonly name: string;
      /**
       * @description The date the album was first released.
       *
       * @example 1981-12
       */
      readonly release_date: string;
      /**
       * @description The precision with which `release_date` value is known.
       *
       * @example year
       * @enum {string}
       */
      readonly release_date_precision: "year" | "month" | "day";
      /** @description Included in the response when a content restriction is applied. */
      readonly restrictions?: {
        /**
         * @description The reason for the restriction. Albums may be restricted if the content is not available in a given market, to the user's subscription type, or when the user's account is set to not play explicit content.
         * Additional reasons may be added in the future.
         *
         * @enum {string}
         */
        readonly reason?: "market" | "product" | "explicit";
        [key: string]: unknown;
      };
      /**
       * @description The number of tracks in the album.
       * @example 9
       */
      readonly total_tracks: number;
      /**
       * @description The object type.
       *
       * @enum {string}
       */
      readonly type: "album";
      /**
       * @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the album.
       *
       * @example spotify:album:2up3OPMp9Tb4dAKM2erWXQ
       */
      readonly uri: string;
      [key: string]: unknown;
    }) & ({
      /** @description The artists of the album. Each artist object includes a link in `href` to more detailed information about the artist. */
      readonly artists?: readonly {
          /** @description Known external URLs for this artist. */
          readonly external_urls?: components["schemas"]["ExternalUrlObject"];
          /** @description A link to the Web API endpoint providing full details of the artist. */
          readonly href?: string;
          /** @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the artist. */
          readonly id?: string;
          /** @description The name of the artist. */
          readonly name?: string;
          /**
           * @description The object type.
           *
           * @enum {string}
           */
          readonly type?: "artist";
          /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the artist. */
          readonly uri?: string;
          [key: string]: unknown;
        }[];
      /** @description The copyright statements of the album. */
      readonly copyrights?: readonly {
          /** @description The copyright text for this content. */
          readonly text?: string;
          /** @description The type of copyright: `C` = the copyright, `P` = the sound recording (performance) copyright. */
          readonly type?: string;
          [key: string]: unknown;
        }[];
      /** @description Known external IDs for the album. */
      readonly external_ids?: {
        /** @description [International Article Number](http://en.wikipedia.org/wiki/International_Article_Number_%28EAN%29) */
        readonly ean?: string;
        /** @description [International Standard Recording Code](http://en.wikipedia.org/wiki/International_Standard_Recording_Code) */
        readonly isrc?: string;
        /** @description [Universal Product Code](http://en.wikipedia.org/wiki/Universal_Product_Code) */
        readonly upc?: string;
        [key: string]: unknown;
      };
      /** @description A list of the genres used to classify the album. (If not yet classified, the array is empty.) */
      readonly genres?: readonly string[];
      /** @description The label for the album. */
      readonly label?: string;
      /** @description The popularity of the album, with 100 being the most popular. The popularity is calculated from the popularity of the album's individual tracks. */
      readonly popularity?: number;
      /** @description The tracks of the album. */
      readonly tracks?: {
        [key: string]: unknown;
      } & ({
        /**
         * @description A link to the Web API endpoint returning the full result of the request
         *
         * @example https://api.spotify.com/v1/me/shows?offset=0&limit=20
         */
        readonly href: string;
        /**
         * @description The maximum number of items in the response (as set in the query or by default).
         *
         * @example 20
         */
        readonly limit: number;
        /**
         * @description URL to the next page of items. ( `null` if none)
         *
         * @example https://api.spotify.com/v1/me/shows?offset=1&limit=1
         */
        readonly next: string | null;
        /**
         * @description The offset of the items returned (as set in the query or by default)
         *
         * @example 0
         */
        readonly offset: number;
        /**
         * @description URL to the previous page of items. ( `null` if none)
         *
         * @example https://api.spotify.com/v1/me/shows?offset=1&limit=1
         */
        readonly previous: string | null;
        /**
         * @description The total number of items available to return.
         *
         * @example 4
         */
        readonly total: number;
        [key: string]: unknown;
      }) & {
        readonly items?: readonly {
            /** @description The artists who performed the track. Each artist object includes a link in `href` to more detailed information about the artist. */
            readonly artists?: readonly components["schemas"]["SimplifiedArtistObject"][];
            /** @description A list of the countries in which the track can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code. */
            readonly available_markets?: readonly string[];
            /** @description The disc number (usually `1` unless the album consists of more than one disc). */
            readonly disc_number?: number;
            /** @description The track length in milliseconds. */
            readonly duration_ms?: number;
            /** @description Whether or not the track has explicit lyrics ( `true` = yes it does; `false` = no it does not OR unknown). */
            readonly explicit?: boolean;
            /** @description External URLs for this track. */
            readonly external_urls?: components["schemas"]["ExternalUrlObject"];
            /** @description A link to the Web API endpoint providing full details of the track. */
            readonly href?: string;
            /** @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track. */
            readonly id?: string;
            /** @description Whether or not the track is from a local file. */
            readonly is_local?: boolean;
            /** @description Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking/) is applied. If `true`, the track is playable in the given market. Otherwise `false`. */
            readonly is_playable?: boolean;
            /** @description Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking/) is applied and is only part of the response if the track linking, in fact, exists. The requested track has been replaced with a different track. The track in the `linked_from` object contains information about the originally requested track. */
            readonly linked_from?: {
              /** @description Known external URLs for this track. */
              readonly external_urls?: components["schemas"]["ExternalUrlObject"];
              /** @description A link to the Web API endpoint providing full details of the track. */
              readonly href?: string;
              /** @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track. */
              readonly id?: string;
              /** @description The object type: "track". */
              readonly type?: string;
              /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track. */
              readonly uri?: string;
              [key: string]: unknown;
            };
            /** @description The name of the track. */
            readonly name?: string;
            /** @description A URL to a 30 second preview (MP3 format) of the track. */
            readonly preview_url?: string;
            /** @description Included in the response when a content restriction is applied. */
            readonly restrictions?: {
              /**
               * @description The reason for the restriction. Supported values:
               * - `market` - The content item is not available in the given market.
               * - `product` - The content item is not available for the user's subscription type.
               * - `explicit` - The content item is explicit and the user's account is set to not play explicit content.
               *
               * Additional reasons may be added in the future.
               * **Note**: If you use this field, make sure that your application safely handles unknown values.
               */
              readonly reason?: string;
              [key: string]: unknown;
            };
            /** @description The number of the track. If an album has several discs, the track number is the number on the specified disc. */
            readonly track_number?: number;
            /** @description The object type: "track". */
            readonly type?: string;
            /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track. */
            readonly uri?: string;
            [key: string]: unknown;
          }[];
        [key: string]: unknown;
      };
      [key: string]: unknown;
    });
    readonly AlbumRestrictionObject: {
      /**
       * @description The reason for the restriction. Albums may be restricted if the content is not available in a given market, to the user's subscription type, or when the user's account is set to not play explicit content.
       * Additional reasons may be added in the future.
       *
       * @enum {string}
       */
      readonly reason?: "market" | "product" | "explicit";
      [key: string]: unknown;
    };
    readonly ArtistObject: {
      /** @description Known external URLs for this artist. */
      readonly external_urls?: components["schemas"]["ExternalUrlObject"];
      /** @description Information about the followers of the artist. */
      readonly followers?: {
        /** @description This will always be set to null, as the Web API does not support it at the moment. */
        readonly href?: string | null;
        /** @description The total number of followers. */
        readonly total?: number;
        [key: string]: unknown;
      };
      /**
       * @description A list of the genres the artist is associated with. If not yet classified, the array is empty.
       *
       * @example [
       *   "Prog rock",
       *   "Grunge"
       * ]
       */
      readonly genres?: readonly string[];
      /** @description A link to the Web API endpoint providing full details of the artist. */
      readonly href?: string;
      /** @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the artist. */
      readonly id?: string;
      /** @description Images of the artist in various sizes, widest first. */
      readonly images?: readonly components["schemas"]["ImageObject"][];
      /** @description The name of the artist. */
      readonly name?: string;
      /** @description The popularity of the artist. The value will be between 0 and 100, with 100 being the most popular. The artist's popularity is calculated from the popularity of all the artist's tracks. */
      readonly popularity?: number;
      /**
       * @description The object type.
       *
       * @enum {string}
       */
      readonly type?: "artist";
      /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the artist. */
      readonly uri?: string;
      [key: string]: unknown;
    };
    readonly AudioAnalysisObject: {
      /** @description The time intervals of the bars throughout the track. A bar (or measure) is a segment of time defined as a given number of beats. */
      readonly bars?: readonly {
          /**
           * @description The confidence, from 0.0 to 1.0, of the reliability of the interval.
           * @example 0.925
           */
          readonly confidence?: number;
          /**
           * @description The duration (in seconds) of the time interval.
           * @example 2.18749
           */
          readonly duration?: number;
          /**
           * @description The starting point (in seconds) of the time interval.
           * @example 0.49567
           */
          readonly start?: number;
          [key: string]: unknown;
        }[];
      /** @description The time intervals of beats throughout the track. A beat is the basic time unit of a piece of music; for example, each tick of a metronome. Beats are typically multiples of tatums. */
      readonly beats?: readonly components["schemas"]["TimeIntervalObject"][];
      readonly meta?: {
        /**
         * @description The amount of time taken to analyze this track.
         * @example 6.93906
         */
        readonly analysis_time?: number;
        /**
         * @description The version of the Analyzer used to analyze this track.
         * @example 4.0.0
         */
        readonly analyzer_version?: string;
        /**
         * @description A detailed status code for this track. If analysis data is missing, this code may explain why.
         * @example OK
         */
        readonly detailed_status?: string;
        /**
         * @description The method used to read the track's audio data.
         * @example libvorbisfile L+R 44100->22050
         */
        readonly input_process?: string;
        /**
         * @description The platform used to read the track's audio data.
         * @example Linux
         */
        readonly platform?: string;
        /**
         * @description The return code of the analyzer process. 0 if successful, 1 if any errors occurred.
         * @example 0
         */
        readonly status_code?: number;
        /**
         * @description The Unix timestamp (in seconds) at which this track was analyzed.
         * @example 1495193577
         */
        readonly timestamp?: number;
        [key: string]: unknown;
      };
      /** @description Sections are defined by large variations in rhythm or timbre, e.g. chorus, verse, bridge, guitar solo, etc. Each section contains its own descriptions of tempo, key, mode, time_signature, and loudness. */
      readonly sections?: readonly ({
          /**
           * @description The confidence, from 0.0 to 1.0, of the reliability of the section's "designation".
           * @example 1
           */
          readonly confidence?: number;
          /**
           * @description The duration (in seconds) of the section.
           * @example 6.97092
           */
          readonly duration?: number;
          /**
           * @description The estimated overall key of the section. The values in this field ranging from 0 to 11 mapping to pitches using standard Pitch Class notation (E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on). If no key was detected, the value is -1.
           * @example 9
           */
          readonly key?: number;
          /**
           * @description The confidence, from 0.0 to 1.0, of the reliability of the key. Songs with many key changes may correspond to low values in this field.
           * @example 0.297
           */
          readonly key_confidence?: number;
          /**
           * @description The overall loudness of the section in decibels (dB). Loudness values are useful for comparing relative loudness of sections within tracks.
           * @example -14.938
           */
          readonly loudness?: number;
          /**
           * @description Indicates the modality (major or minor) of a section, the type of scale from which its melodic content is derived. This field will contain a 0 for "minor", a 1 for "major", or a -1 for no result. Note that the major key (e.g. C major) could more likely be confused with the minor key at 3 semitones lower (e.g. A minor) as both keys carry the same pitches.
           * @enum {number}
           */
          readonly mode?: -1 | 0 | 1;
          /**
           * @description The confidence, from 0.0 to 1.0, of the reliability of the `mode`.
           * @example 0.471
           */
          readonly mode_confidence?: number;
          /**
           * @description The starting point (in seconds) of the section.
           * @example 0
           */
          readonly start?: number;
          /**
           * @description The overall estimated tempo of the section in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.
           * @example 113.178
           */
          readonly tempo?: number;
          /**
           * @description The confidence, from 0.0 to 1.0, of the reliability of the tempo. Some tracks contain tempo changes or sounds which don't contain tempo (like pure speech) which would correspond to a low value in this field.
           * @example 0.647
           */
          readonly tempo_confidence?: number;
          /**
           * @description An estimated time signature. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure). The time signature ranges from 3 to 7 indicating time signatures of "3/4", to "7/4".
           * @example 4
           */
          readonly time_signature?: number;
          /**
           * @description The confidence, from 0.0 to 1.0, of the reliability of the `time_signature`. Sections with time signature changes may correspond to low values in this field.
           * @example 1
           */
          readonly time_signature_confidence?: number;
          [key: string]: unknown;
        })[];
      /** @description Each segment contains a roughly conisistent sound throughout its duration. */
      readonly segments?: readonly {
          /**
           * @description The confidence, from 0.0 to 1.0, of the reliability of the segmentation. Segments of the song which are difficult to logically segment (e.g: noise) may correspond to low values in this field.
           *
           * @example 0.435
           */
          readonly confidence?: number;
          /**
           * @description The duration (in seconds) of the segment.
           * @example 0.19891
           */
          readonly duration?: number;
          /**
           * @description The offset loudness of the segment in decibels (dB). This value should be equivalent to the loudness_start of the following segment.
           * @example 0
           */
          readonly loudness_end?: number;
          /**
           * @description The peak loudness of the segment in decibels (dB). Combined with `loudness_start` and `loudness_max_time`, these components can be used to describe the "attack" of the segment.
           * @example -14.25
           */
          readonly loudness_max?: number;
          /**
           * @description The segment-relative offset of the segment peak loudness in seconds. Combined with `loudness_start` and `loudness_max`, these components can be used to desctibe the "attack" of the segment.
           * @example 0.07305
           */
          readonly loudness_max_time?: number;
          /**
           * @description The onset loudness of the segment in decibels (dB). Combined with `loudness_max` and `loudness_max_time`, these components can be used to describe the "attack" of the segment.
           * @example -23.053
           */
          readonly loudness_start?: number;
          /**
           * @description Pitch content is given by a “chroma” vector, corresponding to the 12 pitch classes C, C#, D to B, with values ranging from 0 to 1 that describe the relative dominance of every pitch in the chromatic scale. For example a C Major chord would likely be represented by large values of C, E and G (i.e. classes 0, 4, and 7).
           *
           * Vectors are normalized to 1 by their strongest dimension, therefore noisy sounds are likely represented by values that are all close to 1, while pure tones are described by one value at 1 (the pitch) and others near 0.
           * As can be seen below, the 12 vector indices are a combination of low-power spectrum values at their respective pitch frequencies.
           * ![pitch vector](https://developer.spotify.com/assets/audio/Pitch_vector.png)
           *
           * @example [
           *   0.212,
           *   0.141,
           *   0.294
           * ]
           */
          readonly pitches?: readonly number[];
          /**
           * @description The starting point (in seconds) of the segment.
           * @example 0.70154
           */
          readonly start?: number;
          /**
           * @description Timbre is the quality of a musical note or sound that distinguishes different types of musical instruments, or voices. It is a complex notion also referred to as sound color, texture, or tone quality, and is derived from the shape of a segment’s spectro-temporal surface, independently of pitch and loudness. The timbre feature is a vector that includes 12 unbounded values roughly centered around 0. Those values are high level abstractions of the spectral surface, ordered by degree of importance.
           *
           * For completeness however, the first dimension represents the average loudness of the segment; second emphasizes brightness; third is more closely correlated to the flatness of a sound; fourth to sounds with a stronger attack; etc. See an image below representing the 12 basis functions (i.e. template segments).
           * ![timbre basis functions](https://developer.spotify.com/assets/audio/Timbre_basis_functions.png)
           *
           * The actual timbre of the segment is best described as a linear combination of these 12 basis functions weighted by the coefficient values: timbre = c1 x b1 + c2 x b2 + ... + c12 x b12, where c1 to c12 represent the 12 coefficients and b1 to b12 the 12 basis functions as displayed below. Timbre vectors are best used in comparison with each other.
           *
           * @example [
           *   42.115,
           *   64.373,
           *   -0.233
           * ]
           */
          readonly timbre?: readonly number[];
          [key: string]: unknown;
        }[];
      /** @description A tatum represents the lowest regular pulse train that a listener intuitively infers from the timing of perceived musical events (segments). */
      readonly tatums?: readonly components["schemas"]["TimeIntervalObject"][];
      readonly track?: {
        /**
         * @description The number of channels used for analysis. If 1, all channels are summed together to mono before analysis.
         * @example 1
         */
        readonly analysis_channels?: number;
        /**
         * @description The sample rate used to decode and analyze this track. May differ from the actual sample rate of this track available on Spotify.
         * @example 22050
         */
        readonly analysis_sample_rate?: number;
        /**
         * @description A version number for the Echo Nest Musical Fingerprint format used in the codestring field.
         * @example 3.15
         */
        readonly code_version?: number;
        /** @description An [Echo Nest Musical Fingerprint (ENMFP)](https://academiccommons.columbia.edu/doi/10.7916/D8Q248M4) codestring for this track. */
        readonly codestring?: string;
        /**
         * @description Length of the track in seconds.
         * @example 207.95985
         */
        readonly duration?: number;
        /**
         * @description A version number for the EchoPrint format used in the echoprintstring field.
         * @example 4.15
         */
        readonly echoprint_version?: number;
        /** @description An [EchoPrint](https://github.com/spotify/echoprint-codegen) codestring for this track. */
        readonly echoprintstring?: string;
        /**
         * @description The time, in seconds, at which the track's fade-in period ends. If the track has no fade-in, this will be 0.0.
         * @example 0
         */
        readonly end_of_fade_in?: number;
        /**
         * @description The key the track is in. Integers map to pitches using standard [Pitch Class notation](https://en.wikipedia.org/wiki/Pitch_class). E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on. If no key was detected, the value is -1.
         *
         * @example 9
         */
        readonly key?: number;
        /**
         * @description The confidence, from 0.0 to 1.0, of the reliability of the `key`.
         * @example 0.408
         */
        readonly key_confidence?: number;
        /**
         * Format: float
         * @description The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db.
         *
         * @example -5.883
         */
        readonly loudness?: number;
        /**
         * @description Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0.
         *
         * @example 0
         */
        readonly mode?: number;
        /**
         * @description The confidence, from 0.0 to 1.0, of the reliability of the `mode`.
         * @example 0.485
         */
        readonly mode_confidence?: number;
        /**
         * @description The exact number of audio samples analyzed from this track. See also `analysis_sample_rate`.
         * @example 4585515
         */
        readonly num_samples?: number;
        /**
         * @description An offset to the start of the region of the track that was analyzed. (As the entire track is analyzed, this should always be 0.)
         * @example 0
         */
        readonly offset_seconds?: number;
        /**
         * @description A version number for the Rhythmstring used in the rhythmstring field.
         * @example 1
         */
        readonly rhythm_version?: number;
        /** @description A Rhythmstring for this track. The format of this string is similar to the Synchstring. */
        readonly rhythmstring?: string;
        /** @description This field will always contain the empty string. */
        readonly sample_md5?: string;
        /**
         * @description The time, in seconds, at which the track's fade-out period starts. If the track has no fade-out, this should match the track's length.
         * @example 201.13705
         */
        readonly start_of_fade_out?: number;
        /**
         * @description A version number for the Synchstring used in the synchstring field.
         * @example 1
         */
        readonly synch_version?: number;
        /** @description A [Synchstring](https://github.com/echonest/synchdata) for this track. */
        readonly synchstring?: string;
        /**
         * Format: float
         * @description The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.
         *
         * @example 118.211
         */
        readonly tempo?: number;
        /**
         * @description The confidence, from 0.0 to 1.0, of the reliability of the `tempo`.
         * @example 0.73
         */
        readonly tempo_confidence?: number;
        readonly time_signature?: components["schemas"]["TimeSignature"];
        /**
         * @description The confidence, from 0.0 to 1.0, of the reliability of the `time_signature`.
         * @example 0.994
         */
        readonly time_signature_confidence?: number;
        /**
         * @description The length of the region of the track was analyzed, if a subset of the track was analyzed. (As the entire track is analyzed, this should always be 0.)
         * @example 0
         */
        readonly window_seconds?: number;
        [key: string]: unknown;
      };
      [key: string]: unknown;
    };
    readonly AudioFeaturesObject: {
      /**
       * Format: float
       * @description A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.
       *
       * @example 0.00242
       */
      readonly acousticness?: number;
      /**
       * @description A URL to access the full audio analysis of this track. An access token is required to access this data.
       *
       * @example https://api.spotify.com/v1/audio-analysis/2takcwOaAZWiXQijPHIx7B
       */
      readonly analysis_url?: string;
      /**
       * Format: float
       * @description Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.
       *
       * @example 0.585
       */
      readonly danceability?: number;
      /**
       * @description The duration of the track in milliseconds.
       *
       * @example 237040
       */
      readonly duration_ms?: number;
      /**
       * Format: float
       * @description Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.
       *
       * @example 0.842
       */
      readonly energy?: number;
      /**
       * @description The Spotify ID for the track.
       *
       * @example 2takcwOaAZWiXQijPHIx7B
       */
      readonly id?: string;
      /**
       * Format: float
       * @description Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly "vocal". The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.
       *
       * @example 0.00686
       */
      readonly instrumentalness?: number;
      readonly key?: components["schemas"]["Key"];
      /**
       * Format: float
       * @description Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.
       *
       * @example 0.0866
       */
      readonly liveness?: number;
      readonly loudness?: components["schemas"]["Loudness"];
      readonly mode?: components["schemas"]["Mode"];
      /**
       * Format: float
       * @description Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.
       *
       * @example 0.0556
       */
      readonly speechiness?: number;
      readonly tempo?: components["schemas"]["Tempo"];
      readonly time_signature?: components["schemas"]["TimeSignature"];
      /**
       * @description A link to the Web API endpoint providing full details of the track.
       *
       * @example https://api.spotify.com/v1/tracks/2takcwOaAZWiXQijPHIx7B
       */
      readonly track_href?: string;
      /**
       * @description The object type.
       *
       * @enum {string}
       */
      readonly type?: "audio_features";
      /**
       * @description The Spotify URI for the track.
       *
       * @example spotify:track:2takcwOaAZWiXQijPHIx7B
       */
      readonly uri?: string;
      /**
       * Format: float
       * @description A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).
       *
       * @example 0.428
       */
      readonly valence?: number;
      [key: string]: unknown;
    };
    readonly AudiobookBase: {
      /** @description The author(s) for the audiobook. */
      readonly authors: readonly {
          /** @description The name of the author. */
          readonly name?: string;
          [key: string]: unknown;
        }[];
      /** @description A list of the countries in which the audiobook can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code. */
      readonly available_markets: readonly string[];
      /** @description The copyright statements of the audiobook. */
      readonly copyrights: readonly components["schemas"]["CopyrightObject"][];
      /** @description A description of the audiobook. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed. */
      readonly description: string;
      /**
       * @description The edition of the audiobook.
       *
       * @example Unabridged
       */
      readonly edition?: string;
      /** @description Whether or not the audiobook has explicit content (true = yes it does; false = no it does not OR unknown). */
      readonly explicit: boolean;
      /** @description External URLs for this audiobook. */
      readonly external_urls: components["schemas"]["ExternalUrlObject"];
      /** @description A link to the Web API endpoint providing full details of the audiobook. */
      readonly href: string;
      /** @description A description of the audiobook. This field may contain HTML tags. */
      readonly html_description: string;
      /** @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the audiobook. */
      readonly id: string;
      /** @description The cover art for the audiobook in various sizes, widest first. */
      readonly images: readonly components["schemas"]["ImageObject"][];
      /** @description A list of the languages used in the audiobook, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code. */
      readonly languages: readonly string[];
      /** @description The media type of the audiobook. */
      readonly media_type: string;
      /** @description The name of the audiobook. */
      readonly name: string;
      /** @description The narrator(s) for the audiobook. */
      readonly narrators: readonly {
          /** @description The name of the Narrator. */
          readonly name?: string;
          [key: string]: unknown;
        }[];
      /** @description The publisher of the audiobook. */
      readonly publisher: string;
      /** @description The number of chapters in this audiobook. */
      readonly total_chapters: number;
      /**
       * @description The object type.
       *
       * @enum {string}
       */
      readonly type: "audiobook";
      /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the audiobook. */
      readonly uri: string;
      [key: string]: unknown;
    };
    readonly AudiobookObject: {
      /** @description The author(s) for the audiobook. */
      readonly authors: readonly {
          /** @description The name of the author. */
          readonly name?: string;
          [key: string]: unknown;
        }[];
      /** @description A list of the countries in which the audiobook can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code. */
      readonly available_markets: readonly string[];
      /** @description The copyright statements of the audiobook. */
      readonly copyrights: readonly components["schemas"]["CopyrightObject"][];
      /** @description A description of the audiobook. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed. */
      readonly description: string;
      /**
       * @description The edition of the audiobook.
       *
       * @example Unabridged
       */
      readonly edition?: string;
      /** @description Whether or not the audiobook has explicit content (true = yes it does; false = no it does not OR unknown). */
      readonly explicit: boolean;
      /** @description External URLs for this audiobook. */
      readonly external_urls: components["schemas"]["ExternalUrlObject"];
      /** @description A link to the Web API endpoint providing full details of the audiobook. */
      readonly href: string;
      /** @description A description of the audiobook. This field may contain HTML tags. */
      readonly html_description: string;
      /** @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the audiobook. */
      readonly id: string;
      /** @description The cover art for the audiobook in various sizes, widest first. */
      readonly images: readonly components["schemas"]["ImageObject"][];
      /** @description A list of the languages used in the audiobook, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code. */
      readonly languages: readonly string[];
      /** @description The media type of the audiobook. */
      readonly media_type: string;
      /** @description The name of the audiobook. */
      readonly name: string;
      /** @description The narrator(s) for the audiobook. */
      readonly narrators: readonly {
          /** @description The name of the Narrator. */
          readonly name?: string;
          [key: string]: unknown;
        }[];
      /** @description The publisher of the audiobook. */
      readonly publisher: string;
      /** @description The number of chapters in this audiobook. */
      readonly total_chapters: number;
      /**
       * @description The object type.
       *
       * @enum {string}
       */
      readonly type: "audiobook";
      /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the audiobook. */
      readonly uri: string;
      [key: string]: unknown;
    } & ({
      /** @description The chapters of the audiobook. */
      readonly chapters: {
        [key: string]: unknown;
      } & ({
        [key: string]: unknown;
      } & components["schemas"]["PagingObject"] & ({
        readonly items?: readonly ({
            [key: string]: unknown;
          } & ({
            /**
             * @description A URL to a 30 second preview (MP3 format) of the episode. `null` if not available.
             *
             * @example https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17
             */
            readonly audio_preview_url: string;
            /** @description A list of the countries in which the chapter can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code. */
            readonly available_markets?: readonly string[];
            /**
             * @description The number of the chapter
             *
             * @example 1
             */
            readonly chapter_number: number;
            /**
             * @description A description of the episode. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.
             *
             * @example A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.
             */
            readonly description: string;
            /**
             * @description The episode length in milliseconds.
             *
             * @example 1686230
             */
            readonly duration_ms: number;
            /** @description Whether or not the episode has explicit content (true = yes it does; false = no it does not OR unknown). */
            readonly explicit: boolean;
            /** @description External URLs for this episode. */
            readonly external_urls: components["schemas"]["ExternalUrlObject"];
            /**
             * @description A link to the Web API endpoint providing full details of the episode.
             *
             * @example https://api.spotify.com/v1/episodes/5Xt5DXGzch68nYYamXrNxZ
             */
            readonly href: string;
            /**
             * @description A description of the episode. This field may contain HTML tags.
             *
             * @example <p>A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.</p>
             */
            readonly html_description: string;
            /**
             * @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the episode.
             *
             * @example 5Xt5DXGzch68nYYamXrNxZ
             */
            readonly id: string;
            /** @description The cover art for the episode in various sizes, widest first. */
            readonly images: readonly components["schemas"]["ImageObject"][];
            /** @description True if the episode is playable in the given market. Otherwise false. */
            readonly is_playable: boolean;
            /**
             * @description A list of the languages used in the episode, identified by their [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639) code.
             *
             * @example [
             *   "fr",
             *   "en"
             * ]
             */
            readonly languages: readonly string[];
            /**
             * @description The name of the episode.
             *
             * @example Starting Your Own Podcast: Tips, Tricks, and Advice From Anchor Creators
             */
            readonly name: string;
            /**
             * @description The date the episode was first released, for example `"1981-12-15"`. Depending on the precision, it might be shown as `"1981"` or `"1981-12"`.
             *
             * @example 1981-12-15
             */
            readonly release_date: string;
            /**
             * @description The precision with which `release_date` value is known.
             *
             * @example day
             * @enum {string}
             */
            readonly release_date_precision: "year" | "month" | "day";
            /** @description Included in the response when a content restriction is applied. */
            readonly restrictions?: {
              /**
               * @description The reason for the restriction. Supported values:
               * - `market` - The content item is not available in the given market.
               * - `product` - The content item is not available for the user's subscription type.
               * - `explicit` - The content item is explicit and the user's account is set to not play explicit content.
               * - `payment_required` - Payment is required to play the content item.
               *
               * Additional reasons may be added in the future.
               * **Note**: If you use this field, make sure that your application safely handles unknown values.
               */
              readonly reason?: string;
              [key: string]: unknown;
            };
            /** @description The user's most recent position in the episode. Set if the supplied access token is a user token and has the scope 'user-read-playback-position'. */
            readonly resume_point: {
              /** @description Whether or not the episode has been fully played by the user. */
              readonly fully_played?: boolean;
              /** @description The user's most recent position in the episode in milliseconds. */
              readonly resume_position_ms?: number;
              [key: string]: unknown;
            };
            /**
             * @description The object type.
             *
             * @enum {string}
             */
            readonly type: "episode";
            /**
             * @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the episode.
             *
             * @example spotify:episode:0zLhl3WsOCQHbe1BPTiHgr
             */
            readonly uri: string;
            [key: string]: unknown;
          }))[];
        [key: string]: unknown;
      }));
      [key: string]: unknown;
    });
    readonly AuthorObject: {
      /** @description The name of the author. */
      readonly name?: string;
      [key: string]: unknown;
    };
    readonly CategoryObject: {
      /** @description A link to the Web API endpoint returning full details of the category. */
      readonly href: string;
      /** @description The category icon, in various sizes. */
      readonly icons: readonly components["schemas"]["ImageObject"][];
      /**
       * @description The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) of the category.
       *
       * @example equal
       */
      readonly id: string;
      /**
       * @description The name of the category.
       *
       * @example EQUAL
       */
      readonly name: string;
      [key: string]: unknown;
    };
    readonly ChapterBase: {
      /**
       * @description A URL to a 30 second preview (MP3 format) of the episode. `null` if not available.
       *
       * @example https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17
       */
      readonly audio_preview_url: string;
      /** @description A list of the countries in which the chapter can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code. */
      readonly available_markets?: readonly string[];
      /**
       * @description The number of the chapter
       *
       * @example 1
       */
      readonly chapter_number: number;
      /**
       * @description A description of the episode. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.
       *
       * @example A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.
       */
      readonly description: string;
      /**
       * @description The episode length in milliseconds.
       *
       * @example 1686230
       */
      readonly duration_ms: number;
      /** @description Whether or not the episode has explicit content (true = yes it does; false = no it does not OR unknown). */
      readonly explicit: boolean;
      /** @description External URLs for this episode. */
      readonly external_urls: components["schemas"]["ExternalUrlObject"];
      /**
       * @description A link to the Web API endpoint providing full details of the episode.
       *
       * @example https://api.spotify.com/v1/episodes/5Xt5DXGzch68nYYamXrNxZ
       */
      readonly href: string;
      /**
       * @description A description of the episode. This field may contain HTML tags.
       *
       * @example <p>A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.</p>
       */
      readonly html_description: string;
      /**
       * @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the episode.
       *
       * @example 5Xt5DXGzch68nYYamXrNxZ
       */
      readonly id: string;
      /** @description The cover art for the episode in various sizes, widest first. */
      readonly images: readonly components["schemas"]["ImageObject"][];
      /** @description True if the episode is playable in the given market. Otherwise false. */
      readonly is_playable: boolean;
      /**
       * @description A list of the languages used in the episode, identified by their [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639) code.
       *
       * @example [
       *   "fr",
       *   "en"
       * ]
       */
      readonly languages: readonly string[];
      /**
       * @description The name of the episode.
       *
       * @example Starting Your Own Podcast: Tips, Tricks, and Advice From Anchor Creators
       */
      readonly name: string;
      /**
       * @description The date the episode was first released, for example `"1981-12-15"`. Depending on the precision, it might be shown as `"1981"` or `"1981-12"`.
       *
       * @example 1981-12-15
       */
      readonly release_date: string;
      /**
       * @description The precision with which `release_date` value is known.
       *
       * @example day
       * @enum {string}
       */
      readonly release_date_precision: "year" | "month" | "day";
      /** @description Included in the response when a content restriction is applied. */
      readonly restrictions?: {
        /**
         * @description The reason for the restriction. Supported values:
         * - `market` - The content item is not available in the given market.
         * - `product` - The content item is not available for the user's subscription type.
         * - `explicit` - The content item is explicit and the user's account is set to not play explicit content.
         * - `payment_required` - Payment is required to play the content item.
         *
         * Additional reasons may be added in the future.
         * **Note**: If you use this field, make sure that your application safely handles unknown values.
         */
        readonly reason?: string;
        [key: string]: unknown;
      };
      /** @description The user's most recent position in the episode. Set if the supplied access token is a user token and has the scope 'user-read-playback-position'. */
      readonly resume_point: {
        /** @description Whether or not the episode has been fully played by the user. */
        readonly fully_played?: boolean;
        /** @description The user's most recent position in the episode in milliseconds. */
        readonly resume_position_ms?: number;
        [key: string]: unknown;
      };
      /**
       * @description The object type.
       *
       * @enum {string}
       */
      readonly type: "episode";
      /**
       * @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the episode.
       *
       * @example spotify:episode:0zLhl3WsOCQHbe1BPTiHgr
       */
      readonly uri: string;
      [key: string]: unknown;
    };
    readonly ChapterObject: {
      [key: string]: unknown;
    } & components["schemas"]["ChapterBase"] & {
      /** @description The audiobook for which the chapter belongs. */
      readonly audiobook: components["schemas"]["AudiobookBase"];
      [key: string]: unknown;
    };
    readonly ChapterRestrictionObject: {
      /**
       * @description The reason for the restriction. Supported values:
       * - `market` - The content item is not available in the given market.
       * - `product` - The content item is not available for the user's subscription type.
       * - `explicit` - The content item is explicit and the user's account is set to not play explicit content.
       * - `payment_required` - Payment is required to play the content item.
       *
       * Additional reasons may be added in the future.
       * **Note**: If you use this field, make sure that your application safely handles unknown values.
       */
      readonly reason?: string;
      [key: string]: unknown;
    };
    readonly ContextObject: {
      /** @description External URLs for this context. */
      readonly external_urls?: components["schemas"]["ExternalUrlObject"];
      /** @description A link to the Web API endpoint providing full details of the track. */
      readonly href?: string;
      /** @description The object type, e.g. "artist", "playlist", "album", "show". */
      readonly type?: string;
      /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the context. */
      readonly uri?: string;
      [key: string]: unknown;
    };
    readonly CopyrightObject: {
      /** @description The copyright text for this content. */
      readonly text?: string;
      /** @description The type of copyright: `C` = the copyright, `P` = the sound recording (performance) copyright. */
      readonly type?: string;
      [key: string]: unknown;
    };
    readonly CurrentlyPlayingContextObject: {
      /** @description Allows to update the user interface based on which playback actions are available within the current context. */
      readonly actions?: {
        /** @description Interrupting playback. Optional field. */
        readonly interrupting_playback?: boolean;
        /** @description Pausing. Optional field. */
        readonly pausing?: boolean;
        /** @description Resuming. Optional field. */
        readonly resuming?: boolean;
        /** @description Seeking playback location. Optional field. */
        readonly seeking?: boolean;
        /** @description Skipping to the next context. Optional field. */
        readonly skipping_next?: boolean;
        /** @description Skipping to the previous context. Optional field. */
        readonly skipping_prev?: boolean;
        /** @description Toggling repeat context flag. Optional field. */
        readonly toggling_repeat_context?: boolean;
        /** @description Toggling repeat track flag. Optional field. */
        readonly toggling_repeat_track?: boolean;
        /** @description Toggling shuffle flag. Optional field. */
        readonly toggling_shuffle?: boolean;
        /** @description Transfering playback between devices. Optional field. */
        readonly transferring_playback?: boolean;
        [key: string]: unknown;
      };
      /** @description A Context Object. Can be `null`. */
      readonly context?: {
        /** @description External URLs for this context. */
        readonly external_urls?: components["schemas"]["ExternalUrlObject"];
        /** @description A link to the Web API endpoint providing full details of the track. */
        readonly href?: string;
        /** @description The object type, e.g. "artist", "playlist", "album", "show". */
        readonly type?: string;
        /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the context. */
        readonly uri?: string;
        [key: string]: unknown;
      };
      /** @description The object type of the currently playing item. Can be one of `track`, `episode`, `ad` or `unknown`. */
      readonly currently_playing_type?: string;
      /** @description The device that is currently active. */
      readonly device?: {
        /** @description The device ID. */
        readonly id?: string | null;
        /** @description If this device is the currently active device. */
        readonly is_active?: boolean;
        /** @description If this device is currently in a private session. */
        readonly is_private_session?: boolean;
        /** @description Whether controlling this device is restricted. At present if this is "true" then no Web API commands will be accepted by this device. */
        readonly is_restricted?: boolean;
        /**
         * @description A human-readable name for the device. Some devices have a name that the user can configure (e.g. \"Loudest speaker\") and some devices have a generic name associated with the manufacturer or device model.
         * @example Kitchen speaker
         */
        readonly name?: string;
        /**
         * @description Device type, such as "computer", "smartphone" or "speaker".
         * @example computer
         */
        readonly type?: string;
        /**
         * @description The current volume in percent.
         * @example 59
         */
        readonly volume_percent?: number | null;
        [key: string]: unknown;
      };
      /** @description If something is currently playing, return `true`. */
      readonly is_playing?: boolean;
      /** @description The currently playing track or episode. Can be `null`. */
      readonly item?: components["schemas"]["TrackObject"] | components["schemas"]["EpisodeObject"];
      /** @description Progress into the currently playing track or episode. Can be `null`. */
      readonly progress_ms?: number;
      /** @description off, track, context */
      readonly repeat_state?: string;
      /** @description If shuffle is on or off. */
      readonly shuffle_state?: boolean;
      /** @description Unix Millisecond Timestamp when data was fetched. */
      readonly timestamp?: number;
      [key: string]: unknown;
    };
    readonly CurrentlyPlayingObject: {
      /** @description A Context Object. Can be `null`. */
      readonly context?: components["schemas"]["ContextObject"];
      /** @description The object type of the currently playing item. Can be one of `track`, `episode`, `ad` or `unknown`. */
      readonly currently_playing_type?: string;
      /** @description If something is currently playing, return `true`. */
      readonly is_playing?: boolean;
      /** @description The currently playing track or episode. Can be `null`. */
      readonly item?: components["schemas"]["TrackObject"] | components["schemas"]["EpisodeObject"];
      /** @description Progress into the currently playing track or episode. Can be `null`. */
      readonly progress_ms?: number;
      /** @description Unix Millisecond Timestamp when data was fetched */
      readonly timestamp?: number;
      [key: string]: unknown;
    };
    readonly CursorObject: {
      /** @description The cursor to use as key to find the next page of items. */
      readonly after?: string;
      /** @description The cursor to use as key to find the previous page of items. */
      readonly before?: string;
      [key: string]: unknown;
    };
    readonly CursorPagingObject: {
      /** @description The cursors used to find the next set of items. */
      readonly cursors?: {
        /** @description The cursor to use as key to find the next page of items. */
        readonly after?: string;
        /** @description The cursor to use as key to find the previous page of items. */
        readonly before?: string;
        [key: string]: unknown;
      };
      /** @description A link to the Web API endpoint returning the full result of the request. */
      readonly href?: string;
      /** @description The maximum number of items in the response (as set in the query or by default). */
      readonly limit?: number;
      /** @description URL to the next page of items. ( `null` if none) */
      readonly next?: string;
      /** @description The total number of items available to return. */
      readonly total?: number;
      [key: string]: unknown;
    };
    readonly CursorPagingPlayHistoryObject: {
      [key: string]: unknown;
    } & components["schemas"]["CursorPagingObject"] & {
      readonly items?: readonly {
          /** @description The context the track was played from. */
          readonly context?: components["schemas"]["ContextObject"];
          /**
           * Format: date-time
           * @description The date and time the track was played.
           */
          readonly played_at?: string;
          /** @description The track the user listened to. */
          readonly track?: components["schemas"]["TrackObject"];
          [key: string]: unknown;
        }[];
      [key: string]: unknown;
    };
    readonly CursorPagingSimplifiedArtistObject: {
      [key: string]: unknown;
    } & {
      /** @description The cursors used to find the next set of items. */
      readonly cursors?: {
        /** @description The cursor to use as key to find the next page of items. */
        readonly after?: string;
        /** @description The cursor to use as key to find the previous page of items. */
        readonly before?: string;
        [key: string]: unknown;
      };
      /** @description A link to the Web API endpoint returning the full result of the request. */
      readonly href?: string;
      /** @description The maximum number of items in the response (as set in the query or by default). */
      readonly limit?: number;
      /** @description URL to the next page of items. ( `null` if none) */
      readonly next?: string;
      /** @description The total number of items available to return. */
      readonly total?: number;
      [key: string]: unknown;
    } & {
      readonly items?: readonly components["schemas"]["ArtistObject"][];
      [key: string]: unknown;
    };
    readonly DeviceObject: {
      /** @description The device ID. */
      readonly id?: string | null;
      /** @description If this device is the currently active device. */
      readonly is_active?: boolean;
      /** @description If this device is currently in a private session. */
      readonly is_private_session?: boolean;
      /** @description Whether controlling this device is restricted. At present if this is "true" then no Web API commands will be accepted by this device. */
      readonly is_restricted?: boolean;
      /**
       * @description A human-readable name for the device. Some devices have a name that the user can configure (e.g. \"Loudest speaker\") and some devices have a generic name associated with the manufacturer or device model.
       * @example Kitchen speaker
       */
      readonly name?: string;
      /**
       * @description Device type, such as "computer", "smartphone" or "speaker".
       * @example computer
       */
      readonly type?: string;
      /**
       * @description The current volume in percent.
       * @example 59
       */
      readonly volume_percent?: number | null;
      [key: string]: unknown;
    };
    readonly DevicesObject: {
      /** @description A list of 0..n Device objects */
      readonly devices?: readonly components["schemas"]["DeviceObject"][];
      [key: string]: unknown;
    };
    readonly DisallowsObject: {
      /** @description Interrupting playback. Optional field. */
      readonly interrupting_playback?: boolean;
      /** @description Pausing. Optional field. */
      readonly pausing?: boolean;
      /** @description Resuming. Optional field. */
      readonly resuming?: boolean;
      /** @description Seeking playback location. Optional field. */
      readonly seeking?: boolean;
      /** @description Skipping to the next context. Optional field. */
      readonly skipping_next?: boolean;
      /** @description Skipping to the previous context. Optional field. */
      readonly skipping_prev?: boolean;
      /** @description Toggling repeat context flag. Optional field. */
      readonly toggling_repeat_context?: boolean;
      /** @description Toggling repeat track flag. Optional field. */
      readonly toggling_repeat_track?: boolean;
      /** @description Toggling shuffle flag. Optional field. */
      readonly toggling_shuffle?: boolean;
      /** @description Transfering playback between devices. Optional field. */
      readonly transferring_playback?: boolean;
      [key: string]: unknown;
    };
    readonly EpisodeBase: {
      /**
       * @description A URL to a 30 second preview (MP3 format) of the episode. `null` if not available.
       *
       * @example https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17
       */
      readonly audio_preview_url: string;
      /**
       * @description A description of the episode. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.
       *
       * @example A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.
       */
      readonly description: string;
      /**
       * @description The episode length in milliseconds.
       *
       * @example 1686230
       */
      readonly duration_ms: number;
      /** @description Whether or not the episode has explicit content (true = yes it does; false = no it does not OR unknown). */
      readonly explicit: boolean;
      /** @description External URLs for this episode. */
      readonly external_urls: components["schemas"]["ExternalUrlObject"];
      /**
       * @description A link to the Web API endpoint providing full details of the episode.
       *
       * @example https://api.spotify.com/v1/episodes/5Xt5DXGzch68nYYamXrNxZ
       */
      readonly href: string;
      /**
       * @description A description of the episode. This field may contain HTML tags.
       *
       * @example <p>A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.</p>
       */
      readonly html_description: string;
      /**
       * @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the episode.
       *
       * @example 5Xt5DXGzch68nYYamXrNxZ
       */
      readonly id: string;
      /** @description The cover art for the episode in various sizes, widest first. */
      readonly images: readonly components["schemas"]["ImageObject"][];
      /** @description True if the episode is hosted outside of Spotify's CDN. */
      readonly is_externally_hosted: boolean;
      /** @description True if the episode is playable in the given market. Otherwise false. */
      readonly is_playable: boolean;
      /**
       * @deprecated
       * @description The language used in the episode, identified by a [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code. This field is deprecated and might be removed in the future. Please use the `languages` field instead.
       *
       * @example en
       */
      readonly language?: string;
      /**
       * @description A list of the languages used in the episode, identified by their [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639) code.
       *
       * @example [
       *   "fr",
       *   "en"
       * ]
       */
      readonly languages: readonly string[];
      /**
       * @description The name of the episode.
       *
       * @example Starting Your Own Podcast: Tips, Tricks, and Advice From Anchor Creators
       */
      readonly name: string;
      /**
       * @description The date the episode was first released, for example `"1981-12-15"`. Depending on the precision, it might be shown as `"1981"` or `"1981-12"`.
       *
       * @example 1981-12-15
       */
      readonly release_date: string;
      /**
       * @description The precision with which `release_date` value is known.
       *
       * @example day
       * @enum {string}
       */
      readonly release_date_precision: "year" | "month" | "day";
      /** @description Included in the response when a content restriction is applied. */
      readonly restrictions?: {
        /**
         * @description The reason for the restriction. Supported values:
         * - `market` - The content item is not available in the given market.
         * - `product` - The content item is not available for the user's subscription type.
         * - `explicit` - The content item is explicit and the user's account is set to not play explicit content.
         *
         * Additional reasons may be added in the future.
         * **Note**: If you use this field, make sure that your application safely handles unknown values.
         */
        readonly reason?: string;
        [key: string]: unknown;
      };
      /** @description The user's most recent position in the episode. Set if the supplied access token is a user token and has the scope 'user-read-playback-position'. */
      readonly resume_point: components["schemas"]["ResumePointObject"];
      /**
       * @description The object type.
       *
       * @enum {string}
       */
      readonly type: "episode";
      /**
       * @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the episode.
       *
       * @example spotify:episode:0zLhl3WsOCQHbe1BPTiHgr
       */
      readonly uri: string;
      [key: string]: unknown;
    };
    readonly EpisodeObject: {
      [key: string]: unknown;
    } & ({
      /**
       * @description A URL to a 30 second preview (MP3 format) of the episode. `null` if not available.
       *
       * @example https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17
       */
      readonly audio_preview_url: string;
      /**
       * @description A description of the episode. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.
       *
       * @example A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.
       */
      readonly description: string;
      /**
       * @description The episode length in milliseconds.
       *
       * @example 1686230
       */
      readonly duration_ms: number;
      /** @description Whether or not the episode has explicit content (true = yes it does; false = no it does not OR unknown). */
      readonly explicit: boolean;
      /** @description External URLs for this episode. */
      readonly external_urls: components["schemas"]["ExternalUrlObject"];
      /**
       * @description A link to the Web API endpoint providing full details of the episode.
       *
       * @example https://api.spotify.com/v1/episodes/5Xt5DXGzch68nYYamXrNxZ
       */
      readonly href: string;
      /**
       * @description A description of the episode. This field may contain HTML tags.
       *
       * @example <p>A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.</p>
       */
      readonly html_description: string;
      /**
       * @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the episode.
       *
       * @example 5Xt5DXGzch68nYYamXrNxZ
       */
      readonly id: string;
      /** @description The cover art for the episode in various sizes, widest first. */
      readonly images: readonly components["schemas"]["ImageObject"][];
      /** @description True if the episode is hosted outside of Spotify's CDN. */
      readonly is_externally_hosted: boolean;
      /** @description True if the episode is playable in the given market. Otherwise false. */
      readonly is_playable: boolean;
      /**
       * @deprecated
       * @description The language used in the episode, identified by a [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code. This field is deprecated and might be removed in the future. Please use the `languages` field instead.
       *
       * @example en
       */
      readonly language?: string;
      /**
       * @description A list of the languages used in the episode, identified by their [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639) code.
       *
       * @example [
       *   "fr",
       *   "en"
       * ]
       */
      readonly languages: readonly string[];
      /**
       * @description The name of the episode.
       *
       * @example Starting Your Own Podcast: Tips, Tricks, and Advice From Anchor Creators
       */
      readonly name: string;
      /**
       * @description The date the episode was first released, for example `"1981-12-15"`. Depending on the precision, it might be shown as `"1981"` or `"1981-12"`.
       *
       * @example 1981-12-15
       */
      readonly release_date: string;
      /**
       * @description The precision with which `release_date` value is known.
       *
       * @example day
       * @enum {string}
       */
      readonly release_date_precision: "year" | "month" | "day";
      /** @description Included in the response when a content restriction is applied. */
      readonly restrictions?: {
        /**
         * @description The reason for the restriction. Supported values:
         * - `market` - The content item is not available in the given market.
         * - `product` - The content item is not available for the user's subscription type.
         * - `explicit` - The content item is explicit and the user's account is set to not play explicit content.
         *
         * Additional reasons may be added in the future.
         * **Note**: If you use this field, make sure that your application safely handles unknown values.
         */
        readonly reason?: string;
        [key: string]: unknown;
      };
      /** @description The user's most recent position in the episode. Set if the supplied access token is a user token and has the scope 'user-read-playback-position'. */
      readonly resume_point: components["schemas"]["ResumePointObject"];
      /**
       * @description The object type.
       *
       * @enum {string}
       */
      readonly type: "episode";
      /**
       * @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the episode.
       *
       * @example spotify:episode:0zLhl3WsOCQHbe1BPTiHgr
       */
      readonly uri: string;
      [key: string]: unknown;
    }) & {
      /** @description The show on which the episode belongs. */
      readonly show: {
        /** @description A list of the countries in which the show can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code. */
        readonly available_markets: readonly string[];
        /** @description The copyright statements of the show. */
        readonly copyrights: readonly components["schemas"]["CopyrightObject"][];
        /** @description A description of the show. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed. */
        readonly description: string;
        /** @description Whether or not the show has explicit content (true = yes it does; false = no it does not OR unknown). */
        readonly explicit: boolean;
        /** @description External URLs for this show. */
        readonly external_urls: components["schemas"]["ExternalUrlObject"];
        /** @description A link to the Web API endpoint providing full details of the show. */
        readonly href: string;
        /** @description A description of the show. This field may contain HTML tags. */
        readonly html_description: string;
        /** @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the show. */
        readonly id: string;
        /** @description The cover art for the show in various sizes, widest first. */
        readonly images: readonly components["schemas"]["ImageObject"][];
        /** @description True if all of the shows episodes are hosted outside of Spotify's CDN. This field might be `null` in some cases. */
        readonly is_externally_hosted: boolean;
        /** @description A list of the languages used in the show, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code. */
        readonly languages: readonly string[];
        /** @description The media type of the show. */
        readonly media_type: string;
        /** @description The name of the episode. */
        readonly name: string;
        /** @description The publisher of the show. */
        readonly publisher: string;
        /** @description The total number of episodes in the show. */
        readonly total_episodes: number;
        /**
         * @description The object type.
         *
         * @enum {string}
         */
        readonly type: "show";
        /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the show. */
        readonly uri: string;
        [key: string]: unknown;
      };
      [key: string]: unknown;
    };
    readonly EpisodeRestrictionObject: {
      /**
       * @description The reason for the restriction. Supported values:
       * - `market` - The content item is not available in the given market.
       * - `product` - The content item is not available for the user's subscription type.
       * - `explicit` - The content item is explicit and the user's account is set to not play explicit content.
       *
       * Additional reasons may be added in the future.
       * **Note**: If you use this field, make sure that your application safely handles unknown values.
       */
      readonly reason?: string;
      [key: string]: unknown;
    };
    readonly ErrorObject: {
      /** @description A short description of the cause of the error. */
      readonly message: string;
      /** @description The HTTP status code (also returned in the response header; see [Response Status Codes](/documentation/web-api/concepts/api-calls#response-status-codes) for more information). */
      readonly status: number;
      [key: string]: unknown;
    };
    readonly ExplicitContentSettingsObject: {
      /** @description When `true`, indicates that explicit content should not be played. */
      readonly filter_enabled?: boolean;
      /** @description When `true`, indicates that the explicit content setting is locked and can't be changed by the user. */
      readonly filter_locked?: boolean;
      [key: string]: unknown;
    };
    readonly ExternalIdObject: {
      /** @description [International Article Number](http://en.wikipedia.org/wiki/International_Article_Number_%28EAN%29) */
      readonly ean?: string;
      /** @description [International Standard Recording Code](http://en.wikipedia.org/wiki/International_Standard_Recording_Code) */
      readonly isrc?: string;
      /** @description [Universal Product Code](http://en.wikipedia.org/wiki/Universal_Product_Code) */
      readonly upc?: string;
      [key: string]: unknown;
    };
    readonly ExternalUrlObject: {
      /** @description The [Spotify URL](/documentation/web-api/concepts/spotify-uris-ids) for the object. */
      readonly spotify?: string;
      [key: string]: unknown;
    };
    readonly FollowersObject: {
      /** @description This will always be set to null, as the Web API does not support it at the moment. */
      readonly href?: string | null;
      /** @description The total number of followers. */
      readonly total?: number;
      [key: string]: unknown;
    };
    readonly ImageObject: {
      /**
       * @description The image height in pixels.
       *
       * @example 300
       */
      readonly height: number | null;
      /**
       * @description The source URL of the image.
       *
       * @example https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228
       */
      readonly url: string;
      /**
       * @description The image width in pixels.
       *
       * @example 300
       */
      readonly width: number | null;
      [key: string]: unknown;
    };
    /**
     * @description The key the track is in. Integers map to pitches using standard [Pitch Class notation](https://en.wikipedia.org/wiki/Pitch_class). E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on. If no key was detected, the value is -1.
     *
     * @example 9
     */
    readonly Key: number;
    readonly LinkedTrackObject: {
      /** @description Known external URLs for this track. */
      readonly external_urls?: components["schemas"]["ExternalUrlObject"];
      /** @description A link to the Web API endpoint providing full details of the track. */
      readonly href?: string;
      /** @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track. */
      readonly id?: string;
      /** @description The object type: "track". */
      readonly type?: string;
      /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track. */
      readonly uri?: string;
      [key: string]: unknown;
    };
    /**
     * Format: float
     * @description The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db.
     *
     * @example -5.883
     */
    readonly Loudness: number;
    /**
     * @description Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0.
     *
     * @example 0
     */
    readonly Mode: number;
    readonly NarratorObject: {
      /** @description The name of the Narrator. */
      readonly name?: string;
      [key: string]: unknown;
    };
    readonly PagingArtistObject: {
      [key: string]: unknown;
    } & components["schemas"]["PagingObject"] & {
      readonly items?: readonly components["schemas"]["ArtistObject"][];
      [key: string]: unknown;
    };
    readonly PagingFeaturedPlaylistObject: {
      readonly message?: string;
      readonly playlists?: {
        [key: string]: unknown;
      } & components["schemas"]["PagingObject"] & ({
        readonly items?: readonly ({
            /** @description `true` if the owner allows other users to modify the playlist. */
            readonly collaborative?: boolean;
            /** @description The playlist description. _Only returned for modified, verified playlists, otherwise_ `null`. */
            readonly description?: string;
            /** @description Known external URLs for this playlist. */
            readonly external_urls?: components["schemas"]["ExternalUrlObject"];
            /** @description A link to the Web API endpoint providing full details of the playlist. */
            readonly href?: string;
            /** @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the playlist. */
            readonly id?: string;
            /** @description Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order. See [Working with Playlists](/documentation/web-api/concepts/playlists). _**Note**: If returned, the source URL for the image (`url`) is temporary and will expire in less than a day._ */
            readonly images?: readonly components["schemas"]["ImageObject"][];
            /** @description The name of the playlist. */
            readonly name?: string;
            /** @description The user who owns the playlist */
            readonly owner?: {
              /** @description Known public external URLs for this user. */
              readonly external_urls?: components["schemas"]["ExternalUrlObject"];
              /** @description Information about the followers of this user. */
              readonly followers?: components["schemas"]["FollowersObject"];
              /** @description A link to the Web API endpoint for this user. */
              readonly href?: string;
              /** @description The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for this user. */
              readonly id?: string;
              /**
               * @description The object type.
               *
               * @enum {string}
               */
              readonly type?: "user";
              /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for this user. */
              readonly uri?: string;
              [key: string]: unknown;
            } & ({
              /** @description The name displayed on the user's profile. `null` if not available. */
              readonly display_name?: string | null;
              [key: string]: unknown;
            });
            /** @description The playlist's public/private status: `true` the playlist is public, `false` the playlist is private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists) */
            readonly public?: boolean;
            /** @description The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version */
            readonly snapshot_id?: string;
            /** @description A collection containing a link ( `href` ) to the Web API endpoint where full details of the playlist's tracks can be retrieved, along with the `total` number of tracks in the playlist. Note, a track object may be `null`. This can happen if a track is no longer available. */
            readonly tracks?: {
              /** @description A link to the Web API endpoint where full details of the playlist's tracks can be retrieved. */
              readonly href?: string;
              /** @description Number of tracks in the playlist. */
              readonly total?: number;
              [key: string]: unknown;
            };
            /** @description The object type: "playlist" */
            readonly type?: string;
            /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the playlist. */
            readonly uri?: string;
            [key: string]: unknown;
          })[];
        [key: string]: unknown;
      });
      [key: string]: unknown;
    };
    readonly PagingObject: {
      /**
       * @description A link to the Web API endpoint returning the full result of the request
       *
       * @example https://api.spotify.com/v1/me/shows?offset=0&limit=20
       */
      readonly href: string;
      /**
       * @description The maximum number of items in the response (as set in the query or by default).
       *
       * @example 20
       */
      readonly limit: number;
      /**
       * @description URL to the next page of items. ( `null` if none)
       *
       * @example https://api.spotify.com/v1/me/shows?offset=1&limit=1
       */
      readonly next: string | null;
      /**
       * @description The offset of the items returned (as set in the query or by default)
       *
       * @example 0
       */
      readonly offset: number;
      /**
       * @description URL to the previous page of items. ( `null` if none)
       *
       * @example https://api.spotify.com/v1/me/shows?offset=1&limit=1
       */
      readonly previous: string | null;
      /**
       * @description The total number of items available to return.
       *
       * @example 4
       */
      readonly total: number;
      [key: string]: unknown;
    };
    readonly PagingPlaylistObject: {
      [key: string]: unknown;
    } & components["schemas"]["PagingObject"] & ({
      readonly items?: readonly ({
          /** @description `true` if the owner allows other users to modify the playlist. */
          readonly collaborative?: boolean;
          /** @description The playlist description. _Only returned for modified, verified playlists, otherwise_ `null`. */
          readonly description?: string;
          /** @description Known external URLs for this playlist. */
          readonly external_urls?: components["schemas"]["ExternalUrlObject"];
          /** @description A link to the Web API endpoint providing full details of the playlist. */
          readonly href?: string;
          /** @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the playlist. */
          readonly id?: string;
          /** @description Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order. See [Working with Playlists](/documentation/web-api/concepts/playlists). _**Note**: If returned, the source URL for the image (`url`) is temporary and will expire in less than a day._ */
          readonly images?: readonly components["schemas"]["ImageObject"][];
          /** @description The name of the playlist. */
          readonly name?: string;
          /** @description The user who owns the playlist */
          readonly owner?: {
            /** @description Known public external URLs for this user. */
            readonly external_urls?: components["schemas"]["ExternalUrlObject"];
            /** @description Information about the followers of this user. */
            readonly followers?: components["schemas"]["FollowersObject"];
            /** @description A link to the Web API endpoint for this user. */
            readonly href?: string;
            /** @description The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for this user. */
            readonly id?: string;
            /**
             * @description The object type.
             *
             * @enum {string}
             */
            readonly type?: "user";
            /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for this user. */
            readonly uri?: string;
            [key: string]: unknown;
          } & ({
            /** @description The name displayed on the user's profile. `null` if not available. */
            readonly display_name?: string | null;
            [key: string]: unknown;
          });
          /** @description The playlist's public/private status: `true` the playlist is public, `false` the playlist is private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists) */
          readonly public?: boolean;
          /** @description The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version */
          readonly snapshot_id?: string;
          /** @description A collection containing a link ( `href` ) to the Web API endpoint where full details of the playlist's tracks can be retrieved, along with the `total` number of tracks in the playlist. Note, a track object may be `null`. This can happen if a track is no longer available. */
          readonly tracks?: {
            /** @description A link to the Web API endpoint where full details of the playlist's tracks can be retrieved. */
            readonly href?: string;
            /** @description Number of tracks in the playlist. */
            readonly total?: number;
            [key: string]: unknown;
          };
          /** @description The object type: "playlist" */
          readonly type?: string;
          /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the playlist. */
          readonly uri?: string;
          [key: string]: unknown;
        })[];
      [key: string]: unknown;
    });
    readonly PagingPlaylistTrackObject: {
      [key: string]: unknown;
    } & components["schemas"]["PagingObject"] & ({
      readonly items?: readonly ({
          /**
           * Format: date-time
           * @description The date and time the track or episode was added. _**Note**: some very old playlists may return `null` in this field._
           */
          readonly added_at?: string;
          /** @description The Spotify user who added the track or episode. _**Note**: some very old playlists may return `null` in this field._ */
          readonly added_by?: components["schemas"]["PlaylistUserObject"];
          /** @description Whether this track or episode is a [local file](/documentation/web-api/concepts/playlists/#local-files) or not. */
          readonly is_local?: boolean;
          /** @description Information about the track or episode. */
          readonly track?: components["schemas"]["TrackObject"] | components["schemas"]["EpisodeObject"];
          [key: string]: unknown;
        })[];
      [key: string]: unknown;
    });
    readonly PagingSavedAlbumObject: {
      [key: string]: unknown;
    } & components["schemas"]["PagingObject"] & {
      readonly items?: readonly {
          /**
           * Format: date-time
           * @description The date and time the album was saved
           * Timestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.
           * If the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.
           */
          readonly added_at?: string;
          /** @description Information about the album. */
          readonly album?: components["schemas"]["AlbumObject"];
          [key: string]: unknown;
        }[];
      [key: string]: unknown;
    };
    readonly PagingSavedAudiobookObject: {
      [key: string]: unknown;
    } & components["schemas"]["PagingObject"] & {
      readonly items?: readonly {
          /**
           * Format: date-time
           * @description The date and time the audiobook was saved
           * Timestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.
           * If the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.
           */
          readonly added_at?: string;
          /** @description Information about the audiobook. */
          readonly audiobook?: components["schemas"]["AudiobookObject"];
          [key: string]: unknown;
        }[];
      [key: string]: unknown;
    };
    readonly PagingSavedEpisodeObject: {
      [key: string]: unknown;
    } & components["schemas"]["PagingObject"] & {
      readonly items?: readonly {
          /**
           * Format: date-time
           * @description The date and time the episode was saved.
           * Timestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.
           */
          readonly added_at?: string;
          /** @description Information about the episode. */
          readonly episode?: components["schemas"]["EpisodeObject"];
          [key: string]: unknown;
        }[];
      [key: string]: unknown;
    };
    readonly PagingSavedShowObject: {
      [key: string]: unknown;
    } & components["schemas"]["PagingObject"] & {
      readonly items?: readonly {
          /**
           * Format: date-time
           * @description The date and time the show was saved.
           * Timestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.
           * If the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.
           */
          readonly added_at?: string;
          /** @description Information about the show. */
          readonly show?: components["schemas"]["SimplifiedShowObject"];
          [key: string]: unknown;
        }[];
      [key: string]: unknown;
    };
    readonly PagingSavedTrackObject: {
      [key: string]: unknown;
    } & components["schemas"]["PagingObject"] & {
      readonly items?: readonly {
          /**
           * Format: date-time
           * @description The date and time the track was saved.
           * Timestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.
           * If the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.
           */
          readonly added_at?: string;
          /** @description Information about the track. */
          readonly track?: components["schemas"]["TrackObject"];
          [key: string]: unknown;
        }[];
      [key: string]: unknown;
    };
    readonly PagingSimplifiedAlbumObject: {
      [key: string]: unknown;
    } & components["schemas"]["PagingObject"] & ({
      readonly items?: readonly (components["schemas"]["AlbumBase"] & ({
          /**
           * @description The field is present when getting an artist's albums. Compare to album_type this field represents relationship between the artist and the album.
           *
           * @example compilation
           * @enum {string}
           */
          readonly album_group?: "album" | "single" | "compilation" | "appears_on";
          /** @description The artists of the album. Each artist object includes a link in `href` to more detailed information about the artist. */
          readonly artists: readonly components["schemas"]["SimplifiedArtistObject"][];
          [key: string]: unknown;
        }))[];
      [key: string]: unknown;
    });
    readonly PagingSimplifiedArtistObject: {
      [key: string]: unknown;
    } & components["schemas"]["PagingObject"] & {
      readonly items?: readonly components["schemas"]["SimplifiedArtistObject"][];
      [key: string]: unknown;
    };
    readonly PagingSimplifiedAudiobookObject: {
      [key: string]: unknown;
    } & components["schemas"]["PagingObject"] & {
      readonly items?: readonly components["schemas"]["SimplifiedAudiobookObject"][];
      [key: string]: unknown;
    };
    readonly PagingSimplifiedChapterObject: {
      [key: string]: unknown;
    } & components["schemas"]["PagingObject"] & ({
      readonly items?: readonly ({
          [key: string]: unknown;
        } & ({
          /**
           * @description A URL to a 30 second preview (MP3 format) of the episode. `null` if not available.
           *
           * @example https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17
           */
          readonly audio_preview_url: string;
          /** @description A list of the countries in which the chapter can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code. */
          readonly available_markets?: readonly string[];
          /**
           * @description The number of the chapter
           *
           * @example 1
           */
          readonly chapter_number: number;
          /**
           * @description A description of the episode. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.
           *
           * @example A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.
           */
          readonly description: string;
          /**
           * @description The episode length in milliseconds.
           *
           * @example 1686230
           */
          readonly duration_ms: number;
          /** @description Whether or not the episode has explicit content (true = yes it does; false = no it does not OR unknown). */
          readonly explicit: boolean;
          /** @description External URLs for this episode. */
          readonly external_urls: components["schemas"]["ExternalUrlObject"];
          /**
           * @description A link to the Web API endpoint providing full details of the episode.
           *
           * @example https://api.spotify.com/v1/episodes/5Xt5DXGzch68nYYamXrNxZ
           */
          readonly href: string;
          /**
           * @description A description of the episode. This field may contain HTML tags.
           *
           * @example <p>A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.</p>
           */
          readonly html_description: string;
          /**
           * @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the episode.
           *
           * @example 5Xt5DXGzch68nYYamXrNxZ
           */
          readonly id: string;
          /** @description The cover art for the episode in various sizes, widest first. */
          readonly images: readonly components["schemas"]["ImageObject"][];
          /** @description True if the episode is playable in the given market. Otherwise false. */
          readonly is_playable: boolean;
          /**
           * @description A list of the languages used in the episode, identified by their [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639) code.
           *
           * @example [
           *   "fr",
           *   "en"
           * ]
           */
          readonly languages: readonly string[];
          /**
           * @description The name of the episode.
           *
           * @example Starting Your Own Podcast: Tips, Tricks, and Advice From Anchor Creators
           */
          readonly name: string;
          /**
           * @description The date the episode was first released, for example `"1981-12-15"`. Depending on the precision, it might be shown as `"1981"` or `"1981-12"`.
           *
           * @example 1981-12-15
           */
          readonly release_date: string;
          /**
           * @description The precision with which `release_date` value is known.
           *
           * @example day
           * @enum {string}
           */
          readonly release_date_precision: "year" | "month" | "day";
          /** @description Included in the response when a content restriction is applied. */
          readonly restrictions?: {
            /**
             * @description The reason for the restriction. Supported values:
             * - `market` - The content item is not available in the given market.
             * - `product` - The content item is not available for the user's subscription type.
             * - `explicit` - The content item is explicit and the user's account is set to not play explicit content.
             * - `payment_required` - Payment is required to play the content item.
             *
             * Additional reasons may be added in the future.
             * **Note**: If you use this field, make sure that your application safely handles unknown values.
             */
            readonly reason?: string;
            [key: string]: unknown;
          };
          /** @description The user's most recent position in the episode. Set if the supplied access token is a user token and has the scope 'user-read-playback-position'. */
          readonly resume_point: {
            /** @description Whether or not the episode has been fully played by the user. */
            readonly fully_played?: boolean;
            /** @description The user's most recent position in the episode in milliseconds. */
            readonly resume_position_ms?: number;
            [key: string]: unknown;
          };
          /**
           * @description The object type.
           *
           * @enum {string}
           */
          readonly type: "episode";
          /**
           * @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the episode.
           *
           * @example spotify:episode:0zLhl3WsOCQHbe1BPTiHgr
           */
          readonly uri: string;
          [key: string]: unknown;
        }))[];
      [key: string]: unknown;
    });
    readonly PagingSimplifiedEpisodeObject: {
      [key: string]: unknown;
    } & components["schemas"]["PagingObject"] & ({
      readonly items?: readonly ({
          [key: string]: unknown;
        } & components["schemas"]["EpisodeBase"])[];
      [key: string]: unknown;
    });
    readonly PagingSimplifiedShowObject: {
      [key: string]: unknown;
    } & components["schemas"]["PagingObject"] & {
      readonly items?: readonly components["schemas"]["SimplifiedShowObject"][];
      [key: string]: unknown;
    };
    readonly PagingSimplifiedTrackObject: {
      [key: string]: unknown;
    } & ({
      /**
       * @description A link to the Web API endpoint returning the full result of the request
       *
       * @example https://api.spotify.com/v1/me/shows?offset=0&limit=20
       */
      readonly href: string;
      /**
       * @description The maximum number of items in the response (as set in the query or by default).
       *
       * @example 20
       */
      readonly limit: number;
      /**
       * @description URL to the next page of items. ( `null` if none)
       *
       * @example https://api.spotify.com/v1/me/shows?offset=1&limit=1
       */
      readonly next: string | null;
      /**
       * @description The offset of the items returned (as set in the query or by default)
       *
       * @example 0
       */
      readonly offset: number;
      /**
       * @description URL to the previous page of items. ( `null` if none)
       *
       * @example https://api.spotify.com/v1/me/shows?offset=1&limit=1
       */
      readonly previous: string | null;
      /**
       * @description The total number of items available to return.
       *
       * @example 4
       */
      readonly total: number;
      [key: string]: unknown;
    }) & {
      readonly items?: readonly {
          /** @description The artists who performed the track. Each artist object includes a link in `href` to more detailed information about the artist. */
          readonly artists?: readonly components["schemas"]["SimplifiedArtistObject"][];
          /** @description A list of the countries in which the track can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code. */
          readonly available_markets?: readonly string[];
          /** @description The disc number (usually `1` unless the album consists of more than one disc). */
          readonly disc_number?: number;
          /** @description The track length in milliseconds. */
          readonly duration_ms?: number;
          /** @description Whether or not the track has explicit lyrics ( `true` = yes it does; `false` = no it does not OR unknown). */
          readonly explicit?: boolean;
          /** @description External URLs for this track. */
          readonly external_urls?: components["schemas"]["ExternalUrlObject"];
          /** @description A link to the Web API endpoint providing full details of the track. */
          readonly href?: string;
          /** @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track. */
          readonly id?: string;
          /** @description Whether or not the track is from a local file. */
          readonly is_local?: boolean;
          /** @description Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking/) is applied. If `true`, the track is playable in the given market. Otherwise `false`. */
          readonly is_playable?: boolean;
          /** @description Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking/) is applied and is only part of the response if the track linking, in fact, exists. The requested track has been replaced with a different track. The track in the `linked_from` object contains information about the originally requested track. */
          readonly linked_from?: {
            /** @description Known external URLs for this track. */
            readonly external_urls?: components["schemas"]["ExternalUrlObject"];
            /** @description A link to the Web API endpoint providing full details of the track. */
            readonly href?: string;
            /** @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track. */
            readonly id?: string;
            /** @description The object type: "track". */
            readonly type?: string;
            /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track. */
            readonly uri?: string;
            [key: string]: unknown;
          };
          /** @description The name of the track. */
          readonly name?: string;
          /** @description A URL to a 30 second preview (MP3 format) of the track. */
          readonly preview_url?: string;
          /** @description Included in the response when a content restriction is applied. */
          readonly restrictions?: {
            /**
             * @description The reason for the restriction. Supported values:
             * - `market` - The content item is not available in the given market.
             * - `product` - The content item is not available for the user's subscription type.
             * - `explicit` - The content item is explicit and the user's account is set to not play explicit content.
             *
             * Additional reasons may be added in the future.
             * **Note**: If you use this field, make sure that your application safely handles unknown values.
             */
            readonly reason?: string;
            [key: string]: unknown;
          };
          /** @description The number of the track. If an album has several discs, the track number is the number on the specified disc. */
          readonly track_number?: number;
          /** @description The object type: "track". */
          readonly type?: string;
          /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track. */
          readonly uri?: string;
          [key: string]: unknown;
        }[];
      [key: string]: unknown;
    };
    readonly PagingTrackObject: {
      [key: string]: unknown;
    } & components["schemas"]["PagingObject"] & {
      readonly items?: readonly components["schemas"]["TrackObject"][];
      [key: string]: unknown;
    };
    readonly PlayHistoryObject: {
      /** @description The context the track was played from. */
      readonly context?: components["schemas"]["ContextObject"];
      /**
       * Format: date-time
       * @description The date and time the track was played.
       */
      readonly played_at?: string;
      /** @description The track the user listened to. */
      readonly track?: components["schemas"]["TrackObject"];
      [key: string]: unknown;
    };
    readonly PlayerErrorObject: {
      /** @description A short description of the cause of the error. */
      readonly message?: string;
      readonly reason?: components["schemas"]["PlayerErrorReasons"];
      /** @description The HTTP status code. Either `404 NOT FOUND` or `403 FORBIDDEN`.  Also returned in the response header. */
      readonly status?: number;
      [key: string]: unknown;
    };
    /**
     * @description * `NO_PREV_TRACK` - The command requires a previous track, but there is none in the context.
     * * `NO_NEXT_TRACK` - The command requires a next track, but there is none in the context.
     * * `NO_SPECIFIC_TRACK` - The requested track does not exist.
     * * `ALREADY_PAUSED` - The command requires playback to not be paused.
     * * `NOT_PAUSED` - The command requires playback to be paused.
     * * `NOT_PLAYING_LOCALLY` - The command requires playback on the local device.
     * * `NOT_PLAYING_TRACK` - The command requires that a track is currently playing.
     * * `NOT_PLAYING_CONTEXT` - The command requires that a context is currently playing.
     * * `ENDLESS_CONTEXT` - The shuffle command cannot be applied on an endless context.
     * * `CONTEXT_DISALLOW` - The command could not be performed on the context.
     * * `ALREADY_PLAYING` - The track should not be restarted if the same track and context is already playing, and there is a resume point.
     * * `RATE_LIMITED` - The user is rate limited due to too frequent track play, also known as cat-on-the-keyboard spamming.
     * * `REMOTE_CONTROL_DISALLOW` - The context cannot be remote-controlled.
     * * `DEVICE_NOT_CONTROLLABLE` - Not possible to remote control the device.
     * * `VOLUME_CONTROL_DISALLOW` - Not possible to remote control the device's volume.
     * * `NO_ACTIVE_DEVICE` - Requires an active device and the user has none.
     * * `PREMIUM_REQUIRED` - The request is prohibited for non-premium users.
     * * `UNKNOWN` - Certain actions are restricted because of unknown reasons.
     *
     * @enum {string}
     */
    readonly PlayerErrorReasons: "NO_PREV_TRACK" | "NO_NEXT_TRACK" | "NO_SPECIFIC_TRACK" | "ALREADY_PAUSED" | "NOT_PAUSED" | "NOT_PLAYING_LOCALLY" | "NOT_PLAYING_TRACK" | "NOT_PLAYING_CONTEXT" | "ENDLESS_CONTEXT" | "CONTEXT_DISALLOW" | "ALREADY_PLAYING" | "RATE_LIMITED" | "REMOTE_CONTROL_DISALLOW" | "DEVICE_NOT_CONTROLLABLE" | "VOLUME_CONTROL_DISALLOW" | "NO_ACTIVE_DEVICE" | "PREMIUM_REQUIRED" | "UNKNOWN";
    readonly PlaylistObject: {
      /** @description `true` if the owner allows other users to modify the playlist. */
      readonly collaborative?: boolean;
      /** @description The playlist description. _Only returned for modified, verified playlists, otherwise_ `null`. */
      readonly description?: string | null;
      /** @description Known external URLs for this playlist. */
      readonly external_urls?: components["schemas"]["ExternalUrlObject"];
      /** @description Information about the followers of the playlist. */
      readonly followers?: components["schemas"]["FollowersObject"];
      /** @description A link to the Web API endpoint providing full details of the playlist. */
      readonly href?: string;
      /** @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the playlist. */
      readonly id?: string;
      /** @description Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order. See [Working with Playlists](/documentation/web-api/concepts/playlists). _**Note**: If returned, the source URL for the image (`url`) is temporary and will expire in less than a day._ */
      readonly images?: readonly components["schemas"]["ImageObject"][];
      /** @description The name of the playlist. */
      readonly name?: string;
      /** @description The user who owns the playlist */
      readonly owner?: components["schemas"]["PlaylistOwnerObject"];
      /** @description The playlist's public/private status: `true` the playlist is public, `false` the playlist is private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists) */
      readonly public?: boolean;
      /** @description The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version */
      readonly snapshot_id?: string;
      /** @description The tracks of the playlist. */
      readonly tracks?: {
        [key: string]: unknown;
      } & ({
        [key: string]: unknown;
      } & components["schemas"]["PagingObject"] & ({
        readonly items?: readonly ({
            /**
             * Format: date-time
             * @description The date and time the track or episode was added. _**Note**: some very old playlists may return `null` in this field._
             */
            readonly added_at?: string;
            /** @description The Spotify user who added the track or episode. _**Note**: some very old playlists may return `null` in this field._ */
            readonly added_by?: components["schemas"]["PlaylistUserObject"];
            /** @description Whether this track or episode is a [local file](/documentation/web-api/concepts/playlists/#local-files) or not. */
            readonly is_local?: boolean;
            /** @description Information about the track or episode. */
            readonly track?: components["schemas"]["TrackObject"] | components["schemas"]["EpisodeObject"];
            [key: string]: unknown;
          })[];
        [key: string]: unknown;
      }));
      /** @description The object type: "playlist" */
      readonly type?: string;
      /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the playlist. */
      readonly uri?: string;
      [key: string]: unknown;
    };
    readonly PlaylistOwnerObject: {
      /** @description Known public external URLs for this user. */
      readonly external_urls?: components["schemas"]["ExternalUrlObject"];
      /** @description Information about the followers of this user. */
      readonly followers?: components["schemas"]["FollowersObject"];
      /** @description A link to the Web API endpoint for this user. */
      readonly href?: string;
      /** @description The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for this user. */
      readonly id?: string;
      /**
       * @description The object type.
       *
       * @enum {string}
       */
      readonly type?: "user";
      /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for this user. */
      readonly uri?: string;
      [key: string]: unknown;
    } & ({
      /** @description The name displayed on the user's profile. `null` if not available. */
      readonly display_name?: string | null;
      [key: string]: unknown;
    });
    readonly PlaylistTrackObject: {
      /**
       * Format: date-time
       * @description The date and time the track or episode was added. _**Note**: some very old playlists may return `null` in this field._
       */
      readonly added_at?: string;
      /** @description The Spotify user who added the track or episode. _**Note**: some very old playlists may return `null` in this field._ */
      readonly added_by?: components["schemas"]["PlaylistUserObject"];
      /** @description Whether this track or episode is a [local file](/documentation/web-api/concepts/playlists/#local-files) or not. */
      readonly is_local?: boolean;
      /** @description Information about the track or episode. */
      readonly track?: components["schemas"]["TrackObject"] | components["schemas"]["EpisodeObject"];
      [key: string]: unknown;
    };
    readonly PlaylistTracksRefObject: {
      /** @description A link to the Web API endpoint where full details of the playlist's tracks can be retrieved. */
      readonly href?: string;
      /** @description Number of tracks in the playlist. */
      readonly total?: number;
      [key: string]: unknown;
    };
    readonly PlaylistUserObject: {
      /** @description Known public external URLs for this user. */
      readonly external_urls?: components["schemas"]["ExternalUrlObject"];
      /** @description Information about the followers of this user. */
      readonly followers?: components["schemas"]["FollowersObject"];
      /** @description A link to the Web API endpoint for this user. */
      readonly href?: string;
      /** @description The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for this user. */
      readonly id?: string;
      /**
       * @description The object type.
       *
       * @enum {string}
       */
      readonly type?: "user";
      /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for this user. */
      readonly uri?: string;
      [key: string]: unknown;
    };
    readonly PrivateUserObject: {
      /** @description The country of the user, as set in the user's account profile. An [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). _This field is only available when the current user has granted access to the [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._ */
      readonly country?: string;
      /** @description The name displayed on the user's profile. `null` if not available. */
      readonly display_name?: string;
      /** @description The user's email address, as entered by the user when creating their account. _**Important!** This email address is unverified; there is no proof that it actually belongs to the user._ _This field is only available when the current user has granted access to the [user-read-email](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._ */
      readonly email?: string;
      /** @description The user's explicit content settings. _This field is only available when the current user has granted access to the [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._ */
      readonly explicit_content?: {
        /** @description When `true`, indicates that explicit content should not be played. */
        readonly filter_enabled?: boolean;
        /** @description When `true`, indicates that the explicit content setting is locked and can't be changed by the user. */
        readonly filter_locked?: boolean;
        [key: string]: unknown;
      };
      /** @description Known external URLs for this user. */
      readonly external_urls?: components["schemas"]["ExternalUrlObject"];
      /** @description Information about the followers of the user. */
      readonly followers?: components["schemas"]["FollowersObject"];
      /** @description A link to the Web API endpoint for this user. */
      readonly href?: string;
      /** @description The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for the user. */
      readonly id?: string;
      /** @description The user's profile image. */
      readonly images?: readonly components["schemas"]["ImageObject"][];
      /** @description The user's Spotify subscription level: "premium", "free", etc. (The subscription level "open" can be considered the same as "free".) _This field is only available when the current user has granted access to the [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._ */
      readonly product?: string;
      /** @description The object type: "user" */
      readonly type?: string;
      /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the user. */
      readonly uri?: string;
      [key: string]: unknown;
    };
    readonly PublicUserObject: {
      /** @description The name displayed on the user's profile. `null` if not available. */
      readonly display_name?: string | null;
      /** @description Known public external URLs for this user. */
      readonly external_urls?: components["schemas"]["ExternalUrlObject"];
      /** @description Information about the followers of this user. */
      readonly followers?: components["schemas"]["FollowersObject"];
      /** @description A link to the Web API endpoint for this user. */
      readonly href?: string;
      /** @description The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for this user. */
      readonly id?: string;
      /** @description The user's profile image. */
      readonly images?: readonly components["schemas"]["ImageObject"][];
      /**
       * @description The object type.
       *
       * @enum {string}
       */
      readonly type?: "user";
      /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for this user. */
      readonly uri?: string;
      [key: string]: unknown;
    };
    readonly QueueObject: {
      /** @description The currently playing track or episode. Can be `null`. */
      readonly currently_playing?: components["schemas"]["TrackObject"] | components["schemas"]["EpisodeObject"];
      /** @description The tracks or episodes in the queue. Can be empty. */
      readonly queue?: readonly (components["schemas"]["TrackObject"] | components["schemas"]["EpisodeObject"])[];
      [key: string]: unknown;
    };
    readonly RecommendationSeedObject: {
      /** @description The number of tracks available after min\_\* and max\_\* filters have been applied. */
      readonly afterFilteringSize?: number;
      /** @description The number of tracks available after relinking for regional availability. */
      readonly afterRelinkingSize?: number;
      /** @description A link to the full track or artist data for this seed. For tracks this will be a link to a Track Object. For artists a link to an Artist Object. For genre seeds, this value will be `null`. */
      readonly href?: string;
      /** @description The id used to select this seed. This will be the same as the string used in the `seed_artists`, `seed_tracks` or `seed_genres` parameter. */
      readonly id?: string;
      /** @description The number of recommended tracks available for this seed. */
      readonly initialPoolSize?: number;
      /** @description The entity type of this seed. One of `artist`, `track` or `genre`. */
      readonly type?: string;
      [key: string]: unknown;
    };
    readonly RecommendationsObject: {
      /** @description An array of recommendation seed objects. */
      readonly seeds: readonly {
          /** @description The number of tracks available after min\_\* and max\_\* filters have been applied. */
          readonly afterFilteringSize?: number;
          /** @description The number of tracks available after relinking for regional availability. */
          readonly afterRelinkingSize?: number;
          /** @description A link to the full track or artist data for this seed. For tracks this will be a link to a Track Object. For artists a link to an Artist Object. For genre seeds, this value will be `null`. */
          readonly href?: string;
          /** @description The id used to select this seed. This will be the same as the string used in the `seed_artists`, `seed_tracks` or `seed_genres` parameter. */
          readonly id?: string;
          /** @description The number of recommended tracks available for this seed. */
          readonly initialPoolSize?: number;
          /** @description The entity type of this seed. One of `artist`, `track` or `genre`. */
          readonly type?: string;
          [key: string]: unknown;
        }[];
      /** @description An array of track objects ordered according to the parameters supplied. */
      readonly tracks: readonly components["schemas"]["TrackObject"][];
      [key: string]: unknown;
    };
    readonly ResumePointObject: {
      /** @description Whether or not the episode has been fully played by the user. */
      readonly fully_played?: boolean;
      /** @description The user's most recent position in the episode in milliseconds. */
      readonly resume_position_ms?: number;
      [key: string]: unknown;
    };
    readonly SavedAlbumObject: {
      /**
       * Format: date-time
       * @description The date and time the album was saved
       * Timestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.
       * If the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.
       */
      readonly added_at?: string;
      /** @description Information about the album. */
      readonly album?: components["schemas"]["AlbumObject"];
      [key: string]: unknown;
    };
    readonly SavedAudiobookObject: {
      /**
       * Format: date-time
       * @description The date and time the audiobook was saved
       * Timestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.
       * If the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.
       */
      readonly added_at?: string;
      /** @description Information about the audiobook. */
      readonly audiobook?: components["schemas"]["AudiobookObject"];
      [key: string]: unknown;
    };
    readonly SavedEpisodeObject: {
      /**
       * Format: date-time
       * @description The date and time the episode was saved.
       * Timestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.
       */
      readonly added_at?: string;
      /** @description Information about the episode. */
      readonly episode?: components["schemas"]["EpisodeObject"];
      [key: string]: unknown;
    };
    readonly SavedShowObject: {
      /**
       * Format: date-time
       * @description The date and time the show was saved.
       * Timestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.
       * If the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.
       */
      readonly added_at?: string;
      /** @description Information about the show. */
      readonly show?: components["schemas"]["SimplifiedShowObject"];
      [key: string]: unknown;
    };
    readonly SavedTrackObject: {
      /**
       * Format: date-time
       * @description The date and time the track was saved.
       * Timestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.
       * If the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.
       */
      readonly added_at?: string;
      /** @description Information about the track. */
      readonly track?: components["schemas"]["TrackObject"];
      [key: string]: unknown;
    };
    readonly SectionObject: {
      /**
       * @description The confidence, from 0.0 to 1.0, of the reliability of the section's "designation".
       * @example 1
       */
      readonly confidence?: number;
      /**
       * @description The duration (in seconds) of the section.
       * @example 6.97092
       */
      readonly duration?: number;
      /**
       * @description The estimated overall key of the section. The values in this field ranging from 0 to 11 mapping to pitches using standard Pitch Class notation (E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on). If no key was detected, the value is -1.
       * @example 9
       */
      readonly key?: number;
      /**
       * @description The confidence, from 0.0 to 1.0, of the reliability of the key. Songs with many key changes may correspond to low values in this field.
       * @example 0.297
       */
      readonly key_confidence?: number;
      /**
       * @description The overall loudness of the section in decibels (dB). Loudness values are useful for comparing relative loudness of sections within tracks.
       * @example -14.938
       */
      readonly loudness?: number;
      /**
       * @description Indicates the modality (major or minor) of a section, the type of scale from which its melodic content is derived. This field will contain a 0 for "minor", a 1 for "major", or a -1 for no result. Note that the major key (e.g. C major) could more likely be confused with the minor key at 3 semitones lower (e.g. A minor) as both keys carry the same pitches.
       * @enum {number}
       */
      readonly mode?: -1 | 0 | 1;
      /**
       * @description The confidence, from 0.0 to 1.0, of the reliability of the `mode`.
       * @example 0.471
       */
      readonly mode_confidence?: number;
      /**
       * @description The starting point (in seconds) of the section.
       * @example 0
       */
      readonly start?: number;
      /**
       * @description The overall estimated tempo of the section in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.
       * @example 113.178
       */
      readonly tempo?: number;
      /**
       * @description The confidence, from 0.0 to 1.0, of the reliability of the tempo. Some tracks contain tempo changes or sounds which don't contain tempo (like pure speech) which would correspond to a low value in this field.
       * @example 0.647
       */
      readonly tempo_confidence?: number;
      /**
       * @description An estimated time signature. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure). The time signature ranges from 3 to 7 indicating time signatures of "3/4", to "7/4".
       * @example 4
       */
      readonly time_signature?: number;
      /**
       * @description The confidence, from 0.0 to 1.0, of the reliability of the `time_signature`. Sections with time signature changes may correspond to low values in this field.
       * @example 1
       */
      readonly time_signature_confidence?: number;
      [key: string]: unknown;
    };
    readonly SegmentObject: {
      /**
       * @description The confidence, from 0.0 to 1.0, of the reliability of the segmentation. Segments of the song which are difficult to logically segment (e.g: noise) may correspond to low values in this field.
       *
       * @example 0.435
       */
      readonly confidence?: number;
      /**
       * @description The duration (in seconds) of the segment.
       * @example 0.19891
       */
      readonly duration?: number;
      /**
       * @description The offset loudness of the segment in decibels (dB). This value should be equivalent to the loudness_start of the following segment.
       * @example 0
       */
      readonly loudness_end?: number;
      /**
       * @description The peak loudness of the segment in decibels (dB). Combined with `loudness_start` and `loudness_max_time`, these components can be used to describe the "attack" of the segment.
       * @example -14.25
       */
      readonly loudness_max?: number;
      /**
       * @description The segment-relative offset of the segment peak loudness in seconds. Combined with `loudness_start` and `loudness_max`, these components can be used to desctibe the "attack" of the segment.
       * @example 0.07305
       */
      readonly loudness_max_time?: number;
      /**
       * @description The onset loudness of the segment in decibels (dB). Combined with `loudness_max` and `loudness_max_time`, these components can be used to describe the "attack" of the segment.
       * @example -23.053
       */
      readonly loudness_start?: number;
      /**
       * @description Pitch content is given by a “chroma” vector, corresponding to the 12 pitch classes C, C#, D to B, with values ranging from 0 to 1 that describe the relative dominance of every pitch in the chromatic scale. For example a C Major chord would likely be represented by large values of C, E and G (i.e. classes 0, 4, and 7).
       *
       * Vectors are normalized to 1 by their strongest dimension, therefore noisy sounds are likely represented by values that are all close to 1, while pure tones are described by one value at 1 (the pitch) and others near 0.
       * As can be seen below, the 12 vector indices are a combination of low-power spectrum values at their respective pitch frequencies.
       * ![pitch vector](https://developer.spotify.com/assets/audio/Pitch_vector.png)
       *
       * @example [
       *   0.212,
       *   0.141,
       *   0.294
       * ]
       */
      readonly pitches?: readonly number[];
      /**
       * @description The starting point (in seconds) of the segment.
       * @example 0.70154
       */
      readonly start?: number;
      /**
       * @description Timbre is the quality of a musical note or sound that distinguishes different types of musical instruments, or voices. It is a complex notion also referred to as sound color, texture, or tone quality, and is derived from the shape of a segment’s spectro-temporal surface, independently of pitch and loudness. The timbre feature is a vector that includes 12 unbounded values roughly centered around 0. Those values are high level abstractions of the spectral surface, ordered by degree of importance.
       *
       * For completeness however, the first dimension represents the average loudness of the segment; second emphasizes brightness; third is more closely correlated to the flatness of a sound; fourth to sounds with a stronger attack; etc. See an image below representing the 12 basis functions (i.e. template segments).
       * ![timbre basis functions](https://developer.spotify.com/assets/audio/Timbre_basis_functions.png)
       *
       * The actual timbre of the segment is best described as a linear combination of these 12 basis functions weighted by the coefficient values: timbre = c1 x b1 + c2 x b2 + ... + c12 x b12, where c1 to c12 represent the 12 coefficients and b1 to b12 the 12 basis functions as displayed below. Timbre vectors are best used in comparison with each other.
       *
       * @example [
       *   42.115,
       *   64.373,
       *   -0.233
       * ]
       */
      readonly timbre?: readonly number[];
      [key: string]: unknown;
    };
    readonly ShowBase: {
      /** @description A list of the countries in which the show can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code. */
      readonly available_markets: readonly string[];
      /** @description The copyright statements of the show. */
      readonly copyrights: readonly components["schemas"]["CopyrightObject"][];
      /** @description A description of the show. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed. */
      readonly description: string;
      /** @description Whether or not the show has explicit content (true = yes it does; false = no it does not OR unknown). */
      readonly explicit: boolean;
      /** @description External URLs for this show. */
      readonly external_urls: components["schemas"]["ExternalUrlObject"];
      /** @description A link to the Web API endpoint providing full details of the show. */
      readonly href: string;
      /** @description A description of the show. This field may contain HTML tags. */
      readonly html_description: string;
      /** @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the show. */
      readonly id: string;
      /** @description The cover art for the show in various sizes, widest first. */
      readonly images: readonly components["schemas"]["ImageObject"][];
      /** @description True if all of the shows episodes are hosted outside of Spotify's CDN. This field might be `null` in some cases. */
      readonly is_externally_hosted: boolean;
      /** @description A list of the languages used in the show, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code. */
      readonly languages: readonly string[];
      /** @description The media type of the show. */
      readonly media_type: string;
      /** @description The name of the episode. */
      readonly name: string;
      /** @description The publisher of the show. */
      readonly publisher: string;
      /** @description The total number of episodes in the show. */
      readonly total_episodes: number;
      /**
       * @description The object type.
       *
       * @enum {string}
       */
      readonly type: "show";
      /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the show. */
      readonly uri: string;
      [key: string]: unknown;
    };
    readonly ShowObject: components["schemas"]["ShowBase"] & ({
      /** @description The episodes of the show. */
      readonly episodes: {
        [key: string]: unknown;
      } & components["schemas"]["PagingSimplifiedEpisodeObject"];
      [key: string]: unknown;
    });
    readonly SimplifiedAlbumObject: components["schemas"]["AlbumBase"] & ({
      /**
       * @description The field is present when getting an artist's albums. Compare to album_type this field represents relationship between the artist and the album.
       *
       * @example compilation
       * @enum {string}
       */
      readonly album_group?: "album" | "single" | "compilation" | "appears_on";
      /** @description The artists of the album. Each artist object includes a link in `href` to more detailed information about the artist. */
      readonly artists: readonly components["schemas"]["SimplifiedArtistObject"][];
      [key: string]: unknown;
    });
    readonly SimplifiedArtistObject: {
      /** @description Known external URLs for this artist. */
      readonly external_urls?: components["schemas"]["ExternalUrlObject"];
      /** @description A link to the Web API endpoint providing full details of the artist. */
      readonly href?: string;
      /** @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the artist. */
      readonly id?: string;
      /** @description The name of the artist. */
      readonly name?: string;
      /**
       * @description The object type.
       *
       * @enum {string}
       */
      readonly type?: "artist";
      /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the artist. */
      readonly uri?: string;
      [key: string]: unknown;
    };
    readonly SimplifiedAudiobookObject: components["schemas"]["AudiobookBase"];
    readonly SimplifiedChapterObject: {
      [key: string]: unknown;
    } & ({
      /**
       * @description A URL to a 30 second preview (MP3 format) of the episode. `null` if not available.
       *
       * @example https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17
       */
      readonly audio_preview_url: string;
      /** @description A list of the countries in which the chapter can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code. */
      readonly available_markets?: readonly string[];
      /**
       * @description The number of the chapter
       *
       * @example 1
       */
      readonly chapter_number: number;
      /**
       * @description A description of the episode. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.
       *
       * @example A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.
       */
      readonly description: string;
      /**
       * @description The episode length in milliseconds.
       *
       * @example 1686230
       */
      readonly duration_ms: number;
      /** @description Whether or not the episode has explicit content (true = yes it does; false = no it does not OR unknown). */
      readonly explicit: boolean;
      /** @description External URLs for this episode. */
      readonly external_urls: components["schemas"]["ExternalUrlObject"];
      /**
       * @description A link to the Web API endpoint providing full details of the episode.
       *
       * @example https://api.spotify.com/v1/episodes/5Xt5DXGzch68nYYamXrNxZ
       */
      readonly href: string;
      /**
       * @description A description of the episode. This field may contain HTML tags.
       *
       * @example <p>A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.</p>
       */
      readonly html_description: string;
      /**
       * @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the episode.
       *
       * @example 5Xt5DXGzch68nYYamXrNxZ
       */
      readonly id: string;
      /** @description The cover art for the episode in various sizes, widest first. */
      readonly images: readonly components["schemas"]["ImageObject"][];
      /** @description True if the episode is playable in the given market. Otherwise false. */
      readonly is_playable: boolean;
      /**
       * @description A list of the languages used in the episode, identified by their [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639) code.
       *
       * @example [
       *   "fr",
       *   "en"
       * ]
       */
      readonly languages: readonly string[];
      /**
       * @description The name of the episode.
       *
       * @example Starting Your Own Podcast: Tips, Tricks, and Advice From Anchor Creators
       */
      readonly name: string;
      /**
       * @description The date the episode was first released, for example `"1981-12-15"`. Depending on the precision, it might be shown as `"1981"` or `"1981-12"`.
       *
       * @example 1981-12-15
       */
      readonly release_date: string;
      /**
       * @description The precision with which `release_date` value is known.
       *
       * @example day
       * @enum {string}
       */
      readonly release_date_precision: "year" | "month" | "day";
      /** @description Included in the response when a content restriction is applied. */
      readonly restrictions?: {
        /**
         * @description The reason for the restriction. Supported values:
         * - `market` - The content item is not available in the given market.
         * - `product` - The content item is not available for the user's subscription type.
         * - `explicit` - The content item is explicit and the user's account is set to not play explicit content.
         * - `payment_required` - Payment is required to play the content item.
         *
         * Additional reasons may be added in the future.
         * **Note**: If you use this field, make sure that your application safely handles unknown values.
         */
        readonly reason?: string;
        [key: string]: unknown;
      };
      /** @description The user's most recent position in the episode. Set if the supplied access token is a user token and has the scope 'user-read-playback-position'. */
      readonly resume_point: {
        /** @description Whether or not the episode has been fully played by the user. */
        readonly fully_played?: boolean;
        /** @description The user's most recent position in the episode in milliseconds. */
        readonly resume_position_ms?: number;
        [key: string]: unknown;
      };
      /**
       * @description The object type.
       *
       * @enum {string}
       */
      readonly type: "episode";
      /**
       * @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the episode.
       *
       * @example spotify:episode:0zLhl3WsOCQHbe1BPTiHgr
       */
      readonly uri: string;
      [key: string]: unknown;
    });
    readonly SimplifiedEpisodeObject: {
      [key: string]: unknown;
    } & components["schemas"]["EpisodeBase"];
    readonly SimplifiedPlaylistObject: {
      /** @description `true` if the owner allows other users to modify the playlist. */
      readonly collaborative?: boolean;
      /** @description The playlist description. _Only returned for modified, verified playlists, otherwise_ `null`. */
      readonly description?: string;
      /** @description Known external URLs for this playlist. */
      readonly external_urls?: components["schemas"]["ExternalUrlObject"];
      /** @description A link to the Web API endpoint providing full details of the playlist. */
      readonly href?: string;
      /** @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the playlist. */
      readonly id?: string;
      /** @description Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order. See [Working with Playlists](/documentation/web-api/concepts/playlists). _**Note**: If returned, the source URL for the image (`url`) is temporary and will expire in less than a day._ */
      readonly images?: readonly components["schemas"]["ImageObject"][];
      /** @description The name of the playlist. */
      readonly name?: string;
      /** @description The user who owns the playlist */
      readonly owner?: {
        /** @description Known public external URLs for this user. */
        readonly external_urls?: components["schemas"]["ExternalUrlObject"];
        /** @description Information about the followers of this user. */
        readonly followers?: components["schemas"]["FollowersObject"];
        /** @description A link to the Web API endpoint for this user. */
        readonly href?: string;
        /** @description The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for this user. */
        readonly id?: string;
        /**
         * @description The object type.
         *
         * @enum {string}
         */
        readonly type?: "user";
        /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for this user. */
        readonly uri?: string;
        [key: string]: unknown;
      } & ({
        /** @description The name displayed on the user's profile. `null` if not available. */
        readonly display_name?: string | null;
        [key: string]: unknown;
      });
      /** @description The playlist's public/private status: `true` the playlist is public, `false` the playlist is private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists) */
      readonly public?: boolean;
      /** @description The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version */
      readonly snapshot_id?: string;
      /** @description A collection containing a link ( `href` ) to the Web API endpoint where full details of the playlist's tracks can be retrieved, along with the `total` number of tracks in the playlist. Note, a track object may be `null`. This can happen if a track is no longer available. */
      readonly tracks?: {
        /** @description A link to the Web API endpoint where full details of the playlist's tracks can be retrieved. */
        readonly href?: string;
        /** @description Number of tracks in the playlist. */
        readonly total?: number;
        [key: string]: unknown;
      };
      /** @description The object type: "playlist" */
      readonly type?: string;
      /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the playlist. */
      readonly uri?: string;
      [key: string]: unknown;
    };
    readonly SimplifiedShowObject: {
      /** @description A list of the countries in which the show can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code. */
      readonly available_markets: readonly string[];
      /** @description The copyright statements of the show. */
      readonly copyrights: readonly components["schemas"]["CopyrightObject"][];
      /** @description A description of the show. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed. */
      readonly description: string;
      /** @description Whether or not the show has explicit content (true = yes it does; false = no it does not OR unknown). */
      readonly explicit: boolean;
      /** @description External URLs for this show. */
      readonly external_urls: components["schemas"]["ExternalUrlObject"];
      /** @description A link to the Web API endpoint providing full details of the show. */
      readonly href: string;
      /** @description A description of the show. This field may contain HTML tags. */
      readonly html_description: string;
      /** @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the show. */
      readonly id: string;
      /** @description The cover art for the show in various sizes, widest first. */
      readonly images: readonly components["schemas"]["ImageObject"][];
      /** @description True if all of the shows episodes are hosted outside of Spotify's CDN. This field might be `null` in some cases. */
      readonly is_externally_hosted: boolean;
      /** @description A list of the languages used in the show, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code. */
      readonly languages: readonly string[];
      /** @description The media type of the show. */
      readonly media_type: string;
      /** @description The name of the episode. */
      readonly name: string;
      /** @description The publisher of the show. */
      readonly publisher: string;
      /** @description The total number of episodes in the show. */
      readonly total_episodes: number;
      /**
       * @description The object type.
       *
       * @enum {string}
       */
      readonly type: "show";
      /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the show. */
      readonly uri: string;
      [key: string]: unknown;
    };
    readonly SimplifiedTrackObject: {
      /** @description The artists who performed the track. Each artist object includes a link in `href` to more detailed information about the artist. */
      readonly artists?: readonly components["schemas"]["SimplifiedArtistObject"][];
      /** @description A list of the countries in which the track can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code. */
      readonly available_markets?: readonly string[];
      /** @description The disc number (usually `1` unless the album consists of more than one disc). */
      readonly disc_number?: number;
      /** @description The track length in milliseconds. */
      readonly duration_ms?: number;
      /** @description Whether or not the track has explicit lyrics ( `true` = yes it does; `false` = no it does not OR unknown). */
      readonly explicit?: boolean;
      /** @description External URLs for this track. */
      readonly external_urls?: components["schemas"]["ExternalUrlObject"];
      /** @description A link to the Web API endpoint providing full details of the track. */
      readonly href?: string;
      /** @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track. */
      readonly id?: string;
      /** @description Whether or not the track is from a local file. */
      readonly is_local?: boolean;
      /** @description Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking/) is applied. If `true`, the track is playable in the given market. Otherwise `false`. */
      readonly is_playable?: boolean;
      /** @description Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking/) is applied and is only part of the response if the track linking, in fact, exists. The requested track has been replaced with a different track. The track in the `linked_from` object contains information about the originally requested track. */
      readonly linked_from?: {
        /** @description Known external URLs for this track. */
        readonly external_urls?: components["schemas"]["ExternalUrlObject"];
        /** @description A link to the Web API endpoint providing full details of the track. */
        readonly href?: string;
        /** @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track. */
        readonly id?: string;
        /** @description The object type: "track". */
        readonly type?: string;
        /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track. */
        readonly uri?: string;
        [key: string]: unknown;
      };
      /** @description The name of the track. */
      readonly name?: string;
      /** @description A URL to a 30 second preview (MP3 format) of the track. */
      readonly preview_url?: string;
      /** @description Included in the response when a content restriction is applied. */
      readonly restrictions?: {
        /**
         * @description The reason for the restriction. Supported values:
         * - `market` - The content item is not available in the given market.
         * - `product` - The content item is not available for the user's subscription type.
         * - `explicit` - The content item is explicit and the user's account is set to not play explicit content.
         *
         * Additional reasons may be added in the future.
         * **Note**: If you use this field, make sure that your application safely handles unknown values.
         */
        readonly reason?: string;
        [key: string]: unknown;
      };
      /** @description The number of the track. If an album has several discs, the track number is the number on the specified disc. */
      readonly track_number?: number;
      /** @description The object type: "track". */
      readonly type?: string;
      /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track. */
      readonly uri?: string;
      [key: string]: unknown;
    };
    /**
     * Format: float
     * @description The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.
     *
     * @example 118.211
     */
    readonly Tempo: number;
    readonly TimeIntervalObject: {
      /**
       * @description The confidence, from 0.0 to 1.0, of the reliability of the interval.
       * @example 0.925
       */
      readonly confidence?: number;
      /**
       * @description The duration (in seconds) of the time interval.
       * @example 2.18749
       */
      readonly duration?: number;
      /**
       * @description The starting point (in seconds) of the time interval.
       * @example 0.49567
       */
      readonly start?: number;
      [key: string]: unknown;
    };
    /**
     * @description An estimated time signature. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure). The time signature ranges from 3 to 7 indicating time signatures of "3/4", to "7/4".
     * @example 4
     */
    readonly TimeSignature: number;
    readonly TrackObject: {
      /** @description The album on which the track appears. The album object includes a link in `href` to full information about the album. */
      readonly album?: components["schemas"]["SimplifiedAlbumObject"];
      /** @description The artists who performed the track. Each artist object includes a link in `href` to more detailed information about the artist. */
      readonly artists?: readonly components["schemas"]["ArtistObject"][];
      /** @description A list of the countries in which the track can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code. */
      readonly available_markets?: readonly string[];
      /** @description The disc number (usually `1` unless the album consists of more than one disc). */
      readonly disc_number?: number;
      /** @description The track length in milliseconds. */
      readonly duration_ms?: number;
      /** @description Whether or not the track has explicit lyrics ( `true` = yes it does; `false` = no it does not OR unknown). */
      readonly explicit?: boolean;
      /** @description Known external IDs for the track. */
      readonly external_ids?: components["schemas"]["ExternalIdObject"];
      /** @description Known external URLs for this track. */
      readonly external_urls?: components["schemas"]["ExternalUrlObject"];
      /** @description A link to the Web API endpoint providing full details of the track. */
      readonly href?: string;
      /** @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track. */
      readonly id?: string;
      /** @description Whether or not the track is from a local file. */
      readonly is_local?: boolean;
      /** @description Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking) is applied. If `true`, the track is playable in the given market. Otherwise `false`. */
      readonly is_playable?: boolean;
      /** @description Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking) is applied, and the requested track has been replaced with different track. The track in the `linked_from` object contains information about the originally requested track. */
      readonly linked_from?: components["schemas"]["LinkedTrackObject"];
      /** @description The name of the track. */
      readonly name?: string;
      /** @description The popularity of the track. The value will be between 0 and 100, with 100 being the most popular.<br/>The popularity of a track is a value between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are.<br/>Generally speaking, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past. Duplicate tracks (e.g. the same track from a single and an album) are rated independently. Artist and album popularity is derived mathematically from track popularity. _**Note**: the popularity value may lag actual popularity by a few days: the value is not updated in real time._ */
      readonly popularity?: number;
      /** @description A link to a 30 second preview (MP3 format) of the track. Can be `null` */
      readonly preview_url?: string;
      /** @description Included in the response when a content restriction is applied. */
      readonly restrictions?: components["schemas"]["TrackRestrictionObject"];
      /** @description The number of the track. If an album has several discs, the track number is the number on the specified disc. */
      readonly track_number?: number;
      /**
       * @description The object type: "track".
       *
       * @enum {string}
       */
      readonly type?: "track";
      /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track. */
      readonly uri?: string;
      [key: string]: unknown;
    };
    readonly TrackRestrictionObject: {
      /**
       * @description The reason for the restriction. Supported values:
       * - `market` - The content item is not available in the given market.
       * - `product` - The content item is not available for the user's subscription type.
       * - `explicit` - The content item is explicit and the user's account is set to not play explicit content.
       *
       * Additional reasons may be added in the future.
       * **Note**: If you use this field, make sure that your application safely handles unknown values.
       */
      readonly reason?: string;
      [key: string]: unknown;
    };
    readonly TuneableTrackObject: {
      /**
       * Format: float
       * @description A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.
       */
      readonly acousticness?: number;
      /**
       * Format: float
       * @description Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.
       */
      readonly danceability?: number;
      /** @description The duration of the track in milliseconds. */
      readonly duration_ms?: number;
      /**
       * Format: float
       * @description Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.
       */
      readonly energy?: number;
      /**
       * Format: float
       * @description Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly "vocal". The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.
       */
      readonly instrumentalness?: number;
      readonly key?: components["schemas"]["Key"];
      /**
       * Format: float
       * @description Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.
       */
      readonly liveness?: number;
      readonly loudness?: components["schemas"]["Loudness"];
      readonly mode?: components["schemas"]["Mode"];
      /**
       * Format: float
       * @description The popularity of the track. The value will be between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are. _**Note**: When applying track relinking via the `market` parameter, it is expected to find relinked tracks with popularities that do not match `min_*`, `max_*`and `target_*` popularities. These relinked tracks are accurate replacements for unplayable tracks with the expected popularity scores. Original, non-relinked tracks are available via the `linked_from` attribute of the [relinked track response](/documentation/web-api/concepts/track-relinking)._
       */
      readonly popularity?: number;
      /**
       * Format: float
       * @description Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.
       */
      readonly speechiness?: number;
      readonly tempo?: components["schemas"]["Tempo"];
      readonly time_signature?: components["schemas"]["TimeSignature"];
      /**
       * Format: float
       * @description A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).
       */
      readonly valence?: number;
      [key: string]: unknown;
    };
  };
  responses: {
    /** @description Array of booleans */
    readonly ArrayOfBooleans: {
      content: {
        readonly "application/json": readonly boolean[];
      };
    };
    /** @description A set of images */
    readonly ArrayOfImages: {
      content: {
        readonly "application/json": readonly components["schemas"]["ImageObject"][];
      };
    };
    /** @description The request contains malformed data in path, query parameters, or body. */
    readonly BadRequest: {
      content: {
        readonly "application/json": {
          readonly error: components["schemas"]["ErrorObject"];
          [key: string]: unknown;
        };
      };
    };
    /** @description A paged set of artists */
    readonly CursorPagedArtists: {
      content: {
        readonly "application/json": {
          readonly artists: {
            [key: string]: unknown;
          } & {
            /** @description The cursors used to find the next set of items. */
            readonly cursors?: {
              /** @description The cursor to use as key to find the next page of items. */
              readonly after?: string;
              /** @description The cursor to use as key to find the previous page of items. */
              readonly before?: string;
              [key: string]: unknown;
            };
            /** @description A link to the Web API endpoint returning the full result of the request. */
            readonly href?: string;
            /** @description The maximum number of items in the response (as set in the query or by default). */
            readonly limit?: number;
            /** @description URL to the next page of items. ( `null` if none) */
            readonly next?: string;
            /** @description The total number of items available to return. */
            readonly total?: number;
            [key: string]: unknown;
          } & {
            readonly items?: readonly components["schemas"]["ArtistObject"][];
            [key: string]: unknown;
          };
          [key: string]: unknown;
        };
      };
    };
    /** @description A paged set of tracks */
    readonly CursorPagedPlayHistory: {
      content: {
        readonly "application/json": {
          [key: string]: unknown;
        } & components["schemas"]["CursorPagingObject"] & {
          readonly items?: readonly {
              /** @description The context the track was played from. */
              readonly context?: components["schemas"]["ContextObject"];
              /**
               * Format: date-time
               * @description The date and time the track was played.
               */
              readonly played_at?: string;
              /** @description The track the user listened to. */
              readonly track?: components["schemas"]["TrackObject"];
              [key: string]: unknown;
            }[];
          [key: string]: unknown;
        };
      };
    };
    /**
     * @description Bad OAuth request (wrong consumer key, bad nonce, expired
     * timestamp...). Unfortunately, re-authenticating the user won't help here.
     */
    readonly Forbidden: {
      content: {
        readonly "application/json": {
          readonly error: components["schemas"]["ErrorObject"];
          [key: string]: unknown;
        };
      };
    };
    /** @description A set of albums */
    readonly ManyAlbums: {
      content: {
        readonly "application/json": {
          readonly albums: readonly (({
              /**
               * @description The type of the album.
               *
               * @example compilation
               * @enum {string}
               */
              readonly album_type: "album" | "single" | "compilation";
              /**
               * @description The markets in which the album is available: [ISO 3166-1 alpha-2 country codes](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). _**NOTE**: an album is considered available in a market when at least 1 of its tracks is available in that market._
               *
               * @example [
               *   "CA",
               *   "BR",
               *   "IT"
               * ]
               */
              readonly available_markets: readonly string[];
              /** @description Known external URLs for this album. */
              readonly external_urls: {
                /** @description The [Spotify URL](/documentation/web-api/concepts/spotify-uris-ids) for the object. */
                readonly spotify?: string;
                [key: string]: unknown;
              };
              /** @description A link to the Web API endpoint providing full details of the album. */
              readonly href: string;
              /**
               * @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the album.
               *
               * @example 2up3OPMp9Tb4dAKM2erWXQ
               */
              readonly id: string;
              /** @description The cover art for the album in various sizes, widest first. */
              readonly images: readonly ({
                  /**
                   * @description The image height in pixels.
                   *
                   * @example 300
                   */
                  readonly height: number | null;
                  /**
                   * @description The source URL of the image.
                   *
                   * @example https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228
                   */
                  readonly url: string;
                  /**
                   * @description The image width in pixels.
                   *
                   * @example 300
                   */
                  readonly width: number | null;
                  [key: string]: unknown;
                })[];
              /** @description The name of the album. In case of an album takedown, the value may be an empty string. */
              readonly name: string;
              /**
               * @description The date the album was first released.
               *
               * @example 1981-12
               */
              readonly release_date: string;
              /**
               * @description The precision with which `release_date` value is known.
               *
               * @example year
               * @enum {string}
               */
              readonly release_date_precision: "year" | "month" | "day";
              /** @description Included in the response when a content restriction is applied. */
              readonly restrictions?: {
                /**
                 * @description The reason for the restriction. Albums may be restricted if the content is not available in a given market, to the user's subscription type, or when the user's account is set to not play explicit content.
                 * Additional reasons may be added in the future.
                 *
                 * @enum {string}
                 */
                readonly reason?: "market" | "product" | "explicit";
                [key: string]: unknown;
              };
              /**
               * @description The number of tracks in the album.
               * @example 9
               */
              readonly total_tracks: number;
              /**
               * @description The object type.
               *
               * @enum {string}
               */
              readonly type: "album";
              /**
               * @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the album.
               *
               * @example spotify:album:2up3OPMp9Tb4dAKM2erWXQ
               */
              readonly uri: string;
              [key: string]: unknown;
            }) & ({
              /** @description The artists of the album. Each artist object includes a link in `href` to more detailed information about the artist. */
              readonly artists?: readonly {
                  /** @description Known external URLs for this artist. */
                  readonly external_urls?: components["schemas"]["ExternalUrlObject"];
                  /** @description A link to the Web API endpoint providing full details of the artist. */
                  readonly href?: string;
                  /** @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the artist. */
                  readonly id?: string;
                  /** @description The name of the artist. */
                  readonly name?: string;
                  /**
                   * @description The object type.
                   *
                   * @enum {string}
                   */
                  readonly type?: "artist";
                  /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the artist. */
                  readonly uri?: string;
                  [key: string]: unknown;
                }[];
              /** @description The copyright statements of the album. */
              readonly copyrights?: readonly {
                  /** @description The copyright text for this content. */
                  readonly text?: string;
                  /** @description The type of copyright: `C` = the copyright, `P` = the sound recording (performance) copyright. */
                  readonly type?: string;
                  [key: string]: unknown;
                }[];
              /** @description Known external IDs for the album. */
              readonly external_ids?: {
                /** @description [International Article Number](http://en.wikipedia.org/wiki/International_Article_Number_%28EAN%29) */
                readonly ean?: string;
                /** @description [International Standard Recording Code](http://en.wikipedia.org/wiki/International_Standard_Recording_Code) */
                readonly isrc?: string;
                /** @description [Universal Product Code](http://en.wikipedia.org/wiki/Universal_Product_Code) */
                readonly upc?: string;
                [key: string]: unknown;
              };
              /** @description A list of the genres used to classify the album. (If not yet classified, the array is empty.) */
              readonly genres?: readonly string[];
              /** @description The label for the album. */
              readonly label?: string;
              /** @description The popularity of the album, with 100 being the most popular. The popularity is calculated from the popularity of the album's individual tracks. */
              readonly popularity?: number;
              /** @description The tracks of the album. */
              readonly tracks?: {
                [key: string]: unknown;
              } & ({
                /**
                 * @description A link to the Web API endpoint returning the full result of the request
                 *
                 * @example https://api.spotify.com/v1/me/shows?offset=0&limit=20
                 */
                readonly href: string;
                /**
                 * @description The maximum number of items in the response (as set in the query or by default).
                 *
                 * @example 20
                 */
                readonly limit: number;
                /**
                 * @description URL to the next page of items. ( `null` if none)
                 *
                 * @example https://api.spotify.com/v1/me/shows?offset=1&limit=1
                 */
                readonly next: string | null;
                /**
                 * @description The offset of the items returned (as set in the query or by default)
                 *
                 * @example 0
                 */
                readonly offset: number;
                /**
                 * @description URL to the previous page of items. ( `null` if none)
                 *
                 * @example https://api.spotify.com/v1/me/shows?offset=1&limit=1
                 */
                readonly previous: string | null;
                /**
                 * @description The total number of items available to return.
                 *
                 * @example 4
                 */
                readonly total: number;
                [key: string]: unknown;
              }) & {
                readonly items?: readonly {
                    /** @description The artists who performed the track. Each artist object includes a link in `href` to more detailed information about the artist. */
                    readonly artists?: readonly components["schemas"]["SimplifiedArtistObject"][];
                    /** @description A list of the countries in which the track can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code. */
                    readonly available_markets?: readonly string[];
                    /** @description The disc number (usually `1` unless the album consists of more than one disc). */
                    readonly disc_number?: number;
                    /** @description The track length in milliseconds. */
                    readonly duration_ms?: number;
                    /** @description Whether or not the track has explicit lyrics ( `true` = yes it does; `false` = no it does not OR unknown). */
                    readonly explicit?: boolean;
                    /** @description External URLs for this track. */
                    readonly external_urls?: components["schemas"]["ExternalUrlObject"];
                    /** @description A link to the Web API endpoint providing full details of the track. */
                    readonly href?: string;
                    /** @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track. */
                    readonly id?: string;
                    /** @description Whether or not the track is from a local file. */
                    readonly is_local?: boolean;
                    /** @description Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking/) is applied. If `true`, the track is playable in the given market. Otherwise `false`. */
                    readonly is_playable?: boolean;
                    /** @description Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking/) is applied and is only part of the response if the track linking, in fact, exists. The requested track has been replaced with a different track. The track in the `linked_from` object contains information about the originally requested track. */
                    readonly linked_from?: {
                      /** @description Known external URLs for this track. */
                      readonly external_urls?: components["schemas"]["ExternalUrlObject"];
                      /** @description A link to the Web API endpoint providing full details of the track. */
                      readonly href?: string;
                      /** @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track. */
                      readonly id?: string;
                      /** @description The object type: "track". */
                      readonly type?: string;
                      /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track. */
                      readonly uri?: string;
                      [key: string]: unknown;
                    };
                    /** @description The name of the track. */
                    readonly name?: string;
                    /** @description A URL to a 30 second preview (MP3 format) of the track. */
                    readonly preview_url?: string;
                    /** @description Included in the response when a content restriction is applied. */
                    readonly restrictions?: {
                      /**
                       * @description The reason for the restriction. Supported values:
                       * - `market` - The content item is not available in the given market.
                       * - `product` - The content item is not available for the user's subscription type.
                       * - `explicit` - The content item is explicit and the user's account is set to not play explicit content.
                       *
                       * Additional reasons may be added in the future.
                       * **Note**: If you use this field, make sure that your application safely handles unknown values.
                       */
                      readonly reason?: string;
                      [key: string]: unknown;
                    };
                    /** @description The number of the track. If an album has several discs, the track number is the number on the specified disc. */
                    readonly track_number?: number;
                    /** @description The object type: "track". */
                    readonly type?: string;
                    /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track. */
                    readonly uri?: string;
                    [key: string]: unknown;
                  }[];
                [key: string]: unknown;
              };
              [key: string]: unknown;
            }))[];
          [key: string]: unknown;
        };
      };
    };
    /** @description A set of artists */
    readonly ManyArtists: {
      content: {
        readonly "application/json": {
          readonly artists: readonly ({
              /** @description Known external URLs for this artist. */
              readonly external_urls?: components["schemas"]["ExternalUrlObject"];
              /** @description Information about the followers of the artist. */
              readonly followers?: {
                /** @description This will always be set to null, as the Web API does not support it at the moment. */
                readonly href?: string | null;
                /** @description The total number of followers. */
                readonly total?: number;
                [key: string]: unknown;
              };
              /**
               * @description A list of the genres the artist is associated with. If not yet classified, the array is empty.
               *
               * @example [
               *   "Prog rock",
               *   "Grunge"
               * ]
               */
              readonly genres?: readonly string[];
              /** @description A link to the Web API endpoint providing full details of the artist. */
              readonly href?: string;
              /** @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the artist. */
              readonly id?: string;
              /** @description Images of the artist in various sizes, widest first. */
              readonly images?: readonly components["schemas"]["ImageObject"][];
              /** @description The name of the artist. */
              readonly name?: string;
              /** @description The popularity of the artist. The value will be between 0 and 100, with 100 being the most popular. The artist's popularity is calculated from the popularity of all the artist's tracks. */
              readonly popularity?: number;
              /**
               * @description The object type.
               *
               * @enum {string}
               */
              readonly type?: "artist";
              /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the artist. */
              readonly uri?: string;
              [key: string]: unknown;
            })[];
          [key: string]: unknown;
        };
      };
    };
    /** @description A set of audio features */
    readonly ManyAudioFeatures: {
      content: {
        readonly "application/json": {
          readonly audio_features: readonly {
              /**
               * Format: float
               * @description A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.
               *
               * @example 0.00242
               */
              readonly acousticness?: number;
              /**
               * @description A URL to access the full audio analysis of this track. An access token is required to access this data.
               *
               * @example https://api.spotify.com/v1/audio-analysis/2takcwOaAZWiXQijPHIx7B
               */
              readonly analysis_url?: string;
              /**
               * Format: float
               * @description Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.
               *
               * @example 0.585
               */
              readonly danceability?: number;
              /**
               * @description The duration of the track in milliseconds.
               *
               * @example 237040
               */
              readonly duration_ms?: number;
              /**
               * Format: float
               * @description Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.
               *
               * @example 0.842
               */
              readonly energy?: number;
              /**
               * @description The Spotify ID for the track.
               *
               * @example 2takcwOaAZWiXQijPHIx7B
               */
              readonly id?: string;
              /**
               * Format: float
               * @description Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly "vocal". The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.
               *
               * @example 0.00686
               */
              readonly instrumentalness?: number;
              readonly key?: components["schemas"]["Key"];
              /**
               * Format: float
               * @description Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.
               *
               * @example 0.0866
               */
              readonly liveness?: number;
              readonly loudness?: components["schemas"]["Loudness"];
              readonly mode?: components["schemas"]["Mode"];
              /**
               * Format: float
               * @description Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.
               *
               * @example 0.0556
               */
              readonly speechiness?: number;
              readonly tempo?: components["schemas"]["Tempo"];
              readonly time_signature?: components["schemas"]["TimeSignature"];
              /**
               * @description A link to the Web API endpoint providing full details of the track.
               *
               * @example https://api.spotify.com/v1/tracks/2takcwOaAZWiXQijPHIx7B
               */
              readonly track_href?: string;
              /**
               * @description The object type.
               *
               * @enum {string}
               */
              readonly type?: "audio_features";
              /**
               * @description The Spotify URI for the track.
               *
               * @example spotify:track:2takcwOaAZWiXQijPHIx7B
               */
              readonly uri?: string;
              /**
               * Format: float
               * @description A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).
               *
               * @example 0.428
               */
              readonly valence?: number;
              [key: string]: unknown;
            }[];
          [key: string]: unknown;
        };
      };
    };
    /** @description A set of audiobooks */
    readonly ManyAudiobooks: {
      content: {
        readonly "application/json": {
          readonly audiobooks: readonly ({
              /** @description The author(s) for the audiobook. */
              readonly authors: readonly {
                  /** @description The name of the author. */
                  readonly name?: string;
                  [key: string]: unknown;
                }[];
              /** @description A list of the countries in which the audiobook can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code. */
              readonly available_markets: readonly string[];
              /** @description The copyright statements of the audiobook. */
              readonly copyrights: readonly components["schemas"]["CopyrightObject"][];
              /** @description A description of the audiobook. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed. */
              readonly description: string;
              /**
               * @description The edition of the audiobook.
               *
               * @example Unabridged
               */
              readonly edition?: string;
              /** @description Whether or not the audiobook has explicit content (true = yes it does; false = no it does not OR unknown). */
              readonly explicit: boolean;
              /** @description External URLs for this audiobook. */
              readonly external_urls: components["schemas"]["ExternalUrlObject"];
              /** @description A link to the Web API endpoint providing full details of the audiobook. */
              readonly href: string;
              /** @description A description of the audiobook. This field may contain HTML tags. */
              readonly html_description: string;
              /** @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the audiobook. */
              readonly id: string;
              /** @description The cover art for the audiobook in various sizes, widest first. */
              readonly images: readonly components["schemas"]["ImageObject"][];
              /** @description A list of the languages used in the audiobook, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code. */
              readonly languages: readonly string[];
              /** @description The media type of the audiobook. */
              readonly media_type: string;
              /** @description The name of the audiobook. */
              readonly name: string;
              /** @description The narrator(s) for the audiobook. */
              readonly narrators: readonly {
                  /** @description The name of the Narrator. */
                  readonly name?: string;
                  [key: string]: unknown;
                }[];
              /** @description The publisher of the audiobook. */
              readonly publisher: string;
              /** @description The number of chapters in this audiobook. */
              readonly total_chapters: number;
              /**
               * @description The object type.
               *
               * @enum {string}
               */
              readonly type: "audiobook";
              /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the audiobook. */
              readonly uri: string;
              [key: string]: unknown;
            } & ({
              /** @description The chapters of the audiobook. */
              readonly chapters: {
                [key: string]: unknown;
              } & ({
                [key: string]: unknown;
              } & components["schemas"]["PagingObject"] & ({
                readonly items?: readonly ({
                    [key: string]: unknown;
                  } & ({
                    /**
                     * @description A URL to a 30 second preview (MP3 format) of the episode. `null` if not available.
                     *
                     * @example https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17
                     */
                    readonly audio_preview_url: string;
                    /** @description A list of the countries in which the chapter can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code. */
                    readonly available_markets?: readonly string[];
                    /**
                     * @description The number of the chapter
                     *
                     * @example 1
                     */
                    readonly chapter_number: number;
                    /**
                     * @description A description of the episode. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.
                     *
                     * @example A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.
                     */
                    readonly description: string;
                    /**
                     * @description The episode length in milliseconds.
                     *
                     * @example 1686230
                     */
                    readonly duration_ms: number;
                    /** @description Whether or not the episode has explicit content (true = yes it does; false = no it does not OR unknown). */
                    readonly explicit: boolean;
                    /** @description External URLs for this episode. */
                    readonly external_urls: components["schemas"]["ExternalUrlObject"];
                    /**
                     * @description A link to the Web API endpoint providing full details of the episode.
                     *
                     * @example https://api.spotify.com/v1/episodes/5Xt5DXGzch68nYYamXrNxZ
                     */
                    readonly href: string;
                    /**
                     * @description A description of the episode. This field may contain HTML tags.
                     *
                     * @example <p>A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.</p>
                     */
                    readonly html_description: string;
                    /**
                     * @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the episode.
                     *
                     * @example 5Xt5DXGzch68nYYamXrNxZ
                     */
                    readonly id: string;
                    /** @description The cover art for the episode in various sizes, widest first. */
                    readonly images: readonly components["schemas"]["ImageObject"][];
                    /** @description True if the episode is playable in the given market. Otherwise false. */
                    readonly is_playable: boolean;
                    /**
                     * @description A list of the languages used in the episode, identified by their [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639) code.
                     *
                     * @example [
                     *   "fr",
                     *   "en"
                     * ]
                     */
                    readonly languages: readonly string[];
                    /**
                     * @description The name of the episode.
                     *
                     * @example Starting Your Own Podcast: Tips, Tricks, and Advice From Anchor Creators
                     */
                    readonly name: string;
                    /**
                     * @description The date the episode was first released, for example `"1981-12-15"`. Depending on the precision, it might be shown as `"1981"` or `"1981-12"`.
                     *
                     * @example 1981-12-15
                     */
                    readonly release_date: string;
                    /**
                     * @description The precision with which `release_date` value is known.
                     *
                     * @example day
                     * @enum {string}
                     */
                    readonly release_date_precision: "year" | "month" | "day";
                    /** @description Included in the response when a content restriction is applied. */
                    readonly restrictions?: {
                      /**
                       * @description The reason for the restriction. Supported values:
                       * - `market` - The content item is not available in the given market.
                       * - `product` - The content item is not available for the user's subscription type.
                       * - `explicit` - The content item is explicit and the user's account is set to not play explicit content.
                       * - `payment_required` - Payment is required to play the content item.
                       *
                       * Additional reasons may be added in the future.
                       * **Note**: If you use this field, make sure that your application safely handles unknown values.
                       */
                      readonly reason?: string;
                      [key: string]: unknown;
                    };
                    /** @description The user's most recent position in the episode. Set if the supplied access token is a user token and has the scope 'user-read-playback-position'. */
                    readonly resume_point: {
                      /** @description Whether or not the episode has been fully played by the user. */
                      readonly fully_played?: boolean;
                      /** @description The user's most recent position in the episode in milliseconds. */
                      readonly resume_position_ms?: number;
                      [key: string]: unknown;
                    };
                    /**
                     * @description The object type.
                     *
                     * @enum {string}
                     */
                    readonly type: "episode";
                    /**
                     * @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the episode.
                     *
                     * @example spotify:episode:0zLhl3WsOCQHbe1BPTiHgr
                     */
                    readonly uri: string;
                    [key: string]: unknown;
                  }))[];
                [key: string]: unknown;
              }));
              [key: string]: unknown;
            }))[];
          [key: string]: unknown;
        };
      };
    };
    /** @description A set of chapters */
    readonly ManyChapters: {
      content: {
        readonly "application/json": {
          readonly chapters: readonly ({
              [key: string]: unknown;
            } & components["schemas"]["ChapterBase"] & {
              /** @description The audiobook for which the chapter belongs. */
              readonly audiobook: components["schemas"]["AudiobookBase"];
              [key: string]: unknown;
            })[];
          [key: string]: unknown;
        };
      };
    };
    /** @description A set of devices */
    readonly ManyDevices: {
      content: {
        readonly "application/json": {
          /** @description A list of 0..n Device objects */
          readonly devices?: readonly components["schemas"]["DeviceObject"][];
          [key: string]: unknown;
        };
      };
    };
    /** @description A set of episodes */
    readonly ManyEpisodes: {
      content: {
        readonly "application/json": {
          readonly episodes: readonly ({
              [key: string]: unknown;
            } & ({
              /**
               * @description A URL to a 30 second preview (MP3 format) of the episode. `null` if not available.
               *
               * @example https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17
               */
              readonly audio_preview_url: string;
              /**
               * @description A description of the episode. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.
               *
               * @example A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.
               */
              readonly description: string;
              /**
               * @description The episode length in milliseconds.
               *
               * @example 1686230
               */
              readonly duration_ms: number;
              /** @description Whether or not the episode has explicit content (true = yes it does; false = no it does not OR unknown). */
              readonly explicit: boolean;
              /** @description External URLs for this episode. */
              readonly external_urls: components["schemas"]["ExternalUrlObject"];
              /**
               * @description A link to the Web API endpoint providing full details of the episode.
               *
               * @example https://api.spotify.com/v1/episodes/5Xt5DXGzch68nYYamXrNxZ
               */
              readonly href: string;
              /**
               * @description A description of the episode. This field may contain HTML tags.
               *
               * @example <p>A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.</p>
               */
              readonly html_description: string;
              /**
               * @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the episode.
               *
               * @example 5Xt5DXGzch68nYYamXrNxZ
               */
              readonly id: string;
              /** @description The cover art for the episode in various sizes, widest first. */
              readonly images: readonly components["schemas"]["ImageObject"][];
              /** @description True if the episode is hosted outside of Spotify's CDN. */
              readonly is_externally_hosted: boolean;
              /** @description True if the episode is playable in the given market. Otherwise false. */
              readonly is_playable: boolean;
              /**
               * @deprecated
               * @description The language used in the episode, identified by a [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code. This field is deprecated and might be removed in the future. Please use the `languages` field instead.
               *
               * @example en
               */
              readonly language?: string;
              /**
               * @description A list of the languages used in the episode, identified by their [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639) code.
               *
               * @example [
               *   "fr",
               *   "en"
               * ]
               */
              readonly languages: readonly string[];
              /**
               * @description The name of the episode.
               *
               * @example Starting Your Own Podcast: Tips, Tricks, and Advice From Anchor Creators
               */
              readonly name: string;
              /**
               * @description The date the episode was first released, for example `"1981-12-15"`. Depending on the precision, it might be shown as `"1981"` or `"1981-12"`.
               *
               * @example 1981-12-15
               */
              readonly release_date: string;
              /**
               * @description The precision with which `release_date` value is known.
               *
               * @example day
               * @enum {string}
               */
              readonly release_date_precision: "year" | "month" | "day";
              /** @description Included in the response when a content restriction is applied. */
              readonly restrictions?: {
                /**
                 * @description The reason for the restriction. Supported values:
                 * - `market` - The content item is not available in the given market.
                 * - `product` - The content item is not available for the user's subscription type.
                 * - `explicit` - The content item is explicit and the user's account is set to not play explicit content.
                 *
                 * Additional reasons may be added in the future.
                 * **Note**: If you use this field, make sure that your application safely handles unknown values.
                 */
                readonly reason?: string;
                [key: string]: unknown;
              };
              /** @description The user's most recent position in the episode. Set if the supplied access token is a user token and has the scope 'user-read-playback-position'. */
              readonly resume_point: components["schemas"]["ResumePointObject"];
              /**
               * @description The object type.
               *
               * @enum {string}
               */
              readonly type: "episode";
              /**
               * @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the episode.
               *
               * @example spotify:episode:0zLhl3WsOCQHbe1BPTiHgr
               */
              readonly uri: string;
              [key: string]: unknown;
            }) & {
              /** @description The show on which the episode belongs. */
              readonly show: {
                /** @description A list of the countries in which the show can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code. */
                readonly available_markets: readonly string[];
                /** @description The copyright statements of the show. */
                readonly copyrights: readonly components["schemas"]["CopyrightObject"][];
                /** @description A description of the show. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed. */
                readonly description: string;
                /** @description Whether or not the show has explicit content (true = yes it does; false = no it does not OR unknown). */
                readonly explicit: boolean;
                /** @description External URLs for this show. */
                readonly external_urls: components["schemas"]["ExternalUrlObject"];
                /** @description A link to the Web API endpoint providing full details of the show. */
                readonly href: string;
                /** @description A description of the show. This field may contain HTML tags. */
                readonly html_description: string;
                /** @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the show. */
                readonly id: string;
                /** @description The cover art for the show in various sizes, widest first. */
                readonly images: readonly components["schemas"]["ImageObject"][];
                /** @description True if all of the shows episodes are hosted outside of Spotify's CDN. This field might be `null` in some cases. */
                readonly is_externally_hosted: boolean;
                /** @description A list of the languages used in the show, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code. */
                readonly languages: readonly string[];
                /** @description The media type of the show. */
                readonly media_type: string;
                /** @description The name of the episode. */
                readonly name: string;
                /** @description The publisher of the show. */
                readonly publisher: string;
                /** @description The total number of episodes in the show. */
                readonly total_episodes: number;
                /**
                 * @description The object type.
                 *
                 * @enum {string}
                 */
                readonly type: "show";
                /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the show. */
                readonly uri: string;
                [key: string]: unknown;
              };
              [key: string]: unknown;
            })[];
          [key: string]: unknown;
        };
      };
    };
    /** @description A set of genres */
    readonly ManyGenres: {
      content: {
        readonly "application/json": {
          /**
           * @example [
           *   "alternative",
           *   "samba"
           * ]
           */
          readonly genres: readonly string[];
          [key: string]: unknown;
        };
      };
    };
    /** @description A set of shows */
    readonly ManySimplifiedShows: {
      content: {
        readonly "application/json": {
          readonly shows: readonly components["schemas"]["SimplifiedShowObject"][];
          [key: string]: unknown;
        };
      };
    };
    /** @description A set of tracks */
    readonly ManyTracks: {
      content: {
        readonly "application/json": {
          readonly tracks: readonly {
              /** @description The album on which the track appears. The album object includes a link in `href` to full information about the album. */
              readonly album?: components["schemas"]["SimplifiedAlbumObject"];
              /** @description The artists who performed the track. Each artist object includes a link in `href` to more detailed information about the artist. */
              readonly artists?: readonly components["schemas"]["ArtistObject"][];
              /** @description A list of the countries in which the track can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code. */
              readonly available_markets?: readonly string[];
              /** @description The disc number (usually `1` unless the album consists of more than one disc). */
              readonly disc_number?: number;
              /** @description The track length in milliseconds. */
              readonly duration_ms?: number;
              /** @description Whether or not the track has explicit lyrics ( `true` = yes it does; `false` = no it does not OR unknown). */
              readonly explicit?: boolean;
              /** @description Known external IDs for the track. */
              readonly external_ids?: components["schemas"]["ExternalIdObject"];
              /** @description Known external URLs for this track. */
              readonly external_urls?: components["schemas"]["ExternalUrlObject"];
              /** @description A link to the Web API endpoint providing full details of the track. */
              readonly href?: string;
              /** @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track. */
              readonly id?: string;
              /** @description Whether or not the track is from a local file. */
              readonly is_local?: boolean;
              /** @description Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking) is applied. If `true`, the track is playable in the given market. Otherwise `false`. */
              readonly is_playable?: boolean;
              /** @description Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking) is applied, and the requested track has been replaced with different track. The track in the `linked_from` object contains information about the originally requested track. */
              readonly linked_from?: components["schemas"]["LinkedTrackObject"];
              /** @description The name of the track. */
              readonly name?: string;
              /** @description The popularity of the track. The value will be between 0 and 100, with 100 being the most popular.<br/>The popularity of a track is a value between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are.<br/>Generally speaking, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past. Duplicate tracks (e.g. the same track from a single and an album) are rated independently. Artist and album popularity is derived mathematically from track popularity. _**Note**: the popularity value may lag actual popularity by a few days: the value is not updated in real time._ */
              readonly popularity?: number;
              /** @description A link to a 30 second preview (MP3 format) of the track. Can be `null` */
              readonly preview_url?: string;
              /** @description Included in the response when a content restriction is applied. */
              readonly restrictions?: components["schemas"]["TrackRestrictionObject"];
              /** @description The number of the track. If an album has several discs, the track number is the number on the specified disc. */
              readonly track_number?: number;
              /**
               * @description The object type: "track".
               *
               * @enum {string}
               */
              readonly type?: "track";
              /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track. */
              readonly uri?: string;
              [key: string]: unknown;
            }[];
          [key: string]: unknown;
        };
      };
    };
    /** @description A markets object with an array of country codes */
    readonly Markets: {
      content: {
        readonly "application/json": {
          /**
           * @example [
           *   "CA",
           *   "BR",
           *   "IT"
           * ]
           */
          readonly markets?: readonly string[];
          [key: string]: unknown;
        };
      };
    };
    /** @description The requested resource cannot be found. */
    readonly NotFound: {
      content: {
        readonly "application/json": {
          readonly error: components["schemas"]["ErrorObject"];
          [key: string]: unknown;
        };
      };
    };
    /** @description An album */
    readonly OneAlbum: {
      content: {
        readonly "application/json": components["schemas"]["AlbumObject"];
      };
    };
    /** @description An artist */
    readonly OneArtist: {
      content: {
        readonly "application/json": components["schemas"]["ArtistObject"];
      };
    };
    /** @description Audio analysis for one track */
    readonly OneAudioAnalysis: {
      content: {
        readonly "application/json": {
          /** @description The time intervals of the bars throughout the track. A bar (or measure) is a segment of time defined as a given number of beats. */
          readonly bars?: readonly {
              /**
               * @description The confidence, from 0.0 to 1.0, of the reliability of the interval.
               * @example 0.925
               */
              readonly confidence?: number;
              /**
               * @description The duration (in seconds) of the time interval.
               * @example 2.18749
               */
              readonly duration?: number;
              /**
               * @description The starting point (in seconds) of the time interval.
               * @example 0.49567
               */
              readonly start?: number;
              [key: string]: unknown;
            }[];
          /** @description The time intervals of beats throughout the track. A beat is the basic time unit of a piece of music; for example, each tick of a metronome. Beats are typically multiples of tatums. */
          readonly beats?: readonly components["schemas"]["TimeIntervalObject"][];
          readonly meta?: {
            /**
             * @description The amount of time taken to analyze this track.
             * @example 6.93906
             */
            readonly analysis_time?: number;
            /**
             * @description The version of the Analyzer used to analyze this track.
             * @example 4.0.0
             */
            readonly analyzer_version?: string;
            /**
             * @description A detailed status code for this track. If analysis data is missing, this code may explain why.
             * @example OK
             */
            readonly detailed_status?: string;
            /**
             * @description The method used to read the track's audio data.
             * @example libvorbisfile L+R 44100->22050
             */
            readonly input_process?: string;
            /**
             * @description The platform used to read the track's audio data.
             * @example Linux
             */
            readonly platform?: string;
            /**
             * @description The return code of the analyzer process. 0 if successful, 1 if any errors occurred.
             * @example 0
             */
            readonly status_code?: number;
            /**
             * @description The Unix timestamp (in seconds) at which this track was analyzed.
             * @example 1495193577
             */
            readonly timestamp?: number;
            [key: string]: unknown;
          };
          /** @description Sections are defined by large variations in rhythm or timbre, e.g. chorus, verse, bridge, guitar solo, etc. Each section contains its own descriptions of tempo, key, mode, time_signature, and loudness. */
          readonly sections?: readonly ({
              /**
               * @description The confidence, from 0.0 to 1.0, of the reliability of the section's "designation".
               * @example 1
               */
              readonly confidence?: number;
              /**
               * @description The duration (in seconds) of the section.
               * @example 6.97092
               */
              readonly duration?: number;
              /**
               * @description The estimated overall key of the section. The values in this field ranging from 0 to 11 mapping to pitches using standard Pitch Class notation (E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on). If no key was detected, the value is -1.
               * @example 9
               */
              readonly key?: number;
              /**
               * @description The confidence, from 0.0 to 1.0, of the reliability of the key. Songs with many key changes may correspond to low values in this field.
               * @example 0.297
               */
              readonly key_confidence?: number;
              /**
               * @description The overall loudness of the section in decibels (dB). Loudness values are useful for comparing relative loudness of sections within tracks.
               * @example -14.938
               */
              readonly loudness?: number;
              /**
               * @description Indicates the modality (major or minor) of a section, the type of scale from which its melodic content is derived. This field will contain a 0 for "minor", a 1 for "major", or a -1 for no result. Note that the major key (e.g. C major) could more likely be confused with the minor key at 3 semitones lower (e.g. A minor) as both keys carry the same pitches.
               * @enum {number}
               */
              readonly mode?: -1 | 0 | 1;
              /**
               * @description The confidence, from 0.0 to 1.0, of the reliability of the `mode`.
               * @example 0.471
               */
              readonly mode_confidence?: number;
              /**
               * @description The starting point (in seconds) of the section.
               * @example 0
               */
              readonly start?: number;
              /**
               * @description The overall estimated tempo of the section in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.
               * @example 113.178
               */
              readonly tempo?: number;
              /**
               * @description The confidence, from 0.0 to 1.0, of the reliability of the tempo. Some tracks contain tempo changes or sounds which don't contain tempo (like pure speech) which would correspond to a low value in this field.
               * @example 0.647
               */
              readonly tempo_confidence?: number;
              /**
               * @description An estimated time signature. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure). The time signature ranges from 3 to 7 indicating time signatures of "3/4", to "7/4".
               * @example 4
               */
              readonly time_signature?: number;
              /**
               * @description The confidence, from 0.0 to 1.0, of the reliability of the `time_signature`. Sections with time signature changes may correspond to low values in this field.
               * @example 1
               */
              readonly time_signature_confidence?: number;
              [key: string]: unknown;
            })[];
          /** @description Each segment contains a roughly conisistent sound throughout its duration. */
          readonly segments?: readonly {
              /**
               * @description The confidence, from 0.0 to 1.0, of the reliability of the segmentation. Segments of the song which are difficult to logically segment (e.g: noise) may correspond to low values in this field.
               *
               * @example 0.435
               */
              readonly confidence?: number;
              /**
               * @description The duration (in seconds) of the segment.
               * @example 0.19891
               */
              readonly duration?: number;
              /**
               * @description The offset loudness of the segment in decibels (dB). This value should be equivalent to the loudness_start of the following segment.
               * @example 0
               */
              readonly loudness_end?: number;
              /**
               * @description The peak loudness of the segment in decibels (dB). Combined with `loudness_start` and `loudness_max_time`, these components can be used to describe the "attack" of the segment.
               * @example -14.25
               */
              readonly loudness_max?: number;
              /**
               * @description The segment-relative offset of the segment peak loudness in seconds. Combined with `loudness_start` and `loudness_max`, these components can be used to desctibe the "attack" of the segment.
               * @example 0.07305
               */
              readonly loudness_max_time?: number;
              /**
               * @description The onset loudness of the segment in decibels (dB). Combined with `loudness_max` and `loudness_max_time`, these components can be used to describe the "attack" of the segment.
               * @example -23.053
               */
              readonly loudness_start?: number;
              /**
               * @description Pitch content is given by a “chroma” vector, corresponding to the 12 pitch classes C, C#, D to B, with values ranging from 0 to 1 that describe the relative dominance of every pitch in the chromatic scale. For example a C Major chord would likely be represented by large values of C, E and G (i.e. classes 0, 4, and 7).
               *
               * Vectors are normalized to 1 by their strongest dimension, therefore noisy sounds are likely represented by values that are all close to 1, while pure tones are described by one value at 1 (the pitch) and others near 0.
               * As can be seen below, the 12 vector indices are a combination of low-power spectrum values at their respective pitch frequencies.
               * ![pitch vector](https://developer.spotify.com/assets/audio/Pitch_vector.png)
               *
               * @example [
               *   0.212,
               *   0.141,
               *   0.294
               * ]
               */
              readonly pitches?: readonly number[];
              /**
               * @description The starting point (in seconds) of the segment.
               * @example 0.70154
               */
              readonly start?: number;
              /**
               * @description Timbre is the quality of a musical note or sound that distinguishes different types of musical instruments, or voices. It is a complex notion also referred to as sound color, texture, or tone quality, and is derived from the shape of a segment’s spectro-temporal surface, independently of pitch and loudness. The timbre feature is a vector that includes 12 unbounded values roughly centered around 0. Those values are high level abstractions of the spectral surface, ordered by degree of importance.
               *
               * For completeness however, the first dimension represents the average loudness of the segment; second emphasizes brightness; third is more closely correlated to the flatness of a sound; fourth to sounds with a stronger attack; etc. See an image below representing the 12 basis functions (i.e. template segments).
               * ![timbre basis functions](https://developer.spotify.com/assets/audio/Timbre_basis_functions.png)
               *
               * The actual timbre of the segment is best described as a linear combination of these 12 basis functions weighted by the coefficient values: timbre = c1 x b1 + c2 x b2 + ... + c12 x b12, where c1 to c12 represent the 12 coefficients and b1 to b12 the 12 basis functions as displayed below. Timbre vectors are best used in comparison with each other.
               *
               * @example [
               *   42.115,
               *   64.373,
               *   -0.233
               * ]
               */
              readonly timbre?: readonly number[];
              [key: string]: unknown;
            }[];
          /** @description A tatum represents the lowest regular pulse train that a listener intuitively infers from the timing of perceived musical events (segments). */
          readonly tatums?: readonly components["schemas"]["TimeIntervalObject"][];
          readonly track?: {
            /**
             * @description The number of channels used for analysis. If 1, all channels are summed together to mono before analysis.
             * @example 1
             */
            readonly analysis_channels?: number;
            /**
             * @description The sample rate used to decode and analyze this track. May differ from the actual sample rate of this track available on Spotify.
             * @example 22050
             */
            readonly analysis_sample_rate?: number;
            /**
             * @description A version number for the Echo Nest Musical Fingerprint format used in the codestring field.
             * @example 3.15
             */
            readonly code_version?: number;
            /** @description An [Echo Nest Musical Fingerprint (ENMFP)](https://academiccommons.columbia.edu/doi/10.7916/D8Q248M4) codestring for this track. */
            readonly codestring?: string;
            /**
             * @description Length of the track in seconds.
             * @example 207.95985
             */
            readonly duration?: number;
            /**
             * @description A version number for the EchoPrint format used in the echoprintstring field.
             * @example 4.15
             */
            readonly echoprint_version?: number;
            /** @description An [EchoPrint](https://github.com/spotify/echoprint-codegen) codestring for this track. */
            readonly echoprintstring?: string;
            /**
             * @description The time, in seconds, at which the track's fade-in period ends. If the track has no fade-in, this will be 0.0.
             * @example 0
             */
            readonly end_of_fade_in?: number;
            /**
             * @description The key the track is in. Integers map to pitches using standard [Pitch Class notation](https://en.wikipedia.org/wiki/Pitch_class). E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on. If no key was detected, the value is -1.
             *
             * @example 9
             */
            readonly key?: number;
            /**
             * @description The confidence, from 0.0 to 1.0, of the reliability of the `key`.
             * @example 0.408
             */
            readonly key_confidence?: number;
            /**
             * Format: float
             * @description The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db.
             *
             * @example -5.883
             */
            readonly loudness?: number;
            /**
             * @description Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0.
             *
             * @example 0
             */
            readonly mode?: number;
            /**
             * @description The confidence, from 0.0 to 1.0, of the reliability of the `mode`.
             * @example 0.485
             */
            readonly mode_confidence?: number;
            /**
             * @description The exact number of audio samples analyzed from this track. See also `analysis_sample_rate`.
             * @example 4585515
             */
            readonly num_samples?: number;
            /**
             * @description An offset to the start of the region of the track that was analyzed. (As the entire track is analyzed, this should always be 0.)
             * @example 0
             */
            readonly offset_seconds?: number;
            /**
             * @description A version number for the Rhythmstring used in the rhythmstring field.
             * @example 1
             */
            readonly rhythm_version?: number;
            /** @description A Rhythmstring for this track. The format of this string is similar to the Synchstring. */
            readonly rhythmstring?: string;
            /** @description This field will always contain the empty string. */
            readonly sample_md5?: string;
            /**
             * @description The time, in seconds, at which the track's fade-out period starts. If the track has no fade-out, this should match the track's length.
             * @example 201.13705
             */
            readonly start_of_fade_out?: number;
            /**
             * @description A version number for the Synchstring used in the synchstring field.
             * @example 1
             */
            readonly synch_version?: number;
            /** @description A [Synchstring](https://github.com/echonest/synchdata) for this track. */
            readonly synchstring?: string;
            /**
             * Format: float
             * @description The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.
             *
             * @example 118.211
             */
            readonly tempo?: number;
            /**
             * @description The confidence, from 0.0 to 1.0, of the reliability of the `tempo`.
             * @example 0.73
             */
            readonly tempo_confidence?: number;
            readonly time_signature?: components["schemas"]["TimeSignature"];
            /**
             * @description The confidence, from 0.0 to 1.0, of the reliability of the `time_signature`.
             * @example 0.994
             */
            readonly time_signature_confidence?: number;
            /**
             * @description The length of the region of the track was analyzed, if a subset of the track was analyzed. (As the entire track is analyzed, this should always be 0.)
             * @example 0
             */
            readonly window_seconds?: number;
            [key: string]: unknown;
          };
          [key: string]: unknown;
        };
      };
    };
    /** @description Audio features for one track */
    readonly OneAudioFeatures: {
      content: {
        readonly "application/json": components["schemas"]["AudioFeaturesObject"];
      };
    };
    /** @description An Audiobook */
    readonly OneAudiobook: {
      content: {
        readonly "application/json": components["schemas"]["AudiobookObject"];
      };
    };
    /** @description A category */
    readonly OneCategory: {
      content: {
        readonly "application/json": components["schemas"]["CategoryObject"];
      };
    };
    /** @description A Chapter */
    readonly OneChapter: {
      content: {
        readonly "application/json": components["schemas"]["ChapterObject"];
      };
    };
    /** @description Information about playback */
    readonly OneCurrentlyPlaying: {
      content: {
        readonly "application/json": {
          /** @description Allows to update the user interface based on which playback actions are available within the current context. */
          readonly actions?: {
            /** @description Interrupting playback. Optional field. */
            readonly interrupting_playback?: boolean;
            /** @description Pausing. Optional field. */
            readonly pausing?: boolean;
            /** @description Resuming. Optional field. */
            readonly resuming?: boolean;
            /** @description Seeking playback location. Optional field. */
            readonly seeking?: boolean;
            /** @description Skipping to the next context. Optional field. */
            readonly skipping_next?: boolean;
            /** @description Skipping to the previous context. Optional field. */
            readonly skipping_prev?: boolean;
            /** @description Toggling repeat context flag. Optional field. */
            readonly toggling_repeat_context?: boolean;
            /** @description Toggling repeat track flag. Optional field. */
            readonly toggling_repeat_track?: boolean;
            /** @description Toggling shuffle flag. Optional field. */
            readonly toggling_shuffle?: boolean;
            /** @description Transfering playback between devices. Optional field. */
            readonly transferring_playback?: boolean;
            [key: string]: unknown;
          };
          /** @description A Context Object. Can be `null`. */
          readonly context?: {
            /** @description External URLs for this context. */
            readonly external_urls?: components["schemas"]["ExternalUrlObject"];
            /** @description A link to the Web API endpoint providing full details of the track. */
            readonly href?: string;
            /** @description The object type, e.g. "artist", "playlist", "album", "show". */
            readonly type?: string;
            /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the context. */
            readonly uri?: string;
            [key: string]: unknown;
          };
          /** @description The object type of the currently playing item. Can be one of `track`, `episode`, `ad` or `unknown`. */
          readonly currently_playing_type?: string;
          /** @description The device that is currently active. */
          readonly device?: {
            /** @description The device ID. */
            readonly id?: string | null;
            /** @description If this device is the currently active device. */
            readonly is_active?: boolean;
            /** @description If this device is currently in a private session. */
            readonly is_private_session?: boolean;
            /** @description Whether controlling this device is restricted. At present if this is "true" then no Web API commands will be accepted by this device. */
            readonly is_restricted?: boolean;
            /**
             * @description A human-readable name for the device. Some devices have a name that the user can configure (e.g. \"Loudest speaker\") and some devices have a generic name associated with the manufacturer or device model.
             * @example Kitchen speaker
             */
            readonly name?: string;
            /**
             * @description Device type, such as "computer", "smartphone" or "speaker".
             * @example computer
             */
            readonly type?: string;
            /**
             * @description The current volume in percent.
             * @example 59
             */
            readonly volume_percent?: number | null;
            [key: string]: unknown;
          };
          /** @description If something is currently playing, return `true`. */
          readonly is_playing?: boolean;
          /** @description The currently playing track or episode. Can be `null`. */
          readonly item?: components["schemas"]["TrackObject"] | components["schemas"]["EpisodeObject"];
          /** @description Progress into the currently playing track or episode. Can be `null`. */
          readonly progress_ms?: number;
          /** @description off, track, context */
          readonly repeat_state?: string;
          /** @description If shuffle is on or off. */
          readonly shuffle_state?: boolean;
          /** @description Unix Millisecond Timestamp when data was fetched. */
          readonly timestamp?: number;
          [key: string]: unknown;
        };
      };
    };
    /** @description Information about the currently playing track */
    readonly OneCurrentlyPlayingTrack: {
      content: {
        readonly "application/json": {
          /** @description A Context Object. Can be `null`. */
          readonly context?: components["schemas"]["ContextObject"];
          /** @description The object type of the currently playing item. Can be one of `track`, `episode`, `ad` or `unknown`. */
          readonly currently_playing_type?: string;
          /** @description If something is currently playing, return `true`. */
          readonly is_playing?: boolean;
          /** @description The currently playing track or episode. Can be `null`. */
          readonly item?: components["schemas"]["TrackObject"] | components["schemas"]["EpisodeObject"];
          /** @description Progress into the currently playing track or episode. Can be `null`. */
          readonly progress_ms?: number;
          /** @description Unix Millisecond Timestamp when data was fetched */
          readonly timestamp?: number;
          [key: string]: unknown;
        };
      };
    };
    /** @description An episode */
    readonly OneEpisode: {
      content: {
        readonly "application/json": components["schemas"]["EpisodeObject"];
      };
    };
    /** @description A playlist */
    readonly OnePlaylist: {
      content: {
        readonly "application/json": {
          /** @description `true` if the owner allows other users to modify the playlist. */
          readonly collaborative?: boolean;
          /** @description The playlist description. _Only returned for modified, verified playlists, otherwise_ `null`. */
          readonly description?: string | null;
          /** @description Known external URLs for this playlist. */
          readonly external_urls?: components["schemas"]["ExternalUrlObject"];
          /** @description Information about the followers of the playlist. */
          readonly followers?: components["schemas"]["FollowersObject"];
          /** @description A link to the Web API endpoint providing full details of the playlist. */
          readonly href?: string;
          /** @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the playlist. */
          readonly id?: string;
          /** @description Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order. See [Working with Playlists](/documentation/web-api/concepts/playlists). _**Note**: If returned, the source URL for the image (`url`) is temporary and will expire in less than a day._ */
          readonly images?: readonly components["schemas"]["ImageObject"][];
          /** @description The name of the playlist. */
          readonly name?: string;
          /** @description The user who owns the playlist */
          readonly owner?: components["schemas"]["PlaylistOwnerObject"];
          /** @description The playlist's public/private status: `true` the playlist is public, `false` the playlist is private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists) */
          readonly public?: boolean;
          /** @description The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version */
          readonly snapshot_id?: string;
          /** @description The tracks of the playlist. */
          readonly tracks?: {
            [key: string]: unknown;
          } & ({
            [key: string]: unknown;
          } & components["schemas"]["PagingObject"] & ({
            readonly items?: readonly ({
                /**
                 * Format: date-time
                 * @description The date and time the track or episode was added. _**Note**: some very old playlists may return `null` in this field._
                 */
                readonly added_at?: string;
                /** @description The Spotify user who added the track or episode. _**Note**: some very old playlists may return `null` in this field._ */
                readonly added_by?: components["schemas"]["PlaylistUserObject"];
                /** @description Whether this track or episode is a [local file](/documentation/web-api/concepts/playlists/#local-files) or not. */
                readonly is_local?: boolean;
                /** @description Information about the track or episode. */
                readonly track?: components["schemas"]["TrackObject"] | components["schemas"]["EpisodeObject"];
                [key: string]: unknown;
              })[];
            [key: string]: unknown;
          }));
          /** @description The object type: "playlist" */
          readonly type?: string;
          /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the playlist. */
          readonly uri?: string;
          [key: string]: unknown;
        };
      };
    };
    /** @description A user */
    readonly OnePrivateUser: {
      content: {
        readonly "application/json": {
          /** @description The country of the user, as set in the user's account profile. An [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). _This field is only available when the current user has granted access to the [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._ */
          readonly country?: string;
          /** @description The name displayed on the user's profile. `null` if not available. */
          readonly display_name?: string;
          /** @description The user's email address, as entered by the user when creating their account. _**Important!** This email address is unverified; there is no proof that it actually belongs to the user._ _This field is only available when the current user has granted access to the [user-read-email](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._ */
          readonly email?: string;
          /** @description The user's explicit content settings. _This field is only available when the current user has granted access to the [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._ */
          readonly explicit_content?: {
            /** @description When `true`, indicates that explicit content should not be played. */
            readonly filter_enabled?: boolean;
            /** @description When `true`, indicates that the explicit content setting is locked and can't be changed by the user. */
            readonly filter_locked?: boolean;
            [key: string]: unknown;
          };
          /** @description Known external URLs for this user. */
          readonly external_urls?: components["schemas"]["ExternalUrlObject"];
          /** @description Information about the followers of the user. */
          readonly followers?: components["schemas"]["FollowersObject"];
          /** @description A link to the Web API endpoint for this user. */
          readonly href?: string;
          /** @description The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for the user. */
          readonly id?: string;
          /** @description The user's profile image. */
          readonly images?: readonly components["schemas"]["ImageObject"][];
          /** @description The user's Spotify subscription level: "premium", "free", etc. (The subscription level "open" can be considered the same as "free".) _This field is only available when the current user has granted access to the [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._ */
          readonly product?: string;
          /** @description The object type: "user" */
          readonly type?: string;
          /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the user. */
          readonly uri?: string;
          [key: string]: unknown;
        };
      };
    };
    /** @description A user */
    readonly OnePublicUser: {
      content: {
        readonly "application/json": {
          /** @description The name displayed on the user's profile. `null` if not available. */
          readonly display_name?: string | null;
          /** @description Known public external URLs for this user. */
          readonly external_urls?: components["schemas"]["ExternalUrlObject"];
          /** @description Information about the followers of this user. */
          readonly followers?: components["schemas"]["FollowersObject"];
          /** @description A link to the Web API endpoint for this user. */
          readonly href?: string;
          /** @description The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for this user. */
          readonly id?: string;
          /** @description The user's profile image. */
          readonly images?: readonly components["schemas"]["ImageObject"][];
          /**
           * @description The object type.
           *
           * @enum {string}
           */
          readonly type?: "user";
          /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for this user. */
          readonly uri?: string;
          [key: string]: unknown;
        };
      };
    };
    /** @description A set of recommendations */
    readonly OneRecommendations: {
      content: {
        readonly "application/json": {
          /** @description An array of recommendation seed objects. */
          readonly seeds: readonly {
              /** @description The number of tracks available after min\_\* and max\_\* filters have been applied. */
              readonly afterFilteringSize?: number;
              /** @description The number of tracks available after relinking for regional availability. */
              readonly afterRelinkingSize?: number;
              /** @description A link to the full track or artist data for this seed. For tracks this will be a link to a Track Object. For artists a link to an Artist Object. For genre seeds, this value will be `null`. */
              readonly href?: string;
              /** @description The id used to select this seed. This will be the same as the string used in the `seed_artists`, `seed_tracks` or `seed_genres` parameter. */
              readonly id?: string;
              /** @description The number of recommended tracks available for this seed. */
              readonly initialPoolSize?: number;
              /** @description The entity type of this seed. One of `artist`, `track` or `genre`. */
              readonly type?: string;
              [key: string]: unknown;
            }[];
          /** @description An array of track objects ordered according to the parameters supplied. */
          readonly tracks: readonly components["schemas"]["TrackObject"][];
          [key: string]: unknown;
        };
      };
    };
    /** @description A show */
    readonly OneShow: {
      content: {
        readonly "application/json": components["schemas"]["ShowBase"] & ({
          /** @description The episodes of the show. */
          readonly episodes: {
            [key: string]: unknown;
          } & components["schemas"]["PagingSimplifiedEpisodeObject"];
          [key: string]: unknown;
        });
      };
    };
    /** @description A track */
    readonly OneTrack: {
      content: {
        readonly "application/json": components["schemas"]["TrackObject"];
      };
    };
    /** @description A paged set of albums */
    readonly PagedAlbums: {
      content: {
        readonly "application/json": {
          readonly albums: components["schemas"]["PagingSimplifiedAlbumObject"];
          [key: string]: unknown;
        };
      };
    };
    /** @description A paged set of categories */
    readonly PagedCategories: {
      content: {
        readonly "application/json": {
          readonly categories: components["schemas"]["PagingObject"] & {
            readonly items?: readonly {
                /** @description A link to the Web API endpoint returning full details of the category. */
                readonly href: string;
                /** @description The category icon, in various sizes. */
                readonly icons: readonly components["schemas"]["ImageObject"][];
                /**
                 * @description The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) of the category.
                 *
                 * @example equal
                 */
                readonly id: string;
                /**
                 * @description The name of the category.
                 *
                 * @example EQUAL
                 */
                readonly name: string;
                [key: string]: unknown;
              }[];
            [key: string]: unknown;
          };
          [key: string]: unknown;
        };
      };
    };
    /** @description A paged set of playlists */
    readonly PagedFeaturedPlaylists: {
      content: {
        readonly "application/json": {
          readonly message?: string;
          readonly playlists?: {
            [key: string]: unknown;
          } & components["schemas"]["PagingObject"] & ({
            readonly items?: readonly ({
                /** @description `true` if the owner allows other users to modify the playlist. */
                readonly collaborative?: boolean;
                /** @description The playlist description. _Only returned for modified, verified playlists, otherwise_ `null`. */
                readonly description?: string;
                /** @description Known external URLs for this playlist. */
                readonly external_urls?: components["schemas"]["ExternalUrlObject"];
                /** @description A link to the Web API endpoint providing full details of the playlist. */
                readonly href?: string;
                /** @description The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the playlist. */
                readonly id?: string;
                /** @description Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order. See [Working with Playlists](/documentation/web-api/concepts/playlists). _**Note**: If returned, the source URL for the image (`url`) is temporary and will expire in less than a day._ */
                readonly images?: readonly components["schemas"]["ImageObject"][];
                /** @description The name of the playlist. */
                readonly name?: string;
                /** @description The user who owns the playlist */
                readonly owner?: {
                  /** @description Known public external URLs for this user. */
                  readonly external_urls?: components["schemas"]["ExternalUrlObject"];
                  /** @description Information about the followers of this user. */
                  readonly followers?: components["schemas"]["FollowersObject"];
                  /** @description A link to the Web API endpoint for this user. */
                  readonly href?: string;
                  /** @description The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for this user. */
                  readonly id?: string;
                  /**
                   * @description The object type.
                   *
                   * @enum {string}
                   */
                  readonly type?: "user";
                  /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for this user. */
                  readonly uri?: string;
                  [key: string]: unknown;
                } & ({
                  /** @description The name displayed on the user's profile. `null` if not available. */
                  readonly display_name?: string | null;
                  [key: string]: unknown;
                });
                /** @description The playlist's public/private status: `true` the playlist is public, `false` the playlist is private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists) */
                readonly public?: boolean;
                /** @description The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version */
                readonly snapshot_id?: string;
                /** @description A collection containing a link ( `href` ) to the Web API endpoint where full details of the playlist's tracks can be retrieved, along with the `total` number of tracks in the playlist. Note, a track object may be `null`. This can happen if a track is no longer available. */
                readonly tracks?: {
                  /** @description A link to the Web API endpoint where full details of the playlist's tracks can be retrieved. */
                  readonly href?: string;
                  /** @description Number of tracks in the playlist. */
                  readonly total?: number;
                  [key: string]: unknown;
                };
                /** @description The object type: "playlist" */
                readonly type?: string;
                /** @description The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the playlist. */
                readonly uri?: string;
                [key: string]: unknown;
              })[];
            [key: string]: unknown;
          });
          [key: string]: unknown;
        };
      };
    };
    /** @description A paged set of playlists */
    readonly PagedPlaylists: {
      content: {
        readonly "application/json": components["schemas"]["PagingPlaylistObject"];
      };
    };
    /** @description Pages of artists */
    readonly PagingArtistObject: {
      content: {
        readonly "application/json": {
          [key: string]: unknown;
        } & components["schemas"]["PagingObject"] & {
          readonly items?: readonly components["schemas"]["ArtistObject"][];
          [key: string]: unknown;
        };
      };
    };
    /** @description Pages of tracks */
    readonly PagingPlaylistTrackObject: {
      content: {
        readonly "application/json": components["schemas"]["PagingPlaylistTrackObject"];
      };
    };
    /** @description Pages of albums */
    readonly PagingSavedAlbumObject: {
      content: {
        readonly "application/json": {
          [key: string]: unknown;
        } & components["schemas"]["PagingObject"] & {
          readonly items?: readonly {
              /**
               * Format: date-time
               * @description The date and time the album was saved
               * Timestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.
               * If the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.
               */
              readonly added_at?: string;
              /** @description Information about the album. */
              readonly album?: components["schemas"]["AlbumObject"];
              [key: string]: unknown;
            }[];
          [key: string]: unknown;
        };
      };
    };
    /** @description Pages of saved audiobooks */
    readonly PagingSavedAudiobookObject: {
      content: {
        readonly "application/json": {
          [key: string]: unknown;
        } & components["schemas"]["PagingObject"] & {
          readonly items?: readonly {
              /**
               * Format: date-time
               * @description The date and time the audiobook was saved
               * Timestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.
               * If the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.
               */
              readonly added_at?: string;
              /** @description Information about the audiobook. */
              readonly audiobook?: components["schemas"]["AudiobookObject"];
              [key: string]: unknown;
            }[];
          [key: string]: unknown;
        };
      };
    };
    /** @description Pages of episodes */
    readonly PagingSavedEpisodeObject: {
      content: {
        readonly "application/json": {
          [key: string]: unknown;
        } & components["schemas"]["PagingObject"] & {
          readonly items?: readonly {
              /**
               * Format: date-time
               * @description The date and time the episode was saved.
               * Timestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.
               */
              readonly added_at?: string;
              /** @description Information about the episode. */
              readonly episode?: components["schemas"]["EpisodeObject"];
              [key: string]: unknown;
            }[];
          [key: string]: unknown;
        };
      };
    };
    /** @description Pages of shows */
    readonly PagingSavedShowObject: {
      content: {
        readonly "application/json": {
          [key: string]: unknown;
        } & components["schemas"]["PagingObject"] & {
          readonly items?: readonly {
              /**
               * Format: date-time
               * @description The date and time the show was saved.
               * Timestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.
               * If the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.
               */
              readonly added_at?: string;
              /** @description Information about the show. */
              readonly show?: components["schemas"]["SimplifiedShowObject"];
              [key: string]: unknown;
            }[];
          [key: string]: unknown;
        };
      };
    };
    /** @description Pages of tracks */
    readonly PagingSavedTrackObject: {
      content: {
        readonly "application/json": {
          [key: string]: unknown;
        } & components["schemas"]["PagingObject"] & {
          readonly items?: readonly {
              /**
               * Format: date-time
               * @description The date and time the track was saved.
               * Timestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.
               * If the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.
               */
              readonly added_at?: string;
              /** @description Information about the track. */
              readonly track?: components["schemas"]["TrackObject"];
              [key: string]: unknown;
            }[];
          [key: string]: unknown;
        };
      };
    };
    /** @description Pages of albums */
    readonly PagingSimplifiedAlbumObject: {
      content: {
        readonly "application/json": {
          [key: string]: unknown;
        } & components["schemas"]["PagingObject"] & ({
          readonly items?: readonly (components["schemas"]["AlbumBase"] & ({
              /**
               * @description The field is present when getting an artist's albums. Compare to album_type this field represents relationship between the artist and the album.
               *
               * @example compilation
               * @enum {string}
               */
              readonly album_group?: "album" | "single" | "compilation" | "appears_on";
              /** @description The artists of the album. Each artist object includes a link in `href` to more detailed information about the artist. */
              readonly artists: readonly components["schemas"]["SimplifiedArtistObject"][];
              [key: string]: unknown;
            }))[];
          [key: string]: unknown;
        });
      };
    };
    /** @description Pages of artists */
    readonly PagingSimplifiedArtistObject: {
      content: {
        readonly "application/json": components["schemas"]["PagingSimplifiedArtistObject"];
      };
    };
    /** @description Pages of audiobooks */
    readonly PagingSimplifiedAudiobookObject: {
      content: {
        readonly "application/json": components["schemas"]["PagingSimplifiedAudiobookObject"];
      };
    };
    /** @description Pages of chapters */
    readonly PagingSimplifiedChapterObject: {
      content: {
        readonly "application/json": components["schemas"]["PagingSimplifiedChapterObject"];
      };
    };
    /** @description Pages of episodes */
    readonly PagingSimplifiedEpisodeObject: {
      content: {
        readonly "application/json": components["schemas"]["PagingSimplifiedEpisodeObject"];
      };
    };
    /** @description Pages of shows */
    readonly PagingSimplifiedShowObject: {
      content: {
        readonly "application/json": components["schemas"]["PagingSimplifiedShowObject"];
      };
    };
    /** @description Pages of tracks */
    readonly PagingSimplifiedTrackObject: {
      content: {
        readonly "application/json": components["schemas"]["PagingSimplifiedTrackObject"];
      };
    };
    /** @description Pages of tracks */
    readonly PagingTrackObject: {
      content: {
        readonly "application/json": {
          [key: string]: unknown;
        } & components["schemas"]["PagingObject"] & {
          readonly items?: readonly components["schemas"]["TrackObject"][];
          [key: string]: unknown;
        };
      };
    };
    /** @description A snapshot ID for the playlist */
    readonly PlaylistSnapshotId: {
      content: {
        readonly "application/json": {
          /** @example abc */
          readonly snapshot_id?: string;
          [key: string]: unknown;
        };
      };
    };
    /** @description Information about the queue */
    readonly Queue: {
      content: {
        readonly "application/json": {
          /** @description The currently playing track or episode. Can be `null`. */
          readonly currently_playing?: components["schemas"]["TrackObject"] | components["schemas"]["EpisodeObject"];
          /** @description The tracks or episodes in the queue. Can be empty. */
          readonly queue?: readonly (components["schemas"]["TrackObject"] | components["schemas"]["EpisodeObject"])[];
          [key: string]: unknown;
        };
      };
    };
    /** @description Search response */
    readonly SearchItems: {
      content: {
        readonly "application/json": {
          readonly albums?: components["schemas"]["PagingSimplifiedAlbumObject"];
          readonly artists?: components["schemas"]["PagingArtistObject"];
          readonly audiobooks?: {
            [key: string]: unknown;
          } & components["schemas"]["PagingObject"] & {
            readonly items?: readonly components["schemas"]["SimplifiedAudiobookObject"][];
            [key: string]: unknown;
          };
          readonly episodes?: {
            [key: string]: unknown;
          } & components["schemas"]["PagingObject"] & ({
            readonly items?: readonly ({
                [key: string]: unknown;
              } & components["schemas"]["EpisodeBase"])[];
            [key: string]: unknown;
          });
          readonly playlists?: components["schemas"]["PagingPlaylistObject"];
          readonly shows?: {
            [key: string]: unknown;
          } & components["schemas"]["PagingObject"] & {
            readonly items?: readonly components["schemas"]["SimplifiedShowObject"][];
            [key: string]: unknown;
          };
          readonly tracks?: components["schemas"]["PagingTrackObject"];
          [key: string]: unknown;
        };
      };
    };
    /** @description The app has exceeded its rate limits. */
    readonly TooManyRequests: {
      content: {
        readonly "application/json": {
          readonly error: components["schemas"]["ErrorObject"];
          [key: string]: unknown;
        };
      };
    };
    /**
     * @description Bad or expired token. This can happen if the user revoked a token or
     * the access token has expired. You should re-authenticate the user.
     */
    readonly Unauthorized: {
      content: {
        readonly "application/json": {
          readonly error: {
            /** @description A short description of the cause of the error. */
            readonly message: string;
            /** @description The HTTP status code (also returned in the response header; see [Response Status Codes](/documentation/web-api/concepts/api-calls#response-status-codes) for more information). */
            readonly status: number;
            [key: string]: unknown;
          };
          [key: string]: unknown;
        };
      };
    };
  };
  parameters: {
    readonly PathAlbumId: string;
    readonly PathArtistId: string;
    readonly PathAudiobookId: string;
    readonly PathChapterId: string;
    readonly PathPlaylistId: string;
    readonly PathShowId: string;
    readonly PathUserId: string;
    readonly QueryAdditionalTypes?: string;
    readonly QueryAlbumIds: string;
    readonly QueryAudiobookIds: string;
    readonly QueryChapterIds: string;
    readonly QueryIncludeGroups?: string;
    readonly QueryLimit?: number;
    readonly QueryMarket?: string;
    readonly QueryOffset?: number;
    readonly QueryShowIds: string;
    readonly QueryTrackIds: string;
  };
  requestBodies: never;
  headers: never;
  pathItems: never;
}

type $defs = Record<string, never>;

type external = Record<string, never>;

interface operations {

  /**
   * Get Several Albums
   *
   * @description Get Spotify catalog information for multiple albums identified by their Spotify IDs.
   */
  "get-multiple-albums": {
    parameters: {
      query: {
        ids: components["parameters"]["QueryAlbumIds"];
        market?: components["parameters"]["QueryMarket"];
      };
    };
    responses: {
      200: components["responses"]["ManyAlbums"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Album
   *
   * @description Get Spotify catalog information for a single album.
   */
  "get-an-album": {
    parameters: {
      query?: {
        market?: components["parameters"]["QueryMarket"];
      };
      path: {
        id: components["parameters"]["PathAlbumId"];
      };
    };
    responses: {
      200: components["responses"]["OneAlbum"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Album Tracks
   *
   * @description Get Spotify catalog information about an album’s tracks.
   * Optional parameters can be used to limit the number of tracks returned.
   */
  "get-an-albums-tracks": {
    parameters: {
      query?: {
        market?: components["parameters"]["QueryMarket"];
        limit?: components["parameters"]["QueryLimit"];
        offset?: components["parameters"]["QueryOffset"];
      };
      path: {
        id: components["parameters"]["PathAlbumId"];
      };
    };
    responses: {
      200: components["responses"]["PagingSimplifiedTrackObject"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Several Artists
   *
   * @description Get Spotify catalog information for several artists based on their Spotify IDs.
   */
  "get-multiple-artists": {
    parameters: {
      query: {
        ids: string;
      };
    };
    responses: {
      200: components["responses"]["ManyArtists"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Artist
   *
   * @description Get Spotify catalog information for a single artist identified by their unique Spotify ID.
   */
  "get-an-artist": {
    parameters: {
      path: {
        id: components["parameters"]["PathArtistId"];
      };
    };
    responses: {
      200: components["responses"]["OneArtist"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Artist's Albums
   *
   * @description Get Spotify catalog information about an artist's albums.
   */
  "get-an-artists-albums": {
    parameters: {
      query?: {
        include_groups?: components["parameters"]["QueryIncludeGroups"];
        market?: components["parameters"]["QueryMarket"];
        limit?: components["parameters"]["QueryLimit"];
        offset?: components["parameters"]["QueryOffset"];
      };
      path: {
        id: components["parameters"]["PathArtistId"];
      };
    };
    responses: {
      200: components["responses"]["PagingSimplifiedAlbumObject"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Artist's Related Artists
   *
   * @description Get Spotify catalog information about artists similar to a given artist. Similarity is based on analysis of the Spotify community's [listening history](http://news.spotify.com/se/2010/02/03/related-artists/).
   */
  "get-an-artists-related-artists": {
    parameters: {
      path: {
        id: components["parameters"]["PathArtistId"];
      };
    };
    responses: {
      200: components["responses"]["ManyArtists"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Artist's Top Tracks
   *
   * @description Get Spotify catalog information about an artist's top tracks by country.
   */
  "get-an-artists-top-tracks": {
    parameters: {
      query?: {
        market?: components["parameters"]["QueryMarket"];
      };
      path: {
        id: components["parameters"]["PathArtistId"];
      };
    };
    responses: {
      200: components["responses"]["ManyTracks"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Track's Audio Analysis
   *
   * @description Get a low-level audio analysis for a track in the Spotify catalog. The audio analysis describes the track’s structure and musical content, including rhythm, pitch, and timbre.
   */
  "get-audio-analysis": {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      200: components["responses"]["OneAudioAnalysis"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Tracks' Audio Features
   *
   * @description Get audio features for multiple tracks based on their Spotify IDs.
   */
  "get-several-audio-features": {
    parameters: {
      query: {
        ids: string;
      };
    };
    responses: {
      200: components["responses"]["ManyAudioFeatures"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Track's Audio Features
   *
   * @description Get audio feature information for a single track identified by its unique
   * Spotify ID.
   */
  "get-audio-features": {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      200: components["responses"]["OneAudioFeatures"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Several Audiobooks
   *
   * @description Get Spotify catalog information for several audiobooks identified by their Spotify IDs.<br />
   * **Note: Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.**
   */
  "get-multiple-audiobooks": {
    parameters: {
      query: {
        ids: components["parameters"]["QueryAudiobookIds"];
        market?: components["parameters"]["QueryMarket"];
      };
    };
    responses: {
      200: components["responses"]["ManyAudiobooks"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get an Audiobook
   *
   * @description Get Spotify catalog information for a single audiobook.<br />
   * **Note: Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.**
   */
  "get-an-audiobook": {
    parameters: {
      query?: {
        market?: components["parameters"]["QueryMarket"];
      };
      path: {
        id: components["parameters"]["PathAudiobookId"];
      };
    };
    responses: {
      200: components["responses"]["OneAudiobook"];
      400: components["responses"]["BadRequest"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      404: components["responses"]["NotFound"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Audiobook Chapters
   *
   * @description Get Spotify catalog information about an audiobook's chapters.<br />
   * **Note: Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.**
   */
  "get-audiobook-chapters": {
    parameters: {
      query?: {
        market?: components["parameters"]["QueryMarket"];
        limit?: components["parameters"]["QueryLimit"];
        offset?: components["parameters"]["QueryOffset"];
      };
      path: {
        id: components["parameters"]["PathAudiobookId"];
      };
    };
    responses: {
      200: components["responses"]["PagingSimplifiedChapterObject"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Several Browse Categories
   *
   * @description Get a list of categories used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).
   */
  "get-categories": {
    parameters: {
      query?: {
        country?: string;
        locale?: string;
        limit?: components["parameters"]["QueryLimit"];
        offset?: components["parameters"]["QueryOffset"];
      };
    };
    responses: {
      200: components["responses"]["PagedCategories"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Single Browse Category
   *
   * @description Get a single category used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).
   */
  "get-a-category": {
    parameters: {
      query?: {
        country?: string;
        locale?: string;
      };
      path: {
        category_id: string;
      };
    };
    responses: {
      200: components["responses"]["OneCategory"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Category's Playlists
   *
   * @description Get a list of Spotify playlists tagged with a particular category.
   */
  "get-a-categories-playlists": {
    parameters: {
      query?: {
        country?: string;
        limit?: components["parameters"]["QueryLimit"];
        offset?: components["parameters"]["QueryOffset"];
      };
      path: {
        category_id: string;
      };
    };
    responses: {
      200: components["responses"]["PagedFeaturedPlaylists"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Featured Playlists
   *
   * @description Get a list of Spotify featured playlists (shown, for example, on a Spotify player's 'Browse' tab).
   */
  "get-featured-playlists": {
    parameters: {
      query?: {
        country?: string;
        locale?: string;
        timestamp?: string;
        limit?: components["parameters"]["QueryLimit"];
        offset?: components["parameters"]["QueryOffset"];
      };
    };
    responses: {
      200: components["responses"]["PagedFeaturedPlaylists"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get New Releases
   *
   * @description Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab).
   */
  "get-new-releases": {
    parameters: {
      query?: {
        country?: string;
        limit?: components["parameters"]["QueryLimit"];
        offset?: components["parameters"]["QueryOffset"];
      };
    };
    responses: {
      200: components["responses"]["PagedAlbums"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Several Chapters
   *
   * @description Get Spotify catalog information for several chapters identified by their Spotify IDs.<br />
   * **Note: Chapters are only available for the US, UK, Ireland, New Zealand and Australia markets.**
   */
  "get-several-chapters": {
    parameters: {
      query: {
        ids: components["parameters"]["QueryChapterIds"];
        market?: components["parameters"]["QueryMarket"];
      };
    };
    responses: {
      200: components["responses"]["ManyChapters"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get a Chapter
   *
   * @description Get Spotify catalog information for a single chapter.<br />
   * **Note: Chapters are only available for the US, UK, Ireland, New Zealand and Australia markets.**
   */
  "get-a-chapter": {
    parameters: {
      query?: {
        market?: components["parameters"]["QueryMarket"];
      };
      path: {
        id: components["parameters"]["PathChapterId"];
      };
    };
    responses: {
      200: components["responses"]["OneChapter"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Several Episodes
   *
   * @description Get Spotify catalog information for several episodes based on their Spotify IDs.
   */
  "get-multiple-episodes": {
    parameters: {
      query: {
        ids: string;
        market?: components["parameters"]["QueryMarket"];
      };
    };
    responses: {
      200: components["responses"]["ManyEpisodes"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Episode
   *
   * @description Get Spotify catalog information for a single episode identified by its
   * unique Spotify ID.
   */
  "get-an-episode": {
    parameters: {
      query?: {
        market?: components["parameters"]["QueryMarket"];
      };
      path: {
        id: string;
      };
    };
    responses: {
      200: components["responses"]["OneEpisode"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Available Markets
   *
   * @description Get the list of markets where Spotify is available.
   */
  "get-available-markets": {
    responses: {
      200: components["responses"]["Markets"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Current User's Profile
   *
   * @description Get detailed profile information about the current user (including the
   * current user's username).
   */
  "get-current-users-profile": {
    responses: {
      200: components["responses"]["OnePrivateUser"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get User's Saved Albums
   *
   * @description Get a list of the albums saved in the current Spotify user's 'Your Music' library.
   */
  "get-users-saved-albums": {
    parameters: {
      query?: {
        limit?: components["parameters"]["QueryLimit"];
        offset?: components["parameters"]["QueryOffset"];
        market?: components["parameters"]["QueryMarket"];
      };
    };
    responses: {
      200: components["responses"]["PagingSavedAlbumObject"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Save Albums for Current User
   *
   * @description Save one or more albums to the current user's 'Your Music' library.
   */
  "save-albums-user": {
    parameters: {
      query: {
        ids: components["parameters"]["QueryAlbumIds"];
      };
    };
    readonly requestBody?: {
      readonly content: {
        readonly "application/json": {
          /** @description A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._ */
          readonly ids?: readonly string[];
          [key: string]: unknown;
        };
      };
    };
    responses: {
      /** @description The album is saved */
      200: {
        content: never;
      };
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Remove Users' Saved Albums
   *
   * @description Remove one or more albums from the current user's 'Your Music' library.
   */
  "remove-albums-user": {
    parameters: {
      query: {
        ids: components["parameters"]["QueryAlbumIds"];
      };
    };
    readonly requestBody?: {
      readonly content: {
        readonly "application/json": {
          /** @description A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._ */
          readonly ids?: readonly string[];
          [key: string]: unknown;
        };
      };
    };
    responses: {
      /** @description Album(s) have been removed from the library */
      200: {
        content: never;
      };
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Check User's Saved Albums
   *
   * @description Check if one or more albums is already saved in the current Spotify user's 'Your Music' library.
   */
  "check-users-saved-albums": {
    parameters: {
      query: {
        ids: components["parameters"]["QueryAlbumIds"];
      };
    };
    responses: {
      200: components["responses"]["ArrayOfBooleans"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get User's Saved Audiobooks
   *
   * @description Get a list of the audiobooks saved in the current Spotify user's 'Your Music' library.
   */
  "get-users-saved-audiobooks": {
    parameters: {
      query?: {
        limit?: components["parameters"]["QueryLimit"];
        offset?: components["parameters"]["QueryOffset"];
      };
    };
    responses: {
      200: components["responses"]["PagingSavedAudiobookObject"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Save Audiobooks for Current User
   *
   * @description Save one or more audiobooks to the current Spotify user's library.
   */
  "save-audiobooks-user": {
    parameters: {
      query: {
        ids: components["parameters"]["QueryAudiobookIds"];
      };
    };
    responses: {
      /** @description Audiobook(s) are saved to the library */
      200: {
        content: never;
      };
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Remove User's Saved Audiobooks
   *
   * @description Remove one or more audiobooks from the Spotify user's library.
   */
  "remove-audiobooks-user": {
    parameters: {
      query: {
        ids: components["parameters"]["QueryAudiobookIds"];
      };
    };
    responses: {
      /** @description Audiobook(s) have been removed from the library */
      200: {
        content: never;
      };
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Check User's Saved Audiobooks
   *
   * @description Check if one or more audiobooks are already saved in the current Spotify user's library.
   */
  "check-users-saved-audiobooks": {
    parameters: {
      query: {
        ids: components["parameters"]["QueryAudiobookIds"];
      };
    };
    responses: {
      200: components["responses"]["ArrayOfBooleans"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get User's Saved Episodes
   *
   * @description Get a list of the episodes saved in the current Spotify user's library.<br/>
   * This API endpoint is in __beta__ and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
   */
  "get-users-saved-episodes": {
    parameters: {
      query?: {
        market?: components["parameters"]["QueryMarket"];
        limit?: components["parameters"]["QueryLimit"];
        offset?: components["parameters"]["QueryOffset"];
      };
    };
    responses: {
      200: components["responses"]["PagingSavedEpisodeObject"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Save Episodes for Current User
   *
   * @description Save one or more episodes to the current user's library.<br/>
   * This API endpoint is in __beta__ and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
   */
  "save-episodes-user": {
    parameters: {
      query: {
        ids: string;
      };
    };
    readonly requestBody?: {
      readonly content: {
        readonly "application/json": {
          /** @description A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). <br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._ */
          readonly ids: readonly string[];
          [key: string]: unknown;
        };
      };
    };
    responses: {
      /** @description Episode saved */
      200: {
        content: never;
      };
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Remove User's Saved Episodes
   *
   * @description Remove one or more episodes from the current user's library.<br/>
   * This API endpoint is in __beta__ and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
   */
  "remove-episodes-user": {
    parameters: {
      query: {
        ids: components["parameters"]["QueryTrackIds"];
      };
    };
    readonly requestBody?: {
      readonly content: {
        readonly "application/json": {
          /** @description A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). <br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._ */
          readonly ids?: readonly string[];
          [key: string]: unknown;
        };
      };
    };
    responses: {
      /** @description Episode removed */
      200: {
        content: never;
      };
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Check User's Saved Episodes
   *
   * @description Check if one or more episodes is already saved in the current Spotify user's 'Your Episodes' library.<br/>
   * This API endpoint is in __beta__ and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer)..
   */
  "check-users-saved-episodes": {
    parameters: {
      query: {
        ids: string;
      };
    };
    responses: {
      200: components["responses"]["ArrayOfBooleans"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Followed Artists
   *
   * @description Get the current user's followed artists.
   */
  "get-followed": {
    parameters: {
      query: {
        type: "artist";
        after?: string;
        limit?: components["parameters"]["QueryLimit"];
      };
    };
    responses: {
      200: components["responses"]["CursorPagedArtists"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Follow Artists or Users
   *
   * @description Add the current user as a follower of one or more artists or other Spotify users.
   */
  "follow-artists-users": {
    parameters: {
      query: {
        type: "artist" | "user";
        ids: string;
      };
    };
    readonly requestBody?: {
      readonly content: {
        readonly "application/json": {
          /**
           * @description A JSON array of the artist or user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids).
           * For example: `{ids:["74ASZWbe4lXaubB36ztrGX", "08td7MxkoHQkXnWAYD8d6Q"]}`. A maximum of 50 IDs can be sent in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._
           */
          readonly ids: readonly string[];
          [key: string]: unknown;
        };
      };
    };
    responses: {
      /** @description Artist or user followed */
      204: {
        content: never;
      };
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Unfollow Artists or Users
   *
   * @description Remove the current user as a follower of one or more artists or other Spotify users.
   */
  "unfollow-artists-users": {
    parameters: {
      query: {
        type: "artist" | "user";
        ids: string;
      };
    };
    readonly requestBody?: {
      readonly content: {
        readonly "application/json": {
          /** @description A JSON array of the artist or user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `{ids:["74ASZWbe4lXaubB36ztrGX", "08td7MxkoHQkXnWAYD8d6Q"]}`. A maximum of 50 IDs can be sent in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._ */
          readonly ids?: readonly string[];
          [key: string]: unknown;
        };
      };
    };
    responses: {
      /** @description Artist or user unfollowed */
      200: {
        content: never;
      };
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Check If User Follows Artists or Users
   *
   * @description Check to see if the current user is following one or more artists or other Spotify users.
   */
  "check-current-user-follows": {
    parameters: {
      query: {
        type: "artist" | "user";
        ids: string;
      };
    };
    responses: {
      200: components["responses"]["ArrayOfBooleans"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Playback State
   *
   * @description Get information about the user’s current playback state, including track or episode, progress, and active device.
   */
  "get-information-about-the-users-current-playback": {
    parameters: {
      query?: {
        market?: components["parameters"]["QueryMarket"];
        additional_types?: components["parameters"]["QueryAdditionalTypes"];
      };
    };
    responses: {
      200: components["responses"]["OneCurrentlyPlaying"];
      /** @description Playback not available or active */
      204: {
        content: never;
      };
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Transfer Playback
   *
   * @description Transfer playback to a new device and determine if it should start playing.
   */
  "transfer-a-users-playback": {
    readonly requestBody?: {
      readonly content: {
        readonly "application/json": {
          /** @description A JSON array containing the ID of the device on which playback should be started/transferred.<br/>For example:`{device_ids:["74ASZWbe4lXaubB36ztrGX"]}`<br/>_**Note**: Although an array is accepted, only a single device_id is currently supported. Supplying more than one will return `400 Bad Request`_ */
          readonly device_ids: readonly string[];
          /** @description **true**: ensure playback happens on new device.<br/>**false** or not provided: keep the current playback state. */
          readonly play?: boolean;
          [key: string]: unknown;
        };
      };
    };
    responses: {
      /** @description Playback transferred */
      204: {
        content: never;
      };
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Currently Playing Track
   *
   * @description Get the object currently being played on the user's Spotify account.
   */
  "get-the-users-currently-playing-track": {
    parameters: {
      query?: {
        market?: components["parameters"]["QueryMarket"];
        additional_types?: components["parameters"]["QueryAdditionalTypes"];
      };
    };
    responses: {
      200: components["responses"]["OneCurrentlyPlayingTrack"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Available Devices
   *
   * @description Get information about a user’s available devices.
   */
  "get-a-users-available-devices": {
    responses: {
      200: components["responses"]["ManyDevices"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Skip To Next
   *
   * @description Skips to next track in the user’s queue.
   */
  "skip-users-playback-to-next-track": {
    parameters: {
      query?: {
        device_id?: string;
      };
    };
    responses: {
      /** @description Command sent */
      204: {
        content: never;
      };
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Pause Playback
   *
   * @description Pause playback on the user's account.
   */
  "pause-a-users-playback": {
    parameters: {
      query?: {
        device_id?: string;
      };
    };
    responses: {
      /** @description Playback paused */
      204: {
        content: never;
      };
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Start/Resume Playback
   *
   * @description Start a new context or resume current playback on the user's active device.
   */
  "start-a-users-playback": {
    parameters: {
      query?: {
        device_id?: string;
      };
    };
    readonly requestBody?: {
      readonly content: {
        readonly "application/json": {
          /**
           * @description Optional. Spotify URI of the context to play.
           * Valid contexts are albums, artists & playlists.
           * `{context_uri:"spotify:album:1Je1IMUlBXcx1Fz0WE7oPT"}`
           */
          readonly context_uri?: string;
          /**
           * @description Optional. Indicates from where in the context playback should start. Only available when context_uri corresponds to an album or playlist object
           * "position" is zero based and can’t be negative. Example: `"offset": {"position": 5}`
           * "uri" is a string representing the uri of the item to start at. Example: `"offset": {"uri": "spotify:track:1301WleyT98MSxVHPZCA6M"}`
           */
          readonly offset?: {
            [key: string]: unknown;
          };
          /** @description Indicates from what position to start playback. Must be a positive number. Passing in a position that is greater than the length of the track will cause the player to start playing the next song. */
          readonly position_ms?: number;
          /**
           * @description Optional. A JSON array of the Spotify track URIs to play.
           * For example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"]}`
           */
          readonly uris?: readonly string[];
          [key: string]: unknown;
        };
      };
    };
    responses: {
      /** @description Playback started */
      204: {
        content: never;
      };
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Skip To Previous
   *
   * @description Skips to previous track in the user’s queue.
   */
  "skip-users-playback-to-previous-track": {
    parameters: {
      query?: {
        device_id?: string;
      };
    };
    responses: {
      /** @description Command sent */
      204: {
        content: never;
      };
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get the User's Queue
   *
   * @description Get the list of objects that make up the user's queue.
   */
  "get-queue": {
    responses: {
      200: components["responses"]["Queue"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Add Item to Playback Queue
   *
   * @description Add an item to the end of the user's current playback queue.
   */
  "add-to-queue": {
    parameters: {
      query: {
        uri: string;
        device_id?: string;
      };
    };
    responses: {
      /** @description Command received */
      204: {
        content: never;
      };
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Recently Played Tracks
   *
   * @description Get tracks from the current user's recently played tracks.
   * _**Note**: Currently doesn't support podcast episodes._
   */
  "get-recently-played": {
    parameters: {
      query?: {
        limit?: components["parameters"]["QueryLimit"];
        after?: number;
        before?: number;
      };
    };
    responses: {
      200: components["responses"]["CursorPagedPlayHistory"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Set Repeat Mode
   *
   * @description Set the repeat mode for the user's playback. Options are repeat-track,
   * repeat-context, and off.
   */
  "set-repeat-mode-on-users-playback": {
    parameters: {
      query: {
        state: string;
        device_id?: string;
      };
    };
    responses: {
      /** @description Command sent */
      204: {
        content: never;
      };
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Seek To Position
   *
   * @description Seeks to the given position in the user’s currently playing track.
   */
  "seek-to-position-in-currently-playing-track": {
    parameters: {
      query: {
        position_ms: number;
        device_id?: string;
      };
    };
    responses: {
      /** @description Command sent */
      204: {
        content: never;
      };
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Toggle Playback Shuffle
   *
   * @description Toggle shuffle on or off for user’s playback.
   */
  "toggle-shuffle-for-users-playback": {
    parameters: {
      query: {
        state: boolean;
        device_id?: string;
      };
    };
    responses: {
      /** @description Command sent */
      204: {
        content: never;
      };
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Set Playback Volume
   *
   * @description Set the volume for the user’s current playback device.
   */
  "set-volume-for-users-playback": {
    parameters: {
      query: {
        volume_percent: number;
        device_id?: string;
      };
    };
    responses: {
      /** @description Command sent */
      204: {
        content: never;
      };
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Current User's Playlists
   *
   * @description Get a list of the playlists owned or followed by the current Spotify
   * user.
   */
  "get-a-list-of-current-users-playlists": {
    parameters: {
      query?: {
        limit?: components["parameters"]["QueryLimit"];
        offset?: number;
      };
    };
    responses: {
      200: components["responses"]["PagedPlaylists"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get User's Saved Shows
   *
   * @description Get a list of shows saved in the current Spotify user's library. Optional parameters can be used to limit the number of shows returned.
   */
  "get-users-saved-shows": {
    parameters: {
      query?: {
        limit?: components["parameters"]["QueryLimit"];
        offset?: components["parameters"]["QueryOffset"];
      };
    };
    responses: {
      200: components["responses"]["PagingSavedShowObject"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Save Shows for Current User
   *
   * @description Save one or more shows to current Spotify user's library.
   */
  "save-shows-user": {
    parameters: {
      query: {
        ids: components["parameters"]["QueryShowIds"];
      };
    };
    readonly requestBody?: {
      readonly content: {
        readonly "application/json": {
          /**
           * @description A JSON array of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).
           * A maximum of 50 items can be specified in one request. *Note: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored.*
           */
          readonly ids?: readonly string[];
          [key: string]: unknown;
        };
      };
    };
    responses: {
      /** @description Show saved */
      200: {
        content: never;
      };
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Remove User's Saved Shows
   *
   * @description Delete one or more shows from current Spotify user's library.
   */
  "remove-shows-user": {
    parameters: {
      query: {
        ids: components["parameters"]["QueryShowIds"];
        market?: components["parameters"]["QueryMarket"];
      };
    };
    readonly requestBody?: {
      readonly content: {
        readonly "application/json": {
          /**
           * @description A JSON array of the [Spotify IDs](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).
           * A maximum of 50 items can be specified in one request. *Note: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored.*
           */
          readonly ids?: readonly string[];
          [key: string]: unknown;
        };
      };
    };
    responses: {
      /** @description Show removed */
      200: {
        content: never;
      };
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Check User's Saved Shows
   *
   * @description Check if one or more shows is already saved in the current Spotify user's library.
   */
  "check-users-saved-shows": {
    parameters: {
      query: {
        ids: components["parameters"]["QueryShowIds"];
      };
    };
    responses: {
      200: components["responses"]["ArrayOfBooleans"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get User's Top Artists
   *
   * @description Get the current user's top artists based on calculated affinity.
   */
  "get-users-top-artists": {
    parameters: {
      query?: {
        time_range?: string;
        limit?: components["parameters"]["QueryLimit"];
        offset?: components["parameters"]["QueryOffset"];
      };
    };
    responses: {
      200: components["responses"]["PagingArtistObject"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get User's Top Tracks
   *
   * @description Get the current user's top tracks based on calculated affinity.
   */
  "get-users-top-tracks": {
    parameters: {
      query?: {
        time_range?: string;
        limit?: components["parameters"]["QueryLimit"];
        offset?: components["parameters"]["QueryOffset"];
      };
    };
    responses: {
      200: components["responses"]["PagingTrackObject"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get User's Saved Tracks
   *
   * @description Get a list of the songs saved in the current Spotify user's 'Your Music' library.
   */
  "get-users-saved-tracks": {
    parameters: {
      query?: {
        market?: components["parameters"]["QueryMarket"];
        limit?: components["parameters"]["QueryLimit"];
        offset?: components["parameters"]["QueryOffset"];
      };
    };
    responses: {
      200: components["responses"]["PagingSavedTrackObject"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Save Tracks for Current User
   *
   * @description Save one or more tracks to the current user's 'Your Music' library.
   */
  "save-tracks-user": {
    parameters: {
      query: {
        ids: components["parameters"]["QueryTrackIds"];
      };
    };
    readonly requestBody?: {
      readonly content: {
        readonly "application/json": {
          /** @description A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._ */
          readonly ids: readonly string[];
          [key: string]: unknown;
        };
      };
    };
    responses: {
      /** @description Track saved */
      200: {
        content: never;
      };
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Remove User's Saved Tracks
   *
   * @description Remove one or more tracks from the current user's 'Your Music' library.
   */
  "remove-tracks-user": {
    parameters: {
      query: {
        ids: components["parameters"]["QueryTrackIds"];
      };
    };
    readonly requestBody?: {
      readonly content: {
        readonly "application/json": {
          /** @description A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._ */
          readonly ids?: readonly string[];
          [key: string]: unknown;
        };
      };
    };
    responses: {
      /** @description Track removed */
      200: {
        content: never;
      };
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Check User's Saved Tracks
   *
   * @description Check if one or more tracks is already saved in the current Spotify user's 'Your Music' library.
   */
  "check-users-saved-tracks": {
    parameters: {
      query: {
        ids: components["parameters"]["QueryTrackIds"];
      };
    };
    responses: {
      200: components["responses"]["ArrayOfBooleans"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Playlist
   *
   * @description Get a playlist owned by a Spotify user.
   */
  "get-playlist": {
    parameters: {
      query?: {
        market?: components["parameters"]["QueryMarket"];
        fields?: string;
        additional_types?: components["parameters"]["QueryAdditionalTypes"];
      };
      path: {
        playlist_id: components["parameters"]["PathPlaylistId"];
      };
    };
    responses: {
      200: components["responses"]["OnePlaylist"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Change Playlist Details
   *
   * @description Change a playlist's name and public/private state. (The user must, of
   * course, own the playlist.)
   */
  "change-playlist-details": {
    parameters: {
      path: {
        playlist_id: components["parameters"]["PathPlaylistId"];
      };
    };
    readonly requestBody?: {
      readonly content: {
        readonly "application/json": {
          /**
           * @description If `true`, the playlist will become collaborative and other users will be able to modify the playlist in their Spotify client. <br/>
           * _**Note**: You can only set `collaborative` to `true` on non-public playlists._
           */
          readonly collaborative?: boolean;
          /** @description Value for playlist description as displayed in Spotify Clients and in the Web API. */
          readonly description?: string;
          /** @description The new name for the playlist, for example `"My New Playlist Title"` */
          readonly name?: string;
          /** @description If `true` the playlist will be public, if `false` it will be private. */
          readonly public?: boolean;
          [key: string]: unknown;
        };
      };
    };
    responses: {
      /** @description Playlist updated */
      200: {
        content: never;
      };
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Follow Playlist
   *
   * @description Add the current user as a follower of a playlist.
   */
  "follow-playlist": {
    parameters: {
      path: {
        playlist_id: components["parameters"]["PathPlaylistId"];
      };
    };
    readonly requestBody?: {
      readonly content: {
        readonly "application/json": {
          /** @description Defaults to `true`. If `true` the playlist will be included in user's public playlists, if `false` it will remain private. */
          readonly public?: boolean;
          [key: string]: unknown;
        };
      };
    };
    responses: {
      /** @description Playlist followed */
      200: {
        content: never;
      };
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Unfollow Playlist
   *
   * @description Remove the current user as a follower of a playlist.
   */
  "unfollow-playlist": {
    parameters: {
      path: {
        playlist_id: components["parameters"]["PathPlaylistId"];
      };
    };
    responses: {
      /** @description Playlist unfollowed */
      200: {
        content: never;
      };
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Check if Users Follow Playlist
   *
   * @description Check to see if one or more Spotify users are following a specified playlist.
   */
  "check-if-user-follows-playlist": {
    parameters: {
      query: {
        ids: string;
      };
      path: {
        playlist_id: components["parameters"]["PathPlaylistId"];
      };
    };
    responses: {
      200: components["responses"]["ArrayOfBooleans"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Playlist Cover Image
   *
   * @description Get the current image associated with a specific playlist.
   */
  "get-playlist-cover": {
    parameters: {
      path: {
        playlist_id: components["parameters"]["PathPlaylistId"];
      };
    };
    responses: {
      200: components["responses"]["ArrayOfImages"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Add Custom Playlist Cover Image
   *
   * @description Replace the image used to represent a specific playlist.
   */
  "upload-custom-playlist-cover": {
    parameters: {
      path: {
        playlist_id: components["parameters"]["PathPlaylistId"];
      };
    };
    /** @description The new cover image of the playlist as a Base64 encoded JPEG image. Maximum payload size is 256KB. */
    readonly requestBody: {
      readonly content: {
        readonly "image/jpeg": string;
      };
    };
    responses: {
      /** @description Image uploaded */
      200: {
        content: never;
      };
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Playlist Items
   *
   * @description Get full details of the items of a playlist owned by a Spotify user.
   */
  "get-playlists-tracks": {
    parameters: {
      query?: {
        market?: components["parameters"]["QueryMarket"];
        fields?: string;
        limit?: number;
        offset?: components["parameters"]["QueryOffset"];
        additional_types?: components["parameters"]["QueryAdditionalTypes"];
      };
      path: {
        playlist_id: components["parameters"]["PathPlaylistId"];
      };
    };
    responses: {
      200: components["responses"]["PagingPlaylistTrackObject"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Update Playlist Items
   *
   * @description Either reorder or replace items in a playlist depending on the request's parameters.
   * To reorder items, include `range_start`, `insert_before`, `range_length` and `snapshot_id` in the request's body.
   * To replace items, include `uris` as either a query parameter or in the request's body.
   * Replacing items in a playlist will overwrite its existing items. This operation can be used for replacing or clearing items in a playlist.
   * <br/>
   * **Note**: Replace and reorder are mutually exclusive operations which share the same endpoint, but have different parameters.
   * These operations can't be applied together in a single request.
   */
  "reorder-or-replace-playlists-tracks": {
    parameters: {
      query?: {
        uris?: string;
      };
      path: {
        playlist_id: components["parameters"]["PathPlaylistId"];
      };
    };
    readonly requestBody?: {
      readonly content: {
        readonly "application/json": {
          /** @description The position where the items should be inserted.<br/>To reorder the items to the end of the playlist, simply set _insert_before_ to the position after the last item.<br/>Examples:<br/>To reorder the first item to the last position in a playlist with 10 items, set _range_start_ to 0, and _insert_before_ to 10.<br/>To reorder the last item in a playlist with 10 items to the start of the playlist, set _range_start_ to 9, and _insert_before_ to 0. */
          readonly insert_before?: number;
          /** @description The amount of items to be reordered. Defaults to 1 if not set.<br/>The range of items to be reordered begins from the _range_start_ position, and includes the _range_length_ subsequent items.<br/>Example:<br/>To move the items at index 9-10 to the start of the playlist, _range_start_ is set to 9, and _range_length_ is set to 2. */
          readonly range_length?: number;
          /** @description The position of the first item to be reordered. */
          readonly range_start?: number;
          /** @description The playlist's snapshot ID against which you want to make the changes. */
          readonly snapshot_id?: string;
          readonly uris?: readonly string[];
          [key: string]: unknown;
        };
      };
    };
    responses: {
      200: components["responses"]["PlaylistSnapshotId"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Add Items to Playlist
   *
   * @description Add one or more items to a user's playlist.
   */
  "add-tracks-to-playlist": {
    parameters: {
      query?: {
        position?: number;
        uris?: string;
      };
      path: {
        playlist_id: components["parameters"]["PathPlaylistId"];
      };
    };
    readonly requestBody?: {
      readonly content: {
        readonly "application/json": {
          /** @description The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0` ; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they appear in the uris array. For example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M"], "position": 3}` */
          readonly position?: number;
          /** @description A JSON array of the [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to add. For example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M", "spotify:episode:512ojhOuo1ktJprKbVcKyQ"]}`<br/>A maximum of 100 items can be added in one request. _**Note**: if the `uris` parameter is present in the query string, any URIs listed here in the body will be ignored._ */
          readonly uris?: readonly string[];
          [key: string]: unknown;
        };
      };
    };
    responses: {
      201: components["responses"]["PlaylistSnapshotId"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Remove Playlist Items
   *
   * @description Remove one or more items from a user's playlist.
   */
  "remove-tracks-playlist": {
    parameters: {
      path: {
        playlist_id: components["parameters"]["PathPlaylistId"];
      };
    };
    readonly requestBody?: {
      readonly content: {
        readonly "application/json": {
          /**
           * @description The playlist's snapshot ID against which you want to make the changes.
           * The API will validate that the specified items exist and in the specified positions and make the changes,
           * even if more recent changes have been made to the playlist.
           */
          readonly snapshot_id?: string;
          /**
           * @description An array of objects containing [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) of the tracks or episodes to remove.
           * For example: `{ "tracks": [{ "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh" },{ "uri": "spotify:track:1301WleyT98MSxVHPZCA6M" }] }`. A maximum of 100 objects can be sent at once.
           */
          readonly tracks: readonly {
              /** @description Spotify URI */
              readonly uri?: string;
              [key: string]: unknown;
            }[];
          [key: string]: unknown;
        };
      };
    };
    responses: {
      200: components["responses"]["PlaylistSnapshotId"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Recommendations
   *
   * @description Recommendations are generated based on the available information for a given seed entity and matched against similar artists and tracks. If there is sufficient information about the provided seeds, a list of tracks will be returned together with pool size details.
   *
   * For artists and tracks that are very new or obscure there might not be enough data to generate a list of tracks.
   */
  "get-recommendations": {
    parameters: {
      query?: {
        limit?: number;
        market?: components["parameters"]["QueryMarket"];
        seed_artists?: string;
        seed_genres?: string;
        seed_tracks?: string;
        min_acousticness?: number;
        max_acousticness?: number;
        target_acousticness?: number;
        min_danceability?: number;
        max_danceability?: number;
        target_danceability?: number;
        min_duration_ms?: number;
        max_duration_ms?: number;
        target_duration_ms?: number;
        min_energy?: number;
        max_energy?: number;
        target_energy?: number;
        min_instrumentalness?: number;
        max_instrumentalness?: number;
        target_instrumentalness?: number;
        min_key?: number;
        max_key?: number;
        target_key?: number;
        min_liveness?: number;
        max_liveness?: number;
        target_liveness?: number;
        min_loudness?: number;
        max_loudness?: number;
        target_loudness?: number;
        min_mode?: number;
        max_mode?: number;
        target_mode?: number;
        min_popularity?: number;
        max_popularity?: number;
        target_popularity?: number;
        min_speechiness?: number;
        max_speechiness?: number;
        target_speechiness?: number;
        min_tempo?: number;
        max_tempo?: number;
        target_tempo?: number;
        min_time_signature?: number;
        max_time_signature?: number;
        target_time_signature?: number;
        min_valence?: number;
        max_valence?: number;
        target_valence?: number;
      };
    };
    responses: {
      200: components["responses"]["OneRecommendations"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Available Genre Seeds
   *
   * @description Retrieve a list of available genres seed parameter values for [recommendations](/documentation/web-api/reference/get-recommendations).
   */
  "get-recommendation-genres": {
    responses: {
      200: components["responses"]["ManyGenres"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Search for Item
   *
   * @description Get Spotify catalog information about albums, artists, playlists, tracks, shows, episodes or audiobooks
   * that match a keyword string.<br />
   * **Note: Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.**
   */
  search: {
    parameters: {
      query: {
        q: string;
        type: readonly ("album" | "artist" | "playlist" | "track" | "show" | "episode" | "audiobook")[];
        market?: components["parameters"]["QueryMarket"];
        limit?: number;
        offset?: number;
        include_external?: "audio";
      };
    };
    responses: {
      200: components["responses"]["SearchItems"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Several Shows
   *
   * @description Get Spotify catalog information for several shows based on their Spotify IDs.
   */
  "get-multiple-shows": {
    parameters: {
      query: {
        market?: components["parameters"]["QueryMarket"];
        ids: components["parameters"]["QueryShowIds"];
      };
    };
    responses: {
      200: components["responses"]["ManySimplifiedShows"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Show
   *
   * @description Get Spotify catalog information for a single show identified by its
   * unique Spotify ID.
   */
  "get-a-show": {
    parameters: {
      query?: {
        market?: components["parameters"]["QueryMarket"];
      };
      path: {
        id: components["parameters"]["PathShowId"];
      };
    };
    responses: {
      200: components["responses"]["OneShow"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Show Episodes
   *
   * @description Get Spotify catalog information about an show’s episodes. Optional parameters can be used to limit the number of episodes returned.
   */
  "get-a-shows-episodes": {
    parameters: {
      query?: {
        market?: components["parameters"]["QueryMarket"];
        limit?: components["parameters"]["QueryLimit"];
        offset?: components["parameters"]["QueryOffset"];
      };
      path: {
        id: components["parameters"]["PathShowId"];
      };
    };
    responses: {
      200: components["responses"]["PagingSimplifiedEpisodeObject"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Several Tracks
   *
   * @description Get Spotify catalog information for multiple tracks based on their Spotify IDs.
   */
  "get-several-tracks": {
    parameters: {
      query: {
        market?: components["parameters"]["QueryMarket"];
        ids: components["parameters"]["QueryTrackIds"];
      };
    };
    responses: {
      200: components["responses"]["ManyTracks"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get Track
   *
   * @description Get Spotify catalog information for a single track identified by its
   * unique Spotify ID.
   */
  "get-track": {
    parameters: {
      query?: {
        market?: components["parameters"]["QueryMarket"];
      };
      path: {
        id: string;
      };
    };
    responses: {
      200: components["responses"]["OneTrack"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get User's Profile
   *
   * @description Get public profile information about a Spotify user.
   */
  "get-users-profile": {
    parameters: {
      path: {
        user_id: components["parameters"]["PathUserId"];
      };
    };
    responses: {
      200: components["responses"]["OnePublicUser"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Get User's Playlists
   *
   * @description Get a list of the playlists owned or followed by a Spotify user.
   */
  "get-list-users-playlists": {
    parameters: {
      query?: {
        limit?: components["parameters"]["QueryLimit"];
        offset?: number;
      };
      path: {
        user_id: components["parameters"]["PathUserId"];
      };
    };
    responses: {
      200: components["responses"]["PagedPlaylists"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
  /**
   * Create Playlist
   *
   * @description Create a playlist for a Spotify user. (The playlist will be empty until
   * you [add tracks](/documentation/web-api/reference/add-tracks-to-playlist).)
   */
  "create-playlist": {
    parameters: {
      path: {
        user_id: components["parameters"]["PathUserId"];
      };
    };
    readonly requestBody?: {
      readonly content: {
        readonly "application/json": {
          /** @description Defaults to `false`. If `true` the playlist will be collaborative. _**Note**: to create a collaborative playlist you must also set `public` to `false`. To create collaborative playlists you must have granted `playlist-modify-private` and `playlist-modify-public` [scopes](/documentation/web-api/concepts/scopes/#list-of-scopes)._ */
          readonly collaborative?: boolean;
          /** @description value for playlist description as displayed in Spotify Clients and in the Web API. */
          readonly description?: string;
          /** @description The name for the new playlist, for example `"Your Coolest Playlist"`. This name does not need to be unique; a user may have several playlists with the same name. */
          readonly name: string;
          /** @description Defaults to `true`. If `true` the playlist will be public, if `false` it will be private. To be able to create private playlists, the user must have granted the `playlist-modify-private` [scope](/documentation/web-api/concepts/scopes/#list-of-scopes) */
          readonly public?: boolean;
          [key: string]: unknown;
        };
      };
    };
    responses: {
      201: components["responses"]["OnePlaylist"];
      401: components["responses"]["Unauthorized"];
      403: components["responses"]["Forbidden"];
      429: components["responses"]["TooManyRequests"];
    };
  };
}

const allOperations = {
  "get-multiple-albums": {
    "path": "/albums",
    "method": "get",
    "parameters": {
      "ids": {
        "location": "query",
        "required": true
      },
      "market": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-an-album": {
    "path": "/albums/{id}",
    "method": "get",
    "parameters": {
      "id": {
        "location": "path",
        "required": true
      },
      "market": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-an-albums-tracks": {
    "path": "/albums/{id}/tracks",
    "method": "get",
    "parameters": {
      "id": {
        "location": "path",
        "required": true
      },
      "market": {
        "location": "query",
        "required": false
      },
      "limit": {
        "location": "query",
        "required": false
      },
      "offset": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-multiple-artists": {
    "path": "/artists",
    "method": "get",
    "parameters": {
      "ids": {
        "location": "query",
        "required": true
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-an-artist": {
    "path": "/artists/{id}",
    "method": "get",
    "parameters": {
      "id": {
        "location": "path",
        "required": true
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-an-artists-albums": {
    "path": "/artists/{id}/albums",
    "method": "get",
    "parameters": {
      "id": {
        "location": "path",
        "required": true
      },
      "include_groups": {
        "location": "query",
        "required": false
      },
      "market": {
        "location": "query",
        "required": false
      },
      "limit": {
        "location": "query",
        "required": false
      },
      "offset": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-an-artists-related-artists": {
    "path": "/artists/{id}/related-artists",
    "method": "get",
    "parameters": {
      "id": {
        "location": "path",
        "required": true
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-an-artists-top-tracks": {
    "path": "/artists/{id}/top-tracks",
    "method": "get",
    "parameters": {
      "id": {
        "location": "path",
        "required": true
      },
      "market": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-audio-analysis": {
    "path": "/audio-analysis/{id}",
    "method": "get",
    "parameters": {
      "id": {
        "location": "path",
        "required": true
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-several-audio-features": {
    "path": "/audio-features",
    "method": "get",
    "parameters": {
      "ids": {
        "location": "query",
        "required": true
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-audio-features": {
    "path": "/audio-features/{id}",
    "method": "get",
    "parameters": {
      "id": {
        "location": "path",
        "required": true
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-multiple-audiobooks": {
    "path": "/audiobooks",
    "method": "get",
    "parameters": {
      "ids": {
        "location": "query",
        "required": true
      },
      "market": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-an-audiobook": {
    "path": "/audiobooks/{id}",
    "method": "get",
    "parameters": {
      "id": {
        "location": "path",
        "required": true
      },
      "market": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "400": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "404": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-audiobook-chapters": {
    "path": "/audiobooks/{id}/chapters",
    "method": "get",
    "parameters": {
      "id": {
        "location": "path",
        "required": true
      },
      "market": {
        "location": "query",
        "required": false
      },
      "limit": {
        "location": "query",
        "required": false
      },
      "offset": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-categories": {
    "path": "/browse/categories",
    "method": "get",
    "parameters": {
      "country": {
        "location": "query",
        "required": false
      },
      "locale": {
        "location": "query",
        "required": false
      },
      "limit": {
        "location": "query",
        "required": false
      },
      "offset": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-a-category": {
    "path": "/browse/categories/{category_id}",
    "method": "get",
    "parameters": {
      "category_id": {
        "location": "path",
        "required": true
      },
      "country": {
        "location": "query",
        "required": false
      },
      "locale": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-a-categories-playlists": {
    "path": "/browse/categories/{category_id}/playlists",
    "method": "get",
    "parameters": {
      "category_id": {
        "location": "path",
        "required": true
      },
      "country": {
        "location": "query",
        "required": false
      },
      "limit": {
        "location": "query",
        "required": false
      },
      "offset": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-featured-playlists": {
    "path": "/browse/featured-playlists",
    "method": "get",
    "parameters": {
      "country": {
        "location": "query",
        "required": false
      },
      "locale": {
        "location": "query",
        "required": false
      },
      "timestamp": {
        "location": "query",
        "required": false
      },
      "limit": {
        "location": "query",
        "required": false
      },
      "offset": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-new-releases": {
    "path": "/browse/new-releases",
    "method": "get",
    "parameters": {
      "country": {
        "location": "query",
        "required": false
      },
      "limit": {
        "location": "query",
        "required": false
      },
      "offset": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-several-chapters": {
    "path": "/chapters",
    "method": "get",
    "parameters": {
      "ids": {
        "location": "query",
        "required": true
      },
      "market": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-a-chapter": {
    "path": "/chapters/{id}",
    "method": "get",
    "parameters": {
      "id": {
        "location": "path",
        "required": true
      },
      "market": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-multiple-episodes": {
    "path": "/episodes",
    "method": "get",
    "parameters": {
      "ids": {
        "location": "query",
        "required": true
      },
      "market": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-an-episode": {
    "path": "/episodes/{id}",
    "method": "get",
    "parameters": {
      "id": {
        "location": "path",
        "required": true
      },
      "market": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-available-markets": {
    "path": "/markets",
    "method": "get",
    "parameters": {},
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-current-users-profile": {
    "path": "/me",
    "method": "get",
    "parameters": {},
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-users-saved-albums": {
    "path": "/me/albums",
    "method": "get",
    "parameters": {
      "limit": {
        "location": "query",
        "required": false
      },
      "offset": {
        "location": "query",
        "required": false
      },
      "market": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "save-albums-user": {
    "path": "/me/albums",
    "method": "put",
    "parameters": {
      "ids": {
        "location": "query",
        "required": true
      }
    },
    "body": {
      "required": false,
      "types": [
        "application/json"
      ]
    },
    "responses": {
      "200": [],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "remove-albums-user": {
    "path": "/me/albums",
    "method": "delete",
    "parameters": {
      "ids": {
        "location": "query",
        "required": true
      }
    },
    "body": {
      "required": false,
      "types": [
        "application/json"
      ]
    },
    "responses": {
      "200": [],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "check-users-saved-albums": {
    "path": "/me/albums/contains",
    "method": "get",
    "parameters": {
      "ids": {
        "location": "query",
        "required": true
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-users-saved-audiobooks": {
    "path": "/me/audiobooks",
    "method": "get",
    "parameters": {
      "limit": {
        "location": "query",
        "required": false
      },
      "offset": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "save-audiobooks-user": {
    "path": "/me/audiobooks",
    "method": "put",
    "parameters": {
      "ids": {
        "location": "query",
        "required": true
      }
    },
    "responses": {
      "200": [],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "remove-audiobooks-user": {
    "path": "/me/audiobooks",
    "method": "delete",
    "parameters": {
      "ids": {
        "location": "query",
        "required": true
      }
    },
    "responses": {
      "200": [],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "check-users-saved-audiobooks": {
    "path": "/me/audiobooks/contains",
    "method": "get",
    "parameters": {
      "ids": {
        "location": "query",
        "required": true
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-users-saved-episodes": {
    "path": "/me/episodes",
    "method": "get",
    "parameters": {
      "market": {
        "location": "query",
        "required": false
      },
      "limit": {
        "location": "query",
        "required": false
      },
      "offset": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "save-episodes-user": {
    "path": "/me/episodes",
    "method": "put",
    "parameters": {
      "ids": {
        "location": "query",
        "required": true
      }
    },
    "body": {
      "required": false,
      "types": [
        "application/json"
      ]
    },
    "responses": {
      "200": [],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "remove-episodes-user": {
    "path": "/me/episodes",
    "method": "delete",
    "parameters": {
      "ids": {
        "location": "query",
        "required": true
      }
    },
    "body": {
      "required": false,
      "types": [
        "application/json"
      ]
    },
    "responses": {
      "200": [],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "check-users-saved-episodes": {
    "path": "/me/episodes/contains",
    "method": "get",
    "parameters": {
      "ids": {
        "location": "query",
        "required": true
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-followed": {
    "path": "/me/following",
    "method": "get",
    "parameters": {
      "type": {
        "location": "query",
        "required": true
      },
      "after": {
        "location": "query",
        "required": false
      },
      "limit": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "follow-artists-users": {
    "path": "/me/following",
    "method": "put",
    "parameters": {
      "type": {
        "location": "query",
        "required": true
      },
      "ids": {
        "location": "query",
        "required": true
      }
    },
    "body": {
      "required": false,
      "types": [
        "application/json"
      ]
    },
    "responses": {
      "204": [],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "unfollow-artists-users": {
    "path": "/me/following",
    "method": "delete",
    "parameters": {
      "type": {
        "location": "query",
        "required": true
      },
      "ids": {
        "location": "query",
        "required": true
      }
    },
    "body": {
      "required": false,
      "types": [
        "application/json"
      ]
    },
    "responses": {
      "200": [],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "check-current-user-follows": {
    "path": "/me/following/contains",
    "method": "get",
    "parameters": {
      "type": {
        "location": "query",
        "required": true
      },
      "ids": {
        "location": "query",
        "required": true
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-information-about-the-users-current-playback": {
    "path": "/me/player",
    "method": "get",
    "parameters": {
      "market": {
        "location": "query",
        "required": false
      },
      "additional_types": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "204": [],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "transfer-a-users-playback": {
    "path": "/me/player",
    "method": "put",
    "parameters": {},
    "body": {
      "required": false,
      "types": [
        "application/json"
      ]
    },
    "responses": {
      "204": [],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-the-users-currently-playing-track": {
    "path": "/me/player/currently-playing",
    "method": "get",
    "parameters": {
      "market": {
        "location": "query",
        "required": false
      },
      "additional_types": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-a-users-available-devices": {
    "path": "/me/player/devices",
    "method": "get",
    "parameters": {},
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "skip-users-playback-to-next-track": {
    "path": "/me/player/next",
    "method": "post",
    "parameters": {
      "device_id": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "204": [],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "pause-a-users-playback": {
    "path": "/me/player/pause",
    "method": "put",
    "parameters": {
      "device_id": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "204": [],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "start-a-users-playback": {
    "path": "/me/player/play",
    "method": "put",
    "parameters": {
      "device_id": {
        "location": "query",
        "required": false
      }
    },
    "body": {
      "required": false,
      "types": [
        "application/json"
      ]
    },
    "responses": {
      "204": [],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "skip-users-playback-to-previous-track": {
    "path": "/me/player/previous",
    "method": "post",
    "parameters": {
      "device_id": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "204": [],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-queue": {
    "path": "/me/player/queue",
    "method": "get",
    "parameters": {},
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "add-to-queue": {
    "path": "/me/player/queue",
    "method": "post",
    "parameters": {
      "uri": {
        "location": "query",
        "required": true
      },
      "device_id": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "204": [],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-recently-played": {
    "path": "/me/player/recently-played",
    "method": "get",
    "parameters": {
      "limit": {
        "location": "query",
        "required": false
      },
      "after": {
        "location": "query",
        "required": false
      },
      "before": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "set-repeat-mode-on-users-playback": {
    "path": "/me/player/repeat",
    "method": "put",
    "parameters": {
      "state": {
        "location": "query",
        "required": true
      },
      "device_id": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "204": [],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "seek-to-position-in-currently-playing-track": {
    "path": "/me/player/seek",
    "method": "put",
    "parameters": {
      "position_ms": {
        "location": "query",
        "required": true
      },
      "device_id": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "204": [],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "toggle-shuffle-for-users-playback": {
    "path": "/me/player/shuffle",
    "method": "put",
    "parameters": {
      "state": {
        "location": "query",
        "required": true
      },
      "device_id": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "204": [],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "set-volume-for-users-playback": {
    "path": "/me/player/volume",
    "method": "put",
    "parameters": {
      "volume_percent": {
        "location": "query",
        "required": true
      },
      "device_id": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "204": [],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-a-list-of-current-users-playlists": {
    "path": "/me/playlists",
    "method": "get",
    "parameters": {
      "limit": {
        "location": "query",
        "required": false
      },
      "offset": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-users-saved-shows": {
    "path": "/me/shows",
    "method": "get",
    "parameters": {
      "limit": {
        "location": "query",
        "required": false
      },
      "offset": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "save-shows-user": {
    "path": "/me/shows",
    "method": "put",
    "parameters": {
      "ids": {
        "location": "query",
        "required": true
      }
    },
    "body": {
      "required": false,
      "types": [
        "application/json"
      ]
    },
    "responses": {
      "200": [],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "remove-shows-user": {
    "path": "/me/shows",
    "method": "delete",
    "parameters": {
      "ids": {
        "location": "query",
        "required": true
      },
      "market": {
        "location": "query",
        "required": false
      }
    },
    "body": {
      "required": false,
      "types": [
        "application/json"
      ]
    },
    "responses": {
      "200": [],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "check-users-saved-shows": {
    "path": "/me/shows/contains",
    "method": "get",
    "parameters": {
      "ids": {
        "location": "query",
        "required": true
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-users-top-artists": {
    "path": "/me/top/artists",
    "method": "get",
    "parameters": {
      "time_range": {
        "location": "query",
        "required": false
      },
      "limit": {
        "location": "query",
        "required": false
      },
      "offset": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-users-top-tracks": {
    "path": "/me/top/tracks",
    "method": "get",
    "parameters": {
      "time_range": {
        "location": "query",
        "required": false
      },
      "limit": {
        "location": "query",
        "required": false
      },
      "offset": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-users-saved-tracks": {
    "path": "/me/tracks",
    "method": "get",
    "parameters": {
      "market": {
        "location": "query",
        "required": false
      },
      "limit": {
        "location": "query",
        "required": false
      },
      "offset": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "save-tracks-user": {
    "path": "/me/tracks",
    "method": "put",
    "parameters": {
      "ids": {
        "location": "query",
        "required": true
      }
    },
    "body": {
      "required": false,
      "types": [
        "application/json"
      ]
    },
    "responses": {
      "200": [],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "remove-tracks-user": {
    "path": "/me/tracks",
    "method": "delete",
    "parameters": {
      "ids": {
        "location": "query",
        "required": true
      }
    },
    "body": {
      "required": false,
      "types": [
        "application/json"
      ]
    },
    "responses": {
      "200": [],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "check-users-saved-tracks": {
    "path": "/me/tracks/contains",
    "method": "get",
    "parameters": {
      "ids": {
        "location": "query",
        "required": true
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-playlist": {
    "path": "/playlists/{playlist_id}",
    "method": "get",
    "parameters": {
      "playlist_id": {
        "location": "path",
        "required": true
      },
      "market": {
        "location": "query",
        "required": false
      },
      "fields": {
        "location": "query",
        "required": false
      },
      "additional_types": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "change-playlist-details": {
    "path": "/playlists/{playlist_id}",
    "method": "put",
    "parameters": {
      "playlist_id": {
        "location": "path",
        "required": true
      }
    },
    "body": {
      "required": false,
      "types": [
        "application/json"
      ]
    },
    "responses": {
      "200": [],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "follow-playlist": {
    "path": "/playlists/{playlist_id}/followers",
    "method": "put",
    "parameters": {
      "playlist_id": {
        "location": "path",
        "required": true
      }
    },
    "body": {
      "required": false,
      "types": [
        "application/json"
      ]
    },
    "responses": {
      "200": [],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "unfollow-playlist": {
    "path": "/playlists/{playlist_id}/followers",
    "method": "delete",
    "parameters": {
      "playlist_id": {
        "location": "path",
        "required": true
      }
    },
    "responses": {
      "200": [],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "check-if-user-follows-playlist": {
    "path": "/playlists/{playlist_id}/followers/contains",
    "method": "get",
    "parameters": {
      "playlist_id": {
        "location": "path",
        "required": true
      },
      "ids": {
        "location": "query",
        "required": true
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-playlist-cover": {
    "path": "/playlists/{playlist_id}/images",
    "method": "get",
    "parameters": {
      "playlist_id": {
        "location": "path",
        "required": true
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "upload-custom-playlist-cover": {
    "path": "/playlists/{playlist_id}/images",
    "method": "put",
    "parameters": {
      "playlist_id": {
        "location": "path",
        "required": true
      }
    },
    "body": {
      "required": true,
      "types": [
        "image/jpeg"
      ]
    },
    "responses": {
      "200": [],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-playlists-tracks": {
    "path": "/playlists/{playlist_id}/tracks",
    "method": "get",
    "parameters": {
      "playlist_id": {
        "location": "path",
        "required": true
      },
      "market": {
        "location": "query",
        "required": false
      },
      "fields": {
        "location": "query",
        "required": false
      },
      "limit": {
        "location": "query",
        "required": false
      },
      "offset": {
        "location": "query",
        "required": false
      },
      "additional_types": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "reorder-or-replace-playlists-tracks": {
    "path": "/playlists/{playlist_id}/tracks",
    "method": "put",
    "parameters": {
      "playlist_id": {
        "location": "path",
        "required": true
      },
      "uris": {
        "location": "query",
        "required": false
      }
    },
    "body": {
      "required": false,
      "types": [
        "application/json"
      ]
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "add-tracks-to-playlist": {
    "path": "/playlists/{playlist_id}/tracks",
    "method": "post",
    "parameters": {
      "playlist_id": {
        "location": "path",
        "required": true
      },
      "position": {
        "location": "query",
        "required": false
      },
      "uris": {
        "location": "query",
        "required": false
      }
    },
    "body": {
      "required": false,
      "types": [
        "application/json"
      ]
    },
    "responses": {
      "201": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "remove-tracks-playlist": {
    "path": "/playlists/{playlist_id}/tracks",
    "method": "delete",
    "parameters": {
      "playlist_id": {
        "location": "path",
        "required": true
      }
    },
    "body": {
      "required": false,
      "types": [
        "application/json"
      ]
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-recommendations": {
    "path": "/recommendations",
    "method": "get",
    "parameters": {
      "limit": {
        "location": "query",
        "required": false
      },
      "market": {
        "location": "query",
        "required": false
      },
      "seed_artists": {
        "location": "query",
        "required": false
      },
      "seed_genres": {
        "location": "query",
        "required": false
      },
      "seed_tracks": {
        "location": "query",
        "required": false
      },
      "min_acousticness": {
        "location": "query",
        "required": false
      },
      "max_acousticness": {
        "location": "query",
        "required": false
      },
      "target_acousticness": {
        "location": "query",
        "required": false
      },
      "min_danceability": {
        "location": "query",
        "required": false
      },
      "max_danceability": {
        "location": "query",
        "required": false
      },
      "target_danceability": {
        "location": "query",
        "required": false
      },
      "min_duration_ms": {
        "location": "query",
        "required": false
      },
      "max_duration_ms": {
        "location": "query",
        "required": false
      },
      "target_duration_ms": {
        "location": "query",
        "required": false
      },
      "min_energy": {
        "location": "query",
        "required": false
      },
      "max_energy": {
        "location": "query",
        "required": false
      },
      "target_energy": {
        "location": "query",
        "required": false
      },
      "min_instrumentalness": {
        "location": "query",
        "required": false
      },
      "max_instrumentalness": {
        "location": "query",
        "required": false
      },
      "target_instrumentalness": {
        "location": "query",
        "required": false
      },
      "min_key": {
        "location": "query",
        "required": false
      },
      "max_key": {
        "location": "query",
        "required": false
      },
      "target_key": {
        "location": "query",
        "required": false
      },
      "min_liveness": {
        "location": "query",
        "required": false
      },
      "max_liveness": {
        "location": "query",
        "required": false
      },
      "target_liveness": {
        "location": "query",
        "required": false
      },
      "min_loudness": {
        "location": "query",
        "required": false
      },
      "max_loudness": {
        "location": "query",
        "required": false
      },
      "target_loudness": {
        "location": "query",
        "required": false
      },
      "min_mode": {
        "location": "query",
        "required": false
      },
      "max_mode": {
        "location": "query",
        "required": false
      },
      "target_mode": {
        "location": "query",
        "required": false
      },
      "min_popularity": {
        "location": "query",
        "required": false
      },
      "max_popularity": {
        "location": "query",
        "required": false
      },
      "target_popularity": {
        "location": "query",
        "required": false
      },
      "min_speechiness": {
        "location": "query",
        "required": false
      },
      "max_speechiness": {
        "location": "query",
        "required": false
      },
      "target_speechiness": {
        "location": "query",
        "required": false
      },
      "min_tempo": {
        "location": "query",
        "required": false
      },
      "max_tempo": {
        "location": "query",
        "required": false
      },
      "target_tempo": {
        "location": "query",
        "required": false
      },
      "min_time_signature": {
        "location": "query",
        "required": false
      },
      "max_time_signature": {
        "location": "query",
        "required": false
      },
      "target_time_signature": {
        "location": "query",
        "required": false
      },
      "min_valence": {
        "location": "query",
        "required": false
      },
      "max_valence": {
        "location": "query",
        "required": false
      },
      "target_valence": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-recommendation-genres": {
    "path": "/recommendations/available-genre-seeds",
    "method": "get",
    "parameters": {},
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "search": {
    "path": "/search",
    "method": "get",
    "parameters": {
      "q": {
        "location": "query",
        "required": true
      },
      "type": {
        "location": "query",
        "required": true
      },
      "market": {
        "location": "query",
        "required": false
      },
      "limit": {
        "location": "query",
        "required": false
      },
      "offset": {
        "location": "query",
        "required": false
      },
      "include_external": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-multiple-shows": {
    "path": "/shows",
    "method": "get",
    "parameters": {
      "market": {
        "location": "query",
        "required": false
      },
      "ids": {
        "location": "query",
        "required": true
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-a-show": {
    "path": "/shows/{id}",
    "method": "get",
    "parameters": {
      "market": {
        "location": "query",
        "required": false
      },
      "id": {
        "location": "path",
        "required": true
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-a-shows-episodes": {
    "path": "/shows/{id}/episodes",
    "method": "get",
    "parameters": {
      "id": {
        "location": "path",
        "required": true
      },
      "market": {
        "location": "query",
        "required": false
      },
      "limit": {
        "location": "query",
        "required": false
      },
      "offset": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-several-tracks": {
    "path": "/tracks",
    "method": "get",
    "parameters": {
      "market": {
        "location": "query",
        "required": false
      },
      "ids": {
        "location": "query",
        "required": true
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-track": {
    "path": "/tracks/{id}",
    "method": "get",
    "parameters": {
      "id": {
        "location": "path",
        "required": true
      },
      "market": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-users-profile": {
    "path": "/users/{user_id}",
    "method": "get",
    "parameters": {
      "user_id": {
        "location": "path",
        "required": true
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "get-list-users-playlists": {
    "path": "/users/{user_id}/playlists",
    "method": "get",
    "parameters": {
      "user_id": {
        "location": "path",
        "required": true
      },
      "limit": {
        "location": "query",
        "required": false
      },
      "offset": {
        "location": "query",
        "required": false
      }
    },
    "responses": {
      "200": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  },
  "create-playlist": {
    "path": "/users/{user_id}/playlists",
    "method": "post",
    "parameters": {
      "user_id": {
        "location": "path",
        "required": true
      }
    },
    "body": {
      "required": false,
      "types": [
        "application/json"
      ]
    },
    "responses": {
      "201": [
        "application/json"
      ],
      "401": [
        "application/json"
      ],
      "403": [
        "application/json"
      ],
      "429": [
        "application/json"
      ]
    }
  }
} as const;

export type {operations as Operations};

export type Schemas = components['schemas'];

export type Schema<K extends keyof Schemas> = Schemas[K];

export type RequestBody<
  K extends keyof operations,
  M extends BodyMimeTypes<operations[K]> = BodyMimeTypes<operations[K]>
> = RequestBodyFor<operations[K], M>;

export type RequestParameters<
  K extends keyof operations
> = RequestParametersFor<operations[K]>;

export type ResponseData<
  K extends keyof operations,
  C extends keyof operations[K]['responses'] = keyof operations[K]['responses'],
  M extends ResponseMimeTypes<operations[K]['responses'], C> = ResponseMimeTypes<operations[K]['responses'], C>
> = ResponseDataFor<operations[K], C, M>;

export type Sdk<F extends BaseFetch = typeof fetch> = SdkFor<operations, F>;

export const serverAddresses = [
  "https://api.spotify.com/v1"
] as const;

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type SdkConfig<
  F extends BaseFetch = typeof fetch
> = Optional<SdkConfigFor<operations, F>, 'address'>;

export function createSdk<
  F extends BaseFetch
>(arg?: Address | SdkConfig<F>): Sdk<F> {
  const config =
    typeof arg == 'string' || arg instanceof URL || (arg && 'port' in arg)
      ? {address: arg}
      : {address: "https://api.spotify.com/v1", ...arg};
  return createSdkFor<operations, F>(allOperations, config);
}
