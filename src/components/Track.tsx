import { formatDuration } from 'src/utils'

export const Track = (props: { track: Nullable<ITrackMeta> }) => {
  const { track } = props
  return (
    <li className="track-list__track">
      {!track && <p>No track specified.</p>}
      {track && (
        <>
          <span className="track-list__track__preview">
            <img src={track?.album?.images[0].url} alt={track.name} />
          </span>
          <div className="track-list__track__name-group">
            <h3 className="track-list__track__name">{track.name}</h3>
            <span className="track-list__track__artists">
              {track.artists.map((artist) => artist.name).join(', ')}
            </span>
          </div>
          <span className="track-list__track__info track-list__track__rec-by">
            {track.recommended_by || 'Spotify'}
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
