import { useContext, type ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { SocketContext, SpotifyPlayerProvider } from './context'
import { selectClubSpotifyAuth } from './store'
import { selectCurrentJukebox } from './store/jukebox'

export const SpotifyPlayer = (props: { children?: ReactNode }) => {
  const { children } = props
  const spotifyAuth = useSelector(selectClubSpotifyAuth)
  const currentJukebox = useSelector(selectCurrentJukebox)
  const { emitMessage } = useContext(SocketContext)

  return (
    <SpotifyPlayerProvider
      token={spotifyAuth?.access_token}
      jukebox={currentJukebox}
      emitMessage={emitMessage}
    >
      {children}
    </SpotifyPlayerProvider>
  )
}
