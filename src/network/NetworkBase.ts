import type { AxiosRequestConfig } from 'axios'
import { REACT_ENV } from 'src/config'
import { httpRequest } from 'src/lib'
import { sleep } from 'src/utils'
import { ZodError } from 'zod'
import { NetworkEndpoints } from './endpoints'
import { NetworkAuth } from './NetworkAuth'

const MOCK_DELAY_MS = 1000

export type NetworkSuccess<T> = T | null
export type NetworkError<T> =
  | { nested?: false; status?: number; error: string }
  | { nested: true; status?: number; errors: Record<keyof T, string> }

export type NetworkResponse<T> =
  | { success: true; data: NetworkSuccess<T> }
  | { success: false; data: NetworkError<T> }

/**
 * Base functionality for the network interface,
 * independent of feature-specific requirements.
 *
 * Terminology & request methods:
 * - create: POST
 * - list: GET
 * - get: GET<id>
 * - update: PUT<id>
 * - delete: DELETE<id>
 */
export class NetworkBase extends NetworkAuth {
  protected endpoints = NetworkEndpoints
  protected static instance: NetworkBase

  protected constructor() {
    super()
  }

  /**
   * Ensures there only exists one instance
   * of this class.
   */
  public static getInstance() {
    if (!this.instance) {
      this.instance = new this()
    }

    return this.instance
  }

  /**
   * Send an API request to the network,
   * and validate the response using a provided
   * schema. If in dev mode, will return any
   * mock data provided.
   */
  protected async request<T>(
    url: string,
    schema: Zod.Schema<T> | null,
    config?: AxiosRequestConfig & {
      mock?: {
        data?: T
        errorIfEmpty?: boolean
      }
      // mockData?: T
      isPublic?: boolean
    },
  ) {
    const {
      mock = {},
      headers = {},
      method = 'GET',
      isPublic = false,
      ...axiosConfig
    } = config ?? {}

    if (REACT_ENV === 'dev') {
      await sleep(MOCK_DELAY_MS) // Simulate server delay

      if (mock.data == null && mock.errorIfEmpty) {
        return {
          success: false,
          status: 404,
          data: {
            error: 'Object not found.',
          },
        }
      }

      return {
        success: true,
        status: 200,
        data: mock.data ?? undefined,
      }
    } else if (REACT_ENV === 'network') {
      await sleep(MOCK_DELAY_MS) // Simulate network delay
    }

    if (!isPublic && this.token) {
      // Private route, is authenticated
      headers['Authorization'] = `Token ${this.token}`
    } else if (!isPublic) {
      // Private route, not authenticated
      return { success: false, data: { error: 'User is not authenticated' } }
    }

    headers['Content-Type'] = headers['Content-Type'] || 'application/json'

    const response: NetworkResponse<T> = await httpRequest({
      url,
      withCredentials: true,
      method,
      headers,
      ...axiosConfig,
    })
      .then((res): T | null => {
        if (schema != null) {
          return schema.parse(res.data)
        } else {
          return null
        }
      })
      .then((data) => ({ success: true, data: data }) as const)
      .catch((error: any | ZodError<T>) => {
        const errorDefaults = {
          success: false,
          status: 500,
        } as const

        if (error instanceof ZodError && schema) {
          console.warn(
            `API returned incorrect response for ${schema._type}, errors:`,
            error,
          )
          return {
            ...errorDefaults,
            data: { error: 'Received incorrect response' },
          }
        } else if (error.response) {
          const errorResDefaults = {
            ...errorDefaults,
            status: error.response.status ?? errorDefaults.status,
          }
          if (error.response.data instanceof Object) {
            return {
              ...errorResDefaults,
              data: {
                nested: true,
                errors: error.response.data,
              },
            }
          } else {
            return {
              ...errorResDefaults,
              data: {
                nested: false,
                error: error.response.data,
              },
            }
          }
        } else {
          return {
            ...errorDefaults,
            data: {
              error: error.message ?? 'Unknown error',
            },
          }
        }
      })

    return response
  }
}
