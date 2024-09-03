/**
 * @fileoverview Audio Player Component
 */
import { createContext, useContext, useRef, useState } from 'react'
import { SpotifyPlayerContext } from 'src/context'
import './AudioPlayer.scss'
import { Controls } from './Controls'
import { ProgressBar } from './ProgressBar'
import './ProgressBar.scss'

export const AudioPlayerContext = createContext({
  currentTrack: undefined as Track | undefined,
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
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<Track | undefined>()

  const { nextTrack, pause, player, previousTrack, togglePlay } =
    useContext(SpotifyPlayerContext)

  // State
  const [timeProgress, setTimeProgress] = useState(0)
  const [duration, setDuration] = useState(0)

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
          <ProgressBar onProgressChange={() => {}} />
        </div>
      </AudioPlayerContext.Provider>
    </div>
  )
}
