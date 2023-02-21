/*
 * @Author: JimmyDaddy
 * @Date: 2017-09-09 19:37:37
 * @Last Modified by: foryoung.cheng
 * @Last Modified time: 2022-01-12 17:24:20
 * @Description routes
 */
import DoorIndex from './login';
// import Login from './login/login';
import ForgotPassword from './forgot_password';
import Reset from './reset';
import SxcLogin from './login/sxc_login';
import WebPage from './web_page';
import VerifyPhone from './verify/verify_phone';
import TestUserList from './user';
import GetPhoneCode from './phone_code';

module.exports = {
  DoorIndex: {
    screen: DoorIndex
  },
  // Login: {
  //   screen: Login
  // },
  ForgotPassword: {
    screen: ForgotPassword
  },
  Reset: {
    screen: Reset
  },
  SxcLogin: {
    screen: SxcLogin
  },
  WebPage: {
    screen: WebPage
  },
  VerifyPhone: {
    screen: VerifyPhone
  },
  TestUserList: {
    screen: TestUserList
  },
  GetPhoneCode: {
    screen: GetPhoneCode
  }
};
