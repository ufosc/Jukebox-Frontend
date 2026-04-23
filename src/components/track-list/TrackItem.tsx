import { formatDuration } from 'src/utils'

import { useContext, useRef } from 'react'

import { useDrop } from 'react-dnd'
import { AdminContext } from 'src/apps/admin'
import { TrackInteractions } from './TrackInteractions'
import './TrackItem.scss'

export const TrackItem = (props: {
  track: Nullable<IQueuedTrack>
  moveListItem: (dragIndex: number, hoverIndex: number) => void
  persistQueueOrder: () => Promise<void>
  index: number
  showIcon: boolean
  showLength: boolean
}) => {
  const {
    track,
    moveListItem,
    persistQueueOrder,
    index,
    showIcon,
    showLength,
  } = props

  const adminStatus = useContext(AdminContext)
  const ref = useRef<HTMLLIElement>(null)

  const [, dropRef] = useDrop({
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

      moveListItem(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
    drop: () => {
      void persistQueueOrder()
    },
  })
  dropRef(ref)

  return (
    <>
      {adminStatus.role === 'admin' ? (
        <li className="track-list-track" ref={ref}>
          {!track && <p>No track specified.</p>}
          {track && (
            <>
              {!showIcon ? (
                <></>
              ) : (
                <div className="track-list-track__preview">
                  <img
                    src={track.track.image_url ?? ''}
                    alt={track.track.name}
                  />
                </div>
              )}
              <div className="track-list-track__name-group">
                <h3 className="track-list-track__name">{track.track.name}</h3>
                <span className="track-list-track__artists">
                  {track.track.artists.join(', ')}
                </span>
              </div>
              <div className="track-list-track__info track-list-track__rec-by">
                {track.queued_by.user_id || 'Spotify'}
              </div>
              {!showLength ? (
                <></>
              ) : (
                <div className="track-list-track__info track-list-track__duration">
                  {formatDuration(track.track.duration_ms)}
                </div>
              )}
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
                  src={track?.track.image_url ?? ''}
                  alt={track.track.name}
                />
              </div>
              <div className="track-list-track__name-group">
                <h3 className="track-list-track__name">{track.track.name}</h3>
                <span className="track-list-track__artists">
                  {track.track.artists.join(', ')}
                </span>
              </div>
              <div className="track-list-track__info track-list-track__rec-by">
                {track.queued_by.user_id || 'Spotify'}
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
