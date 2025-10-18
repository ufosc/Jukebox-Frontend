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
  const itemRef = React.useRef<HTMLDivElement>(null)
  const headerRef = React.useRef<HTMLButtonElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [panelHeight, setPanelHeight] = React.useState(0)

  const panelId = `acc-panel-${id}`
  const buttonId = `acc-btn-${id}`

  const handleToggle = React.useCallback(() => {
    onToggle(id)
  }, [id, onToggle])

  // Responsive: recalculate panel height so accordion adapts to viewport changes.
  const recalcHeight = React.useCallback(() => {
    const content = contentRef.current
    const headerEl = headerRef.current
    const itemEl = itemRef.current
    if (!content || !headerEl || !itemEl) return

    const contentScrollHeight = content.scrollHeight
    let targetHeight = contentScrollHeight

    const accordionEl = itemEl.closest('.accordion') as HTMLElement | null
    if (accordionEl) {
      const headers = Array.from(
        accordionEl.querySelectorAll<HTMLButtonElement>('.accordion__header'),
      )

      const totalHeaderHeight = headers.reduce((total, header) => {
        const rect = header.getBoundingClientRect()
        return total + rect.height
      }, 0)

      const accordionRect = accordionEl.getBoundingClientRect()
      const availableSpace = Math.max(
        0,
        accordionRect.height - totalHeaderHeight,
      )

      if (availableSpace > 0) {
        targetHeight = Math.max(contentScrollHeight, availableSpace)
      }
    }

    const nextHeight = Math.max(0, Math.round(targetHeight))
    setPanelHeight((prev) => (prev === nextHeight ? prev : nextHeight))
  }, [])

  React.useLayoutEffect(() => {
    recalcHeight()

    const content = contentRef.current
    const itemEl = itemRef.current
    const ro: ResizeObserver | null =
      typeof window !== 'undefined' && 'ResizeObserver' in window
        ? new ResizeObserver(recalcHeight)
        : null

    if (ro) {
      // Responsive: observe content/container size changes to keep measured height accurate.
      if (content) ro.observe(content)
      const accordionEl = itemEl?.closest('.accordion')
      if (accordionEl instanceof HTMLElement) ro.observe(accordionEl)
    }

    const onResize = () => recalcHeight()
    // Responsive: re-run sizing logic whenever the window size changes.
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

  const maxHeight = open ? `${panelHeight || 0}px` : '0px'

  return (
    <div
      ref={itemRef}
      className={`accordion__item ${open ? 'is-open' : ''} ${className}`}
    >
      <div className="accordion__heading" role="heading" aria-level={3}>
        <button
          ref={headerRef}
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
