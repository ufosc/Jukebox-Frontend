declare type Nullable<T> = T | null | undefined

declare type nodenv = 'dev' | 'production' | 'test' | 'network'
declare type loglevel = 'debug' | 'warn' | 'error'
declare type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'role-nav'
declare type SystemColor = 'info' | 'success' | 'warning' | 'error'

declare namespace React {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // Add popover support to typescript, ts(2322)
    // Awaiting support from https://github.com/DefinitelyTyped/DefinitelyTyped/pull/69670
    popover?: string
    popovertarget?: string
    popovertargetaction?: string
  }
}
declare type StoreStatus = 'idle' | 'loading' | 'failed' | 'succeeded'
declare interface SystemStatus {
  text: string
  status: MonitorStatus
}

declare type ThemeMode = 'light' | 'dark'


declare interface ISpotifyLink extends IModel {
  deleted_on: string | null,
  access_token: string,
  refresh_token?: string,
  user_id: number,
  spotify_email: string,
  expires_in: number,
  expires_at: string,
  token_type: string,
}
