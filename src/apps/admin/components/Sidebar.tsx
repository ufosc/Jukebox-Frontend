import { useContext } from 'react'

import { mergeClassNames } from 'src/utils'
import { AdminContext } from '../layout/Dashboard'
import './Sidebar.scss'
import { AdminSidebar } from './Sidebar/AdminSidebar'
import { MemberSidebar } from './Sidebar/MemberSidebar'

export const Sidebar = (props: { className?: string }) => {
  const { className } = props

  const adminStatus = useContext(AdminContext)
  return (
    <>
      <div className={mergeClassNames(className, 'navbar')}>
        {adminStatus.role === 'admin' ? <AdminSidebar /> : <MemberSidebar />}
      </div>
    </>
  )
}


