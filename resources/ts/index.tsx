import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'
import 'react-datepicker/dist/react-datepicker.min.css'

import App from './App'
import store from './redux/store'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
