import { useState } from 'react'

import { Song } from '../Song/Song'
import './ScrollQueue.css'

export const ScrollQueue = () => {
  const [songs, setSongs] = useState([])
  const [songName, setSongName] = useState('')
  const [artist, setArtist] = useState('')

  function addSong(songName, artist) {
    setSongs([
      ...songs,
      <Song key={songName} songNameSong={songName} artistSong={artist} />,
    ])
  }

  function removeSong() {
    setSongs([...songs.slice(0, -1)])
  }

  return (
    <div className="QueueContainer">
      <div className="Buttons">
        <button onClick={() => addSong(songName, artist)}>Add</button>
        <button onClick={() => removeSong()}>Remove</button>
      </div>
      <div className="Inputs">
        <input
          type="text"
          placeholder="Name of Song"
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name of Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
      </div>
      <div className="SongScroll">
        {songs.map((song) => (
          <div key={song}>{song}</div>
        ))}
      </div>
    </div>
  )
}
