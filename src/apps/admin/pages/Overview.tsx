import './Overview.scss'

import FallbackImg from 'src/assets/img/jukeboxImage.png'
import Disk from 'src/assets/svg/Disk.svg?react'

import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { AudioPlayer, TrackList } from 'src/components'
import { PlayerContext } from 'src/context'
import { selectNextTracks } from 'src/store/jukebox'

export const Overview = () => {
  const queuedTracks = useSelector(selectNextTracks)
  const { playerState } = useContext(PlayerContext)

  return (
    <>
      <div className="grid">
        <div className="col-5 card">
          <AudioPlayer />
        </div>

        <div className="col-7">
          <div className="disk">
            <img
              className="curr-song"
              src={playerState?.current_track?.track.preview_url ?? FallbackImg}
              alt={playerState?.current_track?.track.name}
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
