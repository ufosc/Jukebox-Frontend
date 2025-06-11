import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Network } from 'src/network'
import { selectCurrentJukebox } from 'src/store'
import { formatDuration } from 'src/utils'

import './SearchTrackItem.scss'

export const SearchTrackItem = (props: { track: Nullable<ITrackDetails> }) => {
  const { track } = props

  const network = Network.getInstance()
  const jukebox = useSelector(selectCurrentJukebox)

  const [addedToQueue, setAddedToQueue] = useState(false)

  const addSongToQueue = async () => {
    setAddedToQueue(true)
    if (track && jukebox) {
      const songhref: string = track.id
      const res = await network.queueTrack(jukebox.id, songhref)
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
            <img src={track?.album?.images[0]?.url} alt={track.name} />
          </div>
          <div className="track-list-track__name-group">
            <h3 className="track-list-track__name">{track.name}</h3>
            <span className="track-list-track__artists">
              {track.artists.map((artist) => artist.name).join(', ')}
            </span>
          </div>
          <div className="track-list-track__info track-list-track__duration">
            {formatDuration(track.duration_ms)}
          </div>
          {addedToQueue ? (
            <div className="added-to-queue">Added to Queue</div>
          ) : (
            <div>
              <button className="button-solid" onClick={addSongToQueue}>
                + Add to Queue
              </button>
            </div>
          )}
        </>
      )}
    </li>
  )
}
