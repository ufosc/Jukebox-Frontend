//import '../index.css';
import './Board1.css'
//Temporary Clock
import Clock from '../components/Clock'
import ScrollQueue from '../components/ScrollQueue/ScrollQueue'

function App() {
  return (
    <div className="container">
      <header>
        <h1 className="center">Jukebox</h1>
      </header>
      <body>
        <div>
          <Clock></Clock>

          <ScrollQueue></ScrollQueue>
        </div>
      </body>
    </div>
  )
}

export default App
