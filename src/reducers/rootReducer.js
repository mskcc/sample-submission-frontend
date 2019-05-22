import { combineReducers } from 'redux'
import { LocalizeProvider, localizeReducer } from 'react-localize-redux'

import uploadReducer from './upload/uploadReducer'
import commonReducer from './common/commonReducer'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import { commonActions } from '../actions'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['grid']
}



const rootReducer = combineReducers({
  upload: uploadReducer,
  common: commonReducer,

  // uploadGridReducer,
  // promoteReducer,
  // receiptReducer,
  // loginReducer,
  localize: localizeReducer,
})

export default persistReducer(persistConfig, rootReducer)
