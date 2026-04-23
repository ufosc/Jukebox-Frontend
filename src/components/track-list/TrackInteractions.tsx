import { ThumbDownAltOutlined, ThumbUpAltOutlined } from '@mui/icons-material'
import { useContext } from 'react'
import './TrackInteractions.scss'

import { useDrag } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { ApiClient } from 'src/api'
import { AdminContext } from 'src/apps/admin'
import { TrackModifyContext } from 'src/apps/admin/pages/trackContext'
import { MoveIcon, RemoveIcon } from 'src/assets/Icons'
import { selectCurrentJukeSession } from 'src/store'
import { thunkFetchQueue } from 'src/store/jukebox/jbxThunks'

export const TrackInteractions = (props: {
  track: IQueuedTrack
  index?: number
}) => {
  const { track, index } = props

  const adminStatus = useContext(AdminContext)
  const trackStatus = useContext(TrackModifyContext)
  const network = ApiClient.getInstance()
  const dispatch = useDispatch()

  const jukeSession = useSelector(selectCurrentJukeSession)

  const removeTrack = async () => {
    if (track.id != null && adminStatus.jukebox !== null && jukeSession) {
      const res = await network.removeQueuedTrack(
        adminStatus.jukebox.id,
        jukeSession.id,
        track.id,
      )

      if (res.success) {
        await dispatch(
          thunkFetchQueue({
            jukeboxId: adminStatus.jukebox.id,
            jukeSessionId: jukeSession.id,
          }) as any,
        )
      }
    }
  }

  const [{ isDragging }, dragRef] = useDrag({
    type: 'track',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

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
            {track?.likes ?? 0}
          </div>
          <div className="track-interactivity__item track-interactivity__item--dislikes">
            <ThumbDownAltOutlined />
            {track?.dislikes ?? 0}
          </div>
        </div>
      )}
    </>
  )
}
