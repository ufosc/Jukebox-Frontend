import React, { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

import '../Sidebar.scss'

export const ModalNavItem = (props: {
  text: string
  icon?: ReactNode
  route?: string
  link?: string
  end?: boolean
  action?: any
}) => {
  const { route, link, text, icon, end, action } = props
  return (
    <div className="modal__nav__item" onClick={action}>
      {(route && (
        <NavLink to={route} end={end}>
          {icon && <div className="">{icon}</div>}
          <span className="">{text}</span>
        </NavLink>
      )) ||
        (link && (
          <a href={link}>
            <div className="">{icon}</div>
            <span className="">{text}</span>
          </a>
        ))}
    </div>
  )
}
