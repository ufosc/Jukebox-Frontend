export class NotImplementedError extends Error {
  constructor(module?: string, method?: string) {
    if (method) {
      super(`${module} > ${method} is not implemented yet.`)
    } else if (module && !method) {
      super(`${module} is not implemented yet.`)
    } else {
      super(`This feature is not implemented yet.`)
    }
    this.name = 'NotImplementedError'
  }
}
