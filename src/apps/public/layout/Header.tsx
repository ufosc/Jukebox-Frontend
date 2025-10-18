import { Brand } from '../components/Brand'
import { Button } from '../components/Button'
import './Header.scss'

type HeaderProps = {
  isLoggedIn: boolean
}

export const Header = ({ isLoggedIn }: HeaderProps) => {
  return (
    <header className="site-header">
      <div className="site-header__inner container">
        <Brand />
        <nav className="site-header__nav" aria-label="Main">
          <a href="#goal">About</a>
          <a href="#features">Features</a>
          <a href="#repos">Docs</a>
          <a href="#cta">Contribute</a>
          {isLoggedIn ? (
            <>
              <a href="/auth/logout" className="nav-link">
                Logout
              </a>
              <Button
                as="a"
                href="/dashboard"
                appearance="outlined"
                colorRole="primary"
                className={'btn--nav'}
              >
                Jukebox
              </Button>
            </>
          ) : (
            <>
              <a href="/auth/login" className="nav-link">
                Login
              </a>
              <Button
                as="a"
                href="/auth/register"
                appearance="outlined"
                colorRole="primary"
                className={'btn--nav'}
              >
                Sign Up
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
