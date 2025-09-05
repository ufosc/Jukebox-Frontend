import { formatDuration } from 'src/utils'

/**
 * TODO: MOVE THIS COMPONENT TO GLOBAL SCOPE
 */
export const TrackItem = (props: { track: ITrack }) => {
  const { track } = props
  return (
    <li className="track-list__track">
      {!track && <p>No track specified.</p>}
      {track && (
        <>
          <span className="track-list__track__preview">
            <img src={track?.preview_url ?? ''} alt={track.name} />
          </span>
          <div className="track-list__track__name-group">
            <h3 className="track-list__track__name">{track.name}</h3>
            <span className="track-list__track__artists">
              {track.artists.join(', ')}
            </span>
          </div>
          <span className="track-list__track__info track-list__track__rec-by">
            Alex Smith
          </span>
          <span className="track-list__track__info track-list__track__duration">
            {formatDuration(track.duration_ms)}
          </span>
          <span className="track-list__track__info track-list__track__likes">
            5
          </span>
          <span className="track-list__track__info track-list__track__dislikes">
            0
          </span>
        </>
      )}
    </li>
  )
}
