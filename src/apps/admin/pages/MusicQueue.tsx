import { mockTrack } from 'src/mock'
import './MusicQueue.scss'
import { Track } from './Track'

const track = mockTrack
export const MusicQueue = () => {
  return (
    <div className="music-queue_container">
      <div className="next_up_container">
        <h1>Next Up</h1>
        <Track track={track} />
        <Track track={track} />
        <Track track={track} />
      </div>
      <div className="recently_played_container">
        <h1>Recently Played</h1>
        <Track track={track} />
        <Track track={track} />
        <Track track={track} />
        <Track track={track} />
      </div>
    </div>
  )
}
