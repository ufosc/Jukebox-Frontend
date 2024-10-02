import { useContext, useEffect, useState } from 'react'

import { AudioPlayer } from 'src/components'

import './Overview.scss'

import { SpotifyPlayerContext } from 'src/context'
import { mockTrack } from 'src/mock'
import Disk from 'src/assets/svg/Disk.svg?react'

import { Track } from './Track'

export const Overview = () => {
  const [song, setSong] = useState('')
  const [author, setAuthor] = useState('')
  const { currentTrack } = useContext(SpotifyPlayerContext)

  useEffect(() => {
    console.log('Hello')
    console.log('Current track:', currentTrack)
    console.log()
    if (currentTrack == undefined) {
      setSong('No song Playing')
      setAuthor('No Author')
    } else {
      setSong(currentTrack.name)
      setAuthor(
        currentTrack.artists
          .map((artist: { name: any }) => artist.name)
          .join(', '),
      )
    }
  }, [currentTrack])

  const track = mockTrack
  return (
    <>
      <div className="grid">
        <div className="col-5 card">
          <div className="song-desc">
            <div className="song-title">{song}</div>
            <div className="song-author">{author}</div>
          </div>
          <AudioPlayer />
        </div>

        <div className="col-7">
          <div className="disk">
            <img
              className="curr-song"
              src={currentTrack?.album?.images[0].url}
              alt={track.name}
            />
            <Disk />
          </div>
        </div>
      </div>

      <div className="grid">
        <div className="col-12">
          <div className="song-queue scrollbar">
            <ol className="board__queue__list track-list scrollbar">
              <Track track={track} />
              <Track track={track} />
              <Track track={track} />
              <Track track={track} />
              <Track track={track} />
            </ol>
          </div>
        </div>
      </div>
    </>
  )
}
