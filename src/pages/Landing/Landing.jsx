import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/layout/Header/Header'
import Goal from './components/Goal'
import Hero from './components/Hero'
import Repos from './components/Repos'
import Stat from './components/Stat'
import Topics from './components/Topics'

export default function Landing() {
  return (
    <>
      <Header />
      <Hero />
      <Goal />
      <Topics />
      <Repos />
      <Stat />

      <Link to="/board1">
        <button>Board 1</button>
      </Link>
      <div>
        <Link to="/dashboard">
          <button>Dashboard</button>
        </Link>
      </div>
    </>
  )
}
