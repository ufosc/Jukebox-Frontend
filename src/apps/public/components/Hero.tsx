import Vector1 from 'src/assets/img/Public/Vector1.png'
import Vector2 from 'src/assets/img/Public/Vector2.png'
import Vector3 from 'src/assets/img/Public/Vector3.png'
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
            <span className="hero__title-line hero__title-line--top">
              Welcome to
            </span>
            <span className="hero__title-line hero__title-line--bottom">
              the <span className="hero__title--highlight">Jukebox</span>{' '}Project
            </span>
          </h1>
          <p className="hero__subtitle">
            Jukebox is a web application that allows club members to manage
            songs in a collaborative Spotify queue. It ports the functionality
            of a traditional jukebox to the modern era by leveraging the Spotify
            API. The Jukebox project also serves as an educational exercise for
            learning developer operations with Terraform, AWS, and Docker.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
