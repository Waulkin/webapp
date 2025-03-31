
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './LandingPage';
import  App  from './App';


   
function FaceApp() {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app/*" element={<App />} />

      </Routes>  
  );
}
export default FaceApp