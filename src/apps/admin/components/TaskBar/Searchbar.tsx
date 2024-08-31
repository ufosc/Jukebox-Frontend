import { useState, type ChangeEvent, type FormEvent } from 'react'

import './Searchbar.css'

export const Searchbar = () => {
  let mysong = ''

  const [searchedSong, setSong] = useState<string | undefined>()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    {
      /* logger is the event, target is what triggered the event */
    }
    setSong(event.target.value)
    {
      /*prints out updated list*/
    }
    {
      /*console.log(searchedSong);*/
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    mysong = searchedSong ?? ''
    console.log(mysong)
    {
      /* here would go a function that would return the song to the API */
    }
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name={searchedSong}
            placeholder="Search Song"
            onChange={handleChange}
          ></input>
          <button className="SearchButton">Search</button>
        </form>
      </div>
    </>
  )
}
