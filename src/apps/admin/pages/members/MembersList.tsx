import { useState, type ChangeEvent, type FormEvent } from 'react'

import './MembersList.css'
import { MemberObj } from '../../components/memberObj'

export const MembersList = () => {
  const [searchMember, setSearchMember] = useState('')

  const handleMemberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchMember(e.target.value)
  }

  const submitMemberSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const memberLists = [
    {
      name: "Jim",
      role: "President",
      points: 0,
      joined: "September 20, 2023",
    },
    {
      name: "John",
      role: "Member",
      points: 0,
      joined: "April 4, 2024",
    },  
    {
      name: "Gerald Smith Johns",
      role: "Secretary",
      points: 0,
      joined: "January 12, 2025",
    }

  ]

  return (
    <>
      <div className='members-container-outline'>
        <section className="member-header">
          <h1 className="header-font">Members</h1>

          <button className="button-tonal">+ Add member</button>
        </section>

        <div className='grid'>
          <div className='col-4 members-form-container'>
          <form onSubmit={submitMemberSearch} className='members-form' >
            <input className="member-search" placeholder="Name" />
          </form>
          </div>
        </div>

        <div className="member-list-container">
          <section className='header'>
            <div>
              Name
            </div>
            <div>
              Role
            </div>
            <div>
              Points
            </div>
            <div>
              Joined
            </div>
            <div>
              Actions
            </div>            
          </section> 

          <section className='lists'>
            <div>
              {memberLists.map((member, key)=>
                <MemberObj member={member} />
              
              )}
            </div>
          </section>


        </div>
      


      </div>
    </>
  )
}
