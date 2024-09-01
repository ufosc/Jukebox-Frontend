import { useSelector } from 'react-redux'
import { selectUser } from 'src/store'

import './Topbar.scss'

export const Topbar = () => {
  const user = useSelector(selectUser)

  return (
    <div className="topbar">
      <div className="topbar__search">
        <input type="text" />
      </div>
      <div className="topbar__profile">
        {user && <img src={user.image} alt={user.lastName} />}
        {!user && <p>Login required.</p>}
      </div>
    </div>
  )
}
