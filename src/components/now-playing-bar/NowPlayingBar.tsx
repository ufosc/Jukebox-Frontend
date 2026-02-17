import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import NextIcon from 'src/assets/svg/NextIcon.svg?react'
import PauseIcon from 'src/assets/svg/PauseIcon.svg?react'
import PlayIcon from 'src/assets/svg/PlayIcon.svg?react'
import PreviousIcon from 'src/assets/svg/PreviousIcon.svg?react'
import { PlayerContext } from 'src/context'
import { formatDuration } from 'src/utils'
import './NowPlayingBar.scss'

const ROUTES_WITH_PLAYER = ['/dashboard', '/dashboard/player', '/dashboard/debug']

export const NowPlayingBar = () => {
  const { currentTrack, playerState, liveProgress, togglePlay, nextTrack, prevTrack } =
    useContext(PlayerContext)

  const location = useLocation()

  const hideBar = ROUTES_WITH_PLAYER.includes(location.pathname)

  if (hideBar || !currentTrack?.name) return null

  const progress = liveProgress ?? 0
  const duration = currentTrack.duration_ms ?? 0
  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0

  return (
    <div className="now-playing-bar">
      <div
        className="now-playing-bar__progress-line"
        style={{ width: `${Math.min(progressPercent, 100)}%` }}
      />
      <div className="now-playing-bar__content">
        <div className="now-playing-bar__track">
          <span className="now-playing-bar__track__name">{currentTrack.name}</span>
          <span className="now-playing-bar__track__artists">
            {currentTrack.artists?.join(', ') || 'Unknown Artist'}
          </span>
        </div>
        <div className="now-playing-bar__controls">
          <button className="now-playing-bar__controls__btn" onClick={prevTrack}>
            <PreviousIcon />
          </button>
          <button className="now-playing-bar__controls__btn" onClick={togglePlay}>
            {playerState?.is_playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button className="now-playing-bar__controls__btn" onClick={nextTrack}>
            <NextIcon />
          </button>
        </div>
        <div className="now-playing-bar__time">
          <span>{formatDuration(progress)}</span>
          <span>/</span>
          <span>{formatDuration(duration)}</span>
        </div>
      </div>
    </div>
  )
}
