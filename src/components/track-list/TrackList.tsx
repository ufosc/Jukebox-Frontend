import { mergeClassNames } from 'src/utils'
import { TrackItem } from './TrackItem'
import './TrackList.scss'
import { useCallback, useEffect, useMemo, useState } from 'react'

export const TrackList = (props: {
  tracks: IQueuedTrack[]
  offsetCount?: boolean
  maxCount?: number
}) => {
  const { tracks, offsetCount, maxCount } = props

  function deepCopy<T>(value: T): T {
    return structuredClone(value)
  }

  const initialCopy = useMemo(()=>
    deepCopy(tracks), [tracks]
  )

  const [queuedTracks, swapTracks] = useState<IQueuedTrack[]>(initialCopy)

  const moveListItem = useCallback(
    (dragIndex:number, hoverIndex:number) => {
      const dragItem = queuedTracks[dragIndex]
      const hoverItem = queuedTracks[hoverIndex]
  
      //Swap places of Items
      swapTracks((queuedTracks: any) => {
        const updatedTracks = [...queuedTracks]
        updatedTracks[dragIndex] = hoverItem
        updatedTracks[hoverIndex] = dragItem
        return updatedTracks
      })
  
      //console.log(`From ${dragIndex} to ${hoverIndex}`)
    },
    [queuedTracks],
  )

  useEffect(()=>{
    swapTracks(deepCopy(tracks))
  },[tracks])

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
              track && <TrackItem track={track} key={track.queue_id} moveListItem={moveListItem} index={index}/>,
          )
          .splice(0, maxCount ?? tracks.length)}
      {tracks.length < 1 && <p>No tracks available.</p>}
    </ol>
  )
}
