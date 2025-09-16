import { mockSessionMemberships } from 'src/utils/mock/mock-session-memberships'
import './JukeSessionMembers.scss'
import { useState } from 'react'

const LIST_LENGTH = 7

export const JukeSessionMembers = () => {
  const members = mockSessionMemberships
  const totalPages = Math.ceil(members.count / LIST_LENGTH)
  const [page, setPage] = useState(0)
  const beginningRowRange = page * LIST_LENGTH

  const getNavigatorNums = (page: number): JSX.Element => {
    const currMinPage = totalPages - page < 4 ? totalPages - 4 : page
    const pageRange = totalPages - currMinPage
    if (pageRange < 5) {
      return (
        <>
          {Array.from({ length: 4 }, (_, idx) => {
            const pageNumber = idx + currMinPage
            return (
              <div
                className={`juke-session__member-list__navigator__text${pageNumber === page ? '__selected' : ''}`}
                onClick={() => setPage(pageNumber)}
              >
                {`${pageNumber + 1}`}
              </div>
            )
          })}
        </>
      )
    }
    return (
      <>
        <div
          className="juke-session__member-list__navigator__text__selected"
          onClick={() => setPage(page)}
        >
          {`${page + 1}`}
        </div>
        <div
          className="juke-session__member-list__navigator__text"
          onClick={() => setPage(page + 1)}
        >
          {`${page + 2}`}
        </div>
        <div className="juke-session__member-list__navigator__ellipsis">
          {'...'}
        </div>
        <div
          className="juke-session__member-list__navigator__text"
          onClick={() => setPage(totalPages - 1)}
        >
          {`${totalPages}`}
        </div>
      </>
    )
  }

  return (
    <>
      <div className="grid">
        <div className="col-3 juke-session__header-title">
          <div>Current Members</div>

          <div className="col-5">
            <input
              className="juke-session__member-search"
              placeholder="Search"
              type="text"
            ></input>
          </div>
        </div>

        <div className="col-12 juke-session__member-list">
          <div className="juke-session__member-list__header">
            <div className="juke-session__member-list__member__name"></div>
            <div className="juke-session__member-list__member__role">Role</div>
            <div className="juke-session__member-list__member__joined">
              Joined
            </div>
            <div className="juke-session__member-list__member__queued">
              Queued
            </div>
            <div className="juke-session__member-list__member__likes">
              Like Ratio
            </div>
            <div className="juke-session__member-list__member__sessions-header">
              Past Sessions
            </div>
          </div>

          <ul>
            {members.memberships
              .slice(beginningRowRange, beginningRowRange + LIST_LENGTH)
              .map((membership, idx) => {
                const member = membership.member
                return (
                  <li className="juke-session__member-list__member">
                    <div className="juke-session__member-list__member__name">
                      {member.name}
                    </div>

                    <div className="juke-session__member-list__member__role">
                      {member.role}
                    </div>

                    <div className="juke-session__member-list__member__joined">
                      {member.joined}
                    </div>

                    <div className="juke-session__member-list__member__queued">
                      {member.queued}
                    </div>

                    <div className="juke-session__member-list__member__likes">
                      {member.likes}
                    </div>

                    <div className="juke-session__member-list__member__sessions">
                      {member.sessions}
                    </div>

                    <div className="juke-session__member-list__member__remove">
                      <button className="button-solid">X Remove</button>
                    </div>
                  </li>
                )
              })}
          </ul>

          <div className="juke-session__member-list__navigator">
            <div
              className="juke-session__member-list__navigator__arrow"
              onClick={() => setPage(page - 1 > 0 ? page - 1 : 0)}
            >
              {'<'}
            </div>
            {getNavigatorNums(page)}
            <div
              className="juke-session__member-list__navigator__arrow"
              onClick={() => setPage(page + 1 < totalPages ? page + 1 : page)}
            >
              {'>'}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
