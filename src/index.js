import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { LocalizeProvider } from 'react-localize-redux'

import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

import Root from './containers/Root'

import * as serviceWorker from './serviceWorker'

import './App.scss'

const store = configureStore

const App = props => (
  <Router>
    <LocalizeProvider store={store}>
      <Provider store={store}>
        <Root />
      </Provider>
    </LocalizeProvider>
  </Router>
)

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
