/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ProductResponse {
  /** @format int64 */
  id: number;
  ticker: string;
  title: string;
  description?: string;
  owner: UserResponse;
}

export interface UserResponse {
  /** @format int64 */
  id: number;
  username: string;
  fullName: string;
  role: "USER" | "ADMIN";
}

export interface ContentDisposition {
  type?: string;
  name?: string;
  filename?: string;
  charset?: string;
  /**
   * @deprecated
   * @format int64
   */
  size?: number;
  /**
   * @deprecated
   * @format date-time
   */
  creationDate?: string;
  /**
   * @deprecated
   * @format date-time
   */
  modificationDate?: string;
  /**
   * @deprecated
   * @format date-time
   */
  readDate?: string;
  inline?: boolean;
  attachment?: boolean;
  formData?: boolean;
}

export interface ErrorResponse {
  body?: ProblemDetail;
  statusCode?: HttpStatusCode;
  detailMessageArguments?: Array<object>;
  typeMessageCode?: string;
  detailMessageCode?: string;
  titleMessageCode?: string;
  headers?: {
    contentDisposition?: ContentDisposition;
    acceptCharset?: Array<string>;
    /** @format uri */
    location?: string;
    range?: Array<HttpRange>;
    accept?: Array<MediaType>;
    acceptLanguageAsLocales?: Array<{
      language?: string;
      displayName?: string;
      country?: string;
      variant?: string;
      script?: string;
      /** @uniqueItems true */
      extensionKeys?: Array<string>;
      /** @uniqueItems true */
      unicodeLocaleAttributes?: Array<string>;
      /** @uniqueItems true */
      unicodeLocaleKeys?: Array<string>;
      iso3Language?: string;
      iso3Country?: string;
      displayLanguage?: string;
      displayScript?: string;
      displayCountry?: string;
      displayVariant?: string;
    }>;
    acceptPatch?: Array<MediaType>;
    accessControlAllowCredentials?: boolean;
    accessControlAllowHeaders?: Array<string>;
    accessControlAllowMethods?: Array<HttpMethod>;
    accessControlAllowOrigin?: string;
    accessControlExposeHeaders?: Array<string>;
    /** @format int64 */
    accessControlMaxAge?: number;
    accessControlRequestHeaders?: Array<string>;
    accessControlRequestMethod?: HttpMethod;
    bearerAuth?: string;
    contentLanguage?: {
      language?: string;
      displayName?: string;
      country?: string;
      variant?: string;
      script?: string;
      /** @uniqueItems true */
      extensionKeys?: Array<string>;
      /** @uniqueItems true */
      unicodeLocaleAttributes?: Array<string>;
      /** @uniqueItems true */
      unicodeLocaleKeys?: Array<string>;
      iso3Language?: string;
      iso3Country?: string;
      displayLanguage?: string;
      displayScript?: string;
      displayCountry?: string;
      displayVariant?: string;
    };
    etag?: string;
    /** @format int64 */
    expires?: number;
    ifMatch?: Array<string>;
    ifNoneMatch?: Array<string>;
    /** @format int64 */
    ifUnmodifiedSince?: number;
    origin?: string;
    pragma?: string;
    upgrade?: string;
    vary?: Array<string>;
    empty?: boolean;
    host?: {
      hostString?: string;
      address?: {
        hostAddress?: string;
        /** @format byte */
        address?: string;
        hostName?: string;
        linkLocalAddress?: boolean;
        multicastAddress?: boolean;
        anyLocalAddress?: boolean;
        loopbackAddress?: boolean;
        siteLocalAddress?: boolean;
        mcglobal?: boolean;
        mcnodeLocal?: boolean;
        mclinkLocal?: boolean;
        mcsiteLocal?: boolean;
        mcorgLocal?: boolean;
        canonicalHostName?: string;
      };
      /** @format int32 */
      port?: number;
      unresolved?: boolean;
      hostName?: string;
    };
    all?: Record<string, string>;
    /** @format int64 */
    lastModified?: number;
    /** @format int64 */
    date?: number;
    /** @format int64 */
    contentLength?: number;
    /** @uniqueItems true */
    allow?: Array<HttpMethod>;
    cacheControl?: string;
    connection?: Array<string>;
    acceptLanguage?: Array<{
      range?: string;
      /** @format double */
      weight?: number;
    }>;
    basicAuth?: string;
    contentType?: MediaType;
    /** @format int64 */
    ifModifiedSince?: number;
    [key: string]: any;
  };
}

