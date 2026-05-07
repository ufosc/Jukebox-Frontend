import { useState } from 'react'
import Plus from 'src/assets/svg/Plus.svg?react'
import Subtract from 'src/assets/svg/Subtract.svg?react'
import './Repos.scss'

export const Repos = () => {
  const [isOpen, setIsOpen] = useState<boolean[]>(Array(3).fill(false))

  const handleToggle = (idx: number) => {
    setIsOpen((states) => states.map((open, i) => (i === idx ? !open : open)))
  }
  return (
    <section className="repos">
      <div className="repos_container">
        <div className="repos_top">
          <h2 className="repos_title">Repositories</h2>
          <a href="#" className="repos_button">Sign Up</a>
        </div>
        <div className="repos_accordion" onClick={() => handleToggle(0)}>
          <div className="repos_accordion-header">
            <div className="repos_accordion-label">
              <span className="repos_accordion-index">01</span>
              <h3 className="repos_accordion-title">Some Title</h3>
            </div>
            {isOpen[0] ? <Subtract /> : <Plus />}
          </div>
          {isOpen[0] && (
            <div className="repos_accordion-content">
              <p className="repos_accordion-text">
                {' '}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris{' '}
              </p>
              <div className="repos_accordion-icon"></div>
            </div>
          )}
        </div>
        <div className="repos_accordion" onClick={() => handleToggle(1)}>
          <div className="repos_accordion-header">
            <div className="repos_accordion-label">
              <span className="repos_accordion-index">02</span>
              <h3 className="repos_accordion-title">Some Title</h3>
            </div>
            {isOpen[1] ? <Subtract /> : <Plus />}
          </div>
          {isOpen[1] && (
            <div className="repos_accordion-content">
              <p className="repos_accordion-text">
                {' '}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris{' '}
              </p>
              <div className="repos_accordion-icon"></div>
            </div>
          )}
        </div>
        <div className="repos_accordion" onClick={() => handleToggle(2)}>
          <div className="repos_accordion-header">
            <div className="repos_accordion-label">
              <span className="repos_accordion-index">03</span>
              <h3 className="repos_accordion-title">Some Title</h3>
            </div>
            {isOpen[2] ? <Subtract /> : <Plus />}
          </div>
          {isOpen[2] && (
            <div className="repos_accordion-content">
              <p className="repos_accordion-text">
                {' '}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris{' '}
              </p>
              <div className="repos_accordion-icon"></div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
