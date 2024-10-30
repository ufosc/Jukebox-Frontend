import { useContext, useEffect, useRef, useState } from 'react'

import { AudioPlayer } from 'src/components'

import './Overview.scss'

import Disk from 'src/assets/svg/Disk.svg?react'
import { SpotifyPlayerContext } from 'src/context'
import { mockTrack } from 'src/mock'

import { Track } from './Track'

export const Overview = () => {
  const [song, setSong] = useState('')
  const [author, setAuthor] = useState('')
  const { currentTrack } = useContext(SpotifyPlayerContext)
  const [currentTrackImage, setCurrentTrackImage] = useState('')
  const songTitleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (currentTrack == undefined) {
      setSong('No song Playing')
      setAuthor('No Author')
      setCurrentTrackImage(track?.album?.images[0].url)
    } else {
      setSong(currentTrack.name)
      setAuthor(
        currentTrack.artists
          .map((artist: { name: any }) => artist.name)
          .join(', '),
      )
      setCurrentTrackImage(currentTrack?.album?.images[0].url)

      if (currentTrack.name.length > 15) {
        songTitleRef.current?.classList.add('song-title--small')
      }
    }
  }, [currentTrack])

  const track = mockTrack
  return (
    <>
      <div className="grid">
        <div className="col-5 card">
          <div className="song-desc">
            <h2 className="song-title" ref={songTitleRef}>
              {song}
            </h2>
            <div className="song-author">{author}</div>
          </div>
          <AudioPlayer />
        </div>

        <div className="col-7">
          <div className="disk">
            <img
              className="curr-song"
              src={currentTrackImage}
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
