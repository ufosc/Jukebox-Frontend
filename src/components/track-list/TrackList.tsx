import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ApiClient } from 'src/api'
import { selectCurrentJukebox, selectCurrentJukeSession } from 'src/store'
import { thunkFetchQueue } from 'src/store/jukebox/jbxThunks'
import { mergeClassNames } from 'src/utils'
import { TrackItem } from './TrackItem'
import './TrackList.scss'

export const TrackList = (props: {
  tracks: IQueuedTrack[]
  offsetCount?: boolean
  maxCount?: number
  showIcon?: boolean
  showLength?: boolean
}) => {
  const { tracks, offsetCount, maxCount, showIcon, showLength } = props
  const api = ApiClient.getInstance()
  const dispatch = useDispatch()
  const jukebox = useSelector(selectCurrentJukebox)
  const jukeSession = useSelector(selectCurrentJukeSession)

  const initialCopy = useMemo(() => structuredClone(tracks), [tracks])

  const [queuedTracks, swapTracks] = useState<IQueuedTrack[]>(initialCopy)
  const queuedTracksRef = useRef<IQueuedTrack[]>(initialCopy)

  useEffect(() => {
    queuedTracksRef.current = queuedTracks
  }, [queuedTracks])

  const moveListItem = useCallback((dragIndex: number, hoverIndex: number) => {
    swapTracks((currentTracks) => {
      const updatedTracks = [...currentTracks]
      const [dragItem] = updatedTracks.splice(dragIndex, 1)
      updatedTracks.splice(hoverIndex, 0, dragItem)
      return updatedTracks
    })
  }, [])

  const persistQueueOrder = useCallback(async () => {
    if (!jukebox || !jukeSession) {
      return
    }

    const ordering = queuedTracksRef.current.map((track) => track.id)
    const res = await api.setQueueOrder(jukebox.id, jukeSession.id, {
      ordering,
    })

    if (res.success) {
      await dispatch(
        thunkFetchQueue({
          jukeboxId: jukebox.id,
          jukeSessionId: jukeSession.id,
        }) as any,
      )
    }
  }, [api, dispatch, jukebox, jukeSession])

  useEffect(() => {
    swapTracks(structuredClone(tracks))
  }, [tracks])

  return (
    <ol
      className={mergeClassNames(
        'track-list',
        offsetCount && 'track-list-offset',
      )}
    >
      {queuedTracks &&
        queuedTracks.length > 0 &&
        queuedTracks
          .map(
            (track, index) =>
              track && (
                <TrackItem
                  track={track}
                  key={track.id}
                  moveListItem={moveListItem}
                  persistQueueOrder={persistQueueOrder}
                  index={index}
                  showIcon={showIcon ?? true}
                  showLength={showLength ?? true}
                />
              ),
          )
          .slice(0, maxCount ?? tracks.length)}
      {tracks.length < 1 && <p>No tracks available.</p>}
    </ol>
  )
}
