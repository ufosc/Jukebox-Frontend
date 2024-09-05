import { SPOTIFY_PLAYER_NAME } from 'src/config'

export class SpotifyPlayer {
  public static instance: SpotifyPlayer
  private token: string
  public player?: Spotify.Player
  private resolvePlayer: (player: Spotify.Player) => void
  private rejectPlayer: (e: any) => void
  private playerPromise: Promise<Spotify.Player>

  private constructor(token: string) {
    const { resolve, reject, promise } = Promise.withResolvers<Spotify.Player>()
    this.resolvePlayer = resolve
    this.rejectPlayer = reject
    this.playerPromise = promise

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

    return SpotifyPlayer.instance
  }

  private connect() {
    if (this.token === 'YOUR-LONG-TOKEN-HERE') return

    window.onSpotifyWebPlaybackSDKReady = async () => {
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
      })
      player.addListener('player_state_changed', (state) => {
        console.log('Player state changed:', state)
      })

      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id)
      })
      player.addListener('initialization_error', ({ message }) => {
        console.error(message)
      })

      player.addListener('authentication_error', ({ message }) => {
        console.error(message)
      })

      player.addListener('account_error', ({ message }) => {
        console.error(message)
      })
      player.connect()

      this.resolvePlayer(player)
    }

    if (!window.Spotify) {
      const scriptTag = document.createElement('script')
      scriptTag.src = 'https://sdk.scdn.co/spotify-player.js'

      document.head!.appendChild(scriptTag)
    }
  }

  public async getPlayer(): Promise<Spotify.Player> {
    return this.playerPromise
  }

  private callPlayer(method: keyof Spotify.Player) {
    return () => {
      if (this.player) {
        Object.call(this.player, method)
      } else {
        return
      }
    }
  }

  public nextTrack = this.callPlayer('nextTrack')
  public previousTrack = this.callPlayer('previousTrack')
  public togglePlay = this.callPlayer('togglePlay')
  public pause = this.callPlayer('pause')
}
