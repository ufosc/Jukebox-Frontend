import { NotificationsOutlined } from '@mui/icons-material'
import type { ChangeEvent } from 'react'
import { useSelector } from 'react-redux'
import { selectAllGroups, selectCurrentGroup, selectUser } from 'src/store'

import './Topbar.scss'

export const Topbar = () => {
  const user = useSelector(selectUser)
  const groups = useSelector(selectAllGroups)
  const currentGroup = useSelector(selectCurrentGroup)

  const handleGroupChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedGroupId = e.target.value

    console.log('Set current group to:', selectedGroupId)
  }

  return (
    <div className="topbar">
      <div className="topbar__group-dropdown">
        <select
          name="current-group"
          id="current-group"
          onChange={handleGroupChange}
        >
          <option value="">{currentGroup?.name ?? 'No Group Selected'}</option>
          {groups
            .filter((group) => group.id !== currentGroup?.id)
            .map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
        </select>
      </div>
      <div className="topbar__user-details">
        <div className="topbar__notifications">
          <button>
            <NotificationsOutlined fontSize="large" />
          </button>
        </div>
        <button className="topbar__profile">
          {user && <img src={user.image} alt={user.lastName} />}
          {!user && <p>Login required.</p>}
        </button>
      </div>
    </div>
  )
}
