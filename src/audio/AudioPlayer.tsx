/**
 * @fileoverview Audio Player Component
 */
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from 'react'
import { KeyboardContext } from 'src/context/KeyboardContext'
import './AudioPlayer.scss'
import { Controls } from './Controls'
import { ProgressBar } from './ProgressBar'
import './ProgressBar.scss'

export const AudioPlayerContext = createContext({
  audio: undefined as Track | undefined,
  isPlaying: false,
  timeProgress: 0,
  duration: 0,
  play: () => {},
  pause: () => {},
  next: () => {},
  previous: () => {},
  togglePlayPause: () => {},
  setDuration: (total: number) => {},
  setTimeProgress: (loc: number) => {},
  skipBackward: () => {},
  skipForeward: () => {},
})

export const AudioPlayer = (props: {
  audio?: Track | null
  isPlaying: boolean
  next: () => void
  previous: () => void
  play: () => void
  pause: () => void
}) => {
  const { audio, isPlaying, next, previous, play, pause } = props
  const { onKey, onSpace } = useContext(KeyboardContext)

  // State
  const [timeProgress, setTimeProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  // Refs
  const audioRef = useRef<HTMLAudioElement>(null)
  const progressBarRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Event handlers
  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 15
    }
  }
  const skipForeward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 15
    }
  }

  onKey('l', () => {
    skipForeward()
  })

  onKey('j', () => {
    skipBackward()
  })

  onSpace(() => {
    togglePlayPause()
  })

  const onLoadedMetaData = () => {
    const seconds = audioRef.current?.duration
    setDuration(seconds || 0)
    progressBarRef.current!.max = String(seconds)
  }

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }
  }

  const handleProgressChange = (e: ChangeEvent<HTMLInputElement>) => {
    audioRef.current!.currentTime = +(progressBarRef.current?.value || 0)
  }

  // Effects
  useEffect(() => {
    if (isPlaying && audioRef.current?.paused) {
      audioRef.current?.play()
    } else if (!isPlaying && !audioRef.current?.paused) {
      audioRef.current?.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    setTimeProgress(audioRef.current?.currentTime ?? 0)
  }, [audioRef.current?.currentTime])

  return (
    <div className="audio-player" ref={containerRef}>
      {audio == null && <p>No Audio File Selected.</p>}
      {audio != null && (
        <AudioPlayerContext.Provider
          value={{
            audio,
            isPlaying,
            play,
            pause,
            next,
            previous,
            togglePlayPause,
            duration,
            setDuration,
            timeProgress,
            setTimeProgress,
            skipBackward,
            skipForeward,
          }}
        >
          <div className="audio-player__inner">
            <audio
              src={audio?.href}
              ref={audioRef}
              onLoadedMetadata={onLoadedMetaData}
              onEnded={next}
              onPlay={play}
              onPause={pause}
            />
            <Controls audioRef={audioRef} progressBarRef={progressBarRef} />
            <ProgressBar
              onProgressChange={handleProgressChange}
              ref={progressBarRef}
            />
          </div>
        </AudioPlayerContext.Provider>
      )}
    </div>
  )
}
