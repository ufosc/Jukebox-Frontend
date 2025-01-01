import { mergeClassNames } from 'src/utils'
import { TrackItem } from './TrackItem'
import './TrackList.scss'

export const TrackList = (props: {
  tracks: ITrackMeta[]
  offsetCount?: boolean
}) => {
  const { tracks, offsetCount } = props

  return (
    <ol
      className={mergeClassNames(
        'track-list',
        offsetCount && 'track-list-offset',
      )}
    >
      {tracks.map(
        (track) => track && <TrackItem track={track} key={track.queue_id} />,
      )}
      {tracks.length < 1 && <p>No tracks available.</p>}
    </ol>
  )
}
