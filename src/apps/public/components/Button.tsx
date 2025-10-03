// home/components/Button.tsx
import * as React from 'react'

type Appearance = 'solid' | 'outlined' | 'text' | 'tonal' | 'fancy'
type ColorRole =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'error'
  | (string & {}) // allow any custom role that exists in $component-colors

type BaseProps = {
  appearance?: Appearance // -> .button-{appearance}
  colorRole?: ColorRole // -> .button-{appearance}--{role}
  className?: string
  leadingIcon?: string // material icon name (e.g., "check")
  trailingIcon?: string // material icon name
  children?: React.ReactNode
}

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & {
    as?: 'button'
  }

type ButtonAsAnchor = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color'> & { as: 'a' }

export type ButtonProps = ButtonAsButton | ButtonAsAnchor

export const Button = ({
  as = 'button',
  appearance = 'solid',
  colorRole = 'primary',
  className = '',
  leadingIcon,
  trailingIcon,
  children,
  ...rest
}: ButtonProps) => {
  const Component = as as any

  const baseClass = `button-${appearance}`
  const colorClass = `button-${appearance}--${colorRole}`

  const classes = [baseClass, colorClass, className].filter(Boolean).join(' ')

  return (
    <Component className={classes} {...(rest as any)}>
      {leadingIcon ? (
        <span className="material-icons" aria-hidden>
          {leadingIcon}
        </span>
      ) : null}
      <span className="btn__label">{children}</span>
      {trailingIcon ? (
        <span className="material-icons" aria-hidden>
          {trailingIcon}
        </span>
      ) : null}
    </Component>
  )
}

export default Button
