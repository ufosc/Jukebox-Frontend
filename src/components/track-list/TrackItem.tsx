import { formatDuration } from 'src/utils'

import { useContext, useEffect, useRef, useState } from 'react'

import { useDrop } from 'react-dnd'
import { useSelector } from 'react-redux'
import { ApiClient } from 'src/api'
import { AdminContext } from 'src/apps/admin'
import { selectCurrentJukebox } from 'src/store'
import { TrackInteractions } from './TrackInteractions'
import './TrackItem.scss'

export const TrackItem = (props: {
  track: Nullable<IQueuedTrack>
  moveListItem: (dragIndex: number, hoverIndex: number) => void
  index: number
}) => {
  const { track, moveListItem, index } = props

  const adminStatus = useContext(AdminContext)
  const ref = useRef<HTMLLIElement>(null)

  const network = ApiClient.getInstance()
  const currentJukebox = useSelector(selectCurrentJukebox)

  const [targetPos, setTargetPos] = useState(-1)
  const [hoverIndexNum, setHoverIndexNum] = useState(-1)
  const [originalIndex, setOriginalIndex] = useState(index)

  const [spec, dropRef] = useDrop({
    accept: 'track',
    hover: (item: any, monitor: any) => {
      const dragIndex = item.index
      const hoverIndex = index
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      if (hoverBoundingRect === undefined) {
        console.log('Error!')
        return
      }

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      //Fix this to use the actual box y instead of the actual cursor y
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top

      // if dragging down, continue only when hover is smaller than middle Y
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
      // if dragging up, continue only when hover is bigger than middle Y
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

      props.moveListItem(dragIndex, hoverIndex)
      moveListItem(dragIndex, hoverIndex)
      setTargetPos(dragIndex)

      item.index = hoverIndex
    },
    drop: (item: any, monitor: any) => {
      console.log(`Moving the ${originalIndex} to ${targetPos}`)
      if (currentJukebox) {
        const res = network.setQueueOrder(
          currentJukebox.id,
          originalIndex,
          targetPos,
        )
        console.log(res)
      }

      //update track position
      setOriginalIndex(targetPos)
    },
  })

  /*
  const [{ isDragging }, dragRef] = useDrag({
    type: 'track',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const draggingStyle: React.CSSProperties = isDragging ? {
    border: '2px solid red'} : {}
        */
  const dropperRef = dropRef(ref)
  dropRef(ref)

  //I think it works unintentionally, assuming the queue id changes
  useEffect(() => {
    setOriginalIndex(index)
  }, [track])

  return (
    <>
      {adminStatus.role === 'admin' ? (
        <li className="track-list-track" ref={ref}>
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
                <TrackInteractions track={track} index={index} />
              </div>
            </>
          )}
        </li>
      ) : (
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
                <TrackInteractions track={track} index={index} />
              </div>
            </>
          )}
        </li>
      )}
    </>
  )
}
