import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { TrackList } from 'src/components'
import { PlayerContext } from 'src/context'

export const TracksPanel = () => {
  const {currentTrack} = useContext(PlayerContext)
  // const currentTrack = useSelector(selectCurrentTrack)
  // const nextTracks = useSelector(selectNextTracks)

  return (
    <div className="board__col board__tracks">
      <div className="board__currently-playing board__tracks__group">
        <h2 className="font-title--accent board__tracks__group__title">
          Currently Playing
        </h2>
        <div className="board__tracks__group__inner">
          {/* <TrackList tracks={(currentTrack && [currentTrack]) || []} /> */}
        </div>
      </div>
      <div className="board__queue board__tracks__group">
        <h2 className="font-title--accent board__tracks__group__title">
          Up Next
        </h2>
        <div className="board__tracks__group__inner">
          {/* <TrackList tracks={nextTracks} offsetCount={true} maxCount={5} /> */}
        </div>
      </div>
    </div>
  )
}
