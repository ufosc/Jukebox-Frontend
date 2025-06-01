import { useSelector } from 'react-redux'
import { TrackList } from 'src/components'
import { clearNextTracks, selectNextTracks } from 'src/store'
import './MusicQueue.scss'

export const MusicQueue = () => {
  const nextTracks = useSelector(selectNextTracks)
  return (
    <div className="music-queue_container">
      <div className="next_up_container">
        <h1>Next Up</h1>
        <TrackList tracks={nextTracks} />
      </div>
      <button className="button-outlined queue-button" onClick={clearNextTracks}>
        Clear Queue
      </button>
    </div>
  )
}
