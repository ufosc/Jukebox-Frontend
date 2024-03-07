export const Song = () => {
  return (
    <div className="SongInfo">
      <img
        src={this.props.imageUrl}
        alt="Song Cover"
        align="left"
        className="SongImg"
      />
      <h1>{this.props.songNameSong}</h1>
      <h2>{this.props.artistSong}</h2>
    </div>
  )
}
