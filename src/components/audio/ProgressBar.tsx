import { forwardRef, useContext, type ChangeEvent, type Ref } from 'react'
import { SpotifyPlayerContext } from 'src/context'
import { formatDuration } from 'src/utils'
import './ProgressBar.scss'

const ProgressBarComponent = (
  props: {
    onProgressChange: (e: ChangeEvent<HTMLInputElement>) => void
  },
  ref: Ref<HTMLInputElement>,
) => {
  const { onProgressChange } = props
  const { progress, duration } = useContext(SpotifyPlayerContext)

  return (
    <div className="audio-player__progress">
      <span className="time audio-player__progress_current">
        {formatDuration(progress)}
      </span>
      <input type="range" ref={ref} onChange={onProgressChange} />
      <span className="time">{formatDuration(duration)}</span>
    </div>
  )
}

export const ProgressBar = forwardRef(ProgressBarComponent)
