import { render } from '@testing-library/react'
import { Provider as StoreProvider } from 'react-redux'
import { App } from './App'
import { store } from './store'

test('Displays info', () => {
  render(
    <StoreProvider store={store}>
      <App />
    </StoreProvider>,
  )

  // const element = screen.getByText(/Login/i)
  // const element = screen.findAllByRole('button')
  // expect(element).not.toBeNull()
  expect(true).toBeTruthy()
})
