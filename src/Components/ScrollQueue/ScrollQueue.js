import React from 'react'
import { useState } from 'react';
import Song from './Song/Song.js'
import './ScrollQueue.css'

function ScrollQueue() {
    const [songs, setSongs] = useState([])
    const [songName, setSongName] = useState('')
    const [artist, setArtist] = useState('')

    function addSong(songName, artist){
        setSongs([...songs, <Song songNameSong={songName} artistSong={artist}/>]);
    };
  
    function removeSong(){
        setSongs([...songs.slice(0, -1)])
    };

    return(
        <div className='QueueContainer'>
            <div className="Buttons">
                <button onClick={ () => addSong(songName, artist)}>Add</button>
                <button onClick={ () => removeSong() }>Remove</button>
            </div>
            <div className ="Inputs">
                <input type='text' placeholder='Name of Song' value={songName} onChange={e => setSongName(e.target.value)}/>
                <input type='text' placeholder='Name of Artist' value={artist} onChange={e => setArtist(e.target.value)}/>
            </div>
            <div className="SongScroll">
                {songs.map((song) => (
                    <div>
                        {song}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ScrollQueue;