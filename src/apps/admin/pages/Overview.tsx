import './Overview.scss'

import FallbackImg from 'src/assets/img/jukeboxImage.png'
import Disk from 'src/assets/svg/Disk.svg?react'

import { useSelector } from 'react-redux'
import { AudioPlayer, TrackList } from 'src/components'
import { TrackInteractions } from 'src/components/track-list/TrackInteractions'
import { selectCurrentTrack, selectNextTracks } from 'src/store/jukebox'

export const Overview = () => {
  const queuedTracks = useSelector(selectNextTracks)
  const currentTrack = useSelector(selectCurrentTrack)

  return (
    <>
      <div className="grid">
        <div className="col-5 card">
          <div className="song-desc">
            <h2 className="song-title">
              {currentTrack?.track.name ?? 'No Track'}
            </h2>
            <div className="song-info">
              <span className="song-author">
                {currentTrack?.track.artists
                  .map((artist) => artist.name)
                  .join(', ') ?? 'No Artist'}
              </span>
              <TrackInteractions track={currentTrack} />
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
              src={currentTrack?.track.album?.images[0].url ?? FallbackImg}
              alt={currentTrack?.track.name}
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
