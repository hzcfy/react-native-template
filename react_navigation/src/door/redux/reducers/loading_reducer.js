/*
 * @Author: JimmyDaddy
 * @Date: 2017-08-21 18:32:02
 * @Last Modified by: JimmyDaddy
 * @Last Modified time: 2018-04-27 15:42:54
 *
 * @Description loading reducers
 */

import { actionTypes } from '../../config';

const initialState = {
  visible: false,
  title: '验证中'
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case actionTypes.SHOW_LOADING: {
    const { title } = action;
    return {
      visible: true,
      title
    };
  }

  case actionTypes.HIDE_LOADING:
    return {
      visible: false
    };
  default:
    return state;
  }
};
