export const REACT_ENV: nodenv = (import.meta.env?.MODE ?? 'test') as nodenv
export const NETWORK_URL = import.meta.env?.VITE_NETWORK_URL ?? location.origin

export const SOCKET_URL = NETWORK_URL
export const TEST_ENV = false

export const SPOTIFY_PLAYER_NAME = 'Jukebox Player'
export const SPOTIFY_AUTH_CHECK_MS = 1000 * 60 * 5

export const CSRF_COOKIE_NAME = 'csrftoken'
export const SESSION_COOKIE_NAME = 'sessionid'
