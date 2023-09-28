
import './index.css';
import './App.css';

//Temporary Clock
import Clock from './components/Clock'
import ScrollQueue from './components/ScrollQueue'




function App() {
  var url = "bMknfKXIFA8"
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
          
          {/*<SongInput></SongInput>*/}
          <ScrollQueue></ScrollQueue>
        </div>
        
      </body>
    </div>
  )
}

export default App;

