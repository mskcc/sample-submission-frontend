import { combineReducers } from 'redux'
import { LocalizeProvider, localizeReducer } from 'react-localize-redux'
import { reducer as formReducer } from 'redux-form'


import form from './form'

import { RESET_ERROR_MESSAGE } from '../actions/actions'

// Updates error message to notify about the failed fetches.
const errorMessage = (state = null, action) => {
  const { type, error } = action

  if (type === RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return error
  }

  return state
}

const rootReducer = combineReducers({
  form,
  formReducer,
  errorMessage,
  localize: localizeReducer,
})

export default rootReducer
