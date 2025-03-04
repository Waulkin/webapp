import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import User from './User';
import Navigation from './Navigation';

function App() {
  return (
    <Router>
        <Navigation />
        <div className="Content">
            <h1>Web App Placeholder Name</h1>
      <Routes>
        <Route exact path="/" element={Home} />
        <Route path="/user" element={User} />
      </Routes>
      </div>
    </Router>
  );
}
export default App;