import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider as StoreProvider } from 'react-redux'
import { store } from 'src/store'
import { ThemeManager } from 'src/utils'
import { Router } from './Router'

import './styles/theme/fonts/chango/css/chango.css'
import './styles/theme/fonts/poppins/css/poppins.css'
import './styles/theme/fonts/termina/css/termina.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

// Manage theme and light/dark mode as "singleton"
ThemeManager.getInstance()

// Primary entrypoint to the application
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Redux Provider */}
    <StoreProvider store={store}>
      {/* React-dnd Provider */}
      <DndProvider backend={HTML5Backend}>
        {/* URL Routes Render Here */}
        <Router />
      </DndProvider>
    </StoreProvider>
  </React.StrictMode>,
)
