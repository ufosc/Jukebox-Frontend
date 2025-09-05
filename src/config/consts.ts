export const REACT_ENV: nodenv = (import.meta.env?.MODE ?? 'test') as nodenv
export const LOG_LEVEL: loglevel = import.meta.env.LOG_LEVEL ?? 'debug'
export const JUKEBOX_URL =
  import.meta.env?.VITE_JUKEBOX_URL ?? 'http://localhost:8082'
export const CLUBS_URL =
  import.meta.env?.VITE_CLUBS_URL ?? 'http://localhost:8080'

export const SOCKET_URL = JUKEBOX_URL
export const TEST_ENV = false

export const SPOTIFY_PLAYER_NAME = 'Jukebox Player'
export const SPOTIFY_AUTH_CHECK_MS = 1000 * 60 * 5

export const CSRF_COOKIE_NAME = 'csrftoken'
export const SESSION_COOKIE_NAME = 'sessionid'

export const CURRENT_URL = `${window.location.protocol}//${window.location.host}`

/**
 * Artificial delay to use in dev and network mode.
 */
export const MOCK_DELAY_MS = import.meta.env.VITE_MOCK_DELAY_MS ?? 500