export type HttpMethod = object;

export type HttpRange = object;

export interface HttpStatusCode {
  error?: boolean;
  is4xxClientError?: boolean;
  is5xxServerError?: boolean;
  is1xxInformational?: boolean;
  is2xxSuccessful?: boolean;
  is3xxRedirection?: boolean;
}

export interface MediaType {
  type?: string;
  subtype?: string;
  parameters?: Record<string, string>;
  /** @format double */
  qualityValue?: number;
  wildcardType?: boolean;
  wildcardSubtype?: boolean;
  subtypeSuffix?: string;
  concrete?: boolean;
  charset?: string;
}

export interface ProblemDetail {
  /** @format uri */
  type?: string;
  title?: string;
  /** @format int32 */
  status?: number;
  detail?: string;
  /** @format uri */
  instance?: string;
  properties?: Record<string, object>;
}

export interface UpdateProductRequest {
  ticker: string;
  title: string;
  description?: string;
}

/** JWT Response */
export interface JwtResponse {
  /**
   * User ID
   * @format int64
   */
  id: number;
  /** Username */
  username: string;
  /** Access token */
  accessToken: string;
  /** Refresh token */
  refreshToken: string;
}

/** Error message model */
export interface ErrorMessage {
  /**
   * @format int32
   * @example 404
   */
  statusCode: number;
  /**
   * @format date-time
   * @example "2024-04-11T12:00:00Z"
   */
  timestamp: string;
  /** @example "Resource not found" */
  description: string;
  /** @example "The requested resource could not be found" */
  message: string;
}

export interface CreateProductRequest {
  ticker: string;
  title: string;
  description?: string;
}

export interface SignUpRequest {
  username: string;
  fullName: string;
  password: string;
}

export interface SignInRequest {
  username: string;
  password: string;
}

export interface Page {
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  totalPages?: number;
  /** @format int32 */
  size?: number;
  content?: Array<object>;
  /** @format int32 */
  number?: number;
  sort?: Array<SortObject>;
  /** @format int32 */
  numberOfElements?: number;
  pageable?: PageableObject;
  last?: boolean;
  first?: boolean;
  empty?: boolean;
}

export interface PageableObject {
  /** @format int64 */
  offset?: number;
  sort?: Array<SortObject>;
  paged?: boolean;
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  unpaged?: boolean;
}

export interface SortObject {
  direction?: string;
  nullHandling?: string;
  ascending?: boolean;
  property?: string;
  ignoreCase?: boolean;
}

export interface PageUserResponse {
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  totalPages?: number;
  /** @format int32 */
  size?: number;
  content?: Array<UserResponse>;
  /** @format int32 */
  number?: number;
  sort?: Array<SortObject>;
  /** @format int32 */
  numberOfElements?: number;
  pageable?: PageableObject;
  last?: boolean;
  first?: boolean;
  empty?: boolean;
}

/** DTO for read operations on the current user */
export interface GetMeResponse {
  /**
   * The username of the user
   * @example "j.doe"
   */
  username: string;
  /**
   * The full name of the user
   * @example "John Doe"
   */
  fullName: string;
  /**
   * The ID of the user
   * @format int64
   * @example 1
   */
  id: number;
  /**
   * The role of the user
   * @example "ADMIN"
   */
  role: "USER" | "ADMIN";
}

