import { useCallback, useContext, useEffect, type ReactNode } from 'react'
import { useSelector } from 'react-redux'
import {
  KeyboardContext,
  SocketContext,
  SpotifyPlayerContext,
  SpotifyPlayerProvider,
} from './context'
import { selectClubSpotifyAuth, setCurrentTrack, setNextTracks } from './store'
import { selectCurrentJukebox } from './store/jukebox'

export const SpotifyPlayer = (props: { children?: ReactNode }) => {
  const { children } = props
  const spotifyAuth = useSelector(selectClubSpotifyAuth)
  const currentJukebox = useSelector(selectCurrentJukebox)
  const {
    emitMessage,
    onEvent,
    isConnected: socketIsConnected,
  } = useContext(SocketContext)

  // Passes updates from player context to server
  const handlePlayerTrackChange = useCallback(
    (newTrack: ITrack, prevTrack?: ITrack) => {
      emitMessage<IPlayerUpdate>('player-update', {
        current_track: newTrack,
        jukebox_id: currentJukebox!.id,
      })
    },
    [currentJukebox],
  )

  // Creates functionality for keyboard input on player
  const { togglePlay } = useContext(SpotifyPlayerContext)
  const { onSpace } = useContext(KeyboardContext)

  onSpace(() => {
    console.log('HI')
    togglePlay()
  })

  // Receives track updates from server, updates store
  useEffect(() => {
    onEvent<ITrackStateUpdate>('track-state-update', (data) => {
      if (data.current_track) {
        setCurrentTrack(data.current_track)
      }
      if (data.next_tracks) {
        setNextTracks(data.next_tracks)
      }
    })
  }, [currentJukebox, socketIsConnected])

  return (
    <SpotifyPlayerProvider
      token={spotifyAuth?.access_token}
      jukebox={currentJukebox}
      onTrackChange={handlePlayerTrackChange}
    >
      {children}
    </SpotifyPlayerProvider>
  )
}
