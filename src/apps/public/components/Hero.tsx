import ButtonArrow from 'src/assets/svg/ButtonArrow.svg?react'
import MaskGroup from 'src/assets/svg/MaskGroup.svg?react'
import './Hero.scss'

export const Hero = () => {
  return (
    <main className="hero">
      <div className="hero_container">
        <div className="hero_left">
          <h2 className="hero_title">
            Welcome to <br />
            the <span className="hero_highlight">Jukebox</span> Project
          </h2>
          <p className="hero_subtitle">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </p>
          <a href="#" className="hero_button">
            Get Started
            <ButtonArrow className="hero_arrow" />
          </a>
        </div>
        <div className="hero_right">
          <MaskGroup className="hero_image" />
          {/*
            <div className="hero_base1-horizontal"></div>
            <div className="hero_base1-vertical"></div>
            <div className="hero_base1-diagonal"></div>
            <div className="hero_base2-horizontal"></div>
            <div className="hero_base2-vertical"></div>
            <div className="hero_base2-diagonal"></div>
            <div className="hero_base2-square"></div>
            <div className="hero_base3-horizontal"></div>
            <div className="hero_base3-vertical"></div>
            <div className="hero_base3-diagonal"></div>
            <div className="hero_base3-diagonal2"></div>
            <div className="hero_base3-square"></div>
            <div className="hero_base4-horizontal"></div>
            <div className="hero_base4-vertical"></div>
            */}
        </div>
      </div>
    </main>
  )
}
