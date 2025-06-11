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
    setProgress,
    nextTrack,
    prevTrack,
    togglePlay,
    like,
    repeat,
    playerState,
    liveProgress,
  } = useContext(PlayerContext)

  useEffect(() => {
    console.log('player state:', playerState)
  }, [playerState])

  // Refs
  const containerRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLInputElement>(null)
  const trackNameRef = useRef<HTMLHeadingElement>(null)

  // State
  const [editMode, setEditMode] = useState(false)
  const [duration, setDuration] = useState<number | null>(null)
  const [displayInfo, setDisplayInfo] = useState(true)

  // const isOverflown = ({ clientHeight, scrollHeight }) =>
  //   scrollHeight > clientHeight

  // const resizeText = ({
  //   element,
  //   minSize = 10,
  //   maxSize = 512,
  //   step = 1,
  //   unit = 'px',
  // }) => {
  //   let i = minSize
  //   let overflow = false

  //   const parent = element.parentNode

  //   while (!overflow && i < maxSize) {
  //     element.style.fontSize = `${i}${unit}`
  //     overflow = isOverflown(parent)

  //     if (!overflow) i += step
  //   }

  //   // revert to last state where no overflow happened
  //   element.style.fontSize = `${i - step}${unit}`
  // }

  // Update track values
  useEffect(() => {
    if (!playerState?.current_track || !('track' in playerState.current_track))
      return
    setDuration(playerState?.current_track?.track.duration_ms ?? null)

    if (!progressBarRef.current || !playerState) return
    progressBarRef.current.max = String(
      playerState.current_track?.track.duration_ms ?? 1000,
    )

    // resizeText({ element: trackNameRef.current, step: 0.5 })
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

  //Update display information
  useEffect(() => {
    if (showInfo === false) {
      setDisplayInfo(false)
    }
  }, [])

  return (
    (playerState != null && (
      <div className="audio-player" ref={containerRef}>
        <div className="audio-player__inner">
          {displayInfo ? (
            <div className="audio-player__track">
              <h3 className="audio-player__track__name" ref={trackNameRef}>
                {playerState.current_track?.track.name}
              </h3>

              <div className="audio-player__track__info">
                <p className="audio-player__track__artists">
                  {playerState.current_track?.track.artists
                    .map((artist) => artist.name)
                    .join(', ') || 'Artist Unavailable'}
                </p>
                <TrackInteractions track={playerState.current_track} />
              </div>
              <p className="audio-player__track__rec">
                Recommended by:{' '}
                {playerState.current_track?.recommended_by ?? 'Spotify'}
              </p>
            </div>
          ) : (
            <> </>
          )}
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
    )) || <p>No Tracks Playing</p>
  )
}
