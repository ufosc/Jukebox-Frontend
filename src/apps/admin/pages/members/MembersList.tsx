import type { ChangeEvent } from 'react'
import React, { useEffect, useState } from 'react'
import './MembersList.css'

import { useSelector } from 'react-redux'
import { ApiClient } from 'src/api'
import { selectCurrentClub } from 'src/store'
import { MemberObj } from '../../components/memberObj'

export const MembersList: React.FC = () => {
  const [searchMember, setSearchMember] = useState('')
  const [members, setMembers] = useState<IClubMembership[]>([])
  const currentClub = useSelector(selectCurrentClub)
  const network = ApiClient.getInstance()

  const [loading, setLoading] = useState(false)

  const submitMemberSearch = () => {
    console.log(searchMember)
    setSearchMember('')
  }

  const handleMemberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchMember(e.target.value)
  }

  const updateMembers = async () => {
    console.log(currentClub?.id)
    const clubId = currentClub?.id
    if (clubId !== undefined) {
      const res = await network.getClubMembers(clubId)
      console.log(res)
      if (res.success) {
        setMembers(res.data)
      }
      //setMembers(res.data)
    } else {
      console.log('Fetching Users')
    }
  }

  useEffect(() => {
    updateMembers()
    return () => {
      console.log('Done Getting Users')
    }
  }, [currentClub])

  return (
    <>
      <div className="members-container-outline">
        <section className="member-header">
          <h1 className="header-font">Members</h1>

          <button className="button-tonal" onClick={updateMembers}>
            + Add member
          </button>
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
              {members.map((member, key) => (
                <MemberObj member={member} key={key} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
