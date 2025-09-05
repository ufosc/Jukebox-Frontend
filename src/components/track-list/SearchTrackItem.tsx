import { useState } from 'react'
import { useSelector } from 'react-redux'
import { ApiClient } from 'src/api'
import {
  selectCurrentJukebox,
  selectCurrentJukeSession,
  selectUser,
} from 'src/store'
import { formatDuration } from 'src/utils'

import './SearchTrackItem.scss'

export const SearchTrackItem = (props: { track: ITrack }) => {
  const { track } = props

  const network = ApiClient.getInstance()
  const jukebox = useSelector(selectCurrentJukebox)
  const jukeSession = useSelector(selectCurrentJukeSession)
  const user = useSelector(selectUser)

  const [addedToQueue, setAddedToQueue] = useState(false)

  const addSongToQueue = async () => {
    setAddedToQueue(true)
    if (track && jukebox && jukeSession) {
      const res = await network.queueTrack(jukebox.id, jukeSession.id, {
        spotify_track_id: track.spotify_id,
        queued_by: { id: user!.id },
      })
      console.log(res)
    } else {
      console.log('Not Possible')
    }
  }

  return (
    <li className="track-list-track">
      {!track && <p>No track specified.</p>}
      {track && (
        <>
          <div className="track-list-track__preview">
            <img src={track?.preview_url ?? ''} alt={track.name} />
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
              <button className="button-solid-queue" onClick={addSongToQueue}>
                + Queue
              </button>
            </div>
          )}
        </>
      )}
    </li>
  )
}
