import React from 'react'
import './Song.css'

class Song extends React.Component{
    render(){
        return(
            <div className="SongInfo">
                <img src={this.props.imageUrl} alt="Song Cover" align="left" className="SongImg"/>
                <h1 align="right">
                    {this.props.songNameSong}
                </h1>
                <h2 align="right">
                    {this.props.artistSong}
                </h2>
            </div>
        );
    }
};

export default Song