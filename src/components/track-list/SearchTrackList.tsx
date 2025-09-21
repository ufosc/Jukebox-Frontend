import { mergeClassNames } from 'src/utils'

import { SearchTrackItem } from './SearchTrackItem'

export const TrackSearchList = (props: { tracks: ITrack[] }) => {
  const { tracks } = props

  return (
    <ol className={mergeClassNames('track-list')}>
      {tracks &&
        tracks.length > 0 &&
        tracks.map(
          (track) => track && <SearchTrackItem track={track} key={track.id} />,
        )}
      {tracks.length < 1 && <p>No tracks available.</p>}
    </ol>
  )
}
