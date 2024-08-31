import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

const instance = axios.create({
  // timeout: 3000,
  withCredentials: false,
})

export const httpRequest = async (
  options: AxiosRequestConfig,
): Promise<AxiosResponse<any, any>> => {
  const res = await instance.request(options)
  // const res = await axios.request(options)

  return res
}

export type HttpResponse = AxiosResponse
// export const mockRequest = httpRequest as any

// export const mockAxios = httpRequest as jest.Mocked<typeof httpRequest>
