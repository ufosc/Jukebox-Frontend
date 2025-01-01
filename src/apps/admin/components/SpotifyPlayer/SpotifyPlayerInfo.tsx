import './SpotifyPlayerInfo.scss'

interface InfoProps {
  title: string
}

export const SpotifyPlayerInfo: React.FC<InfoProps> = ({ title }) => {
  return (
    <>
      <div className="spotify-player-info-title">{title}</div>
    </>
  )
}
