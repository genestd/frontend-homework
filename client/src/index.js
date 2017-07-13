import React from 'react'
import {render} from 'react-dom'
import store from './store/store'
import {Provider} from 'react-redux'
import App from './components/App'

const rootElement = document.getElementById('app');

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  rootElement
);
