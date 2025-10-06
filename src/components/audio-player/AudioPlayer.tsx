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
    like,
    repeat,
    togglePlay,
    playerState,
    liveProgress,
    currentTrack,
  } = useContext(PlayerContext)

  useEffect(() => {
    console.log('player state:', playerState)
  }, [playerState])

  useEffect(() => {
    console.log('Current track:', currentTrack)
  }, [currentTrack])

  // Refs
  const containerRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLInputElement>(null)
  const trackNameRef = useRef<HTMLHeadingElement>(null)

  // State
  const [editMode, setEditMode] = useState(false)
  const [duration, setDuration] = useState<number | null>(null)
  const [displayInfo, setDisplayInfo] = useState(true)

  // Update track values
  useEffect(() => {
    setDuration(currentTrack?.duration_ms ?? 0)

    if (!progressBarRef.current || !playerState) return
    progressBarRef.current.max = String(currentTrack?.duration_ms ?? 0)
  }, [currentTrack])

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
    <>
      {currentTrack && (
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
      {/* {playerState?.spotify_track && !playerState.queued_track && (
        <div className="audio-player" ref={containerRef}>
          <div className="audio-player__inner">
            {displayInfo && (
              <div className="audio-player__track">
                <h3 className="audio-player__track__name" ref={trackNameRef}>
                  {playerState.spotify_track.name}
                </h3>

                <div className="audio-player__track__info">
                  <p className="audio-player__track__artists">
                    {playerState.spotify_track.artists.join(', ') ||
                      'Artist Unavailable'}
                  </p>
                  {playerState.queued_track && (
                    <TrackInteractions track={playerState.queued_track} />
                  )}
                </div>
                <p className="audio-player__track__rec">Queued by Spotify</p>
              </div>
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
              duration={playerState.spotify_track.duration_ms}
              progress={liveProgress ?? undefined}
            />
          </div>
        </div>
      )} */}
      {!playerState?.spotify_track && !playerState?.queued_track && (
        <h3 className="audio-player__track__name">Nothing playing</h3>
      )}
    </>
  )
}
