import { useContext, type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { ThemeContext } from 'src/context/Theme'
import { mergeClassNames } from 'src/utils'
import './Sidebar.scss'

const NavItem = (props: {
  text: string
  icon?: ReactNode
  route?: string
  link?: string
  end?: boolean
}) => {
  const { route, link, text, icon, end } = props
  return (
    <li className="navbar__nav__item">
      {(route && (
        <NavLink to={route} end={end}>
          {icon && <div className="navbar__nav__item__icon">{icon}</div>}
          <span className="navbar__nav__item__text">{text}</span>
        </NavLink>
      )) ||
        (link && (
          <a href={link}>
            <div className="navbar__nav__item__icon">{icon}</div>
            <span className="navbar__nav__item__text">{text}</span>
          </a>
        ))}
    </li>
  )
}

export const Sidebar = (props: { className?: string }) => {
  const { navOpen, toggleNavOpen } = useContext(ThemeContext)
  const { className } = props
  const { toggleMode, mode } = useContext(ThemeContext)

  const handleModeClick = () => {
    toggleMode()
  }

  return (
    <div className={mergeClassNames(className, 'navbar')}>
      <div className="navbar__inner">
        <div className="navbar__row">
          <div className="navbar__logobox">
            <h2 className="navbar__logobox__title">Jukebox</h2>
            <p className="navbar__logobox__subtitle">By UF Open Source Club</p>
          </div>
          <nav className="navbar__nav">
            <ul className="navbar__nav__list">
              <NavItem route="/admin" text="Home" end />
              <NavItem route="boards" text="Boards" end />
              <NavItem route="music" text="Music" end />
              <NavItem route="jam-sessions" text="Jam Sessions" end />
              <NavItem route="members" text="Members" end />
              <NavItem route="settings" text="Settings" end />
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
    </div>
  )
}
