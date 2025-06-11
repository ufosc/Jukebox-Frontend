import { useSelector } from 'react-redux'
import { TrackList } from 'src/components'
import { selectNextTracks } from 'src/store'
import './MusicQueue.scss'
import { TrackModifyContext } from './trackContext'

export const MusicQueue = () => {
  const nextTracks = useSelector(selectNextTracks)

  return (
    <>
      <TrackModifyContext.Provider value={true}>
        <div className="music-queue_container">
          <div className="next_up_container">
            <h1>Next Up</h1>

            <TrackList tracks={nextTracks} />
          </div>
        </div>
      </TrackModifyContext.Provider>
    </>
  )
}
