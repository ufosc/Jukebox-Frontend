import { useContext, useRef } from 'react'

import './Overview.scss'

import Disk from 'src/assets/svg/Disk.svg?react'
import { mockTrack } from 'src/mock'

import { useSelector } from 'react-redux'
import { AudioPlayer, TrackList } from 'src/components'
import { SpotifyPlayerContext } from 'src/context'
import { CurrentlyPlayingContext } from 'src/context/CurrentlyPlayingContext'
import { selectNextTracks } from 'src/store/jukebox'

export const Overview = () => {
  const queuedTracks = useSelector(selectNextTracks)

  const { currentTrack } = useContext(CurrentlyPlayingContext)
  const songTitleRef = useRef<HTMLHeadingElement>(null)

  const { deviceIsActive, spotifyIsConnected, connectDevice } =
    useContext(SpotifyPlayerContext)

  return (
    <>
      <div className="grid">
        <div className="col-5 card">
          <div className="song-desc">
            <h2 className="song-title" ref={songTitleRef}>
              {currentTrack?.name ?? 'No Track'}
            </h2>
            <div className="song-author">
              {currentTrack?.artists.map((artist) => artist.name).join(', ') ??
                'No Artist'}
            </div>
          </div>
          <AudioPlayer />
        </div>

        <div className="col-7">
          <div className="disk">
            <img
              className="curr-song"
              src={
                currentTrack?.album?.images[0].url ??
                mockTrack.album.images[0].url
              }
              alt={currentTrack?.name}
            />
            <Disk />
          </div>
        </div>
      </div>

      <div className="grid">
        <div className="col-12">
          <div className="song-queue scrollbar">
            <TrackList tracks={queuedTracks} />
          </div>
        </div>
      </div>
    </>
  )
}
