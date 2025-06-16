import { forwardRef, type ReactNode, type Ref } from 'react'
import { mergeClassNames } from 'src/utils'

const PopoverComponent = (
  props: {
    id: string
    position?: { top?: string; right?: string; bottom?: string; left?: string }
    children?: ReactNode
    className?: string
  },
  ref: Ref<HTMLDivElement>,
) => {
  const { id, className, children, position } = props
  return (
    <div
      popover="auto"
      ref={ref}
      id={id}
      className={mergeClassNames(className, 'overlay-popover')}
      style={position}
    >
      {children}
    </div>
  )
}

export const Popover = forwardRef(PopoverComponent)
