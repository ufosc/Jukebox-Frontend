import { mergeClassNames } from 'src/utils'
import { TrackItem } from './TrackItem'
import './TrackList.scss'
import { useCallback } from 'react'

export const TrackList = (props: {
  tracks: IQueuedTrack[]
  offsetCount?: boolean
  maxCount?: number
}) => {
  const { tracks, offsetCount, maxCount } = props


  const moveListItem = useCallback(
    (dragIndex:number, hoverIndex:number) => {
      const dragItem = tracks[dragIndex]
      const hoverItem = tracks[hoverIndex]
  
      //Swap places of Items
  
      console.log(`From ${dragIndex} to ${hoverIndex}`)
    },
    [tracks],
  )

  const onDropEvents = () =>{ 
    console.log("Dropped")
  }

  return (
    <ol
      className={mergeClassNames(
        'track-list',
        offsetCount && 'track-list-offset',
      )}
    >
      {tracks &&
        tracks.length > 0 &&
        tracks
          .map(
            (track, index) =>
              track && <TrackItem track={track} key={track.queue_id} moveListItem={moveListItem} index={index} dropEvent={onDropEvents}/>,
          )
          .splice(0, maxCount ?? tracks.length)}
      {tracks.length < 1 && <p>No tracks available.</p>}
    </ol>
  )
}
