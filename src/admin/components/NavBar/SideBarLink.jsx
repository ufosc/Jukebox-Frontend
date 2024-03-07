import { Link } from 'react-router-dom'

import './SideBarLink.css'

export const SideBarLink = ({ link, linkName }) => {
  return (
    <>
      <div className="sideButton">
        <Link to={link}>
          <button className="btn-secondary">{linkName}</button>
        </Link>
      </div>
    </>
  )
}
