import * as React from 'react'
import './AccordionItem.scss'

export type AccordionItemProps = {
  id: string
  index?: number
  title: string
  description?: string
  thumbSrc?: string
  thumbAlt?: string
  className?: string
  open: boolean
  onToggle: (id: string) => void
}

export const AccordionItem = ({
  id,
  index,
  title,
  description,
  thumbSrc,
  thumbAlt = '',
  className = '',
  open,
  onToggle,
}: AccordionItemProps) => {
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = React.useState(0)

  const panelId = `acc-panel-${id}`
  const buttonId = `acc-btn-${id}`

  const handleToggle = React.useCallback(() => {
    onToggle(id)
  }, [id, onToggle])

  const recalcHeight = React.useCallback(() => {
    const content = contentRef.current
    if (!content) return

    setContentHeight(content.scrollHeight)
  }, [])

  React.useLayoutEffect(() => {
    recalcHeight()

    const content = contentRef.current
    const ro: ResizeObserver | null =
      typeof window !== 'undefined' && 'ResizeObserver' in window
        ? new ResizeObserver(recalcHeight)
        : null

    if (ro && content) ro.observe(content)

    const onResize = () => recalcHeight()
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', onResize)
    }

    return () => {
      ro?.disconnect()
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', onResize)
      }
    }
    // Recalculate when content that can affect height changes.
  }, [recalcHeight, title, description, thumbSrc])

  React.useLayoutEffect(() => {
    if (open) recalcHeight()
  }, [open, recalcHeight])

  const maxHeight = open ? `${contentHeight}px` : '0px'

  return (
    <div className={`accordion__item ${open ? 'is-open' : ''} ${className}`}>
      <div className="accordion__heading" role="heading" aria-level={3}>
        <button
          id={buttonId}
          type="button"
          className="accordion__header"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={handleToggle}
        >
          <span className="accordion__index">
            {String(index ?? 0).padStart(2, '0')}
          </span>
          <span className="accordion__title">{title}</span>
          <span className="accordion__icon" aria-hidden />
        </button>
      </div>

      <div
        id={panelId}
        className="accordion__panel"
        style={{ maxHeight }}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!open}
      >
        <div ref={contentRef} className="accordion__panel-inner">
          {description && (
            <div className="accordion__body">
              <p className="accordion__text">{description}</p>
            </div>
          )}

          {thumbSrc && (
            <div className="accordion__thumb">
              <img src={thumbSrc} alt={thumbAlt} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AccordionItem
