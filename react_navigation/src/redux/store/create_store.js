
import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createLogger } from 'redux-logger'
import { reducerWhitelist, keyPrefix as defaultKeyPrefix } from '../../config'
import ScreenTrack from './screen_track'
import sysReducer from '../reducers'
/* global __DEV__ */
const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent

const persistReducers = (reducers, keyPrefix, persistNav = false, storage = AsyncStorage) => persistReducer(
  {
    // transforms: [asyncEncryptor],
    whitelist: persistNav ? reducerWhitelist.concat(['systechNavReducer']) : reducerWhitelist,
    storage,
    key: keyPrefix || defaultKeyPrefix
  },
  combineReducers({ ...reducers, ...sysReducer })
)

const logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true
})

function configureStore ({
  reducers,
  persistKeyPrefix,
  persistNavReducer = false,
  storage
}, navMiddleware, onComplete) {
  const createMyStore = isDebuggingInChrome
    ? applyMiddleware(thunk, logger, navMiddleware, ScreenTrack)(createStore)
    : applyMiddleware(thunk, navMiddleware, ScreenTrack)(createStore)
  const store = createMyStore(persistReducers(reducers, persistKeyPrefix, persistNavReducer, storage))
  const persistor = persistStore(store, null, onComplete)
  if (isDebuggingInChrome) {
    window.store = store
  }

  global.__STORE = store
  return { store, persistor }
}
export default configureStore
