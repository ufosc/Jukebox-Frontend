import type { ChangeEvent } from 'react'
import React, { useState } from 'react'
import './MembersList.css'

import { MemberObj } from '../../components/memberObj'

export const MembersList: React.FC = () => {
  const [searchMember, setSearchMember] = useState('')
  const memberLists = Array(15).fill({
    name: 'John Doe',
    role: 'Member',
    points: 20,
    joined: 'January 1, 2024',
  })

  const submitMemberSearch = () => {
    console.log(searchMember)
    setSearchMember('')
  }

  const handleMemberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchMember(e.target.value)
  }

  return (
    <>
      <div className="members-container-outline">
        <section className="member-header">
          <h1 className="header-font">Members</h1>

          <button className="button-tonal">+ Add member</button>
        </section>

        <div className="grid">
          <div className="col-4 members-form-container">
            <form onSubmit={submitMemberSearch} className="members-form">
              <input
                className="member-search"
                placeholder="Name"
                onChange={handleMemberChange}
                value={searchMember}
              />
            </form>
          </div>
        </div>

        <div className="member-list-container">
          <section className="header">
            <div>Name</div>
            <div>Role</div>
            <div>Points</div>
            <div>Joined</div>
            <div>Actions</div>
          </section>

          <section className="lists">
            <div>
              {memberLists.map((member, key) => (
                <MemberObj member={member} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
