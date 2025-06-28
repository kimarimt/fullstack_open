import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createStore } from 'redux'
import counterReducer from './reducers/counterReducer'
import App from './App'

const store = createStore(counterReducer)
const root = createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(
    <StrictMode>
      <App store={store} />
    </StrictMode>
  )
}

renderApp()
store.subscribe(renderApp)