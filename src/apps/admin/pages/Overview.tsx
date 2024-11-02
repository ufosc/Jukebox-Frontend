import { useContext, useEffect, useRef, useState } from 'react'

import { AudioPlayer } from 'src/components'

import './Overview.scss'

import Disk from 'src/assets/svg/Disk.svg?react'
import { mockTrack } from 'src/mock'

import { useSelector } from 'react-redux'
import { REACT_ENV, SPOTIFY_PLAYER_NAME } from 'src/config'
import { SpotifyPlayerContext } from 'src/context'
import { selectCurrentTrack, selectNextTracks } from 'src/store/track'
import { Track } from './Track'

export const Overview = () => {
  const [song, setSong] = useState('')
  const [author, setAuthor] = useState('')
  // const { currentTrack } = useContext(SpotifyPlayerContext)
  const storeCurrentTrack = useSelector(selectCurrentTrack)
  const queuedTracks = useSelector(selectNextTracks)
  const [currentTrackImage, setCurrentTrackImage] = useState('')
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
      setCurrentTrackImage(track?.album?.images[0].url)
    } else {
      setSong(playerCurrentTrack.name)
      setAuthor(
        playerCurrentTrack.artists
          .map((artist: { name: any }) => artist.name)
          .join(', '),
      )
      setCurrentTrackImage(playerCurrentTrack?.album?.images[0].url)

      if (playerCurrentTrack.name.length > 15) {
        songTitleRef.current?.classList.add('song-title--small')
      }
    }
  }, [playerCurrentTrack])

  const track = mockTrack
  return (
    <>
      <div className="grid">
        <div className="col-5 card">
          <div className="song-desc">
            <h2 className="song-title" ref={songTitleRef}>
              {song}
            </h2>
            <div className="song-author">{author}</div>
          </div>
          <AudioPlayer />
        </div>

        <div className="col-7">
          <div className="disk">
            <img
              className="curr-song"
              src={currentTrackImage}
              alt={track.name}
            />
            <Disk />
          </div>
        </div>
      </div>

      <div className="grid">
        <div className="col-12">
          <div className="song-queue scrollbar">
            <ol className="board__queue__list track-list scrollbar">
              {(queuedTracks.length > 0 && (
                <>
                  <h2 className="song-queue__title">Queued Tracks</h2>
                  {queuedTracks.map((track) => (
                    <Track track={track} />
                  ))}
                </>
              )) ||
                (playerNextTracks.length > 0 && (
                  <>
                    <h2 className="song-queue__title">Next Up</h2>
                    {playerNextTracks.map((track) => (
                      <Track track={track} />
                    ))}
                  </>
                )) || (
                  <>
                    <h2 className="song-queue__title">Setup Spotify</h2>

                    {(isConnected && !isActive && (
                      <>
                        <p>
                          Your account is connected to Spotify, transfer
                          playback to "{SPOTIFY_PLAYER_NAME}" to get started.
                        </p>
                        {REACT_ENV !== 'dev' && (
                          <p>
                            <button
                              className="button-solid"
                              onClick={connectDevice}
                            >
                              Connect
                            </button>
                          </p>
                        )}
                      </>
                    )) || <p>Connect your Spotify account to get started.</p>}
                  </>
                )}
            </ol>
          </div>
        </div>
      </div>
    </>
  )
}
