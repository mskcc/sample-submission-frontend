import { combineReducers } from 'redux'

import uploadFormReducer from './uploadFormReducer'
import uploadGridReducer from './uploadGridReducer'
import promoteReducer from './promoteReducer'

export default combineReducers({
  form: uploadFormReducer,
  grid: uploadGridReducer,
  promote: promoteReducer,
})
