import React from 'react'
import ReactDOM from 'react-dom'

import { LocalizeProvider } from 'react-localize-redux'

import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

import Root from './containers/Root'

import * as serviceWorker from './serviceWorker'

import './App.scss'

const store = configureStore

const App = props => (
  <Provider store={store}>
    <LocalizeProvider store={store}>
      <Root />
    </LocalizeProvider>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
