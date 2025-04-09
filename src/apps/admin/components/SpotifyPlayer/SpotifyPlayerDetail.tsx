import './SpotifyPlayerDetail.scss'

interface DetailProps {
  firstDetail: string
  secondDetail: string
}

export const SpotifyPlayerDetail: React.FC<DetailProps> = ({
  firstDetail,
  secondDetail,
}) => {
  return (
    <>
      <div className="spotify-player-detail-container">
        <div className="spotify-player-detail-first">{firstDetail}</div>
        <div className="spotify-player-detail-second">{secondDetail}</div>
        
      </div>
    </>
  )
}
