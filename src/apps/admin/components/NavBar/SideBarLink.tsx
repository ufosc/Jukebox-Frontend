import { Link } from 'react-router-dom'

import './SideBarLink.css'

export const SideBarLink = (props: { link: string; linkName: string }) => {
  const { link, linkName } = props
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
