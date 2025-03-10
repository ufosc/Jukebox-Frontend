import React from 'react'
import './MembersList.scss'

export const MembersList: React.FC = () => {
  const members = Array(15).fill({
    name: 'John Doe',
    role: 'Member',
    points: 20,
    joined: 'January 1, 2024',
  })

  return (
    <div className="members-all">
      <h1 className="members-title">Members</h1>
      <div className="search">
        <input type="text" placeholder="Name" className="search-input" />
      </div>
      <div className="table-all">
        <table className="members-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Points</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={index}>
                <td>{member.name}</td>
                <td>{member.role}</td>
                <td>{member.points}</td>
                <td>{member.joined}</td>
                <td>
                  <button className="view-button">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
