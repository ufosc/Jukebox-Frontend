export class MissingTokenError extends Error {
  constructor(location?: string) {
    super(`Unable to find the user token${location ? ' at ' + location : ''}.`)
    this.name = 'MissingTokenError'
  }
}
