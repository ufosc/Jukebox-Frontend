import { z } from 'zod'

export type ApiSuccess<T> = T
export type ApiError<T = any> = {
  message: string
  type?: string
  errors?: { attr?: keyof T; code?: string; detail: string }[]
}

export interface PaginatedObject<T> {
  count: number
  offset: number
  /** URL to get next page */
  next: string
  /** URL to get previous page */
  previous: string
  results: T
}

export type ApiStandardResponse<T> =
  | { success: true; paginated?: false; data: ApiSuccess<T>; status?: number }
  | { success: false; paginated?: false; data: ApiError<T>; status?: number }

export type ApiPaginatedResponse<T> =
  | {
      success: true
      paginated: true
      data: ApiSuccess<PaginatedObject<T>>
      status?: number
    }
  | { success: false; paginated: false; data: ApiError<T>; status?: number }

export type ApiResponse<T> = ApiStandardResponse<T> | ApiPaginatedResponse<T>

export type ApiPromise<T> = Promise<ApiStandardResponse<T>>

export interface ApiRequestConfigBase<T = unknown, B = any> {
  /** Zod schema to validate/parse response with */
  schema?: z.Schema<T>
  /** What mock data to use when in dev mode */
  mock?: { data: T | null; errorIfEmpty?: boolean }
  /** Public if the route can be accessed without a user token */
  isPublic?: boolean
  /** Request headers */
  headers?: Record<string, string>
  /** Request body */
  body?: B
  /** Credential settings to pass into the fetch request */
  credentials?: RequestCredentials
  isPaginated?: boolean
}

export interface RequestFactoryConfig<T> {
  mockData: T[]
  detailSchema?: z.Schema<T>
  listSchema?: z.Schema<T[]>
  isPaginated?: true | false
}

export interface ApiRequestStandardConfig<T = unknown, B = any>
  extends ApiRequestConfigBase<T, B> {
  /** Object can be queried by offset and limit, and returns a paginated object */
  isPaginated?: false
}

export interface ApiRequestPaginatedConfig<T = unknown, B = any>
  extends ApiRequestConfigBase<T, B> {
  /** Object can be queried by offset and limit, and returns a paginated object */
  isPaginated: true
}

export type ApiRequestConfig<T = unknown, B = any> =
  | ApiRequestStandardConfig<T, B>
  | ApiRequestPaginatedConfig<T, B>
