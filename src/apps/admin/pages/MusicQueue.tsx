import { useSelector } from 'react-redux'
import { mockTrack } from 'src/mock'
import { clearNextTracks, selectNextTracks } from 'src/store'
import { Track } from '../../../components/Track'
import './MusicQueue.scss'

const track = mockTrack
export const MusicQueue = () => {
  const nextTracks = useSelector(selectNextTracks)
  return (
    <div className="music-queue_container">
      <div className="next_up_container">
        <h1>Next Up</h1>
        {nextTracks.map((track) => (
          <Track track={track} key={track.queue_id} />
        ))}
      </div>
      <button className="button-outlined" onClick={clearNextTracks}>
        Clear Queue
      </button>
      <div className="recently_played_container">
        <h1>Recently Played</h1>
        TODO...
      </div>
    </div>
  )
}
