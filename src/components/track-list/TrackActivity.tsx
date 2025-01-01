import { ThumbDownAltOutlined, ThumbUpAltOutlined } from '@mui/icons-material'
import './TrackActivity.scss'

export const TrackActivity = (props: { track?: ITrackMeta }) => {
  const { track } = props

  return (
    <div className="track-activity">
      <div className="track-activity__item track-activity__item--likes">
        <ThumbUpAltOutlined />
        {track?.likes ?? 0}
      </div>
      <div className="track-activity__item track-activity__item--dislikes">
        <ThumbDownAltOutlined />
        {track?.dislikes ?? 0}
      </div>
    </div>
  )
}
