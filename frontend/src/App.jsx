
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import User from './User';
import Navigation from './Navigation';
import Inventory from './Inventory';


function App() {
  return (
    
<><Navigation /><div className="Content">
      <h1>Web App Placeholder Name</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/inventory" element={<Inventory />} />
        </Routes>
    </div></>
  );
}
export default App