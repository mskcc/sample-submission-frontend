import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'

import thunk from 'redux-thunk'
import multi from 'redux-multi'

import { createLogger } from 'redux-logger'
import rootReducer from '../reducers/rootReducer'
import DevTools from '../containers/DevTools'

const middleware = [thunk, multi]
if (process.env.NODE_ENV !== 'production') {
 
}

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    DevTools.instrument()
  )
)

export default store
