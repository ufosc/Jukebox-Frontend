import type { ChangeEvent } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  selectAllClubs,
  selectCurrentClub,
  selectCurrentJukebox,
  selectHasJukeboxAux,
  selectUser,
  setCurrentClub,
} from 'src/store'

import { useNavigate } from 'react-router-dom'
import { ApiClient } from 'src/api'
import { Dialog } from 'src/components'
import { usePopover } from 'src/hooks'
import { debounce } from 'src/utils'
import { SearchModal } from './modals/SearchModal'
import { UserModal } from './modals/UserModal'
import './Topbar.scss'

export const Topbar = () => {
  const user = useSelector(selectUser)
  const clubs = useSelector(selectAllClubs)
  const currentClub = useSelector(selectCurrentClub)
  const jukebox = useSelector(selectCurrentJukebox)
  const hasAux = useSelector(selectHasJukeboxAux)

  const [showUser, setShowUser] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [searchList, setSearchList] = useState<ITrack[]>([])
  const [searchActive, setSearchActive] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const network = ApiClient.getInstance()
  const navigate = useNavigate()
  const { Popover: ClubPopover, PopoverButton: ClubPopoverButton } =
    usePopover('clubs-popover')

  const onFocus = () => {
    if (searchInput.trim() !== '') {
      setSearchActive(true)
      setShowSearch(true)
    }
  }
  const onBlur = () => setSearchActive(false)

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchEntry = e.target.value
    setSearchInput(searchEntry)
    //Only searches if search isn't empty
    if (searchEntry.trim() !== '') {
      debounce(async () => {
        console.log('Searching for ', searchInput)
        e.preventDefault()

        if (jukebox !== null) {
          // Only Searches using track name currently
          const tracksResult = await network.searchTracks(
            jukebox.id,
            searchInput,
            '',
            '',
          )
          console.log(tracksResult)
          if (tracksResult.success) {
            console.log(tracksResult.data.tracks)
            //Modify logic for Modal
            setSearchList(tracksResult.data.tracks)
          }
        } else {
          console.log('Jukebox is not connected')
        }
      })
      setSearchActive(true)
      setShowSearch(true)
    }
  }

  const handleUser = () => {
    setShowUser(!showUser)
  }

  const closeUserModal = () => {
    setShowUser(false)
  }

  const handleSelectClub = async (id: number) => {
    await setCurrentClub(id)
  }

  const handleSearchSubmit = async (e: any) => {
    e.preventDefault()
    const searchPath = '/dashboard/music/search'
    if (jukebox) {
      const response = await network.searchTracks(
        jukebox.id,
        searchInput,
        '',
        '',
      )

      const query = {
        trackName: searchInput,
        albumName: '',
        artistName: '',
      }

      navigate(searchPath, {
        state: { searchedTracks: response, query: query, needSearch: true },
      })
    }
    setSearchActive(false)
  }

  return (
    <>
      <div className="topbar">
        <div className="topbar__nav-toggle">
          <input type="checkbox" name="nav" id="nav-toggle" />
          <label htmlFor="nav-toggle" className="topbar__nav-toggle__button">
            <span className="topbar__nav-toggle__button__icon">&nbsp;</span>
          </label>
        </div>
        <div className="topbar__search-tracks">
          <form onSubmit={handleSearchSubmit}>
            <input
              className="search-tracks-field"
              type="text"
              name="track"
              value={searchInput}
              onChange={handleSearchChange}
              placeholder="Search Tracks"
              autoComplete="off"
              onFocus={onFocus}
              onBlur={onBlur}
            ></input>
          </form>
          {searchActive || showSearch ? (
            <>
              <Dialog
                backdrop={true}
                defaultOpen={true}
                dismissible={true}
                changeState={setShowSearch}
                className={'overlay-dialog__search'}
              >
                <SearchModal
                  tracks={searchList}
                  searchQuery={{
                    trackName: searchInput,
                    albumName: '',
                    artistName: ' ',
                  }}
                  changeState={setShowSearch}
                />
              </Dialog>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="topbar__user-details">
          {hasAux && (
            <p className="color-text-role-success topbar__success">
              AUX Connected
            </p>
          )}

          <div className="topbar__club">
            <ClubPopoverButton type="button" className="topbar__club__button">
              {currentClub && (
                <div className="topbar__club__selected">{currentClub.name}</div>
              )}
            </ClubPopoverButton>
          </div>
          <ClubPopover className="topbar__club__popover">
            <ul className="topbar__club__list">
              {clubs.map((club) => (
                <li className="topbar__club__list__item" key={club.id}>
                  <button
                    className="button-tonal"
                    onClick={(e) => handleSelectClub(club.id)}
                  >
                    {club.name}
                  </button>
                </li>
              ))}
            </ul>
          </ClubPopover>
          <div className="topbar__profile__container">
            <button className="topbar__profile" onClick={handleUser}>
              {user && (
                <img
                  src={user?.profile?.image ?? undefined}
                  alt={user.username}
                />
              )}
              {!user && <p>Login required.</p>}
            </button>
          </div>
          {showUser ? (
            <>
              <Dialog
                backdrop={true}
                defaultOpen={true}
                dismissible={true}
                changeState={setShowUser}
                className={'overlay-dialog__user'}
              >
                <UserModal user={user} closeModal={closeUserModal} />
              </Dialog>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      {hasAux && <div className="activeAux" />}
    </>
  )
}
