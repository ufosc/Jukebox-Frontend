import { useContext, useRef } from 'react'
import HeartIcon from 'src/assets/svg/HeartIcon.svg?react'
import NextIcon from 'src/assets/svg/NextIcon.svg?react'
import PauseIcon from 'src/assets/svg/PauseIcon.svg?react'
import PlayIcon from 'src/assets/svg/PlayIcon.svg?react'
import PreviousIcon from 'src/assets/svg/PreviousIcon.svg?react'
import RepeatIcon from 'src/assets/svg/RepeatIcon.svg?react'

import { SpotifyPlayerContext } from 'src/context'
import './Controls.scss'

export const Controls = () => {
  const { isPlaying, togglePlay, nextTrack, previousTrack } =
    useContext(SpotifyPlayerContext)

  const playAnimationRef = useRef<number>(0)

  const handlePrevious = () => {
    previousTrack()
  }
  const handleNext = () => {
    nextTrack()
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
        onClick={togglePlay}
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
