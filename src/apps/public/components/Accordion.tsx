// components/Accordion.tsx
import * as React from 'react'
import './Accordion.scss'
import type { AccordionItemProps } from './AccordionItem'
import AccordionItem from './AccordionItem'

/** Shape of each item you pass into the Accordion */
export type AccordionItemData = Omit<
  AccordionItemProps,
  'open' | 'onToggle' | 'className'
>

/** Wrapper props */
export type AccordionProps = {
  items: AccordionItemData[]
  allowMultiple?: boolean // false = one open at a time
  defaultOpenIds?: string[] // which ids should start open
  className?: string
  itemClassName?: string // optional extra class for each item
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenIds = [],
  className = '',
  itemClassName = '',
}) => {
  // keep a set of open ids
  const [openIds, setOpenIds] = React.useState<Set<string>>(
    () => new Set(defaultOpenIds),
  )

  // toggle handler given to each item
  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        if (!allowMultiple) next.clear() // only one open at a time
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className={`accordion ${className}`}>
      {items.map((item, i) => (
        <AccordionItem
          key={item.id}
          {...item}
          index={item.index ?? i + 1}
          open={openIds.has(item.id)}
          onToggle={toggle}
          className={itemClassName}
        />
      ))}
    </div>
  )
}

export default Accordion
