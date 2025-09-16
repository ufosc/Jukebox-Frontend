import { useEffect } from 'react'

import './memberObj.css'

export const MemberObj = (props: {
  member: {
    user: IClubUser
    is_owner: boolean
    points: number
    created_at: string
  }
}) => {
  const { member } = props
  useEffect(() => {
    console.log(`hi there ${props}`)
  }, [])

  return (
    <>
      <div className="member-outline">
        <div className="widthAdjustName">{member.user.username}</div>

        <div className="widthAdjustRole">{member.is_owner}</div>

        <div className="widthAdjustPoints">{member.points}</div>

        <div className="widthAdjustJoined">{member.created_at}</div>

        <div>View</div>
      </div>
    </>
  )
}
