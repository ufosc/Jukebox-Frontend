import { SPOTIFY_PLAYER_NAME } from 'src/config'

interface PlayerContext {
  player: Spotify.Player
  deviceId: string
}

export class SpotifyPlayer {
  public static instance: SpotifyPlayer
  private token: string
  public player?: Spotify.Player
  public deviceId?: string
  private resolvePlayer: (player: PlayerContext) => void
  private rejectPlayer: (e: any) => void
  private playerPromise: Promise<PlayerContext>
  private scriptLoaded = false

  private constructor(token: string) {
    const { resolve, reject, promise } = Promise.withResolvers<PlayerContext>()
    this.resolvePlayer = resolve
    this.rejectPlayer = reject
    this.playerPromise = promise
    console.log('init spotify')

    this.token = token
    this.connect()
  }
  public static getInstance(): SpotifyPlayer | null
  public static getInstance(token: string): SpotifyPlayer
  public static getInstance(token?: string) {
    if (!SpotifyPlayer.instance) {
      if (!token) return null
      SpotifyPlayer.instance = new SpotifyPlayer(token)
    }

    SpotifyPlayer.instance.setToken(token)
    return SpotifyPlayer.instance
  }

  private connect() {
    if (this.token === 'YOUR-LONG-TOKEN-HERE' || !this.token) return

    const initializePlayer = () => {
      const player = new Spotify.Player({
        name: SPOTIFY_PLAYER_NAME,
        getOAuthToken: (cb) => {
          cb(this.token)
        },
        volume: 0.3,
      })
      this.player = player

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id)
        this.deviceId = device_id

        this.resolvePlayer({ player, deviceId: device_id })
      })
      player.addListener('player_state_changed', (state) => {
        console.debug('Player state changed:', state)
      })

      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id)
      })
      player.addListener('initialization_error', ({ message }) => {
        console.error('Initialization Error:', message)
      })

      player.addListener('authentication_error', ({ message }) => {
        console.error('Authentication Error:', message)
      })

      player.addListener('account_error', ({ message }) => {
        console.error('Account Error:', message)
      })
      player.connect()
    }

    // If Spotify SDK is already loaded, initialize immediately
    if (window.Spotify) {
      initializePlayer()
    } else if (!this.scriptLoaded) {
      // Only add script once
      this.scriptLoaded = true
      console.log('added spotify script')
      const scriptTag = document.createElement('script')
      scriptTag.src = 'https://sdk.scdn.co/spotify-player.js'
      window.onSpotifyWebPlaybackSDKReady = initializePlayer
      document.head!.appendChild(scriptTag)
    }
  }

  public async getPlayer(): Promise<PlayerContext> {
    return this.playerPromise
  }

  public setToken(token?: string) {
    if (!token) return

    if (this.token !== token) {
      this.token = token
      // Disconnect old player and reconnect with new token
      if (this.player) {
        this.player.disconnect()
        this.player = undefined
      }
      // Reset promise for new connection
      const { resolve, reject, promise } =
        Promise.withResolvers<PlayerContext>()
      this.resolvePlayer = resolve
      this.rejectPlayer = reject
      this.playerPromise = promise
      this.connect()
    }
  }
}
