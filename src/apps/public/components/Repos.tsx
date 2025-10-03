// Repos.tsx
import Accordion, { type AccordionItemData } from './Accordion'
import './Repos.scss'
// (optional) local thumbs
import RepoThumb1 from 'src/assets/svg/repo.svg'

export const Repos = () => {
  // You can hardcode, fetch, or compute this array.
  // Shape matches AccordionItemData (id, title, description, thumbSrc, etc).
  const items: AccordionItemData[] = [
    {
      id: 'repo-01',
      index: 1,
      title: 'Jukebox API',
      description:
        'Node/Express service providing endpoints for track search, queue management, and playback state.',
      thumbSrc: RepoThumb1,
      thumbAlt: 'Jukebox API repository preview',
    },
    {
      id: 'repo-02',
      index: 2,
      title: 'Jukebox Web',
      description:
        'React + Vite front-end with SCSS theming, button system, and hero/accordion components.',
      thumbSrc: RepoThumb1,
      thumbAlt: 'Jukebox Web repository preview',
    },
    {
      id: 'repo-03',
      index: 3,
      title: 'Infra IaC',
      thumbSrc: RepoThumb1,
      description:
        'Terraform modules for staging/production, including secrets, networking, and CI/CD runners.',
    },
  ]

  return (
    <section className="repos">
      <div className="repos__inner container">
        <h2 className="repos__title">Repositories</h2>

        <div className="repos__list">
          <Accordion
            items={items}
            allowMultiple={false} // set true if you want multi-open
            defaultOpenIds={['repo-01']} // open first by default
            className="repos__accordion"
            itemClassName="repos__accordion-item"
          />
        </div>
      </div>
    </section>
  )
}

export default Repos
