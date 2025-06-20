import { useSelector } from 'react-redux'
import {
  selectAllClubs,
  selectCurrentClub,
  selectUser,
  updateClub,
  updateMembership,
} from 'src/store'

export const ClubModal = () => {
  const user = useSelector(selectUser)
  const clubs = useSelector(selectAllClubs)
  const currentClub = useSelector(selectCurrentClub)

  const handleClubclick = (club: IClub) => {
    const selectedClubId = club.id
    console.log(club.id)
    updateClub(selectedClubId)
    if (currentClub !== null) {
      console.log('Current club is ', currentClub.id)
    }
    if (user !== null) {
      updateMembership(selectedClubId, user.id)
    }
  }

  return (
    <>
      <div className="modal modal__club">
        {clubs.map((club, id) => (
          <div
            className={`modal__club__item ${club.name === currentClub?.name ? 'modal__club__item__active' : ''}`}
            onClick={() => handleClubclick(club)}
            key={id}
          >
            {club.name}
          </div>
        ))}
      </div>
    </>
  )
}
