import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CryptoHistoryView from './components/CryptoHistoryView.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CryptoHistoryView />
  </StrictMode>,
)
