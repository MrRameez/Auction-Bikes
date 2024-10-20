import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthContextProvider from './contaxt/AuthContaxt.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>

      <App />
    </AuthContextProvider>
    
  </StrictMode>,
)