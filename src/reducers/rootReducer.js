import { combineReducers } from 'redux'
import { LocalizeProvider, localizeReducer } from 'react-localize-redux'

import uploadReducer from './upload/uploadReducer'
import commonReducer from './common/commonReducer'


import {commonActions} from '../actions'



const rootReducer = combineReducers({
  upload: uploadReducer,
  common: commonReducer,

  // uploadGridReducer,
  // promoteReducer,
  // receiptReducer,
  // loginReducer,
    localize: localizeReducer,
})

export default rootReducer
