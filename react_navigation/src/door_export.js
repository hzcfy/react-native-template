/*
 * @Author: JimmyDaddy
 * @Date: 2018-04-23 11:32:15
 * @Last Modified by:   Liufang
 * @Last Modified Date:   2019-05-28 4:34
 * @Description
 */
import { NavigationActions, StackActions } from 'react-navigation';
import { userAction, showAction, configAction } from './door/redux/actions/index';
import { theme } from './door/config';
import { gwapi as request } from './door/sdk';
import NavigationStore from './redux/store';


const gwapi = (api, body = {}, errorHandler) => {
  const { store } = NavigationStore.getNavigationStore();
  return request(api, body, store.getState(), store.dispatch, errorHandler);
};

const logout = () => {
  // if(NativeModules.Networking){
  //   NativeModules.Networking.clearCookies()
  // }
  const { store } = NavigationStore.getNavigationStore();
  if (store) {
    store.dispatch(userAction.logout({
      userId: store.getState().userDoorReducer.userId
    }));
  }
};

const logoutForce = () => {
  // if(NativeModules.Networking){
  //   NativeModules.Networking.clearCookies()
  // }
  const { store } = NavigationStore.getNavigationStore();
  if (store) {
    store.dispatch(userAction.logoutWithoutRequest());
  }
};

const getUserInfo = () => {
  const { store } = NavigationStore.getNavigationStore();
  if (store) {
    return store.getState().userDoorReducer;
  }
  return null;
};

const getHost = () => {
  const { store } = NavigationStore.getNavigationStore();
  if (store && store.getState().configReducer) {
    return store.getState().configReducer.getHost();
  }
  return null;
};

const showAuthPage = (routeName, params, action) => {
  const { store } = NavigationStore.getNavigationStore();

  if (store) {
    const navigateAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'AppMain',
          action: NavigationActions.navigate({
            routeName,
            params: {
              params,
              back: () => store.dispatch(showAction.hide())
            },
            action
          })
        })
      ]
    });

    store.dispatch(navigateAction);
    store.dispatch(showAction.show());
  }
};

const showLogin = () => {
  const { store } = NavigationStore.getNavigationStore();
  store.dispatch(NavigationActions.navigate({
    routeName: 'Auth'
  }));
};

const setConfig = (config) => {
  const { store } = NavigationStore.getNavigationStore();
  store.dispatch(configAction.set(config));
};

export {
  // 登录页面
  // Login,
  // 找回密码
  // ForgotPassword: require('./forgot_password'),
  // 验证码组件
  // Captcha: require('./components/captcha'),
  // App 全局的通用签名等方法
  // sdk: require('./sdk'),
  // App 全局的请求模块
  // request: require('./utils/request'),
  // 第三方跳转
  // passport: require('./utils/passport'),
  // 本地缓存读取
  // storage: require('./utils/storage')

  // 登出操作
  logout,
  // 获取用户信息，一般用户用户打开app时
  getUserInfo,
  // 同步获取用户信息,一般用于app初始化完成后，初始化之前调用可能拿到空的数据
  // getUserInfoSync,
  // 前往登录路由中的某个页面， 如直接跳转到充值密码，或者找回密码
  showAuthPage,
  // 设置配置
  setConfig,
  // 显示登录
  showLogin,
  // 主题透出
  theme,
  // 网关透出
  gwapi,
  // 强制登出
  logoutForce,
  // 获取 host
  getHost
};
