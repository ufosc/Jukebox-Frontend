import { useCallback, useEffect, useMemo, useState } from 'react'
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

  const initialCopy = useMemo(() => structuredClone(tracks), [tracks])

  const [queuedTracks, swapTracks] = useState<IQueuedTrack[]>(initialCopy)

  const moveListItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragItem = queuedTracks[dragIndex]
      const hoverItem = queuedTracks[hoverIndex]
      //Swap places of Items
      swapTracks((queuedTracks: any) => {
        const updatedTracks = [...queuedTracks]
        updatedTracks[dragIndex] = hoverItem
        updatedTracks[hoverIndex] = dragItem
        return updatedTracks
      })
    },
    [queuedTracks],
  )

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
                  index={index}
                  showIcon={showIcon !== undefined ? false : true}
                  showLength={showLength !== undefined ? false : true}
                />
              ),
          )
          .splice(0, maxCount ?? tracks.length)}
      {tracks.length < 1 && <p>No tracks available.</p>}
    </ol>
  )
}
