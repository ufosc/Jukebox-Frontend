import { useContext, useEffect } from 'react'
import { SpotifyPlayerContext } from 'src/context'
import { mockTrack } from 'src/mock'
import { TracksPanel } from '../components'
import { DisplayPanel } from '../components/DisplayPanel'
import './Board1.scss'

export const Board1 = () => {
  const track = mockTrack
  const { currentTrack } = useContext(SpotifyPlayerContext)

  useEffect(() => {
    console.log('Current track:', currentTrack)
  }, [currentTrack])

  return (
    <div className="board board-1">
      <DisplayPanel />
      <TracksPanel
        currentTrack={currentTrack}
        nextTracks={[
          track,
          { ...track, id: track.id + '1' },
          { ...track, id: track.id + '2' },
          { ...track, id: track.id + '3' },
        ]}
      />
    </div>
  )
}
