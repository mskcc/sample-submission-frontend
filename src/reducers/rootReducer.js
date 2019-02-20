import { combineReducers } from 'redux'
import { LocalizeProvider, localizeReducer } from 'react-localize-redux'

import uploadReducer from './upload/uploadReducer'

import {commonActions} from '../actions'

// Updates error message to notify about the failed fetches.
const errorMessage = (state = null, action) => {
  const { type, error } = action

  if (type === commonActions.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return error
  }

  return state
}

const rootReducer = combineReducers({
  upload: uploadReducer,

  // uploadGridReducer,
  // promoteReducer,
  // receiptReducer,
  // loginReducer,

  errorMessage,
  localize: localizeReducer,
})

export default rootReducer
