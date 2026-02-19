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

  // Keep refs to play/pause so the progress bar listeners always call
  // the latest version without needing to re-register on every render
  const playRef = useRef(play)
  const pauseRef = useRef(pause)
  useEffect(() => {
    playRef.current = play
  }, [play])
  useEffect(() => {
    pauseRef.current = pause
  }, [pause])

  // State
  const [editMode, setEditMode] = useState(false)
  const [displayInfo, setDisplayInfo] = useState(showInfo !== false)

  const formatRangeProgress = (progressMs: number, durationMs: number) => {
    return `${(progressMs / durationMs) * 100}%`
  }

  /**
   * Set progress in context, and manually update progress bar
   * background color so it's not reliant on track progress updates
   * while the user is scrubbing through a track
   */
  const setProgress = (ms: number) => {
    if (!currentTrack) return

    setContextProgress(ms)
    document.documentElement.style.setProperty(
      '--range-progress',
      formatRangeProgress(ms, currentTrack.duration_ms),
    )
  }

  // Keep a ref to editMode so the progress effect always reads the latest value
  const editModeRef = useRef(editMode)
  useEffect(() => {
    editModeRef.current = editMode
  }, [editMode])

  // Update progress bar position and CSS variable when live progress changes
  useEffect(() => {
    console.log('[AudioPlayer] Progress update check:', {
      liveProgress,
      currentTrack: currentTrack?.name,
      duration: currentTrack?.duration_ms,
      willUpdate: !!(currentTrack?.duration_ms && liveProgress),
    })
    if (!currentTrack?.duration_ms || !liveProgress) return

    document.documentElement.style.setProperty(
      '--range-progress',
      formatRangeProgress(liveProgress, currentTrack.duration_ms),
    )

    if (!editModeRef.current && progressBarRef.current) {
      progressBarRef.current.value = String(liveProgress)
    }
  }, [liveProgress])

  // Pause on scrub start, resume on scrub end.
  // Uses refs so we never need to re-register these listeners.
  useEffect(() => {
    const el = progressBarRef.current
    if (!el) return

    const onMouseDown = () => {
      pauseRef.current?.()
      setEditMode(true)
    }

    const onMouseUp = () => {
      playRef.current?.()
      setEditMode(false)
    }

    el.addEventListener('mousedown', onMouseDown)
    el.addEventListener('mouseup', onMouseUp)

    return () => {
      el.removeEventListener('mousedown', onMouseDown)
      el.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  return (
    <>
      {currentTrack?.name ? (
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
                  Recommended by:{' '}
                  {playerState?.queued_track?.queued_by.user_id || 'Spotify'}
                </p>
              </div>
            )}

            {
              <Controls
                playing={playerState?.is_playing ?? false}
                hasAux={disableControls ? disableControls : false}
                nextTrack={nextTrack}
                prevTrack={prevTrack}
                togglePlay={togglePlay}
                like={like}
                repeat={repeat}
              />
            }

            <ProgressBar
              setProgress={setProgress}
              ref={progressBarRef}
              duration={currentTrack.duration_ms}
              progress={liveProgress ?? undefined}
            />
          </div>
        </div>
      ) : (
        <h3 className="audio-player__track__name">Nothing playing</h3>
      )}
    </>
  )
}
