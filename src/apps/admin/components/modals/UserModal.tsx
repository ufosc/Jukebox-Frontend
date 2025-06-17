import './Modal.scss'
import { ModalNavItem } from './ModalNavItem'

interface UserModalProps {
  user: IUserDetails | null;
  closeModal: () => void;
}

export const UserModal = (props:UserModalProps
) => {
  if (!props.user) {
    return <></>
  }
  const { user, closeModal } = props

  const handleSignOut = () => {
    closeModal()
    console.log('User Signed Out!')
  }

  return (
    <>
      <div className="modal modal__user">
        <div className="modal__user__information">
          <div className="modal__user__information__name">
            {user.first_name || user.last_name ? (
              <>
                {user.first_name} {user.last_name}
              </>
            ) : (
              <>Not Set</>
            )}
          </div>
          <div className="modal__user__information__username">
            {user.username}
          </div>
        </div>

        <div className="modal__divider" />

        <div className="modal__user__options">
          <ModalNavItem
            route="/dashboard/settings"
            text="Account"
            action={closeModal}
          ></ModalNavItem>
          <ModalNavItem
            route="/dashboard"
            text="Support"
            action={closeModal}
          ></ModalNavItem>
          <ModalNavItem
            route="/dashboard"
            text="Feedback"
            action={closeModal}
          ></ModalNavItem>
          <ModalNavItem
            action={handleSignOut}
            route="/dashboard"
            text="Sign Out"
          ></ModalNavItem>
        </div>
      </div>
    </>
  )
}
