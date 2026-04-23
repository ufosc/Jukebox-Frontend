import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ApiClient } from 'src/api'
import {
  selectCurrentJukebox,
  selectCurrentJukeSession,
  selectCurrentJukeSessionMembership,
} from 'src/store'
import { thunkFetchQueue } from 'src/store/jukebox/jbxThunks'
import { formatDuration } from 'src/utils'

import './SearchTrackItem.scss'

export const SearchTrackItem = (props: { track: ITrack }) => {
  const { track } = props

  const network = ApiClient.getInstance()
  const dispatch = useDispatch()
  const jukebox = useSelector(selectCurrentJukebox)
  const jukeSession = useSelector(selectCurrentJukeSession)
  const jukeSessionMembership = useSelector(selectCurrentJukeSessionMembership)

  const [addedToQueue, setAddedToQueue] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addSongToQueue = async () => {
    if (
      !track ||
      !jukebox ||
      !jukeSession ||
      !jukeSessionMembership ||
      isSubmitting
    ) {
      return
    }

    setIsSubmitting(true)

    try {
      const res = await network.queueTrack(jukebox.id, jukeSession.id, {
        spotify_track_id: track.spotify_id,
        queued_by: { id: jukeSessionMembership.id },
      })

      if (!res.success) {
        return
      }

      setAddedToQueue(true)
      await dispatch(
        thunkFetchQueue({
          jukeboxId: jukebox.id,
          jukeSessionId: jukeSession.id,
        }) as any,
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <li className="track-list-track">
      {!track && <p>No track specified.</p>}
      {track && (
        <>
          <div className="track-list-track__preview">
            <img src={track?.image_url ?? ''} alt={track.name} />
          </div>
          <div className="track-list-track__name-group">
            <h3 className="track-list-track__name">{track.name}</h3>
            <span className="track-list-track__artists">
              {track.artists.join(', ')}
            </span>
          </div>
          <div className="track-list-track__info track-list-track__duration">
            {formatDuration(track.duration_ms)}
          </div>
          {addedToQueue ? (
            <div className="added-to-queue">Added</div>
          ) : (
            <div>
              <button
                className="button-solid-queue"
                disabled={isSubmitting}
                onClick={addSongToQueue}
                type="button"
              >
                + Queue
              </button>
            </div>
          )}
        </>
      )}
    </li>
  )
}
