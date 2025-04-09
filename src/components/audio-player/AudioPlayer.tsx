/**
 * @fileoverview Audio Player Component
 */
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { usePlayer } from 'src/hooks'
import { selectLiveProgress } from 'src/store'
import './AudioPlayer.scss'
import { Controls } from './Controls'
import { ProgressBar } from './ProgressBar'
import './ProgressBar.scss'

/**
 * Stateless audio player.
 *
 * It will work with what ever props it is given.
 */
export const AudioPlayer = (props: { disableControls?: boolean }) => {
  const { disableControls } = props
  const liveProgress = useSelector(selectLiveProgress)

  const {
    play,
    pause,
    setProgress,
    nextTrack,
    prevTrack,
    togglePlay,
    like,
    repeat,
    playerState,
  } = usePlayer()

  // Refs
  const containerRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLInputElement>(null)

  // State
  const [editMode, setEditMode] = useState(false)
  const [duration, setDuration] = useState<number | null>(null)

  // Update track values
  useEffect(() => {
    if (!playerState?.current_track || !('track' in playerState.current_track))
      return
    setDuration(playerState?.current_track?.track.duration_ms ?? null)

    if (!progressBarRef.current || !playerState) return
    progressBarRef.current.max = String(
      playerState.current_track?.track.duration_ms ?? 1000,
    )
  }, [playerState?.current_track])

  // Update progress
  useEffect(() => {
    if (!duration || !liveProgress) return

    containerRef.current?.style.setProperty(
      '--range-progress',
      `${(liveProgress / duration) * 100}%`,
    )

    if (!editMode && progressBarRef.current) {
      progressBarRef.current.value = String(liveProgress)
    }
  }, [liveProgress])

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
    (playerState && (
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
            duration={playerState.current_track?.track.duration_ms}
            progress={liveProgress ?? undefined}
          />
        </div>
      </div>
    )) || <p>No Audio Playing</p>
  )
}
