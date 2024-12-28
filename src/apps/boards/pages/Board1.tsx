import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectNextTracks, selectPlayerState } from 'src/store/jukebox'
import { Clock, TracksPanel } from '../components'
import { DisplayPanel } from '../components/DisplayPanel'
import './Board1.scss'

export const Board1 = () => {
  const playerState = useSelector(selectPlayerState)
  const nextTracks = useSelector(selectNextTracks)

  useEffect(() => {
    console.log('Current track:', playerState)
  }, [playerState])

  return (
    <div className="board board-1">
      <DisplayPanel>
        <Clock />
      </DisplayPanel>
      <TracksPanel
        currentTrack={playerState?.current_track}
        nextTracks={nextTracks}
      />
    </div>
  )
}
