import { useEffect, useRef, useState, type ReactNode } from 'react'
import { mergeClassNames } from 'src/utils'

export const Dialog = (props: {
  children?: ReactNode
  className?: string
  backdrop?: boolean
  defaultOpen?: boolean
  dismissible?: boolean
}) => {
  const { children, className, backdrop, defaultOpen, dismissible } = props
  const backdropRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(defaultOpen || false)

  useEffect(() => {
    if (dismissible) {
      const onClick = () => {
        setOpen((prev) => !prev)
      }
      backdropRef.current?.addEventListener('click', onClick)

      return () => backdropRef.current?.removeEventListener('click', onClick)
    }
  }, [backdropRef])

  return (
    <>
      {backdrop && (
        <div className="overlay-dialog-backdrop" ref={backdropRef}>
          &nbsp;
        </div>
      )}
      <dialog
        className={mergeClassNames('overlay-dialog', className)}
        open={open}
      >
        {children}
      </dialog>
    </>
  )
}
