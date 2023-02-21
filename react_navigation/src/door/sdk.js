import request from './utils/request';
import gwapi from './utils/gwapi';
// import { getRamdomId } from './utils/key';
import { api } from './config';

module.exports = {
  getPhonelist (configData, dispatch) {
    return gwapi.invoke(api.getPhonelist, undefined, configData, dispatch);
  },
  login(data, configData, dispatch) {
    if (data.bizCode === 'songxiaocai_captcha_login') { // 验证码登录
      return request.post(api.login, data, configData, dispatch, 'songxiaocai_captcha_login');
    }
    if (data.bizCode === 'dingDingSdc') { // 钉钉授权登录
      return request.post(api.login, data, configData, dispatch, 'dingDingSdc');
    }
    // 密码登录
    return request.post(api.login, data, configData, dispatch);
  },
  logout(data, configData, dispatch) {
    return request.post(api.logout, data, configData, dispatch);
  },

  // sms(data, configData, dispatch) {
  //   return request.post(api.sms, data, configData, dispatch);
  // },
  sms(data, configData, dispatch) {
    return request.smsReq(api.sms, data, configData, dispatch);
  },

  verify(data, configData, dispatch) {
    return request.post(api.verify, data, configData, dispatch);
  },

  reset(data, configData, dispatch) {
    return request.post(api.reset, data, configData, dispatch);
  },

  pwdveridy(data, configData, dispatch) {
    return request.post(api.pwdverify, data, configData, dispatch);
  },

  gwapi(apiName, data, configData, dispatch) {
    return gwapi.invoke(apiName, data, configData, dispatch);
  },

  // getCaptcha() {
  //   return request.get(api.captcha, {
  //     ramdomId: getRamdomId()
  //   });
  // },
  // getCaptcha() {
  //   return request.post(api.pwdverify, data);
  // },
  captchaLogin(data, configData, dispatch) {
    return request.post(api.captchaLogin, data, configData, dispatch, 'songxiaocai_captcha_login');
  },
  voiceSms(data, configData, dispatch) {
    return request.smsReq(api.voiceSms, data, configData, dispatch);
  },
};
