import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./styles/App.css";
import Landing from "./pages/Landing";
import Dev from "./pages/Dev";


function App() {

    return (
        <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dev" element={<Dev />} />
        </Routes>
      </Router>
    );
}

export default App;
