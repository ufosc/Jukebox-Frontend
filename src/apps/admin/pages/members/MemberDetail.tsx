import './MemberDetail.scss'
export const MemberDetail = () => {
  return (
    <div className="member-detail">
      <div className="profile-header">
        <div className="profile-pic"></div>
        <div>
          <div className="first-last-name">John Doe</div>
          <div className="username">@john_doe</div>
        </div>
      </div>

      <div className='main-member-container'>
        <div className='grid grid-spacing'>
        <div className="left-panel col-4">
          <div className="profile-details">
            <h2>Profile Details</h2>
            <div className="profile-info">
              <div>
                <strong>Full name:</strong> John Doe
              </div>
              <div>
                <strong>Email:</strong> john.doe@gmail.com
              </div>
              <div>
                <strong>Date Joined:</strong> January 15, 2019
              </div>
              <div>
                <strong>Birthday:</strong> July 8, 1995
              </div>
              <div>
                <strong>Country:</strong> Canada
              </div>
              <div>
                <strong>Favorite Genre:</strong> Jazz
              </div>
              <div>
                <strong>Total tracks played:</strong> 1500
              </div>
            </div>
          </div>
        </div>

        <div className="club-membership col-8">
            <h2 className=''>Club Memberships</h2>

            <div className="clubs-list">
              <div className="club-info">
                <img
                  className="club-logo"
                  src="https://static.vecteezy.com/ti/vecteur-libre/p2/2043469-jazz-musique-illustration-vectoriel.jpg"
                  alt="Club Logo"
                />
                <h3>Jazz Enthusiasts Club</h3>
                <p>
                  <strong>Membership:</strong> Gold Member
                </p>
                <p>
                  <strong>Joined:</strong> March 10, 2021
                </p>
                <p>
                  <strong>Events Attended:</strong> 25
                </p>
              </div>
              <div className="club-info">
                <img
                  className="club-logo"
                  src="https://images.playground.com/72958d7e-f989-4992-98dd-d47e87de134c.jpeg"
                  alt="Club Logo"
                />
                <h3>Vinyl Collectors</h3>
                <p>
                  <strong>Membership:</strong> Platinum Member
                </p>
                <p>
                  <strong>Joined:</strong> April 7, 2020
                </p>
                <p>
                  <strong>Events Attended:</strong> 54
                </p>
              </div>
              <div className="club-info">
                <img
                  className="club-logo"
                  src="https://img.freepik.com/premium-vector/classical-music-logo_742608-52.jpg"
                  alt="Club Logo"
                />
                <h3>The Classics</h3>
                <p>
                  <strong>Membership:</strong> Silver Member
                </p>
                <p>
                  <strong>Joined:</strong> January 17, 2023
                </p>
                <p>
                  <strong>Events Attended:</strong> 10
                </p>
              </div>
            </div>
          </div>

        </div>
        <div className='grid'>
          <div className='col-4'>
          </div>
          <div className="queued-tracks col-8">

            <h2>Queued Tracks</h2>
            <div className="track-list">
              {[
                {
                  id: 1,
                  title: 'Orci mauris lacinia',
                  artist: 'Edie Colgrave',
                  duration: '0:06',
                },
                {
                  id: 2,
                  title: 'Eu',
                  artist: 'Jeff Charlton, Alverta Cranney',
                  duration: '0:02',
                },
                {
                  id: 3,
                  title: 'Nam',
                  artist: 'Debora Belward, Rupert Lillie, Rory Tomney',
                  duration: '0:03',
                },
                {
                  id: 4,
                  title: 'At nunc commodo placerat',
                  artist: 'Romola Burtenshaw, Morton Durham',
                  duration: '0:04',
                },
                {
                  id: 5,
                  title: 'In hac habitasse',
                  artist: 'Nadiya Rothschild, Ardisj Le Sarr',
                  duration: '0:05',
                },
              ].map((track) => (
                <div key={track.id} className="track-item">
                  <span className="track-number">
                    {track.id < 10 ? `0${track.id}` : track.id}
                  </span>
                  <div className="track-thumbnail" />
                  <div className="track-info">
                    <span className="track-title">{track.title}</span>
                    <span className="track-artist">{track.artist}</span>
                  </div>
                  <span className="track-duration">{track.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
