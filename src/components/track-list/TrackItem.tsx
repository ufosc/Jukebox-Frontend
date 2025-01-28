import { formatDuration } from 'src/utils'

import { TrackInteractions } from './TrackInteractions'
import './TrackItem.scss'

export const TrackItem = (props: { track: Nullable<IQueuedTrack> }) => {
  const { track } = props

  return (
    <li className="track-list-track">
      {!track && <p>No track specified.</p>}
      {track && (
        <>
          <div className="track-list-track__preview">
            <img
              src={track?.track.album?.images[0]?.url}
              alt={track.track.name}
            />
          </div>
          <div className="track-list-track__name-group">
            <h3 className="track-list-track__name">{track.track.name}</h3>
            <span className="track-list-track__artists">
              {track.track.artists.map((artist) => artist.name).join(', ')}
            </span>
          </div>
          <div className="track-list-track__info track-list-track__rec-by">
            {track.recommended_by || 'Spotify'}
          </div>
          <div className="track-list-track__info track-list-track__duration">
            {formatDuration(track.track.duration_ms)}
          </div>
          <div className="track-list-track__info track-list-track__activity">
            <TrackInteractions track={track} />
          </div>
        </>
      )}
    </li>
  )
}
