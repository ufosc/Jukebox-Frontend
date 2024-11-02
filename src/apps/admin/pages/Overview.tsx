import { useContext, useEffect, useRef, useState } from 'react'

import { AudioPlayer } from 'src/components'

import './Overview.scss'

import Disk from 'src/assets/svg/Disk.svg?react'
import { mockTrack } from 'src/mock'

import { useSelector } from 'react-redux'
import { SpotifyPlayerContext } from 'src/context'
import { selectCurrentTrack, selectNextTracks } from 'src/store/track'
import { Track } from './Track'

export const Overview = () => {
  const [song, setSong] = useState('')
  const [author, setAuthor] = useState('')
  // const { currentTrack } = useContext(SpotifyPlayerContext)
  const currentTrack = useSelector(selectCurrentTrack)
  const queuedTracks = useSelector(selectNextTracks)
  const [currentTrackImage, setCurrentTrackImage] = useState('')
  const songTitleRef = useRef<HTMLHeadingElement>(null)
  const {
    nextTracks: nextPlayerTracks,
    isActive,
    isConnected,
    connectDevice,
  } = useContext(SpotifyPlayerContext)

  useEffect(() => {
    if (!currentTrack) {
      setSong('No song Playing')
      setAuthor('No Author')
      setCurrentTrackImage(track?.album?.images[0].url)
    } else {
      setSong(currentTrack.name)
      setAuthor(
        currentTrack.artists
          .map((artist: { name: any }) => artist.name)
          .join(', '),
      )
      setCurrentTrackImage(currentTrack?.album?.images[0].url)

      if (currentTrack.name.length > 15) {
        songTitleRef.current?.classList.add('song-title--small')
      }
    }
  }, [currentTrack])

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
                (nextPlayerTracks.length > 0 && (
                  <>
                    <h2 className="song-queue__title">Next Up</h2>
                    {nextPlayerTracks.map((track) => (
                      <Track track={track} />
                    ))}
                  </>
                )) || (
                  <>
                    <h2 className="song-queue__title">Setup Spotify</h2>

                    {(isConnected && !isActive && (
                      <>
                        <p>
                          Your account is connected to Spotify, click below to
                          transfer playback to this browser.
                        </p>
                        <p>
                          <button
                            className="button-solid"
                            onClick={connectDevice}
                          >
                            Connect
                          </button>
                        </p>
                      </>
                    )) || (
                      <p>
                        Connect the jukebox to your spotify account to get
                        started.
                      </p>
                    )}
                  </>
                )}
            </ol>
          </div>
        </div>
      </div>
    </>
  )
}
