import { forwardRef, useContext, type ChangeEvent, type Ref } from 'react'
import { formatDuration } from 'src/utils'
import { AudioPlayerContext } from './AudioPlayer'
import './ProgressBar.scss'

const ProgressBarComponent = (
  props: {
    onProgressChange: (e: ChangeEvent<HTMLInputElement>) => void
  },
  ref: Ref<HTMLInputElement>,
) => {
  const { onProgressChange } = props
  const { timeProgress, duration } = useContext(AudioPlayerContext)

  return (
    <div className="audio-player__progress">
      <span className="time audio-player__progress_current">
        {formatDuration(timeProgress)}
      </span>
      <input
        type="range"
        ref={ref}
        onChange={onProgressChange}
        // value={timeProgress}
      />
      <span className="time">{formatDuration(duration)}</span>
    </div>
  )
}

export const ProgressBar = forwardRef(ProgressBarComponent)
