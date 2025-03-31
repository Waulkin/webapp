import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FaceApp from './FaceApp.jsx'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

const CLIENT_ID="21437432952-sp1i8aon5a53reh7e92oh3a1qbb3vm1a.apps.googleusercontent.com"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}> 
    {/*<App />*/}
    <FaceApp /> 
    </GoogleOAuthProvider>
  
  </StrictMode>,
)
