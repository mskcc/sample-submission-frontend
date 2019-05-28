import { combineReducers } from 'redux'
import { LocalizeProvider, localizeReducer } from 'react-localize-redux'

import uploadReducer from './upload/uploadReducer'
import commonReducer from './common/commonReducer'
import userReducer from './user/userReducer'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import { commonActions } from '../actions'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['upload']
}



const rootReducer = combineReducers({
  upload: uploadReducer,
  common: commonReducer,
  user: userReducer,

  // uploadGridReducer,
  // promoteReducer,
  // receiptReducer,
  // loginReducer,
  localize: localizeReducer,
})

export default persistReducer(persistConfig, rootReducer)
