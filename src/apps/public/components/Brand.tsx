import { JukeboxIcon } from 'src/assets/Icons.tsx'
import './Brand.scss'

export const Brand = () => {
  return (
    <a href="/" className="brand">
      <div className="logobox__item">
        <JukeboxIcon />
        <div className="logobox__text">
          <h2 className="logobox__title">Jukebox</h2>
          <p className="logobox__subtitle">By UF Open Source Club</p>
        </div>
      </div>
    </a>
  )
}
