import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomeView from './views/HomeView';
import TileViewer from './views/TileViewer';
import AdminPanel from './views/AdminPanel';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/viewer" element={<TileViewer />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;