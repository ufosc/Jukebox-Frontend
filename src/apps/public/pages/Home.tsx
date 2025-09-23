import { About, CTA, Features, Hero, Repos } from '../components'
import { Footer, Header } from '../layout'
import './Home.scss'

export const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <Hero />
      <About />
      <Features />
      <Repos />
      <CTA />
      <Footer />
    </div>
  )
}
