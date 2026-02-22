import './Overview.scss'

import FallbackImg from 'src/assets/img/jukeboxImage.png'
import Disk from 'src/assets/svg/Disk.svg?react'

import { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AudioPlayer, TrackList } from 'src/components'
import { PlayerContext } from 'src/context'
import {
  selectCurrentJukebox,
  selectCurrentJukeSession,
  selectNextTracks,
} from 'src/store/jukebox'
import { TrackModifyContext } from './trackContext'
import { AdminContext } from '../layout/Dashboard'

export const Overview = () => {
  const queuedTracks = useSelector(selectNextTracks)
  const { playerState, currentTrack, hasAux } = useContext(PlayerContext)
  const currentJukebox = useSelector(selectCurrentJukebox)
  const adminStatus = useContext(AdminContext)
  const currentJbxSession = useSelector(selectCurrentJukeSession)

  const [trackImg, setTrackImg] = useState(FallbackImg);

  useEffect(()=>{
    if(currentTrack?.image_url){
      setTrackImg(currentTrack?.image_url)
    }else{
      setTrackImg(FallbackImg)
    }
  },[currentTrack?.image_url])

  return (
    <>
      <TrackModifyContext.Provider value={false}>
        <div className="grid overview__header">
          <div className="col-6 overview__header__audio-card">
            <AudioPlayer disableControls={hasAux} />
          </div>

          <div className="col-1"></div>

          <div className="col-5 overview__disk">
            {playerState?.is_playing ? (
              <div className="disk-container">
                <img
                  className="disk__curr-song diskSpin"
                  src={trackImg}
                  alt={currentTrack?.name}
                />
                <Disk />
              </div>
            ) : (
              <div className="disk-container">
                <img
                  className="disk__curr-song"
                  src={trackImg}
                  alt={currentTrack?.name}
                />
                <Disk />
              </div>
            )}
          </div>
        </div>

        <div className="grid overview__track__shifter">
          <div className="col-12 overview__fill-height">
            <div className="overview__song-queue">
              <h2 className="overview__song-queue__title">Next Up</h2>
              <TrackList tracks={queuedTracks} maxCount={4} />
            </div>
          </div>
        </div>
      </TrackModifyContext.Provider>
    </>
  )
}
