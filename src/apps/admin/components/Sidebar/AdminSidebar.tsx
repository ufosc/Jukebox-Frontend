import { ChangeEvent, useContext } from 'react'
import { useSelector } from 'react-redux'
import { ThemeContext } from 'src/context'

import { NavItem } from './NavItem'

import '../Sidebar.scss'

import {
  BoardIcon,
  HomeIcon,
  JamIcon,
  JukeboxIcon,
  MusicIcon,
  SettingsIcon,
  SpeakerIcon,
} from 'src/assets/Icons'
import {
  selectAllJukeboxes,
  selectCurrentClub,
  selectCurrentJukebox,
  setCurrentJukebox,
} from 'src/store'
import { truncate } from 'src/utils/helpers/truncate'

export const AdminSidebar = () => {
  const { toggleMode, mode } = useContext(ThemeContext)

  const currentJukebox = useSelector(selectCurrentJukebox)
  const allJukeboxes = useSelector(selectAllJukeboxes)
  const currentClub = useSelector(selectCurrentClub)

  const handleModeClick = () => {
    toggleMode()
  }

  const handleJukeboxChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedJukeboxId: number = Number(e.target.value)
    setCurrentJukebox(selectedJukeboxId)

    if (currentJukebox !== null) {
      console.log('Selected JBX is: ', currentJukebox.id)
    }
  }

  return (
    <>
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
                  <SpeakerIcon />
                  <NavItem route="player" text="Jukebox" end />
                  <button className="navbar__dropdown__button"></button>
                </span>
              </li>

              <li className="navbar__nav__list__item">
                <span className="navbar__nav__item">
                  <BoardIcon />
                  <NavItem route="boards" text="Boards" end />
                </span>
              </li>
              <li className="navbar__nav__list__item">
                <span className="navbar__nav__item">
                  <MusicIcon />
                  <NavItem route="music" text="Music" end />
                  <button className="navbar__dropdown__button"></button>
                </span>
              </li>
              <li className="navbar__nav__list__item">
                <span className="navbar__nav__item">
                  <JamIcon />
                  <NavItem route="jam-sessions" text="Juke Session" end />
                  <button className="navbar__dropdown__button"></button>
                </span>
              </li>
              <li className="navbar__nav__list__item">
                <span className="navbar__nav__item">
                  <JamIcon />
                  <NavItem route="members" text="Members" end />
                  <button className="navbar__dropdown__button"></button>
                </span>
              </li>
              <li className="navbar__nav__list__item">
                <span className="navbar__nav__item">
                  <SettingsIcon />
                  <NavItem route="settings" text="Settings" end />
                </span>
              </li>
            </ul>
          </nav>
          <div></div>

          <div className="navbar__row">
            <div className="navbar__break" />
          </div>

          <div className="navbar__row">
            <div className="form__select-jukebox">
              <select
                name="current-jukebox"
                id="current-jukebox"
                onChange={handleJukeboxChange}
                defaultValue={currentClub?.id}
              >
                {!currentJukebox && (
                  <option value="">No Jukebox Selected</option>
                )}
                {allJukeboxes.map((jukebox) => (
                  <option key={jukebox.id} value={jukebox.id}>
                    {truncate(jukebox.name, 22)}
                  </option>
                ))}
              </select>
            </div>
          </div>
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
    </>
  )
}
