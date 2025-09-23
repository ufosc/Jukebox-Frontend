import './Footer.scss'

export const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer" aria-labelledby="site-footer-heading">
      <div className="site-footer__inner container">
        <p className="site-footer__copy">
          © {year} Jukebox. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
export default Footer
