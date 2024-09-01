import type { FormEvent, ReactNode } from 'react'

export const Form = (props: {
  children?: ReactNode
  colorRole?: 'surface' | 'surface-container'
  direction?: 'row' | 'col'
  className?: string
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void
}) => {
  const { children, colorRole, direction, className, onSubmit } = props
  const colClass = ' flex-col flex-col-stretch'
  const rowClass = ' row'

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (onSubmit) onSubmit(e)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={
        'form' +
        ((colorRole && ` color-role-${colorRole}`) || '') +
        ((direction === 'col' && colClass) ||
          (direction === 'row' && rowClass) ||
          colClass) +
        ((className && ` ${className}`) || '')
      }
    >
      {children}
    </form>
  )
}
