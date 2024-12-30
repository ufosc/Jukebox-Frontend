import { forwardRef, type ChangeEvent, type Ref } from 'react'
import { formatDuration } from 'src/utils'
import './ProgressBar.scss'

const ProgressBarComponent = (
  props: {
    progress?: number
    duration?: number
    setProgress?: (ms: number) => void
  },
  ref: Ref<HTMLInputElement>,
) => {
  const { setProgress, progress, duration } = props

  const onProgressChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!setProgress) return

    setProgress(+e.target.value)
  }

  return (
    <div className="audio-player__progress">
      <span className="time audio-player__progress_current">
        {formatDuration(progress ?? 0)}
      </span>
      <input type="range" ref={ref} onChange={onProgressChange} />
      <span className="time">{formatDuration(duration ?? 0)}</span>
    </div>
  )
}

export const ProgressBar = forwardRef(ProgressBarComponent)
