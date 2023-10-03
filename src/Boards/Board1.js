
//import '../index.css';
import './Board1.css';
//Temporary Clock
import Clock from '../Components/Clock'
import ScrollQueue from '../Components/ScrollQueue'
import Song from '../Components/Song/Song'




function App() {
  
  return (
    <div>
      <header>
        <h1 className = "center">
        Jukebox
        </h1>
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

export default App;

