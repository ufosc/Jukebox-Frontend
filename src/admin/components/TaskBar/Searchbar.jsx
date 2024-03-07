import { useState } from 'react'

import './Searchbar.css'

export const Searchbar = () => {
  var mysong = ''

  const [searchedSong, setSong] = useState()

  const handleChange = (logger) => {
    {
      /* logger is the event, target is what triggered the event */
    }
    setSong(logger.target.value)
    {
      /*prints out updated list*/
    }
    {
      /*console.log(searchedSong);*/
    }
  }

  const handleSubmit = (logger) => {
    logger.preventDefault()
    mysong = searchedSong
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
