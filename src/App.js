import Home from "./scenes/Home";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import GymSearch from './scenes/GymSearch';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/findGyms" element={<GymSearch />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;