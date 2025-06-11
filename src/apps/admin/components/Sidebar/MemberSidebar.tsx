import { useContext } from 'react'
import {
  HomeIcon,
  JukeboxIcon,
  MusicIcon
} from 'src/assets/Icons'
import { ThemeContext } from 'src/context/Theme'
import { mergeClassNames } from 'src/utils'
import '../Sidebar.scss'
import { NavItem } from './NavItem'


export const MemberSidebar = () => {
  const { toggleMode, mode } = useContext(ThemeContext)

  const handleModeClick = () => {
    toggleMode()
  }

  return (
      <div className="navbar__inner">
        <div className="navbar__row">
          <div className="navbar__logobox">
            <div className="navbar__logobox__item">
              <JukeboxIcon />
              <div className="navbar__logobox__text">
                <h2 className="navbar__logobox__title">Jukebox</h2>
                <p className="navbar__logobox__subtitle">
                  By UF Open Source Club
                </p>
              </div>
            </div>
          </div>
          <nav className="navbar__nav">
            <ul className="navbar__nav__list">
              <li className="navbar__nav__list__item">
                <span className="navbar__nav__item">
                  <HomeIcon />
                  <NavItem route="/dashboard" text="Home" end />
                </span>
              </li>
              <li className="navbar__nav__list__item">
                <span className="navbar__nav__item">
                  <MusicIcon />
                  <NavItem route="music" text="Music" end />
                  <button className="navbar__dropdown__button"></button>
                </span>
              </li>
            </ul>
          </nav>
        </div>
        <div className="navbar__row">
          <label htmlFor="theme" className="switch">
            <input
              type="checkbox"
              id="theme"
              onClick={handleModeClick}
              value={mode === 'light' ? 'checked' : ''}
            />
            <div className="slider">
              <span className="slider__toggle color-role-primary-inverse">
                O
              </span>
            </div>
          </label>
        </div>
      </div>
  )
}
