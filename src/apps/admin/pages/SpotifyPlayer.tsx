import { useContext, useEffect, useRef, useState } from 'react'
import { AudioPlayer } from 'src/components/audio/AudioPlayer'
import { REACT_ENV } from 'src/config'
import { SpotifyPlayerContext } from 'src/context'
import { mockTrack } from 'src/mock'
import './SpotifyPlayer.scss'
import { SpotifyPlayerAccount } from './SpotifyPlayerAccount'
import { SpotifyPlayerDetail } from './SpotifyPlayerDetail'
import { SpotifyPlayerInfo } from './SpotifyPlayerInfo'
import { Track } from './Track'

const track = mockTrack
export const SpotifyPlayer = () => {
  const [song, setSong] = useState('')
  const [author, setAuthor] = useState('')
  const [album, setAlbum] = useState('')
  const songTitleRef = useRef<HTMLHeadingElement>(null)
  const {
    nextTracks: playerNextTracks,
    currentTrack: playerCurrentTrack,
    isActive,
    isConnected,
    connectDevice,
  } = useContext(SpotifyPlayerContext)

  useEffect(() => {
    if (!playerCurrentTrack) {
      setSong('No song Playing')
      setAuthor('No Author')
      setAlbum('No Album')
    } else {
      setSong(playerCurrentTrack.name)
      setAlbum(playerCurrentTrack.album.name)
      console.log(album)
      setAuthor(
        playerCurrentTrack.artists
          .map((artist: { name: any }) => artist.name)
          .join(', '),
      )
      if (playerCurrentTrack.name.length > 15) {
        songTitleRef.current?.classList.add('song-title--small')
      }
    }
  }, [playerCurrentTrack])
  return (
    <>
      <div className="spotify-player-title">Spotify Player</div>
      <div className="spotify-player-container grid">
        <div className="col-6 left-container">
          <div className="spotify-player-desc">
            <div className="spotify-song-title">{song}</div>
            <div className="spotify-song-author">{author}</div>
          </div>
          <div className="audio-container">
            <AudioPlayer />
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
            <SpotifyPlayerAccount
              profileImage="https://example.com"
              isActive={true}
              email="user@example.com"
            />
            <SpotifyPlayerAccount
              profileImage="https://example.com"
              isActive={false}
              email="user@example.com"
            />
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
