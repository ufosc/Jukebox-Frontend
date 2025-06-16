export const NoticeMessage = (props: {
  id: string
  title: string
  body: string
  color?: string
  dismissible?: boolean
  dismissNotice: (id: string) => void
}) => {
  const { color, id, dismissNotice, dismissible, title, body } = props

  return (
    <div className={`notice-message-${color ?? 'info'}`} key={id}>
      {(dismissible ?? true) && (
        <button
          className="notice-message__close"
          onClick={() => dismissNotice(id)}
        >
          &times;
        </button>
      )}
      <h3 className="notice-message__title">{title}</h3>
      <p className="notice-message__body">{body}</p>
    </div>
  )
}
