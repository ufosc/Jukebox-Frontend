import { MOCK_DELAY_MS, REACT_ENV } from 'src/config/consts'
import { sleep } from 'src/utils'
import { z } from 'zod'
import {
  ApiError,
  ApiPaginatedResponse,
  ApiRequestConfig,
  ApiRequestPaginatedConfig,
  ApiRequestStandardConfig,
  ApiResponse,
  ApiStandardResponse,
  PaginatedObject,
  RequestFactoryConfig,
} from './ApiTypes'
import { ApiEndpoints } from './Endpoints'

export abstract class ApiBase {
  protected static instance: ApiBase
  readonly endpoints = ApiEndpoints
  private extraCookies: Record<string, string> = {}
  readonly timezone: string
  protected abstract token: string | null

  protected constructor() {
    this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone // e.g. "America/New_York"
    this.extraCookies['user_timezone'] = this.timezone
  }

  public static getInstance: () => ApiBase

  protected mockDelay = MOCK_DELAY_MS
  readonly env = REACT_ENV

  private prepareRequestBody(data?: any): string | FormData {
    if (data == null || typeof data === 'string' || data instanceof FormData) {
      return data
    }
    return JSON.stringify(data)
  }

  private async getResponseData(response: Response) {
    if (!response.body) {
      return undefined
    }

    let data
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      data = await response.json()
    } else if (contentType && contentType.includes('text')) {
      data = await response.text()
    } else {
      data = await response.blob()
    }

