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
  return (
    <div className={`topic-card topic-card--${variant}`}>
      <div className="topic-card__media">
        <img src={imageSrc} alt="" className="topic-card__img" />
      </div>
      <div className="topic-card__content">
        <h2 className="topic-card__title">{title}</h2>
        <p className="topic-card__text">{text}</p>
        <a href={ctaHref} className="topic-card__cta">
          {ctaLabel} →
        </a>
      </div>
    </div>
  )
}

export default TopicCard
