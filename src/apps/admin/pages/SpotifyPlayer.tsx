import { useContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  ConnectedPlayer,
  Form,
  FormSelectGroup,
  FormSubmit,
} from 'src/components'
import { REACT_ENV } from 'src/config'
import { SpotifyPlayerContext } from 'src/context'
import { mockTrack } from 'src/mock'
import { authenticateLink } from 'src/store'
import { selectJukeboxLinks } from 'src/store/jukebox'
import { SpotifyPlayerAccount } from '../components/SpotifyPlayer/SpotifyPlayerAccount'
import { SpotifyPlayerDetail } from '../components/SpotifyPlayer/SpotifyPlayerDetail'
import { SpotifyPlayerInfo } from '../components/SpotifyPlayer/SpotifyPlayerInfo'
import './SpotifyPlayer.scss'
import { Track } from './Track'

const track = mockTrack
export const SpotifyPlayer = () => {
  const [song, setSong] = useState('')
  const [author, setAuthor] = useState('')
  const [album, setAlbum] = useState('')
  const jukeboxLinks = useSelector(selectJukeboxLinks)
  const songTitleRef = useRef<HTMLHeadingElement>(null)
  const {
    nextTracks: playerNextTracks,
    playerState,
    deviceIsActive: isActive,
    spotifyIsConnected: isConnected,
    connectDevice,
  } = useContext(SpotifyPlayerContext)

  const connectLinkIdRef = useRef<HTMLSelectElement>(null)

  useEffect(() => {
    if (!playerState?.current_track) {
      setSong('No song Playing')
      setAuthor('No Author')
      setAlbum('No Album')
    } else {
      setSong(playerState?.current_track.name)
      setAlbum(playerState?.current_track.album.name)
      console.log(album)
      setAuthor(
        playerState?.current_track.artists
          .map((artist: { name: any }) => artist.name)
          .join(', '),
      )
      if (playerState?.current_track.name.length > 15) {
        songTitleRef.current?.classList.add('song-title--small')
      }
    }
  }, [playerState?.current_track])

  const handleConnectPlayback = async () => {
    if (!connectLinkIdRef.current) return

    const link = jukeboxLinks?.find(
      (link) => link.id === +connectLinkIdRef.current!.value,
    )

    if (!link)
      throw new Error(`Link with id ${connectLinkIdRef.current} not found.`)

    await authenticateLink(link)
  }

  return (
    <>
      <div className="spotify-player-title">Spotify Player</div>
      <div className="spotify-player-container grid">
        <div className="col-6 left-container">
          <p>{(isActive && 'Player is active') || 'Player is not active'}</p>
          <p>
            {(isConnected && 'Player is connected') ||
              'Player is not connected'}
          </p>

          {!isActive && (
            <div>
              My Accounts
              <Form onSubmit={handleConnectPlayback}>
                <FormSelectGroup
                  id="link"
                  ref={connectLinkIdRef}
                  options={jukeboxLinks?.map((link) => ({
                    label: link.email,
                    value: link.id,
                  }))}
                />
                <FormSubmit text="Connect Account" />
              </Form>
              <button className="button-solid" onClick={connectDevice}>
                Switch Playback
              </button>
            </div>
          )}
          <div className="spotify-player-desc">
            <div className="spotify-song-title">{song}</div>
            <div className="spotify-song-author">{author}</div>
          </div>
          <div className="audio-container">
            <ConnectedPlayer />
          </div>
          <SpotifyPlayerInfo title="Track Info" />
          <div className="detail-container">
            <SpotifyPlayerDetail firstDetail="Explicit" secondDetail="False" />
            <SpotifyPlayerDetail firstDetail={'Album'} secondDetail={album} />
            <SpotifyPlayerDetail
              firstDetail="Release Date"
              secondDetail="1987"
            />
          </div>
          <div className="detail-container">
            <SpotifyPlayerDetail
              firstDetail="Recommended By"
              secondDetail="Alex Smith"
            />
            <SpotifyPlayerDetail
              firstDetail="Liked By"
              secondDetail="John Doe, Jane Reed, John Doe, Jane Reed, John Doe, Jane Reed, John Doe"
            />
            <SpotifyPlayerDetail
              firstDetail="Disliked By"
              secondDetail="Bob Jones, Richard Travis, Bob Jones, Richard Travis"
            />
          </div>
          <div className="next-track-container">
            <SpotifyPlayerInfo title="Next Tracks" />
          </div>
          {playerNextTracks.length > 0 && (
            <>
              <h2 className="song-queue__title">Next Up</h2>
              {playerNextTracks.map((track) => (
                <Track track={track} />
              ))}
            </>
          )}
        </div>
        <div className="col-5 right-container">
          <div className="session-container">
            <SpotifyPlayerInfo title="Session Info" />
            <div className="detail-container">
              <SpotifyPlayerDetail
                firstDetail="Active Device"
                secondDetail="John's MacBook Air"
              />
              <SpotifyPlayerDetail
                firstDetail="This Device"
                secondDetail="John's MacBook Air"
              />
            </div>
          </div>
          <SpotifyPlayerInfo title="Connected Spotify Accounts" />
          <div className="account-container">
            {jukeboxLinks?.map((link) => <SpotifyPlayerAccount link={link} />)}
          </div>
          <div className="connect-button-container">
            {isConnected && !isActive && (
              <>
                {REACT_ENV !== 'dev' && (
                  <button
                    className="button-outlined connect-button"
                    onClick={connectDevice}
                  >
                    Connect New Account
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}