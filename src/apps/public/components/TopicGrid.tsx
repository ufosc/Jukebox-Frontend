import { TopicCard } from './TopicCard'
import './TopicGrid.scss'

type Item = {
  variant?: 'light' | 'teal'
  title: string
  text: string
  ctaLabel: string
  ctaHref: string
  imageSrc: string
  id: string | number // for React key
}

type TopicGridProps = {
  items: Item[]
  className?: string
}

export const TopicGrid = ({ items, className = '' }: TopicGridProps) => {
  return (
    <section className={`topic-grid ${className}`}>
      {items.map((it) => (
        <TopicCard key={it.id} {...it} />
      ))}
    </section>
  )
}
export default TopicGrid
