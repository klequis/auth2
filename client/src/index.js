import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import Home from './components/Home'


ReactDOM.render(
  <Provider store={configureStore()}>
    <Home />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
