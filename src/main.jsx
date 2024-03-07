import React from 'react'
import { CookiesProvider } from 'react-cookie'
import ReactDOM from 'react-dom/client'
import { Router } from './Router'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <Router />
    </CookiesProvider>
  </React.StrictMode>,
)
