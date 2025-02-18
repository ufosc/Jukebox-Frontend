import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './AdminHeader.scss'

interface HeaderProps {
  title: string
  children?: ReactNode
  cta?: CtaBtn[]
  music?: boolean
}

interface CtaBtn {
  label: string
  link: string
}

export const AdminHeader = ({ title, cta, music, children }: HeaderProps) => {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <div className="adminheader-style">
      <div className="pageheader-style">
        <p className="breadcrumb-style">Admin/{title}</p>
        <p className="page-title-style">{title}</p>
      </div>
      <div className="options-container">
        {cta &&
          cta.map((button, index) => (
            <Link
              key={index}
              className={`cta-style ${currentPath === button.link ? 'active' : ''}`}
              to={button.link}
            >
              {button.label}
            </Link>
          ))}
        {music && (
          <Link
            className={`music-link-style ${currentPath === '/admin/music/queue' ? 'active' : ''}`}
            to="/admin/music/queue"
          >
            Track Queue
          </Link>
        )}
        {music && (
          <Link
            className={`music-link-style ${currentPath === '/admin/music/search' ? 'active' : ''}`}
            to="/admin/music/search"
          >
            Search Tracks
          </Link>
        )}
      </div>
    </div>
  )
}
