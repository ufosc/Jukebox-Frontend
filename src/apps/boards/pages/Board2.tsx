import { useContext } from 'react'
import { SpotifyPlayerContext } from 'src/context'
import { mockTrack } from 'src/mock'
import { DisplayPanel, FlipClock, TracksPanel } from '../components'

export const Board2 = () => {
  const { currentTrack } = useContext(SpotifyPlayerContext)

  const track = mockTrack
  const nextTracks = [
    track,
    { ...track, id: track.id + '1' },
    { ...track, id: track.id + '2' },
    { ...track, id: track.id + '3' },
  ]

  return (
    <div className="board board-2">
      <DisplayPanel>
        <FlipClock />
      </DisplayPanel>
      <TracksPanel currentTrack={currentTrack} nextTracks={nextTracks} />
    </div>
  )
}
