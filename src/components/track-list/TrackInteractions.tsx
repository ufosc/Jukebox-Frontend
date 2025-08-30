import { ThumbDownAltOutlined, ThumbUpAltOutlined } from '@mui/icons-material'
import { useContext, useEffect } from 'react'
import './TrackInteractions.scss'

import { useDrag } from 'react-dnd'
import { useSelector } from 'react-redux'
import { ApiClient } from 'src/api'
import { AdminContext } from 'src/apps/admin'
import { TrackModifyContext } from 'src/apps/admin/pages/trackContext'
import { MoveIcon, RemoveIcon } from 'src/assets/Icons'
import { selectCurrentMembership } from 'src/store'

export const TrackInteractions = (props: {
  track?: IQueuedTrack
  index?: number
}) => {
  const { track, index } = props

  const adminStatus = useContext(AdminContext)
  const trackStatus = useContext(TrackModifyContext)
  const network = ApiClient.getInstance()

  const currrentMembership = useSelector(selectCurrentMembership)

  const removeTrack = () => {
    if (track !== undefined && adminStatus.jukebox !== null) {
      console.log(track.queue_id)
      network.removeQueuedTrack(adminStatus.jukebox.id, track.queue_id)
    }
  }

  const [{ isDragging }, dragRef] = useDrag({
    type: 'track',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  useEffect(() => {
    console.log(adminStatus.role)
  }, [currrentMembership])

  return (
    <>
      {adminStatus.role === 'admin' && trackStatus ? (
        <div className="track-interactivity">
          <button
            className="track-interactivity__button"
            onClick={(e) => {
              e.stopPropagation()
              removeTrack()
            }}
          >
            <RemoveIcon />
          </button>
          <button className="track-interactivity__button" ref={dragRef}>
            <MoveIcon />
          </button>
        </div>
      ) : (
        <div className="track-interactivity">
          <div className="track-interactivity__item track-interactivity__item--likes">
            <ThumbUpAltOutlined />
            {track?.interactions.likes ?? 0}
          </div>
          <div className="track-interactivity__item track-interactivity__item--dislikes">
            <ThumbDownAltOutlined />
            {track?.interactions.dislikes ?? 0}
          </div>
        </div>
      )}
    </>
  )
}
