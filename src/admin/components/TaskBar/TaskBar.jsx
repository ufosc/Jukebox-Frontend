import { Link } from 'react-router-dom'
import './TaskBar.css'

import { Searchbar } from './Searchbar'

export const TaskBar = () => {
  return (
    <>
      <div className="nav">
        <Link to="/">
          <button className="btn-primary">Landing</button>
        </Link>

        <div className=".borders">
          <Link to="/board1">
            <button className="btn-primary">Board1</button>
          </Link>
        </div>

        <div>
          <Searchbar />
        </div>

        <Link to="/">
          <button className="btn-primary">Board2</button>
        </Link>
        <div>
          <Link to="/login">
            <button className="btn-primary">Login</button>
          </Link>
        </div>
      </div>
    </>
  )
}
