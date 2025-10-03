import Vector1 from 'src/assets/svg/Vector1.svg'
import Vector2 from 'src/assets/svg/Vector2.svg'
import Vector3 from 'src/assets/svg/Vector3.svg'
import { Button } from './Button'
import './Hero.scss'

export const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true">
        <img src={Vector1} alt="" className="hero__bg-img hero__bg-img--1" />
        <img src={Vector2} alt="" className="hero__bg-img hero__bg-img--2" />
        <img src={Vector3} alt="" className="hero__bg-img hero__bg-img--3" />
      </div>
      <div className="hero__inner container">
        <div className="hero__content">
          <h1 className="hero__title">
            Welcome to
            <br />
            the <span className="hero__title-highlight">Jukebox</span> Project
          </h1>
          <p className="hero__subtitle">
            Jukebox is a web application that allows club members to manage
            songs in a collaborative Spotify queue. It ports the functionality
            of a traditional jukebox to the modern era by leveraging the Spotify
            API.
          </p>
          <Button
            as="a"
            href="/dashboard"
            appearance="outlined"
            colorRole="tertiary"
            className={'btn--hero'}
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Hero
