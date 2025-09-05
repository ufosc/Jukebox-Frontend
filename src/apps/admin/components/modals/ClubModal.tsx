import { useSelector } from 'react-redux'
import {
  fetchMemberships,
  selectAllClubs,
  selectCurrentClub,
  selectUser,
  updateClub,
} from 'src/store'

export const ClubModal = () => {
  const user = useSelector(selectUser)
  const clubs = useSelector(selectAllClubs)
  const currentClub = useSelector(selectCurrentClub)

  const handleClubClick = (club: IClub) => {
    const selectedClubId = club.id
    console.log(club.id)
    updateClub(selectedClubId)
    if (currentClub !== null) {
      console.log('Current club is ', currentClub.id)
    }
    // if (user !== null) {
    //   fetchMemberships(selectedClubId, user.id)
    // }
  }

  return (
    <>
      <div className="modal modal__club">
        {clubs.map((club, id) => (
          <div
            className={`modal__club__item ${club.name === currentClub?.name ? 'modal__club__item__active' : ''}`}
            onClick={() => handleClubClick(club)}
            key={id}
          >
            {club.name}
          </div>
        ))}
      </div>
    </>
  )
}
