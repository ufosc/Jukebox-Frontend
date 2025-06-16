import { createContext, useState, type ReactNode } from 'react'

import './Notice.scss'
import { NoticeMessage } from './NoticeMessage'
import { NoticeToast } from './NoticeToast'

interface UserNotice {
  id: string
  title: string
  body: string
  color?: SystemColor
  dismissible?: boolean
  active?: boolean
}

interface UserToast {
  id: string
  text: string
  color?: SystemColor
  active?: boolean
}

export const NoticesContext = createContext({
  addNotice: (notice: UserNotice) => {},
  dismissNotice: (id: string) => {},
  addToast: (notice: UserToast) => {},
  dismissToast: (id: string) => {},
})

export const NoticesProvider = (props: { children: ReactNode }) => {
  const { children } = props
  const [notices, setNotices] = useState<UserNotice[]>([])
  const [toasts, setToasts] = useState<UserToast[]>([])

  const addNotice = (notice: UserNotice) => {
    const newNotice: UserNotice = { ...notice, id: Date.now().toString() }
    setNotices((prev) => [...prev, newNotice])

    return newNotice
  }
  const dismissNotice = (id: string) => {
    setNotices((prev) => prev.filter((notice) => notice.id !== id))
  }

  const addToast = (toast: UserToast) => {
    setToasts((prev) => {
      if (!prev.find((t) => t.id === toast.id)) {
        return [...prev, { ...toast, active: true }]
      } else {
        return prev
      }
    })
  }
  const dismissToast = (id: string) => {
    setToasts((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          return { ...t, active: false }
        } else {
          return t
        }
      }),
    )

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 5000)
  }

  const dismiss = (id: string) => {
    dismissNotice(id)
  }

  return (
    <NoticesContext.Provider
      value={{
        addNotice,
        dismissNotice,
        addToast,
        dismissToast,
      }}
    >
      <div className="notice-wrapper">
        <div className="notice-wrapper__section">
          {toasts.map((toast) => (
            <NoticeToast
              key={toast.id}
              id={toast.id}
              text={toast.text}
              color={toast.color}
              active={toast.active}
            />
          ))}
        </div>
        <div className="notice-wrapper__section"></div>
        {notices.map((notice) => (
          <NoticeMessage
            key={notice.id}
            id={notice.id}
            title={notice.title}
            body={notice.body}
            color={notice.color}
            dismissible={notice.dismissible}
            dismissNotice={dismiss}
          />
        ))}
      </div>
      {children}
    </NoticesContext.Provider>
  )
}
