/*
 * @Author: JimmyDaddy
 * @Date: 2018-04-26 17:30:06
 * @Last Modified by: Liufang
 * @Last Modified time: 2019-05-28 4:34
 * @Description
 */
import reducerWhitelist from './reducer_white_list';
import actionTypes, { NavigationActions, StackActions } from './action_types';
import { actionTypes as doorActionTypes } from '../door/config';
module.exports = {
  reducerWhitelist,
  actionTypes: {
    ...actionTypes,
    ...doorActionTypes
  },
  keyPrefix: 'SXC_NAVIGATION_',
  NavigationActions,
  StackActions,
  storeKey: 'sxcNavigationStore'
};

