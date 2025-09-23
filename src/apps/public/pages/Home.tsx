import { Hero, Goal, Features, Repos, CTA } from '../components'
import { Footer, Header } from '../layout'
import './Home.scss'

export const Home = () => {
  return (
    <div className="site">
      <Header isLoggedIn={false} />
      <main className="site-content">
        {<Hero />}
        {<Goal />}
        {<Features />}
        {<Repos />}
        {<CTA />}
      </main>
      <Footer />
    </div>
  )
}
