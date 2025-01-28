import HeartIcon from 'src/assets/svg/HeartIcon.svg?react'
import NextIcon from 'src/assets/svg/NextIcon.svg?react'
import PauseIcon from 'src/assets/svg/PauseIcon.svg?react'
import PlayIcon from 'src/assets/svg/PlayIcon.svg?react'
import PreviousIcon from 'src/assets/svg/PreviousIcon.svg?react'
import RepeatIcon from 'src/assets/svg/RepeatIcon.svg?react'

import './Controls.scss'

export const Controls = (props: {
  playing: boolean
  togglePlay?: () => void
  nextTrack?: () => void
  prevTrack?: () => void
  like?: () => void
  repeat?: () => void
}) => {
  // const { isPlaying, togglePlay, nextTrack, previousTrack } =
  //   useContext(SpotifyPlayerContext)
  const { playing, togglePlay, nextTrack, prevTrack, repeat, like } = props

  // const handleLike = () => {
  //   console.log('Pressed like.')
  // }
  // const handleRepeat = () => {
  //   console.log('Pressed repeat.')
  // }

  return (
    <div className="audio-player__controls audio-controls">
      {like && (
        <button className="audio-controls__icon" onClick={like}>
          <HeartIcon />
        </button>
      )}

      {prevTrack && (
        <button className="audio-controls__icon" onClick={prevTrack}>
          <PreviousIcon />
        </button>
      )}

      {togglePlay && (
        <button
          onClick={togglePlay}
          className={`audio-controls__icon ${playing ? 'playing' : 'paused'}`}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
      )}

      {nextTrack && (
        <button className="audio-controls__icon" onClick={nextTrack}>
          <NextIcon />
        </button>
      )}
      {repeat && (
        <button className="audio-controls__icon" onClick={repeat}>
          <RepeatIcon />
        </button>
      )}
    </div>
  )
}
