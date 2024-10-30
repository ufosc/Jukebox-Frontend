/**
 * @fileoverview Audio Player Component
 */
import { createContext, useContext, useEffect, useRef } from 'react'
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
    pause,
    player,
    previousTrack,
    togglePlay,
    isPlaying,
    currentTrack,
    progress: timeProgress,
    duration,
  } = useContext(SpotifyPlayerContext)
  const progressBarRef = useRef<HTMLInputElement>(null)

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
  }, [timeProgress])

  const setTimeProgress = () => {}
  const setDuration = () => {}

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
            onProgressChange={setTimeProgress}
            ref={progressBarRef}
          />
        </div>
      </AudioPlayerContext.Provider>
    </div>
  )
}
