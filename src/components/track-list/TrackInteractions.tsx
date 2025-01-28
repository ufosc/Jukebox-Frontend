import { ThumbDownAltOutlined, ThumbUpAltOutlined } from '@mui/icons-material'
import './TrackInteractions.scss'

export const TrackInteractions = (props: { track?: IQueuedTrack }) => {
  const { track } = props

  return (
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
  )
}
