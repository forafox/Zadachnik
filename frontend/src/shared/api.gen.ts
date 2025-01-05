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

export interface UpdateSprintRequest {
  /** @format int32 */
  length: number;
  /** @format date-time */
  startsAt: string;
  tasksIds: Array<number>;
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

export interface UpdateMeetingRequest {
  type: "DAILY" | "PLANNING" | "REVIEW" | "RETROSPECTIVE";
  agenda: string;
  /** @format date-time */
  date: string;
}

export interface UpdateProductInvitationRequest {
  status: "PENDING" | "ACCEPTED" | "REJECTED";
}

export interface UpdateTeamInvitationRequest {
  status: "PENDING" | "ACCEPTED" | "REJECTED";
}

export interface TeamResponse {
  /** @format int64 */
  id: number;
  title: string;
  scrumMaster: UserResponse;
}

export interface UserResponse {
  /** @format int64 */
  id: number;
  username: string;
  fullName: string;
  role: "USER" | "ADMIN";
}

export interface UpdateTeamRequest {
  title: string;
}

export interface TaskResponse {
  /** @format int64 */
  id: number;
  type: "TASK" | "STORY" | "EPIC";
  title: string;
  description?: string;
  assignee?: UserResponse;
  status: string;
}

export interface CreateTaskRequest {
  type: string;
  title: string;
  description?: string;
  status: string;
  /** @format int64 */
  assigneeId?: number;
}

export interface ProductResponse {
  /** @format int64 */
  id: number;
  ticker: string;
  title: string;
  description?: string;
  owner: UserResponse;
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
    accept?: Array<MediaType>;
    acceptLanguage?: Array<{
      range?: string;
      /** @format double */
      weight?: number;
    }>;
    empty?: boolean;
    /** @format uri */
    location?: string;
    host?: {
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
      hostString?: string;
    };
    all?: Record<string, string>;
    /** @format int64 */
    lastModified?: number;
    /** @format int64 */
    date?: number;
    /** @format int64 */
    contentLength?: number;
    origin?: string;
    range?: Array<HttpRange>;
    contentDisposition?: ContentDisposition;
    acceptCharset?: Array<string>;
    acceptPatch?: Array<MediaType>;
    /** @uniqueItems true */
    allow?: Array<HttpMethod>;
    basicAuth?: string;
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
    cacheControl?: string;
    accessControlAllowOrigin?: string;
    accessControlAllowMethods?: Array<HttpMethod>;
    accessControlAllowHeaders?: Array<string>;
    accessControlExposeHeaders?: Array<string>;
    accessControlAllowCredentials?: boolean;
    /** @format int64 */
    accessControlMaxAge?: number;
    accessControlRequestMethod?: HttpMethod;
    accessControlRequestHeaders?: Array<string>;
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
    pragma?: string;
    upgrade?: string;
    vary?: Array<string>;
    connection?: Array<string>;
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
  charset?: string;
  wildcardType?: boolean;
  wildcardSubtype?: boolean;
  subtypeSuffix?: string;
  concrete?: boolean;
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

export interface UpdateArticleRequest {
  content: string;
}

export interface CreateTeamRequest {
  title: string;
}

export interface SprintResponse {
  /** @format int64 */
  id: number;
  /** @format int32 */
  length: number;
  /** @format date-time */
  startAt: string;
  /** @format date-time */
  planningDateTime: string;
  /** @format date-time */
  retroDateTime: string;
  /** @format date-time */
  reviewDateTime: string;
}

export interface CreateSprintRequest {
  /** @format date-time */
  startsAt: string;
  /** @format int32 */
  length: number;
  tasksIds: Array<number>;
  /** @format date-time */
  planningDateTime: string;
  /** @format date-time */
  retroDateTime: string;
  /** @format date-time */
  reviewDateTime: string;
}

export interface CreateArticleRequest {
  content: string;
}

export interface CreateCommentRequest {
  content: string;
}

export interface TeamMeetingResponse {
  /** @format int64 */
  id: number;
  type: "DAILY" | "PLANNING" | "REVIEW" | "RETROSPECTIVE";
  agenda: string;
  team: TeamResponse;
  /** @uniqueItems true */
  users: Array<UserResponse>;
}

export interface CreateTeamMeetingRequest {
  type: "DAILY" | "PLANNING" | "REVIEW" | "RETROSPECTIVE";
  agenda: string;
  /** @format date-time */
  date: string;
}

export interface CreateProductRequest {
  ticker: string;
  title: string;
  description?: string;
}

export interface CreateProductReleaseRequest {
  version: string;
  releaseNotes: string;
  /** @format int64 */
  sprintId: number;
  tasks: Array<TaskToReleaseRequest>;
}

export interface TaskToReleaseRequest {
  /** @format int64 */
  id: number;
}

export interface SignUpRequest {
  username: string;
  fullName: string;
  password: string;
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

export interface PageTeamResponse {
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  totalPages?: number;
  /** @format int32 */
  size?: number;
  content?: Array<TeamResponse>;
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

export interface PageTaskChangeResponse {
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  totalPages?: number;
  /** @format int32 */
  size?: number;
  content?: Array<TaskChangeResponse>;
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

export interface TaskChangeResponse {
  field: "ID" | "TYPE" | "TITLE" | "DESCRIPTION" | "PRODUCT";
  previousValue: object;
  newValue: object;
  changedBy: UserResponse;
  /** @format date-time */
  changedAt: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
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

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
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

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8080" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
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
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
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

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
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
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Sprints API
     * @name GetSprintsByTeamIdAndSprintId
     * @request GET:/api/teams/{teamId}/sprints/{sprintId}
     * @secure
     */
    getSprintsByTeamIdAndSprintId: (teamId: number, sprintId: number, params: RequestParams = {}) =>
      this.request<any, ErrorMessage>({
        path: `/api/teams/${teamId}/sprints/${sprintId}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Sprints API
     * @name UpdateSprintByTeamIdAndSprintId
     * @request PUT:/api/teams/{teamId}/sprints/{sprintId}
     * @secure
     */
    updateSprintByTeamIdAndSprintId: (
      teamId: number,
      sprintId: number,
      data: UpdateSprintRequest,
      params: RequestParams = {},
    ) =>
      this.request<any, ErrorMessage>({
        path: `/api/teams/${teamId}/sprints/${sprintId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Sprints API
     * @name UpdateMeetingBySprintIdAndMeetingType
     * @request PUT:/api/teams/{teamId}/sprints/{sprintId}/meeting
     * @secure
     */
    updateMeetingBySprintIdAndMeetingType: (
      teamId: number,
      sprintId: number,
      data: UpdateMeetingRequest,
      params: RequestParams = {},
    ) =>
      this.request<any, ErrorMessage>({
        path: `/api/teams/${teamId}/sprints/${sprintId}/meeting`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products Invitations API
     * @name GetProductInvitation
     * @request GET:/api/teams/{teamId}/product-invitations/{productId}
     * @secure
     */
    getProductInvitation: (
      teamId: number,
      productId: number,
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
      this.request<any, ErrorMessage>({
        path: `/api/teams/${teamId}/product-invitations/${productId}`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products Invitations API
     * @name UpdateProductInvitation
     * @request PUT:/api/teams/{teamId}/product-invitations/{productId}
     * @secure
     */
    updateProductInvitation: (
      teamId: number,
      productId: number,
      data: UpdateProductInvitationRequest,
      params: RequestParams = {},
    ) =>
      this.request<any, ErrorMessage>({
        path: `/api/teams/${teamId}/product-invitations/${productId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products Invitations API
     * @name CreateProductInvitation
     * @request POST:/api/teams/{teamId}/product-invitations/{productId}
     * @secure
     */
    createProductInvitation: (teamId: number, productId: number, params: RequestParams = {}) =>
      this.request<any, ErrorMessage>({
        path: `/api/teams/${teamId}/product-invitations/${productId}`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Teams Invitations API
     * @name UpdateTeamInvitation
     * @request PUT:/api/teams/{teamId}/developer-invitations/{userId}
     * @secure
     */
    updateTeamInvitation: (
      teamId: number,
      userId: number,
      data: UpdateTeamInvitationRequest,
      params: RequestParams = {},
    ) =>
      this.request<any, ErrorMessage>({
        path: `/api/teams/${teamId}/developer-invitations/${userId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Teams Invitations API
     * @name CreateTeamInvitation
     * @request POST:/api/teams/{teamId}/developer-invitations/{userId}
     * @secure
     */
    createTeamInvitation: (teamId: number, userId: number, params: RequestParams = {}) =>
      this.request<any, ErrorMessage>({
        path: `/api/teams/${teamId}/developer-invitations/${userId}`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description Get team by id
     *
     * @tags Teams API
     * @name GetTeamById
     * @summary Get team by id
     * @request GET:/api/teams/{id}
     * @secure
     */
    getTeamById: (id: number, params: RequestParams = {}) =>
      this.request<TeamResponse, ErrorMessage | TeamResponse>({
        path: `/api/teams/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update team by id
     *
     * @tags Teams API
     * @name UpdateTeamById
     * @summary Update team by id
     * @request PUT:/api/teams/{id}
     * @secure
     */
    updateTeamById: (id: number, data: UpdateTeamRequest, params: RequestParams = {}) =>
      this.request<TeamResponse, ErrorMessage | TeamResponse>({
        path: `/api/teams/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get task by id
     *
     * @tags Tasks API
     * @name GetTaskById
     * @summary Get task by id
     * @request GET:/api/products/{productId}/tasks/{taskId}
     * @secure
     */
    getTaskById: (taskId: number, productId: number, params: RequestParams = {}) =>
      this.request<TaskResponse, ErrorMessage | TaskResponse>({
        path: `/api/products/${productId}/tasks/${taskId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update task by id
     *
     * @tags Tasks API
     * @name UpdateTaskById
     * @summary Update task by id
     * @request PUT:/api/products/{productId}/tasks/{taskId}
     * @secure
     */
    updateTaskById: (taskId: number, productId: number, data: CreateTaskRequest, params: RequestParams = {}) =>
      this.request<TaskResponse, ErrorMessage | TaskResponse>({
        path: `/api/products/${productId}/tasks/${taskId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

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
      this.request<ProductResponse, ErrorMessage | ErrorResponse>({
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
    updateProductById: (id: number, data: UpdateProductRequest, params: RequestParams = {}) =>
      this.request<ProductResponse, ErrorMessage | ErrorResponse>({
        path: `/api/products/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Articles API
     * @name GetArticle
     * @request GET:/api/articles/{id}
     * @secure
     */
    getArticle: (id: number, params: RequestParams = {}) =>
      this.request<any, ErrorMessage>({
        path: `/api/articles/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Articles API
     * @name UpdateArticle
     * @request PUT:/api/articles/{id}
     * @secure
     */
    updateArticle: (id: number, data: UpdateArticleRequest, params: RequestParams = {}) =>
      this.request<any, ErrorMessage>({
        path: `/api/articles/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Get paginated teams
     *
     * @tags Teams API
     * @name GetTeams
     * @summary Get teams with pagination
     * @request GET:/api/teams
     * @secure
     */
    getTeams: (
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
      this.request<Page, ErrorMessage | PageTeamResponse>({
        path: `/api/teams`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new team
     *
     * @tags Teams API
     * @name CreateTeam
     * @summary Create Team
     * @request POST:/api/teams
     * @secure
     */
    createTeam: (data: CreateTeamRequest, params: RequestParams = {}) =>
      this.request<TeamResponse, ErrorMessage>({
        path: `/api/teams`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Sprints API
     * @name GetSprintsByTeamId
     * @request GET:/api/teams/{teamId}/sprints
     * @secure
     */
    getSprintsByTeamId: (
      teamId: number,
      query?: {
        /**
         * @format int32
         * @default 0
         */
        pageNumber?: number;
        /**
         * @format int32
         * @default 10
         */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, ErrorMessage>({
        path: `/api/teams/${teamId}/sprints`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Create a new sprint
     *
     * @tags Sprints API
     * @name CreateSprint
     * @summary Create Sprint
     * @request POST:/api/teams/{teamId}/sprints
     * @secure
     */
    createSprint: (teamId: number, data: CreateSprintRequest, params: RequestParams = {}) =>
      this.request<SprintResponse, ErrorMessage>({
        path: `/api/teams/${teamId}/sprints`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Teams API
     * @name CreateArticle
     * @request POST:/api/teams/{teamId}/meetings/{meetingId}/minutes
     * @secure
     */
    createArticle: (meetingId: number, teamId: number, data: CreateArticleRequest, params: RequestParams = {}) =>
      this.request<any, ErrorMessage>({
        path: `/api/teams/${teamId}/meetings/${meetingId}/minutes`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Teams API
     * @name GetCommentsByArticleId
     * @request GET:/api/teams/{teamId}/meetings/{meetingId}/minutes/{articleId}/comments
     * @secure
     */
    getCommentsByArticleId: (
      meetingId: number,
      teamId: number,
      articleId: number,
      query?: {
        /** @format int32 */
        page?: number;
        /** @format int32 */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, ErrorMessage>({
        path: `/api/teams/${teamId}/meetings/${meetingId}/minutes/${articleId}/comments`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Teams API
     * @name CreateComment
     * @request POST:/api/teams/{teamId}/meetings/{meetingId}/minutes/{articleId}/comments
     * @secure
     */
    createComment: (
      meetingId: number,
      teamId: number,
      articleId: number,
      data: CreateCommentRequest,
      params: RequestParams = {},
    ) =>
      this.request<any, ErrorMessage>({
        path: `/api/teams/${teamId}/meetings/${meetingId}/minutes/${articleId}/comments`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Create team meeting
     *
     * @tags Teams API
     * @name CreateTeamMeeting
     * @summary Create team meeting
     * @request POST:/api/teams/{id}/meetings
     * @secure
     */
    createTeamMeeting: (id: number, data: CreateTeamMeetingRequest, params: RequestParams = {}) =>
      this.request<TeamMeetingResponse, ErrorMessage>({
        path: `/api/teams/${id}/meetings`,
        method: "POST",
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
      this.request<PageProductResponse, ErrorMessage | PageProductResponse>({
        path: `/api/products`,
        method: "GET",
        query: query,
        secure: true,
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
      this.request<ProductResponse, ErrorMessage>({
        path: `/api/products`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products API
     * @name GetTasksByProductId
     * @request GET:/api/products/{productId}/tasks
     * @secure
     */
    getTasksByProductId: (
      productId: number,
      query?: {
        /** @format int64 */
        assigneeId?: number;
        status?: string;
        /** @format int64 */
        teamId?: number;
        /**
         * @format int32
         * @default 0
         */
        pageNumber?: number;
        /**
         * @format int32
         * @default 10
         */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, ErrorMessage>({
        path: `/api/products/${productId}/tasks`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Create a new task
     *
     * @tags Tasks API
     * @name CreateTask
     * @summary Create task
     * @request POST:/api/products/{productId}/tasks
     * @secure
     */
    createTask: (productId: number, data: CreateTaskRequest, params: RequestParams = {}) =>
      this.request<TaskResponse, ErrorMessage>({
        path: `/api/products/${productId}/tasks`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tasks API
     * @name GetCommentsByTaskId
     * @request GET:/api/products/{productId}/tasks/{taskId}/comments
     * @secure
     */
    getCommentsByTaskId: (
      productId: number,
      taskId: number,
      query?: {
        /** @format int32 */
        page?: number;
        /** @format int32 */
        size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, ErrorMessage>({
        path: `/api/products/${productId}/tasks/${taskId}/comments`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tasks API
     * @name CreateComment1
     * @request POST:/api/products/{productId}/tasks/{taskId}/comments
     * @secure
     */
    createComment1: (productId: number, taskId: number, data: CreateCommentRequest, params: RequestParams = {}) =>
      this.request<any, ErrorMessage>({
        path: `/api/products/${productId}/tasks/${taskId}/comments`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products Releases API
     * @name GetProductReleases
     * @request GET:/api/products/{productId}/releases
     * @secure
     */
    getProductReleases: (
      productId: number,
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
      this.request<any, ErrorMessage>({
        path: `/api/products/${productId}/releases`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products Releases API
     * @name CreateProductRelease
     * @request POST:/api/products/{productId}/releases
     * @secure
     */
    createProductRelease: (productId: number, data: CreateProductReleaseRequest, params: RequestParams = {}) =>
      this.request<any, ErrorMessage>({
        path: `/api/products/${productId}/releases`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
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
     * No description
     *
     * @tags User Management
     * @name GetUsersOfTeams
     * @request GET:/api/teams/{teamId}/users
     * @secure
     */
    getUsersOfTeams: (
      teamId: number,
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
      this.request<PageUserResponse, any>({
        path: `/api/teams/${teamId}/users`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Teams API
     * @name GetTasksByTeamId
     * @request GET:/api/teams/{teamId}/tasks
     * @secure
     */
    getTasksByTeamId: (teamId: number, params: RequestParams = {}) =>
      this.request<any, ErrorMessage>({
        path: `/api/teams/${teamId}/tasks`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Sprints API
     * @name GetSprintTasks
     * @request GET:/api/teams/{teamId}/sprints/{sprintId}/tasks
     * @secure
     */
    getSprintTasks: (
      teamId: number,
      sprintId: number,
      query?: {
        /** @format int64 */
        assigneeId?: number;
        /** @format int64 */
        productId?: number;
        status?: string;
        /**
         * @format int32
         * @default 0
         */
        pageNumber?: number;
        /**
         * @format int32
         * @default 10
         */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, ErrorMessage>({
        path: `/api/teams/${teamId}/sprints/${sprintId}/tasks`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Teams Invitations API
     * @name GetTeamInvitation
     * @request GET:/api/teams/{teamId}/developer-invitations
     * @secure
     */
    getTeamInvitation: (
      teamId: number,
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
      this.request<any, ErrorMessage>({
        path: `/api/teams/${teamId}/developer-invitations`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products API
     * @name GetProductTeams
     * @request GET:/api/products/{productId}/teams
     * @secure
     */
    getProductTeams: (
      productId: number,
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
      this.request<any, ErrorMessage>({
        path: `/api/products/${productId}/teams`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Get task changes
     *
     * @tags Tasks API
     * @name GetTaskChanges
     * @summary Get task changes
     * @request GET:/api/products/{productId}/tasks/{taskId}/history
     * @secure
     */
    getTaskChanges: (
      taskId: number,
      productId: number,
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
      this.request<Page, ErrorMessage | PageTaskChangeResponse>({
        path: `/api/products/${productId}/tasks/${taskId}/history`,
        method: "GET",
        query: query,
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

    /**
     * @description Get teams of current user
     *
     * @tags User Management
     * @name GetTeamsOfCurrentUser
     * @summary Get teams of current user
     * @request GET:/api/me/teams
     * @secure
     */
    getTeamsOfCurrentUser: (
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
      this.request<Page, PageTeamResponse>({
        path: `/api/me/teams`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get products of current user
     *
     * @tags User Management
     * @name GetProductsOfCurrentUser
     * @summary Get products of current user
     * @request GET:/api/me/products
     * @secure
     */
    getProductsOfCurrentUser: (
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
      this.request<Page, PageProductResponse>({
        path: `/api/me/products`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
