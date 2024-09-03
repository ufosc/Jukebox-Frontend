import { useContext, useRef } from 'react'
import HeartIcon from 'src/assets/svg/HeartIcon.svg?react'
import NextIcon from 'src/assets/svg/NextIcon.svg?react'
import PauseIcon from 'src/assets/svg/PauseIcon.svg?react'
import PlayIcon from 'src/assets/svg/PlayIcon.svg?react'
import PreviousIcon from 'src/assets/svg/PreviousIcon.svg?react'
import RepeatIcon from 'src/assets/svg/RepeatIcon.svg?react'
import { AudioPlayerContext } from './AudioPlayer'

import './Controls.scss'

export const Controls = () => {
  const {
    isPlaying,
    togglePlayPause,
    next,
    previous,
    duration,
    setTimeProgress,
  } = useContext(AudioPlayerContext)

  const playAnimationRef = useRef<number>(0)

  const handlePrevious = () => {
    previous()
  }
  const handleNext = () => {
    next()
  }

  const handleLike = () => {
    console.log('Pressed like.')
  }
  const handleRepeat = () => {
    console.log('Pressed repeat.')
  }

  return (
    <div className="audio-player__controls audio-controls">
      <button className="audio-controls__icon" onClick={handleLike}>
        <HeartIcon />
      </button>
      <button className="audio-controls__icon" onClick={handlePrevious}>
        <PreviousIcon />
      </button>

      <button
        onClick={togglePlayPause}
        className={`audio-controls__icon ${isPlaying ? 'playing' : 'paused'}`}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>

      <button className="audio-controls__icon" onClick={handleNext}>
        <NextIcon />
      </button>
      <button className="audio-controls__icon" onClick={handleRepeat}>
        <RepeatIcon />
      </button>
    </div>
  )
}
