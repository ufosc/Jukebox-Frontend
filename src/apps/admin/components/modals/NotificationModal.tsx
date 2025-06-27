import { useState } from 'react'
import { ViewArrow } from 'src/assets/Icons'

interface NotificationModalProps {
  closeModal: () => void
}

interface NotificationDev {
  id: number
  title: string
  date: string
}

const notificationList: NotificationDev[] = [
  {
    id: 1,
    title: 'New Follower',
    date: '01/24',
  },
  {
    id: 2,
    title: 'New Club Invite',
    date: '02/24',
  },
  { id: 3, title: 'Event Reminder', date: '03/24' },
  { id: 4, title: 'Message Received', date: '04/24' },
  { id: 5, title: 'Club Update', date: '05/24' },
]

export const NotificationModal = (props: NotificationModalProps) => {
  const [noteList, setNoteList] = useState<NotificationDev[]>([])

  const setList = () => {
    setNoteList(notificationList)
  }

  return (
    <>
      <div className="modal modal__notifications">
        <div className="modal__notifications__title">Notification Center</div>

        <div className="modal__notifications__list">
          {noteList.length == 0 ? (
            <>
              <div className="modal__notifications__list__item">
                No Notifications
              </div>
            </>
          ) : (
            <>
              {noteList.slice(0, 4).map((notification, id) => (
                <div className="modal__notifications__list__item">
                  <div>{notification.title}</div>
                  <div>{notification.date}</div>
                </div>
              ))}
            </>
          )}
        </div>

        {noteList.length == 0 ? (
          <div className="modal__notifications__footer-disabled">
            View All
            <ViewArrow color={'color-disabled'} />
            <div onClick={setList}>Dev</div>
          </div>
        ) : (
          <div className="modal__notifications__footer-enabled">
            View All
            <ViewArrow color={'color-secondary'} />
          </div>
        )}
      </div>
    </>
  )
}
