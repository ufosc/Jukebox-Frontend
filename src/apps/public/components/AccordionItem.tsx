import * as React from 'react'
import './AccordionItem.scss'

export type AccordionItemProps = {
  id: string
  index?: number // for "01", "02", ...
  title: string
  description?: string
  thumbSrc?: string
  thumbAlt?: string

  open: boolean // controlled by parent
  onToggle: (id: string) => void

  className?: string
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  index,
  title,
  description,
  thumbSrc,
  thumbAlt = '',
  open,
  onToggle,
  className = '',
}) => {
  // We animate the panel by transitioning its max-height.
  // This ref points to the real content so we can read scrollHeight.
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [maxH, setMaxH] = React.useState(0)

  // Whenever `open` (or the content) changes, update max-height.
  React.useLayoutEffect(() => {
    const el = contentRef.current
    if (!el) return
    setMaxH(open ? el.scrollHeight : 0)
  }, [open, description, thumbSrc])

  const panelId = `acc-panel-${id}`
  const btnId = `acc-btn-${id}`

  const handleToggle = React.useCallback(() => {
    onToggle(id)
  }, [id, onToggle])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onToggle(id)
      }
    },
    [id, onToggle],
  )

  return (
    <div className={`accordion__item ${open ? 'is-open' : ''} ${className}`}>
      <div className="accordion__heading" role="heading" aria-level={3}>
        {/* Provide button semantics on the whole header area for a wider click target */}
        <div
          id={btnId}
          role="button"
          tabIndex={0}
          className="accordion__header"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
        >
          <span className="accordion__index">
            {(index ?? 0).toString().padStart(2, '0')}
          </span>
          <span className="accordion__title">{title}</span>
          {/* Plus/Minus is drawn with CSS */}
          <span className="accordion__icon" aria-hidden />
        </div>
      </div>

      {/* The panel's height is animated by max-height (1s) */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className="accordion__panel"
        style={{ maxHeight: `${maxH}px` }}
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
