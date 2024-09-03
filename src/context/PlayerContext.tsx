/**
 * Controls connection with spotify.
 *
 * Inspired by:
 * https://github.com/niekert/use-spotify-web-playback-sdk/blob/master/src/index.ts#L24
 */
import { createContext, useEffect, useRef, type ReactNode } from 'react'
import { SpotifyPlayer } from 'src/lib'

export const SpotifyPlayerContext = createContext({
  player: null as Spotify.Player | null,
  nextTrack: () => {},
  previousTrack: () => {},
  pause: () => {},
  togglePlay: () => {},
})

export const SpotifyPlayerProvider = (props: {
  children: ReactNode
  token: string | null
}) => {
  const { children, token } = props
  const playerRef = useRef<Spotify.Player | null>(null)

  useEffect(() => {
    if (token) {
      SpotifyPlayer.getInstance(token)
        .getPlayer()
        .then((player) => {
          playerRef.current = player
        })
    }
  }, [token])

  const nextTrack = () => {
    playerRef.current?.nextTrack()
  }
  const previousTrack = () => {
    playerRef.current?.previousTrack()
  }
  const pause = () => {
    playerRef.current?.pause()
  }
  const togglePlay = () => {
    playerRef.current?.togglePlay()
  }

  return (
    <SpotifyPlayerContext.Provider
      value={{
        player: playerRef.current,
        nextTrack,
        previousTrack,
        pause,
        togglePlay,
      }}
    >
      {children}
    </SpotifyPlayerContext.Provider>
  )
}
