import type { ReactNode } from 'react'

export const FormSection = (props: {
  children?: ReactNode
  title?: string
  cols?: number
  direction?: 'row' | 'col'
}) => {
  const { children, title, cols, direction } = props

  return (
    <div
      className={
        'form-section flex-col-stretch' +
        ((cols && ` col-${cols}`) || ' flex-stretch') +
        ((direction && ` flex-${direction}`) || ' flex-col')
      }
    >
      {title && (
        <h3 className="form-headline font-title-sm flex-width-1">{title}</h3>
      )}
      {children}
    </div>
  )
}
