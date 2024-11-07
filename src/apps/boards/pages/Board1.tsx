import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentTrack, selectNextTracks } from 'src/store/track'
import { Clock, TracksPanel } from '../components'
import { DisplayPanel } from '../components/DisplayPanel'
import './Board1.scss'

export const Board1 = () => {
  // const { currentTrack } = useContext(SpotifyPlayerContext)
  const currentTrack = useSelector(selectCurrentTrack)
  const nextTracks = useSelector(selectNextTracks)

  useEffect(() => {
    console.log('Current track:', currentTrack)
  }, [currentTrack])

  return (
    <div className="board board-1">
      <DisplayPanel>
        <Clock />
      </DisplayPanel>
      <TracksPanel currentTrack={currentTrack} nextTracks={nextTracks} />
    </div>
  )
}
