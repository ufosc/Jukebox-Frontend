import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type DetailedHTMLProps,
  type ReactNode,
} from 'react'
import { Popover } from 'src/components'

export const usePopover = (id: string, gap?: string) => {
  // const { id, gap } = props
  const popoverRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLButtonElement>(null)

  const [pos, setPos] = useState({
    top: '0px',
    left: '0px',
    right: 'auto',
  })
  const defaultGap = '1rem'
  const windowWidth = window.innerWidth

  useEffect(() => {
    if (targetRef.current && popoverRef.current) {
      const anchorRect = targetRef.current.getBoundingClientRect()
      const { bottom, left, right } = anchorRect
      const leftPos = left
      const rightPos = windowWidth - right
      const alignBreakpoint = 0.5 // Ratio of left : windowWidth

      const newPos: typeof pos = {
        top: `calc(${bottom}px + ${gap || defaultGap})`,
        left: 'auto',
        right: 'auto',
      }

      if (left / windowWidth <= alignBreakpoint) {
        newPos.left = `${leftPos}px`
      } else {
        newPos.right = `${rightPos}px`
      }

      setPos(newPos)
    }
  }, [targetRef, popoverRef.current?.checkVisibility, setPos])

  const PopoverComponent = (popoverProps: {
    className?: string
    children?: ReactNode
  }) => {
    const { children, className } = popoverProps

    return (
      <Popover id={id} className={className} position={pos} ref={popoverRef}>
        {children}
      </Popover>
    )
  }

  const PopoverButton = (
    targetProps: DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    > & { children?: ReactNode },
  ) => {
    const { children } = targetProps

    return (
      <button popovertarget={id} ref={targetRef} {...targetProps}>
        {children}
      </button>
    )
  }

  return {
    Popover: PopoverComponent,
    PopoverButton: useMemo(() => PopoverButton, [targetRef]),
  }
}
