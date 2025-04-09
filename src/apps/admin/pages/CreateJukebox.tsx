import type { ChangeEvent } from 'react'
import { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, FormSection, FormInputGroup } from 'src/components'
import { Network } from 'src/network'
import {
  selectAllClubs,
  selectAllJukeboxes,
  selectAllLinks,
  selectCurrentClub,
  selectCurrentJukebox,
  selectJukeboxLinks,
} from 'src/store'
import { SpotifyPlayerAccount } from '../components/SpotifyPlayer/SpotifyPlayerAccount'

import './CreateJukebox.scss'
import { NetworkResponse } from 'src/network/NetworkBase'

export const CreateJukebox = () => {
  const network = Network.getInstance()
  const [selectedClub, setSelectedClub] = useState('')
  const [jbxName, setJbxName] = useState('');
  const jukeboxRef = useRef<HTMLInputElement>(null)
  const clubRef = useRef<HTMLInputElement>(null)
  const currentClub = useSelector(selectCurrentClub)
  const clubs = useSelector(selectAllClubs)
  const jukeboxLinks = useSelector(selectJukeboxLinks)
  const spotifyLinks = useSelector(selectAllLinks)

  const dispatch = useDispatch();

  const handleLoginSubmit = async () => {
    //const selectedSClub: NetworkResponse<IClub> = await network.getClub(parseInt(selectedClub))!;
    console.log(selectedClub)
    console.log(jbxName)

    //const res = network.createJukebox(parseInt(selectedClub), jbxName);
  }

  const handleClubChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedClubId = e.target.value
    console.log('Set current club to:', selectedClubId)
    setSelectedClub(selectedClubId)
  }

  const handleJbxChange = (e: any) => {
    const newName = e.target.value
    setJbxName(newName);
  }


  /**
   * Updates the links for usage
   * Figure out the placement later
   */
  useEffect(()=>{
    dispatch({type: 'users/links'})
    console.log(spotifyLinks)
  },[])

  return (
    <>
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
                  
                <div>{link.spotify_email}</div>
              ))}
            </div>
          </FormSection>

          <button>Create Jukebox</button>
        </Form>
      </div>
    </>
  )
}
