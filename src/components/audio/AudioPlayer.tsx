/**
 * @fileoverview Audio Player Component
 */
import { useEffect, useRef, useState } from 'react'
import './AudioPlayer.scss'
import { Controls } from './Controls'
import { ProgressBar } from './ProgressBar'
import './ProgressBar.scss'

/**
 * Stateless audio player.
 *
 * It will work with what ever props it is given.
 */
export const AudioPlayer = (props: {
  playerState: IPlayerState
  disableControls?: boolean
  play?: () => void
  pause?: () => void
  togglePlay?: () => void
  setProgress?: (ms: number) => void
  nextTrack?: () => void
  prevTrack?: () => void
  like?: () => void
  repeat?: () => void
}) => {
  const {
    playerState,
    disableControls,
    play,
    pause,
    setProgress,
    nextTrack,
    prevTrack,
    togglePlay,
    like,
    repeat,
  } = props

  // Refs
  const containerRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLInputElement>(null)

  // State
  const [editMode, setEditMode] = useState(false)
  const [duration, setDuration] = useState<number | null>(null)

  // Update track values
  useEffect(() => {
    setDuration(playerState?.current_track?.duration_ms ?? null)

    if (!progressBarRef.current) return
    progressBarRef.current.max = String(
      playerState.current_track?.duration_ms ?? 1000,
    )

    // if (!progressBarRef.current || !playerState.current_track) return
  }, [playerState.current_track])

  // Update progress
  useEffect(() => {
    if (!duration) return

    containerRef.current?.style.setProperty(
      '--range-progress',
      `${(playerState.progress / duration) * 100}%`,
    )

    if (!editMode && progressBarRef.current) {
      progressBarRef.current.value = String(playerState.progress)
    }
  }, [playerState.progress])

  // Pause track when setting time progress
  useEffect(() => {
    const onMouseDown = () => {
      if (!pause) return

      pause()
      setEditMode(true)
    }
    const onMouseUp = () => {
      if (!play) return

      play()
      setEditMode(false)
    }

    progressBarRef.current?.addEventListener('mousedown', onMouseDown)
    progressBarRef.current?.addEventListener('mouseup', onMouseUp)

    return () => {
      progressBarRef.current?.removeEventListener('mousedown', onMouseDown)
      progressBarRef.current?.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  return (
    <div className="audio-player" ref={containerRef}>
      <div className="audio-player__inner">
        {!disableControls && (
          <Controls
            playing={playerState.is_playing}
            nextTrack={nextTrack}
            prevTrack={prevTrack}
            togglePlay={togglePlay}
            like={like}
            repeat={repeat}
          />
        )}
        <ProgressBar
          setProgress={setProgress}
          ref={progressBarRef}
          duration={playerState.current_track?.duration_ms}
          progress={playerState.progress}
        />
      </div>
    </div>
  )
}
