import logo from './logo.svg';
import './App.css';
import ScrollQueue from './ScrollQueue.jsx'
import Video from './Components/Video'

function App() {
  
  
  return (
    <div className="App">
      <header className="App-header">
        <Video/>
      </header>
      <ScrollQueue/>
    </div>
  );
}

export default App;
