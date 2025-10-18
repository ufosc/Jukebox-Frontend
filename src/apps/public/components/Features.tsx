import Feature1 from 'src/assets/img/Public/topic.png'
import './Features.scss'
import TopicGrid from './TopicGrid'

export const Features = () => {
  return (
    <section id="features" className="features">
      <div className="features__inner container">
        <h2 className="features__title">Notable Features</h2>
        <div className="features__list">
          <div className="features__items">
            <TopicGrid
              items={[
                {
                  variant: 'teal',
                  title: 'Collaborative Playlists',
                  text: 'Create and manage collaborative Spotify playlists that allow multiple users to add, remove, and reorder songs in real-time.',
                  ctaLabel: 'Learn More',
                  ctaHref: '/features/collaborative-playlists',
                  imageSrc: Feature1,
                  id: 1,
                },
                {
                  variant: 'light',
                  title: 'Playlists',
                  text: 'Spotify playlists that allow multiple users to add, remove, and reorder songs in real-time.',
                  ctaLabel: 'Learn More',
                  ctaHref: '/features/collaborative-playlists',
                  imageSrc: Feature1,
                  id: 2,
                },
                {
                  variant: 'teal',
                  title: 'Collaborative Playlists',
                  text: 'Create and manage collaborative Spotify playlists that allow multiple users to add, remove, and reorder songs in real-time.',
                  ctaLabel: 'Learn More',
                  ctaHref: '/features/collaborative-playlists',
                  imageSrc: Feature1,
                  id: 3,
                },
                {
                  variant: 'light',
                  title: 'Playlists',
                  text: 'Spotify playlists that allow multiple users to add, remove, and reorder songs in real-time.',
                  ctaLabel: 'Learn More',
                  ctaHref: '/features/collaborative-playlists',
                  imageSrc: Feature1,
                  id: 4,
                },
                {
                  variant: 'teal',
                  title: 'Playlists',
                  text: 'Spotify playlists that allow multiple users to add, remove, and reorder songs in real-time.',
                  ctaLabel: 'Learn More',
                  ctaHref: '/features/collaborative-playlists',
                  imageSrc: Feature1,
                  id: 5,
                },
                {
                  variant: 'light',
                  title: 'Playlists',
                  text: 'Spotify playlists that allow multiple users to add, remove, and reorder songs in real-time.',
                  ctaLabel: 'Learn More',
                  ctaHref: '/features/collaborative-playlists',
                  imageSrc: Feature1,
                  id: 6,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
