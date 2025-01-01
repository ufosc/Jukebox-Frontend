import { useSelector } from 'react-redux'
import { TrackList } from 'src/components'
import { selectCurrentTrack, selectNextTracks } from 'src/store'

export const TracksPanel = () => {
  const currentTrack = useSelector(selectCurrentTrack)
  const nextTracks = useSelector(selectNextTracks)

  return (
    <div className="board__col board__tracks">
      <div className="board__currently-playing board__tracks__group">
        <h2 className="font-title--accent board__tracks__group__title">
          Currently Playing
        </h2>
        <div className="board__tracks__group__inner">
          <TrackList tracks={(currentTrack && [currentTrack]) || []} />
        </div>
      </div>
      <div className="board__queue board__tracks__group">
        <h2 className="font-title--accent board__tracks__group__title">
          Up Next
        </h2>
        <div className="board__tracks__group__inner">
          <TrackList tracks={nextTracks} offsetCount={true} />
        </div>
      </div>
    </div>
  )
}
