import { mergeClassNames } from 'src/utils'

export const NoticeToast = (props: {
  id: string
  text: string
  color?: string
  active?: boolean
}) => {
  const { id, text, color, active } = props

  return (
    <div className={mergeClassNames('notice-toast', active && 'active')}>
      {/* <div className="notice-toast__icon">...</div> */}
      <div className="notice-toast__text">{text}</div>
    </div>
  )
}
