import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Chatbot from '.././src/components/chatbot/Chatbot.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <Chatbot /> */}
  </StrictMode>,
)
