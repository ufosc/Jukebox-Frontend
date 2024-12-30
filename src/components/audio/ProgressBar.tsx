import {
  forwardRef,
  useEffect,
  useState,
  type ChangeEvent,
  type Ref,
} from 'react'
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
  const [fmtProgress, setFmtProgress] = useState('0:00')
  const [fmtDuration, setFmtDuration] = useState('0:00')

  useEffect(() => {
    setFmtProgress(formatDuration(progress ?? 0))
  }, [progress])

  useEffect(() => {
    setFmtDuration(formatDuration(duration ?? 0))
  }, [duration])

  const onProgressChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!setProgress) return

    setProgress(+e.target.value)
  }

  return (
    <div className="audio-player__progress">
      <span className="time audio-player__progress_current">{fmtProgress}</span>
      <input type="range" ref={ref} onChange={onProgressChange} />
      <span className="time">{fmtDuration}</span>
    </div>
  )
}

export const ProgressBar = forwardRef(ProgressBarComponent)
