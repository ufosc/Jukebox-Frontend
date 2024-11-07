import { TrackItem } from './TrackItem'

export const TracksPanel = (props: {
  currentTrack?: Nullable<ITrack>
  nextTracks: ITrack[]
}) => {
  const { currentTrack, nextTracks } = props

  return (
    <div className="board__col board__tracks">
      <div className="board__currently-playing board__tracks__group">
        <h2 className="font-title--accent board__tracks__group__title">
          Currently Playing
        </h2>
        <div className="board__tracks__group__inner">
          <ol className="board__currently-playing__list track-list">
            <TrackItem track={currentTrack} />
          </ol>
        </div>
      </div>
      <div className="board__queue board__tracks__group">
        <h2 className="font-title--accent board__tracks__group__title">
          Up Next
        </h2>
        <div className="board__tracks__group__inner">
          <ol className="board__queue__list track-list track-list-offset">
            {nextTracks.map((track) => (
              <TrackItem key={track.id} track={track} />
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