    return data
  }

  /**
   * Automatically create standard CRUD api accessors for
   * a specific resource.
   *
   * @param url - The url to the resource
   * @param config - The configuration for the resource
   * @returns The resource factory
   *
   * R - read detail type (detail type) if not R then it is a list type
   * C - create type (default is the same as R (detail type))
   * U - update type (default is the same as R (detail type))
   */

  protected resourceFactory<R extends { id: number }, C = R, U = R>(
    url: string,
    config?: RequestFactoryConfig<R>,
  ) {
    const { mockData, detailSchema } = config ?? { mockData: [] }
    let { listSchema } = config ?? {}

    if (detailSchema && !listSchema) {
      listSchema = z.array(detailSchema)
    }

    return {
      create: async (data: C) => {
        return await this.post<R>(url, {
          body: data,
          schema: detailSchema,
          mock: { data: { ...(config?.mockData[0] as any), ...data } },
        })
      },
      list: async () => {
        return await this.get<R[]>(url, {
          schema: listSchema,
          mock: { data: mockData as any },
        })
      },
      detail: async (id: number) => {
        return await this.get<R>(url + `${id}/`, {
          schema: detailSchema,
          mock: {
            data: mockData.find((m) => m.id === id) || null,
            errorIfEmpty: true,
          },
        })
      },
      update: async (id: number, data: U) => {
        return await this.patch<R>(url + `${id}/`, {
          body: data,
          schema: detailSchema,
          mock: {
            data: {
              ...(data as any),
              ...(mockData.find((m) => m.id === id) || {}),
            },
            errorIfEmpty: true,
          },
        })
      },
      delete: async (id: number) => {
        return await this.delete<R>(url + `${id}/`)
      },
    }
  }

  protected nestedResourceFactory<R extends { id: number }, C = R, U = R>(
    url: (parentId: number) => string,
    config?: RequestFactoryConfig<R>,
  ) {
    const { mockData, detailSchema } = config ?? { mockData: [] }
    let { listSchema } = config ?? {}

    if (detailSchema && !listSchema) {
      listSchema = z.array(detailSchema)
    }

    return {
      create: async (parentId: number, data: C) => {
        return await this.post<R>(url(parentId), {
          body: data,
          schema: detailSchema,
          mock: { data: { ...(config?.mockData[0] as any), ...data } },
        })
      },
      list: async (parentId: number) => {
        return await this.get<R[]>(url(parentId), {
          schema: listSchema,
          mock: { data: mockData as any },
        })
      },
      detail: async (parentId: number, id: number) => {
        return await this.get<R>(url(parentId), {
          schema: detailSchema,
          mock: {
            data: mockData.find((m) => m.id === id) || null,
            errorIfEmpty: true,
          },
        })
      },
      update: async (parentId: number, id: number, data: U) => {
        return await this.patch<R>(url(parentId) + `${id}/`, {
          body: data,
          schema: detailSchema,
          mock: {
            data: {
              ...(data as any),
              ...(mockData.find((m) => m.id === id) || {}),
            },
            errorIfEmpty: true,
          },
        })
      },
      delete: async (parentId: number, id: number) => {
        return await this.delete<R>(url(parentId) + `${id}/`)
      },
    }
  }

  protected doubleNestedResourceFactory<R extends { id: number }, C = R, U = R>(
    url: (outerParentId: number, innerParentId: number) => string,
    config?: RequestFactoryConfig<R>,
  ) {
    const { mockData, detailSchema } = config ?? { mockData: [] }
    let { listSchema } = config ?? {}

    if (detailSchema && !listSchema) {
      listSchema = z.array(detailSchema)
    }

    return {
      create: async (outerParentId: number, innerParentId: number, data: C) => {
        return await this.post<R>(url(outerParentId, innerParentId), {
          body: data,
          schema: detailSchema,
          mock: { data: { ...(config?.mockData[0] as any), ...data } },
        })
      },
      list: async (outerParentId: number, innerParentId: number) => {
        return await this.get<R[]>(url(outerParentId, innerParentId), {
          schema: listSchema,
          mock: { data: mockData as any },
        })
      },
      detail: async (
        outerParentId: number,
        innerParentId: number,
        id: number,
      ) => {
        return await this.get<R>(url(outerParentId, innerParentId), {
          schema: detailSchema,
          mock: {
            data: mockData.find((m) => m.id === id) || null,
            errorIfEmpty: true,
          },
        })
      },
      update: async (
        outerParentId: number,
        innerParentId: number,
        id: number,
        data: U,
      ) => {
        return await this.patch<R>(
          url(outerParentId, innerParentId) + `${id}/`,
          {
            body: data,
            schema: detailSchema,
            mock: {
              data: {
                ...(data as any),
                ...(mockData.find((m) => m.id === id) || {}),
              },
              errorIfEmpty: true,
            },
          },
        )
      },
      delete: async (
        outerParentId: number,
        innerParentId: number,
        id: number,
      ) => {
        return await this.delete<R>(
          url(outerParentId, innerParentId) + `${id}/`,
        )
      },
    }
  }

  private joinErrors(errors: ApiError['errors']) {
    try {
      return (
        errors
          ?.map((err) => {
            if (err.attr) {
              return `${String(err.attr)}: ${err.detail}`
            } else {
              return `${err.detail}`
            }
          })
          .join(', ') ?? ''
      )
    } catch {
      return ''
    }
  }

  /**
   * Run zod validation for response data.
   */
  private parseSchema(schema: z.Schema, body: any) {
    // return schema.parse(body);
    const res = schema.safeParse(body, {})
    if (res.success) {
      return res.data
    } else {
      console.error(
        'Zod received an invalid response from the server:',
        res.error.errors,
      )
      return res.data || body
    }
  }

  // GET Request
  async get<T, B = any>(
    path: string,
    config?: ApiRequestStandardConfig<T, B>,
  ): Promise<ApiStandardResponse<T>>
  async get<T, B = any>(
    path: string,
    config?: ApiRequestPaginatedConfig<T, B>,
  ): Promise<ApiPaginatedResponse<T>>

  async get<T, B = any>(path: string, config?: any) {
    return this.request<T, B>(path, 'GET', config)
  }

  // POST Request
  async post<T, B = any>(
    path: string,
    config?: ApiRequestStandardConfig<T, B>,
  ): Promise<ApiStandardResponse<T>>
  async post<T, B = any>(
    path: string,
    config?: ApiRequestPaginatedConfig<T, B>,
  ): Promise<ApiPaginatedResponse<T>>
  async post<T, B = any>(path: string, config?: any) {
    return this.request<T, B>(path, 'POST', config)
  }

  // PUT Request
  async put<T, B = any>(
    path: string,
    config?: ApiRequestStandardConfig<T, B>,
  ): Promise<ApiStandardResponse<T>>
  async put<T, B = any>(
    path: string,
    config?: ApiRequestPaginatedConfig<T, B>,
  ): Promise<ApiPaginatedResponse<T>>
  async put<T, B = any>(path: string, config?: any) {
    return this.request<T, B>(path, 'PUT', config)
  }

  // PATCH Request
  async patch<T, B = any>(
    path: string,
    config?: ApiRequestStandardConfig<T, B>,
  ): Promise<ApiStandardResponse<T>>
  async patch<T, B = any>(
    path: string,
    config?: ApiRequestPaginatedConfig<T, B>,
  ): Promise<ApiPaginatedResponse<T>>
  async patch<T, B = any>(path: string, config?: any) {
    return this.request<T, B>(path, 'PATCH', config)
  }

  // DELETE Request
  async delete<T, B = any>(
    path: string,
    config?: ApiRequestStandardConfig<T, B>,
  ): Promise<ApiStandardResponse<null>>
  async delete<T, B = any>(
    path: string,
    config?: ApiRequestPaginatedConfig<T, B>,
  ): Promise<ApiPaginatedResponse<null>>
  async delete<T, B = any>(path: string, config?: any) {
    return this.request<T, B>(path, 'DELETE', config)
  }

  // Base Request
  protected async request<T extends any[] = unknown[], B = any>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    config?: ApiRequestPaginatedConfig<T, B>,
  ): Promise<ApiPaginatedResponse<T>>

  protected async request<T = unknown, B = any>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    config?: ApiRequestStandardConfig<T, B>,
  ): Promise<ApiResponse<T>>

  /**
   * Send an API request to the network,
   * and validate the response using a provided
   * schema. If in dev mode, will return any
   * mock data provided.
   */
  protected async request<T = unknown, B = any>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    config?: ApiRequestConfig<T, B>,
  ): Promise<ApiResponse<T>> {
    const {
      mock = undefined,
      headers: customHeaders = {},
      body,
      schema,
      isPublic,
      isPaginated,
      ...fetchSettings
    } = config ?? {}

    // Prepare data
    if (this.env === 'dev') {
      await sleep(this.mockDelay)

      if (!mock) {
        return {
          success: false,
          paginated: false,
          status: 500,
          data: {
            message: 'Must provide mock data when in dev mode',
          },
        }
      } else if (mock.data == null && mock.errorIfEmpty) {
        return {
          success: false,
          paginated: false,
          status: 404,
          data: {
            message: 'Not Found',
          },
        }
      } else if (!isPaginated) {
        return {
          success: true,
          paginated: false,
          status: 200,
          data: mock.data as T,
        }
      } else {
        return {
          success: true,
          paginated: true,
          status: 200,
          data: {
            offset: 0,
            count: Array.isArray(mock.data) ? mock.data.length : 0,
            next: url,
            previous: url,
            results: mock.data as T,
          },
        }
      }
    } else if (this.env === 'network') {
      // Mock api latency in network mode
      await sleep(this.mockDelay)
    }

    const headers: Record<string, string> = {
      ...customHeaders,
    }

    if (!headers['Cookie']) {
      headers['Cookie'] = ''
    }
    headers['Cookie'] += Object.entries(this.extraCookies)
      .map(([key, value]) => `${key}=${value}`)
      .join('; ')

    if (body && !(body instanceof FormData)) {
      headers['Content-Type'] = 'application/json'
    }

    if (!isPublic && this.token != null) {
      headers['Authorization'] = `Token ${this.token}`
    } else if (!isPublic) {
      return {
        success: false,
        paginated: false,
        status: 401,
        data: { message: 'User is not authenticated' },
      }
    }

    // Primary Fetch Request
    const response = await fetch(url, {
      method,
      headers,
      body: this.prepareRequestBody(body),
      // cache: 'default',
      ...fetchSettings,
    })

    // Parse response
    try {
      const data: any = await this.getResponseData(response)

      if (!response.ok) {
        return {
          success: false,
          status: response.status,
          paginated: false,
          data: {
            message: this.joinErrors(data.errors),
            type: data.type,
            errors: data.errors,
          },
        }
      }

      if (schema) {
        if (isPaginated) {
          const parsedData = this.parseSchema(schema, data.results)
          return {
            success: true,
            paginated: true,
            status: response.status,
            data: { ...data, results: parsedData },
          }
        } else {
          return {
            success: true,
            paginated: false,
            status: response.status,
            data: this.parseSchema(schema, data),
          }
        }
      } else {
        if (isPaginated) {
          return {
            success: true,
            paginated: true,
            status: response.status,
            data: data as PaginatedObject<T>,
          }
        } else {
          return {
            success: true,
            paginated: false,
            status: response.status,
            data: data as T,
          }
        }
      }
    } catch (e: any) {
      console.error(e)
      return {
        success: false,
        paginated: false,
        status: 500,
        data: {
          message: e?.message || e || 'Unknown Error',
        },
      }
    }
  }
}