export interface PageProductResponse {
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  totalPages?: number;
  /** @format int32 */
  size?: number;
  content?: Array<ProductResponse>;
  /** @format int32 */
  number?: number;
  sort?: Array<SortObject>;
  /** @format int32 */
  numberOfElements?: number;
  pageable?: PageableObject;
  last?: boolean;
  first?: boolean;
  empty?: boolean;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "http://localhost:8080",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Information systems course
 * @version 1.0.0
 * @baseUrl http://localhost:8080
 *
 * Sample API
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Get product by id
     *
     * @tags Products API
     * @name GetProductById
     * @summary Get product by id
     * @request GET:/api/products/{id}
     * @secure
     */
    getProductById: (id: number, params: RequestParams = {}) =>
      this.request<JwtResponse, ErrorMessage | ErrorResponse>({
        path: `/api/products/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update product by id
     *
     * @tags Products API
     * @name UpdateProductById
     * @summary Update product by id
     * @request PUT:/api/products/{id}
     * @secure
     */
    updateProductById: (
      id: number,
      data: UpdateProductRequest,
      params: RequestParams = {},
    ) =>
      this.request<JwtResponse, ErrorMessage | ErrorResponse>({
        path: `/api/products/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get paginated products
     *
     * @tags Products API
     * @name GetProducts
     * @summary Get products with pagination
     * @request GET:/api/products
     * @secure
     */
    getProducts: (
      query?: {
        /**
         * @format int32
         * @default 0
         */
        page?: number;
        /**
         * @format int32
         * @default 10
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Page, ErrorMessage | PageProductResponse>({
        path: `/api/products`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new product
     *
     * @tags Products API
     * @name CreateProduct
     * @summary Create Product
     * @request POST:/api/products
     * @secure
     */
    createProduct: (data: CreateProductRequest, params: RequestParams = {}) =>
      this.request<JwtResponse, ErrorMessage>({
        path: `/api/products`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Registers a new user with provided details and generates JWT token
     *
     * @tags Authorization and Registration
     * @name Register
     * @summary User registration
     * @request POST:/api/auth/register
     */
    register: (data: SignUpRequest, params: RequestParams = {}) =>
      this.request<JwtResponse, ErrorMessage>({
        path: `/api/auth/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Refreshes JWT token based on provided refresh token
     *
     * @tags Authorization and Registration
     * @name Refresh
     * @summary Refresh token
     * @request POST:/api/auth/refresh
     */
    refresh: (data: string, params: RequestParams = {}) =>
      this.request<JwtResponse, ErrorMessage>({
        path: `/api/auth/refresh`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Authenticates user based on provided credentials and generates JWT token
     *
     * @tags Authorization and Registration
     * @name Login
     * @summary User login
     * @request POST:/api/auth/login
     */
    login: (data: SignInRequest, params: RequestParams = {}) =>
      this.request<JwtResponse, ErrorMessage>({
        path: `/api/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get paginated users with optional fuzzy search by fullName or username
     *
     * @tags User Management
     * @name GetUsers
     * @summary Get users with pagination and search
     * @request GET:/api/users
     * @secure
     */
    getUsers: (
      query?: {
        /** @default "" */
        search?: string;
        /**
         * @format int32
         * @default 0
         */
        page?: number;
        /**
         * @format int32
         * @default 10
         */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Page, PageUserResponse>({
        path: `/api/users`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get user by id
     *
     * @tags User Management
     * @name GetUserById
     * @summary Get user by id
     * @request GET:/api/users/{id}
     * @secure
     */
    getUserById: (id: number, params: RequestParams = {}) =>
      this.request<GetMeResponse, GetMeResponse>({
        path: `/api/users/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get current user
     *
     * @tags User Management
     * @name Me
     * @summary Get current user
     * @request GET:/api/me
     * @secure
     */
    me: (params: RequestParams = {}) =>
      this.request<GetMeResponse, GetMeResponse>({
        path: `/api/me`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
}
