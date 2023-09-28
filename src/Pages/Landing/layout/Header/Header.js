import React from 'react'
import img from 'assets/logo-placeholder.png'
import classes from './Header.module.css'

export default function Header() {
  return (
    <header className={`container ${classes.header}`}>
      <div className={`col-4 ${classes.logo}`}><img src={img} alt="Logo" /></div>
      <nav className="col-5">
        <ul className={classes.nav}>
          <li className={classes.nav__link}><a href="/">Home</a></li>
          <li className={classes.nav__link}><a href="/#topics">Topics</a></li>
          <li className={classes.nav__link}><a href="/getting-started">Getting Started</a></li>
          <li className={classes.nav__link}><a href="/docs">Docs</a></li>
          <li className={classes.nav__link}><a href="/resources">Resources</a></li>
        </ul>
      </nav>
      <div className={`col-3 ${classes.cta}`}>
        <a href="/#" className="btn">Get Started</a>
      </div>
    </header>
  )
}
