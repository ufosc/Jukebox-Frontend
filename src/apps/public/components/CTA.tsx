import { Button } from './Button'
import './CTA.scss'

export const CTA = () => {
  return (
    <section id="cta" className="CTA">
      <div className="CTA__inner">
        <h2 className="CTA__title">
          Ready to get coding?
          <br />
          Pick a repo and get Started!
        </h2>
        <Button
          as="a"
          href="/auth/register"
          appearance="outlined"
          colorRole="tertiary"
          className={'btn--cta'}
        >
          CTA Primary
        </Button>
      </div>
    </section>
  )
}

export default CTA
