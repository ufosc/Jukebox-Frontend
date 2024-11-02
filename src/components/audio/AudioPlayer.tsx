/**
 * @fileoverview Audio Player Component
 */
import type { ChangeEvent } from 'react'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { SpotifyPlayerContext } from 'src/context'
import './AudioPlayer.scss'
import { Controls } from './Controls'
import { ProgressBar } from './ProgressBar'
import './ProgressBar.scss'

export const AudioPlayerContext = createContext({
  currentTrack: undefined as Nullable<ITrack>,
  isPlaying: false,
  timeProgress: 0,
  duration: 0,
  pause: () => {},
  next: () => {},
  previous: () => {},
  togglePlayPause: () => {},
  setDuration: (total: number) => {},
  setTimeProgress: (loc: number) => {},
})

export const AudioPlayer = () => {
  const {
    nextTrack,
    play,
    pause,
    player,
    previousTrack,
    togglePlay,
    isPlaying,
    currentTrack,
    progress: timeProgress,
    duration,
    setTimeProgress,
  } = useContext(SpotifyPlayerContext)
  const progressBarRef = useRef<HTMLInputElement>(null)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.max = String(duration)
    }
  }, [duration])

  useEffect(() => {
    containerRef.current?.style.setProperty(
      '--range-progress',
      `${(timeProgress / duration) * 100}%`,
    )

    if (!editMode && progressBarRef.current) {
      progressBarRef.current.value = String(timeProgress)
    }
  }, [timeProgress])

  const onSetTimeProgress = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('Progress:', e.target.value)
    setTimeProgress(+e.target.value)
  }
  const setDuration = () => {}

  useEffect(() => {
    const onMouseDown = () => {
      pause()
      setEditMode(true)
      console.log('Mouse down')
    }
    const onMouseUp = () => {
      play()
      setEditMode(false)
      console.log('Mouse up')
    }

    progressBarRef.current?.addEventListener('mousedown', onMouseDown)
    progressBarRef.current?.addEventListener('mouseup', onMouseUp)

    return () => {
      progressBarRef.current?.removeEventListener('mousedown', onMouseDown)
      progressBarRef.current?.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  // Refs
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="audio-player" ref={containerRef}>
      <AudioPlayerContext.Provider
        value={{
          currentTrack,
          isPlaying,
          pause,
          next: nextTrack,
          previous: previousTrack,
          togglePlayPause: togglePlay,
          duration,
          setDuration,
          timeProgress,
          setTimeProgress,
        }}
      >
        <div className="audio-player__inner">
          <Controls />
          <ProgressBar
            onProgressChange={onSetTimeProgress}
            ref={progressBarRef}
          />
        </div>
      </AudioPlayerContext.Provider>
    </div>
  )
}
