import Vector1 from 'src/assets/svg/Vector1.svg'
import Vector2 from 'src/assets/svg/Vector2.svg'
import Vector3 from 'src/assets/svg/Vector3.svg'
import NextHero from 'src/assets/svg/NextHero.svg'
import { Button } from './Button'
import './Hero.scss'

export const Hero = () => {
  return (
    <section id="hero" className="hero">
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
          <div className="hero__actions">
            <div className="hero__cta">
              <Button
                as="a"
                href="/dashboard"
                appearance="outlined"
                style={
                  {
                    '--color-primary-contrast': '#5B2222', // background
                    '--color-primary-contrast-on': '#5B2222', // text
                  } as React.CSSProperties
                }
                className="btn--hero"
              >
                Get Started
              </Button>
              <img src={NextHero} alt="" className="hero__next" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
