import Feature1 from 'src/assets/img/Public/topic.png'
import './TopicCard.scss'

type TopicCardProps = {
  variant?: 'light' | 'teal'
  title: string
  text: string
  ctaLabel: string
  ctaHref: string
  imageSrc: string
}

export const TopicCard = ({
  variant,
  title,
  text,
  ctaLabel = 'Learn More',
  ctaHref,
  imageSrc = Feature1,
}: TopicCardProps) => {
  const classes = ['topic-card']
  if (variant) classes.push(`topic-card--${variant}`)

  return (
    <div className={classes.join(' ')}>
      {/* Row 1: header/media */}
      <div className="topic-card__header">
        <div className="topic-card__media">
          <img className="topic-card__img" src={imageSrc} />
        </div>
        <h2 className="topic-card__title">{title}</h2>
      </div>

      {/* Row 2: body content (expands, 1fr) */}
      <div className="topic-card__content">
        <p className="topic-card__text">{text}</p>
      </div>

      {/* Row 3: CTA (auto, pinned to bottom by grid) */}
      <a
        href={ctaHref}
        className="topic-card__cta"
        aria-label={`${ctaLabel}: ${title}`}
      >
        {ctaLabel}{' '}
        <span className="topic-card__cta-icon" aria-hidden>
          →
        </span>
      </a>
    </div>
  )
}

export default TopicCard
