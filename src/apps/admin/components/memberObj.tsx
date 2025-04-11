import { useEffect } from 'react'

import './memberObj.css'

export const MemberObj = (props: {
  member: {
    name: string
    role: string
    points: number
    joined: string
  }
}) => {
  const { member } = props
  useEffect(() => {
    console.log(`hi there ${props}`)
  }, [])

  return (
    <>
      <div className="member-outline">
        <div className="widthAdjustName">{member.name}</div>

        <div className="widthAdjustRole">{member.role}</div>

        <div className="widthAdjustPoints">{member.points}</div>

        <div className="widthAdjustJoined">{member.joined}</div>

        <div>View</div>
      </div>
    </>
  )
}
