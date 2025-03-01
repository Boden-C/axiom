import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from "./pages/Landing";
import Dev from "./pages/Dev";
import NetworkError from './pages/NetworkError';


function App() {



    return (
        <Router>
        <Routes>
          <Route path="/" element={<NetworkError />} />
          <Route path="/dev" element={<Dev />} />
        </Routes>
      </Router>
    );
}

export default App;
