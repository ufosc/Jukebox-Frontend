import { forwardRef, useContext, type ChangeEvent, type Ref } from 'react'
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

  const formatTime = (time: number) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60)
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
      const seconds = Math.floor(time % 60)
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
      return `${formatMinutes}:${formatSeconds}`
    }
    return '00:00'
  }

  return (
    <div className="audio-player__progress">
      <span className="time audio-player__progress_current">
        {formatTime(timeProgress)}
      </span>
      <input
        type="range"
        // defaultValue={0}
        ref={ref}
        onChange={onProgressChange}
        value={timeProgress}
      />
      <span className="time">{formatTime(duration)}</span>
    </div>
  )
}

export const ProgressBar = forwardRef(ProgressBarComponent)
