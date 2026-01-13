/**
 * @fileoverview Audio Player Component
 */
import { useContext, useEffect, useRef, useState } from 'react'
import { PlayerContext } from 'src/context'
import { TrackInteractions } from '../track-list/TrackInteractions'
import './AudioPlayer.scss'
import { Controls } from './Controls'
import { ProgressBar } from './ProgressBar'
import './ProgressBar.scss'

/**
 * Stateful audio player.
 *
 * Provides controls for the global player.
 */
export const AudioPlayer = (props: {
  disableControls?: boolean
  showInfo?: boolean
}) => {
  const { disableControls, showInfo } = props

  const {
    play,
    pause,
    setProgress: setContextProgress,
    nextTrack,
    prevTrack,
    like,
    repeat,
    togglePlay,
    playerState,
    liveProgress,
    currentTrack,
  } = useContext(PlayerContext)

  // Refs
  const containerRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLInputElement>(null)
  const trackNameRef = useRef<HTMLHeadingElement>(null)

  // State
  const [editMode, setEditMode] = useState(false)
  const [displayInfo, setDisplayInfo] = useState(true)

  const formatRangeProgress = (progressMs: number, durationMs: number) => {
    return `${(progressMs / durationMs) * 100}%`
  }

  /**
   * Set progress in context, and manually update progress bar
   * background color so not reliant on track progress updates when
   * the user is scrubbing through a track
   */
  const setProgress = (ms: number) => {
    if (!currentTrack) return

    setContextProgress(ms)
    document.documentElement.style.setProperty(
      '--range-progress',
      formatRangeProgress(ms, currentTrack.duration_ms),
    )
  }

  // Update progress when live progress changes
  useEffect(() => {
    if (!currentTrack?.duration_ms || !liveProgress) return

    document.documentElement.style.setProperty(
      '--range-progress',
      formatRangeProgress(liveProgress, currentTrack.duration_ms),
    )

    if (!editMode && progressBarRef.current) {
      // Only set progress bar if live progress changes, not if user
      // scrubs through track using the progress input
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

  //Update display information
  useEffect(() => {
    if (showInfo === false) {
      setDisplayInfo(false)
    }
  }, [])

  return (
    <>
      {currentTrack?.name && (
        <div className="audio-player" ref={containerRef}>
          <div className="audio-player__inner">
            {displayInfo && (
              <div className="audio-player__track">
                <h3 className="audio-player__track__name" ref={trackNameRef}>
                  {currentTrack.name}
                </h3>

                <div className="audio-player__track__info">
                  <p className="audio-player__track__artists">
                    {currentTrack.artists?.join(', ') || 'Artist Unavailable'}
                  </p>
                  {playerState?.queued_track && (
                    <TrackInteractions track={playerState.queued_track} />
                  )}
                </div>
                <p className="audio-player__track__rec">
                  Recommended by:
                  {(playerState?.queued_track &&
                    playerState.queued_track.queued_by.user_id) ||
                    'Spotify'}
                </p>
              </div>
            )}
            {!disableControls && (
              <Controls
                playing={playerState?.is_playing ?? false}
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
              duration={currentTrack.duration_ms}
              progress={liveProgress ?? undefined}
            />
          </div>
        </div>
      )}

      {!currentTrack?.name && (
        <h3 className="audio-player__track__name">Nothing playing</h3>
      )}
    </>
  )
}
