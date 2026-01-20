import './Header.scss'

export const Header = () => {
  return (
    <header className="public-header">
      <nav className="public-header_nav">
        <div className="public-header_logo">
          <span className="public-header_logo-text">Logo</span>
        </div>
        <div className="public-header_spacer">
          <ul className="public-header_links">
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#docs">Docs</a>
            </li>
            <li>
              <a href="#contribute">Contribute</a>
            </li>
            <li>
              <a href="#login">Login</a>
            </li>
          </ul>
          <a href="#signup" className="public-header_signup-button">
           <span className='public-header_signup-button-text'>Sign Up</span>
          </a>
        </div>
      </nav>
    </header>
  )
}
