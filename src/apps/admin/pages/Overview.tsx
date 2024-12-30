import { useContext, useEffect, useRef, useState } from 'react'

import { ConnectedPlayer } from 'src/components'

import './Overview.scss'

import Disk from 'src/assets/svg/Disk.svg?react'
import { mockTrack } from 'src/mock'

import { useSelector } from 'react-redux'
import { REACT_ENV, SPOTIFY_PLAYER_NAME } from 'src/config'
import { SpotifyPlayerContext } from 'src/context'
import { selectNextTracks, selectPlayerState } from 'src/store/jukebox'
import { Track } from './Track'

export const Overview = () => {
  const queuedTracks = useSelector(selectNextTracks)
  const storePlayerState = useSelector(selectPlayerState)

  const songTitleRef = useRef<HTMLHeadingElement>(null)
  const [playerState, setPlayerState] = useState<IPlayerState | null>(null)

  const {
    playerState: spotifyPlayerState,
    deviceIsActive,
    spotifyIsConnected,
    connectDevice,
  } = useContext(SpotifyPlayerContext)

  useEffect(() => {
    if (+(songTitleRef.current?.textContent ?? 0) > 15) {
      songTitleRef.current?.classList.add('song-title--small')
    }

    if (!spotifyPlayerState) {
      setPlayerState(storePlayerState)
    } else {
      setPlayerState(spotifyPlayerState)
    }
  }, [spotifyPlayerState?.current_track, storePlayerState?.current_track])

  return (
    <>
      <div className="grid">
        <div className="col-5 card">
          <div className="song-desc">
            <h2 className="song-title" ref={songTitleRef}>
              {playerState?.current_track?.name ?? 'No Track'}
            </h2>
            <div className="song-author">
              {playerState?.current_track?.artists
                .map((artist) => artist.name)
                .join(', ') ?? 'No Artist'}
            </div>
          </div>
          <ConnectedPlayer />
        </div>

        <div className="col-7">
          <div className="disk">
            <img
              className="curr-song"
              src={
                playerState?.current_track?.album?.images[0].url ??
                mockTrack.album.images[0].url
              }
              alt={playerState?.current_track?.name}
            />
            <Disk />
          </div>
        </div>
      </div>

      <div className="grid">
        <div className="col-12">
          <div className="song-queue scrollbar">
            <ol className="board__queue__list track-list scrollbar">
              {queuedTracks.length >= 1 && (
                <>
                  <h2 className="song-queue__title">Queued Tracks</h2>
                  {queuedTracks.map((track) => (
                    <Track track={track} key={track.id} />
                  ))}
                </>
              )}
              {queuedTracks.length < 1 && (
                <>
                  <h2 className="song-queue__title">Setup Spotify</h2>

                  {(spotifyIsConnected && !deviceIsActive && (
                    <>
                      <p>
                        Your account is connected to Spotify, transfer playback
                        to "{SPOTIFY_PLAYER_NAME}" to get started.
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
