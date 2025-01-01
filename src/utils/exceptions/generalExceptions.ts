export class NotImplementedError extends Error {
  constructor(message?: string) {
    if (message) {
      super(message)
    } else {
      super(`This feature is not implemented yet.`)
    }
    this.name = 'NotImplementedError'
  }
}
