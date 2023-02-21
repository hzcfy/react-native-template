/*
 * @Author: JimmyDaddy
 * @Date: 2017-08-22 11:51:11
 * @Last Modified by: JimmyDaddy
 * @Last Modified time: 2018-04-27 16:25:39
 *
 * @Description user reducer
 */

import { actionTypes } from '../../config';
//  import _ from 'lodash'

const initState = {
  isLoggedIn: false,
  storehouseId: '',
  storehouseName: '',
  address: '',
  cityCode: '',
  id: '',
  mobilePhone: '',
  userId: '',
  userName: '',
  sessionId: '',
  cityList: null,
  storehouseList: null,
  viewPageId: '', // 1.服务站，3城市，4区长
  selectPickhouse: '', // 当前已选择服务站
  password: '',
  selectedCity: '', // 当前选择城市
  catPm: '' // 是否是品类PM
};

export default (state = initState, action = {}) => {
  switch (action.type) {
  /**
      * login
      */
  case actionTypes.DO_LOGIN:
    return action.data;
    /**
     * logout
     */
  case actionTypes.DO_LOGOUT: {
    const emptyUserInfo = {
      isLoggedIn: false,
      storehouseId: '',
      storehouseName: '',
      address: '',
      cityCode: '',
      id: '',
      mobilePhone: state.mobilePhone,
      userId: state.userId,
      userName: state.userName,
      sessionId: '',
      cityList: null,
      storehouseList: null,
      viewPageId: '', // 1.服务站，3城市，4区长
      selectPickhouse: '', // 当前已选择服务站
      password: '',
      selectedCity: '', // 当前选择城市
      catPm: '' // 是否是品类PM
    };
    return emptyUserInfo;
  }
  default:
    return state;
  }
};
