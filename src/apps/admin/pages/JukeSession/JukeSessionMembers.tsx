
import "./JukeSessionMembers.scss"

export const JukeSessionMembers =()=>{
  const members = 
  [
    {
      name: "Jim",
      role: "Member",
      joined: "5m ago",
      queued: "5 tracks",
      likes: "85%",
      sessions: 10
    },
    {
      name: "Jim",
      role: "Admin",
      joined: "5m ago",
      queued: "5 tracks",
      likes: "85%",
      sessions: 10
    },
    {
      name: "REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE",
      role: "Member",
      joined: "5m ago",
      queued: "5 tracks",
      likes: "85%",
      sessions: 10
    },
    {
      name: "JOIASD ASD ASDAS D",
      role: "Admin",
      joined: "5m ago",
      queued: "5 tracks",
      likes: "85%",
      sessions: 10
    },
    {
      name: "Jim",
      role: "Member",
      joined: "5m ago",
      queued: "5 tracks",
      likes: "85%",
      sessions: 10
    },
    {
      name: "Jim",
      role: "Member",
      joined: "5m ago",
      queued: "5 tracks",
      likes: "85%",
      sessions: 10
    },
    {
      name: "Jim",
      role: "Member",
      joined: "5m ago",
      queued: "5 tracks",
      likes: "85%",
      sessions: 10
    },
    {
      name: "Jim",
      role: "Member",
      joined: "5m ago",
      queued: "5 tracks",
      likes: "85%",
      sessions: 10
    },
    {
      name: "Jim",
      role: "Member",
      joined: "5m ago",
      queued: "5 tracks",
      likes: "85%",
      sessions: 10
    },
    {
      name: "Jim",
      role: "Member",
      joined: "5m ago",
      queued: "5 tracks",
      likes: "85%",
      sessions: 10
    },
    {
      name: "Jim",
      role: "Member",
      joined: "5m ago",
      queued: "5 tracks",
      likes: "85%",
      sessions: 10
    },
    {
      name: "Jim",
      role: "Member",
      joined: "5m ago",
      queued: "5 tracks",
      likes: "85%",
      sessions: 10
    },
    {
      name: "Jim",
      role: "Member",
      joined: "5m ago",
      queued: "5 tracks",
      likes: "85%",
      sessions: 10
    },
    {
      name: "Jim",
      role: "Member",
      joined: "5m ago",
      queued: "5 tracks",
      likes: "85%",
      sessions: 10
    },
    {
      name: "Jim",
      role: "Member",
      joined: "5m ago",
      queued: "5 tracks",
      likes: "85%",
      sessions: 10
    },
    {
      name: "Jim",
      role: "Member",
      joined: "5m ago",
      queued: "5 tracks",
      likes: "85%",
      sessions: 10
    },
    {
      name: "Jim",
      role: "Member",
      joined: "5m ago",
      queued: "5 tracks",
      likes: "85%",
      sessions: 10
    },
    {
      name: "Jim",
      role: "Member",
      joined: "5m ago",
      queued: "5 tracks",
      likes: "85%",
      sessions: 10
    }
  ]


  return(
    <>
    <div className="grid">
      <div className="col-3 juke-session__header-title">
        <div>
        Current Members
      </div>

      <div className="col-5">

        <input className="juke-session__member-search"
          placeholder="Search"
          type="text"
          
        >
        
        </input>
      </div>
      </div>


      <div className="col-12 juke-session__member-list">
        
        <div className="juke-session__member-list__header">
          <div className="juke-session__member-list__member__name">

          </div>
          <div className="juke-session__member-list__member__role">
            Role
          </div>
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
          {members.map((member, idx) =>
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
              <button className="button-solid">
                X Remove
              </button>
            </div>

          </li>
          )}


        </ul>

      </div>
    
    </div>
    
    
    </>
  )

}