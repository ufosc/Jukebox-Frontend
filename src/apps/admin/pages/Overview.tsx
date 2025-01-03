import './Overview.scss'

import FallbackImg from 'src/assets/img/jukeboxImage.png'
import Disk from 'src/assets/svg/Disk.svg?react'

import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { AudioPlayer, TrackList } from 'src/components'
import { TrackActivity } from 'src/components/track-list/TrackActivity'
import { CurrentlyPlayingContext } from 'src/context/CurrentlyPlayingContext'
import { selectNextTracks } from 'src/store/jukebox'

export const Overview = () => {
  const queuedTracks = useSelector(selectNextTracks)
  const { currentTrack } = useContext(CurrentlyPlayingContext)

  return (
    <>
      <div className="grid">
        <div className="col-5 card">
          <div className="song-desc">
            <h2 className="song-title">{currentTrack?.name ?? 'No Track'}</h2>
            <div className="song-info">
              <span className="song-author">
                {currentTrack?.artists
                  .map((artist) => artist.name)
                  .join(', ') ?? 'No Artist'}
              </span>
              <TrackActivity track={currentTrack} />
            </div>
            <span className="song-rec">
              Recommended by: {currentTrack?.recommended_by ?? 'Spotify'}
            </span>
          </div>
          <AudioPlayer />
        </div>

        <div className="col-7">
          <div className="disk">
            <img
              className="curr-song"
              src={currentTrack?.album?.images[0].url ?? FallbackImg}
              alt={currentTrack?.name}
            />
            <Disk />
          </div>
        </div>
      </div>

      <div className="grid">
        <div className="col-12">
          <div className="song-queue scrollbar">
            <h2 className="song-queue__title">Next Up</h2>
            <TrackList tracks={queuedTracks} />
          </div>
        </div>
      </div>
    </>
  )
}
