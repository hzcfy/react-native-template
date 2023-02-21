/*
 * @Author: JimmyDaddy
 * @Date: 2017-08-22 10:11:35
 * @Last Modified by: JimmyDaddy
 * @Last Modified time: 2019-12-05 11:06:04
 */

import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-community/async-storage';
import { createLogger } from 'redux-logger';
import { reducerWhitelist, keyPrefix as defaultKeyPrefix } from '../../config';
// import createAsyncEncryptor from 'redux-persist-transform-encrypt/async';
import ScreenTrack from './screen_track';
// import reducers from '../reducer';
import doorReducer from '../../door/redux/reducers';
// import { navMiddleware } from '../../navigation';
/* global __DEV__ */
const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

// const asyncEncryptor = createAsyncEncryptor({
//   secretKey: '6FF5C2021C05592C10F982BF0C6A5357'
// });

const persistReducers = (reducers, keyPrefix, persistNav = false, storage = AsyncStorage) => persistReducer(
  {
    // transforms: [asyncEncryptor],
    whitelist: persistNav ? reducerWhitelist.concat(['sxcNavReducer']) : reducerWhitelist,
    storage,
    key: keyPrefix || defaultKeyPrefix
  },
  combineReducers({ ...reducers, ...doorReducer })
);


const logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true
});

function configureStore({
  reducers,
  persistKeyPrefix,
  persistNavReducer = false,
  storage
}, navMiddleware, onComplete) {
  const createMyStore = isDebuggingInChrome ?
    applyMiddleware(thunk, logger, navMiddleware, ScreenTrack)(createStore) :
    applyMiddleware(thunk, navMiddleware, ScreenTrack)(createStore);
  const store = createMyStore(persistReducers(reducers, persistKeyPrefix, persistNavReducer, storage));
  const persistor = persistStore(store, null, onComplete);
  if (isDebuggingInChrome) {
    window.store = store;
  }

  global.__STORE = store;
  return { store, persistor };
}
export default configureStore;
