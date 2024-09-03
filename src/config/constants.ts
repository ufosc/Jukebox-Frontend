export const REACT_ENV: nodenv = (import.meta.env?.MODE ?? 'test') as nodenv
export const NETWORK_URL = import.meta.env?.VITE_NETWORK_URL ?? location.origin

export const SOCKET_URL = NETWORK_URL
export const TEST_ENV = false

export const SPOTIFY_PLAYER_NAME = 'Jukebox Player'
