import React, { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

import '../Sidebar.scss'

export const NavItem = (props: {
  text: string
  icon?: ReactNode
  route?: string
  link?: string
  end?: boolean
}) => {
  const { route, link, text, icon, end } = props
  return (
    <div className="navbar__nav__item">
      {(route && (
        <NavLink to={route} end={end}>
          {icon && <div className="navbar__nav__item__icon">{icon}</div>}
          <span className="navbar__nav__item__text">{text}</span>
        </NavLink>
      )) ||
        (link && (
          <a href={link}>
            <div className="navbar__nav__item__icon">{icon}</div>
            <span className="navbar__nav__item__text">{text}</span>
          </a>
        ))}
    </div>
  )
}
