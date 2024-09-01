import type { ReactNode } from 'react'
import { mergeClassNames } from 'src/utils'

export interface FormGroupProps {
  label?: string
  id: string
  width?: '1of1' | '1of2'
  groupId?: string | number
  defaultValue?: string | number
  className?: string
  error?: string
}

export const formControlId = (id: string, groupId?: string | number) => {
  return `${id}${(groupId && '-' + groupId) || ''}`
}

export const FormGroup = (
  props: FormGroupProps & {
    children: ReactNode
  },
) => {
  const { label, id, width, children, groupId, className, error } = props

  const groupClassName = mergeClassNames(
    'form-group',
    'flex-stretch',
    className,
    (width && ` flex-width-${width}`) || '',
    error && 'error',
  )

  return (
    <div className={groupClassName} id={`form-group-${id}`}>
      {label && (
        <label htmlFor={formControlId(id, groupId)} className="form-label">
          {label}
        </label>
      )}
      {children}
      <span className="form-feedback error">{error}</span>
    </div>
  )
}
