/*
 * @Author: JimmyDaddy
 * @Date: 2017-09-10 18:32:02
 * @Last Modified by: JimmyDaddy
 * @Last Modified time: 2018-04-27 16:12:21
 *
 * @Description loading reducers
 */

import { actionTypes } from '../../config';

export default (state = false, action = {}) => {
  switch (action.type) {
  case actionTypes.SHOW_DOOR:
    return true;
  case actionTypes.HIDE_DOOR:
    return false;
  case actionTypes.DO_LOGOUT:
    return true;
  case actionTypes.DO_LOGIN:
    return false;
  default:
    return state;
  }
};
