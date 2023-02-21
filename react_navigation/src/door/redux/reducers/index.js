/*
 * @Author: JimmyDaddy
 * @Date: 2017-09-09 13:57:19
 * @Last Modified by: JimmyDaddy
 * @Last Modified time: 2018-10-23 17:42:02
 * @Description reducers
 */
// import { combineReducers } from 'redux';

// import navDoorReducer from './nav_reducer';
import userDoorReducer from './user_reducer';
import popReducer from './pop_reducer';
import showReducer from './show_reducer';
import configReducer from './config_reducer';
import loadingDoorReducer from './loading_reducer';

// 可使用 symbol 方式代替

const reducers = {
  // navDoorReducer,
  userDoorReducer,
  popReducer,
  showReducer,
  configReducer,
  loadingDoorReducer
};

// const combinedReducers = combineReducers(reducers);

export default reducers;
