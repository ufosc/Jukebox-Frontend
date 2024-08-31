import React from 'react'
import { CookiesProvider } from 'react-cookie'
import { createRoot } from 'react-dom/client'
import { Provider as StoreProvider } from 'react-redux'
import { Router } from './Router.tsx'
import { store } from './store/index.ts'
import './styles/main.scss'
import { ThemeManager } from './utils/index.ts'

ThemeManager.getInstance()

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <Router />
      </CookiesProvider>
    </StoreProvider>
  </React.StrictMode>,
)
