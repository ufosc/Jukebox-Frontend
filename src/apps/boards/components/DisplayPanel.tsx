import type { ReactNode } from 'react'

export const DisplayPanel = (props: { children?: ReactNode }) => {
  const { children } = props
  return (
    <div className="board__col board__display">
      <div className="board__clock">{children}</div>
    </div>
  )
}
