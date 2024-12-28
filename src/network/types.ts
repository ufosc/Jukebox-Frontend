export interface NetworkResponse<T = any> {
  status: number
  description: string
  data: T
}
