import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider as StoreProvider } from 'react-redux'
import { store } from 'src/store'
import { ThemeManager } from 'src/utils'
import { Router } from './Router'

import './styles/theme/fonts/chango/css/chango.css'
import './styles/theme/fonts/poppins/css/poppins.css'
import './styles/theme/fonts/termina/css/termina.css'

ThemeManager.getInstance()

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <Router />
    </StoreProvider>
  </React.StrictMode>,
)
