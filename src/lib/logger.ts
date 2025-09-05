/**
 * Custom logger
 *
 * Inspired by: https://leafty.medium.com/getting-started-with-logging-in-react-e8d493458689
 */
import { LOG_LEVEL } from 'src/config/consts'

/** Signature of a logging function */
export type LogFn = (message?: any, ...optionalParams: any[]) => void

/** Basic logger interface */
export interface Logger {
  log: LogFn
  warn: LogFn
  error: LogFn
}

/**
 * Ignore logs sent to this function
 */
const disabledFn: LogFn = (message?: any, ...optionalParams: any[]) => {}

/** Logger which outputs to the browser console */
export class ConsoleLogger implements Logger {
  /** Static output to the console */
  readonly log: LogFn
  /** Logs message at "warning" level */
  readonly warn: LogFn
  /** Logs message at "error" level */
  readonly error: LogFn
  /** Logs message at "debug" level */
  readonly debug: LogFn

  constructor(options?: { level?: loglevel }) {
    const { level } = options || {}

    this.error = console.error.bind(console)
    this.warn = console.warn.bind(console)
    this.log = console.log.bind(console)
    this.debug = console.debug.bind(console)

    switch (level) {
      case 'error':
        this.warn = disabledFn
        this.log = disabledFn
        break
      case 'warn':
        this.log = disabledFn
        break
    }
  }
}

export const logger = new ConsoleLogger({ level: LOG_LEVEL })
