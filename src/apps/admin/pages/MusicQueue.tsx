import { useSelector } from 'react-redux'
import { TrackList } from 'src/components'
import {
  selectCurrentJukebox,
  selectCurrentMembership,
  selectNextTracks,
  selectUser
} from 'src/store'
import './MusicQueue.scss'

export const MusicQueue = () => {
  const nextTracks = useSelector(selectNextTracks)
  const currentJukebox = useSelector(selectCurrentJukebox)
  const currentUser = useSelector(selectUser)
  const currentMembership = useSelector(selectCurrentMembership)

  return (
    <>
      <div className="music-queue_container">
        <div className="next_up_container">
          <h1>Next Up</h1>

          <TrackList tracks={nextTracks} />
        </div>
      </div>
    </>
  )
}
