import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider as StoreProvider } from 'react-redux'
import { store } from 'src/store'
import { ThemeManager } from 'src/utils'
import { Router } from './Router'

import { SocketProvider } from './context'
import './styles/theme/fonts/chango/css/chango.css'
import './styles/theme/fonts/poppins/css/poppins.css'
import './styles/theme/fonts/termina/css/termina.css'

// Manage theme and light/dark mode as "singleton"
ThemeManager.getInstance()

// Primary entrypoint to the application
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Redux Provider */}
    <StoreProvider store={store}>
      {/* SocketIO Provider */}
      <SocketProvider>
        {/* URL Routes Render Here */}
        <Router />
      </SocketProvider>
    </StoreProvider>
  </React.StrictMode>,
)
