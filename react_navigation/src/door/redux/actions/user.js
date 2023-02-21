/*
 * @Author: JimmyDaddy
 * @Date: 2017-09-10 03:49:37
 * @Last Modified by: foryoung.cheng
 * @Last Modified time: 2021-12-29 17:36:22
 * @Description
 */
import { actionTypes } from '../../config';
import { getPhonelist, login, logout, captchaLogin, sms, verify, reset, gwapi,voiceSms } from '../../sdk';

export default {
  //（宋小菜）可通过密码登录的手机号白名单
  getPhonelist: () => (dispatch, getState) => new Promise((resolve, reject) => {
    getPhonelist(getState(), dispatch).then(res => {
      if (res.success) {
        resolve(res);
      } else {
        reject(res);
      }
    }).catch(err => {
      reject(err);
    })
  }),
  login: data => (dispatch, getState) => new Promise((resolve, reject) => {
    login(data, getState(), dispatch).then((res) => {
      if (res.success) {
        dispatch({
          type: actionTypes.DO_LOGIN,
          data: {
            isLoggedIn: true,
            ...res.result
          }
        });
        resolve(res);
      } else {
        reject(res);
      }
    }).catch((err) => {
      reject(err);
    });
  }),
  getAppConfig: data => (dispatch, getState) => new Promise((resolve, reject) => {
    gwapi('songxiaocai.login.app.config',data, getState(), dispatch).then((res) => {
      if (res.success) {
        // dispatch({
        //   type: actionTypes.DO_LOGIN,
        //   data: {
        //     isLoggedIn: true,
        //     ...res.result
        //   }
        // });
        console.log(res)
        resolve(res);
      } else {
        reject(res);
      }
    }).catch((err) => {
      reject(err);
    });
  }),
  logout: data => (dispatch, getState) => new Promise((resolve, reject) => {
    dispatch({ type: actionTypes.DO_LOGOUT });
    logout(data, getState(), dispatch).then((res) => {
      if (res.success) {
        resolve(res);
      } else {
        reject(res);
      }
    }).catch((err) => {
      reject(err);
    });
  }),
  logoutWithoutRequest: () => ({ type: actionTypes.DO_LOGOUT }),
  captchaLogin: data => (dispatch, getState) => new Promise((resolve, reject) => {
    captchaLogin(data, getState(), dispatch).then((res) => {
      if (res.success) {
        dispatch({
          type: actionTypes.DO_LOGIN,
          data: {
            isLoggedIn: true,
            ...res.result
          }
        });
        resolve(res);
      } else {
        reject(res);
      }
    }).catch((err) => {
      reject(err);
    });
  }),
  sms: data => (dispatch, getState) => new Promise((resolve, reject) => {
    sms(data, getState(), dispatch).then((res) => {
      if (res.success) {
        resolve(res);
      } else {
        reject(res);
      }
    }).catch((err) => {
      reject(err);
    });
  }),
  verify: data => (dispatch, getState) => new Promise((resolve, reject) => {
    verify(data, getState(), dispatch).then((res) => {
      if (res.success) {
        resolve(res);
      } else {
        reject(res);
      }
    }).catch((err) => {
      reject(err);
    });
  }),
  reset: data => (dispatch, getState) => new Promise((resolve, reject) => {
    reset(data, getState(), dispatch).then((res) => {
      if (res.success) {
        resolve(res);
      } else {
        reject(res);
      }
    }).catch((err) => {
      reject(err);
    });
  }),
  voiceSms: data => (dispatch, getState) => new Promise((resolve, reject) => {
    voiceSms(data, getState(), dispatch).then((res) => {
      if (res.success) {
        resolve(res);
      } else {
        reject(res);
      }
    }).catch((err) => {
      reject(err);
    });
  }),
};
