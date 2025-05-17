import type { ChangeEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, FormInputGroup, FormSection } from 'src/components'
import { Network } from 'src/network'
import {
  selectAllClubs,
  selectAllLinks,
  selectCurrentClub,
  selectJukeboxLinks,
} from 'src/store'

import './CreateJukebox.scss'
import { SpotifyLinkAccount } from './members/SpotifyDetail'

export const CreateJukebox = () => {
  const network = Network.getInstance()
  const [selectedClub, setSelectedClub] = useState(-1)
  const [jbxName, setJbxName] = useState('')
  const jukeboxRef = useRef<HTMLInputElement>(null)
  const clubRef = useRef<HTMLInputElement>(null)
  const currentClub = useSelector(selectCurrentClub)
  const clubs = useSelector(selectAllClubs)
  const jukeboxLinks = useSelector(selectJukeboxLinks)
  const spotifyLinks = useSelector(selectAllLinks)

  const dispatch = useDispatch()

  const [selectedAccounts, setSelectedAccounts] = useState<ISpotifyLink[]>([])

  const handleLoginSubmit = async () => {
    //const selectedSClub: NetworkResponse<IClub> = await network.getClub(parseInt(selectedClub))!;
    //console.log(currentClub!.id)
    let clubID = -1
    if (selectedClub === -1) {
      console.log(currentClub!.id)
      clubID = currentClub!.id
    } else {
      console.log(selectedClub)
      clubID = selectedClub
    }
    console.log(jbxName)
    console.log(selectedAccounts)

    //Add API Call to create new Jukebox
    const res = network.createJukebox(clubID, jbxName, selectedAccounts)

    //remove Later
    console.log(res)
  }

  const handleClubChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedClubId = e.target.value
    console.log('Set current club to:', selectedClubId)
    //Cast from string to number
    setSelectedClub(Number(selectedClubId))
  }

  const handleJbxChange = (e: any) => {
    const newName = e.target.value
    setJbxName(newName)
    setJbxName(newName)
  }

  const changeAccounts = (link: ISpotifyLink) => {
    console.log(link.spotify_email)

    const isChosen: boolean = selectedAccounts.some(
      (account) => account.spotify_email === link.spotify_email,
    )

    if (isChosen) {
      const newSpotifyList: ISpotifyLink[] = selectedAccounts.filter(
        (account) => account.spotify_email !== link.spotify_email,
      )
      setSelectedAccounts(newSpotifyList)
    } else {
      setSelectedAccounts([...selectedAccounts, link])
    }

    console.log(selectedAccounts)
  }

  /**
   * Updates the links for usage
   * Figure out the placement later
   */
  useEffect(() => {
    dispatch({ type: 'users/links' })
    console.log(spotifyLinks)
  }, [])

  return (
    <>
      <div className="grid create-jukeboxes">
        <div className="col-6">
          <div className="jukebox-form">
            <h1 className="title">Create Jukebox</h1>

            <Form onSubmit={handleLoginSubmit} className="form">
              <FormSection>
                <FormInputGroup
                  label="Jukebox"
                  id="jukebox"
                  type="text"
                  ref={jukeboxRef}
                  required
                  className="auth-form__group"
                  onChange={handleJbxChange}
                ></FormInputGroup>
              </FormSection>

              <FormSection>
                <div>Select Club</div>
                <div className="form-select-control">
                  <select
                    name="current-club"
                    id="current-club"
                    onChange={handleClubChange}
                    defaultValue={currentClub?.id}
                  >
                    {!currentClub && <option value="">No Club Selected</option>}
                    {clubs.map((club) => (
                      <option key={club.id} value={club.id}>
                        {club.name}
                      </option>
                    ))}
                  </select>
                </div>
              </FormSection>

              <FormSection>
                <div>Select Accounts</div>
                <div className="account-container">
                  {spotifyLinks?.map((link) => (
                    <div
                      className="single-account"
                      key={link.id}
                      onClick={() => changeAccounts(link)}
                    >
                      <SpotifyLinkAccount link={link} />
                    </div>
                  ))}
                </div>
              </FormSection>

              <div className="grid">
                <div className='col-4'>
                <button className="button-fancy height-jbx">
                  Create Jukebox
                </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}
