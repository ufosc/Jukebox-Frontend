import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider as StoreProvider } from 'react-redux'
import { store } from 'src/store'
import { ThemeManager } from 'src/utils'
import { Router } from './Router'

import './styles/main.scss'

ThemeManager.getInstance()

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <Router />
    </StoreProvider>
  </React.StrictMode>,
)
