import React from 'react'
import './Home.scss'
import { Sidebar } from '../components/Sidebar'
import { Topbar } from '../components/Topbar'

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <Topbar />
    </div>
  )
}

export default Home
