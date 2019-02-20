import { combineReducers } from 'redux'

import uploadFormReducer from './uploadFormReducer'

export default combineReducers({
  form: uploadFormReducer,
  // grid: uploadGridReducer,
})
