/*
 * @Author: JimmyDaddy
 * @Date: 2018-05-02 17:37:32
 * @Last Modified by:   Liufang
 * @Last Modified Date:   2019-05-28 4:34
 * @Description
 * @flow
 */
import React from 'react';
import { BackHandler, View, AppState } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationActions } from 'react-navigation';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import Col, { TrackViewType } from '@sxc/colrn'
import PropTypes from 'prop-types';
import { configAction, loadingAction } from './door/redux/actions/index';
import NavigationStore from './redux/store';
import { Loading as PersistLoading } from './components';
import Navigation from './navigation';
import { Popup, Loading } from './door/components';
import { Component } from './lib';
import { assert } from './utils';
import { NavigatorTypes } from './constants';
import Toast from './lib/toast';
import Provider from './redux/provider';

global.Toast = Toast;

var forbidActive

const getCurrentRouteName = (navigationState) => {
  if (!navigationState) {
    const { store } = NavigationStore.getNavigationStore()
    navigationState = store.getState().sxcNavReducer
  }
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getCurrentRouteName(route)
  }
  return route.routeName
}

const trackAppState = async (state) => {
  const currentRouteName = getCurrentRouteName()
  console.log('forbidActive', forbidActive)
  console.log('trackAppState', state, 'currentRouteName', currentRouteName)
  var sessionId
  switch (state) {
    case 'background': // app 切出后台
      sessionId = await Col.getSessionId()
      Col.trackView({
        view: TrackViewType.END_VIEW,
        lastView: currentRouteName,
        jumpType: TrackViewType.BACKGROUND,
        feature: {}
      })
      console.log(state, 'sessionId', sessionId, 'lastView', currentRouteName, 'view', TrackViewType.END_VIEW)
      break
    case 'active': // app 进入前台 更新
      sessionId = await Col.resetSessionId()
      console.log(state, 'sessionId', sessionId, 'lastView', TrackViewType.ACTIVE_VIEW, 'view', currentRouteName)
      if (forbidActive) { // 安卓按返回键退出 app 时，进程还在，阻止重启 app 时的重复上传
        forbidActive = false
        break
      }
      Col.trackView({
        view: currentRouteName,
        lastView: TrackViewType.ACTIVE_VIEW,
        jumpType: TrackViewType.ACTIVE,
        feature: {}
      })
      break
    default :
      break
  }
}

export default class Entry extends Component {
  static propTypes = {
    config: PropTypes.shape({
      appKey: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired
      ]),
      jsVersion: PropTypes.string,
      ENV: PropTypes.number,
      bizCode: PropTypes.string.isRequired,
      testHost: PropTypes.string, // 121.41.31.174
      devHost: PropTypes.string, // 121.41.31.174
      onLogin: PropTypes.func,
      onLogout: PropTypes.func,
      theme: PropTypes.string,
      testUsers: PropTypes.object,
      errorHandler: PropTypes.func,
      enableDefaultErrorHnadler: PropTypes.bool,
      // colAppKey: PropTypes.string.isRequired,
      colDevBaseUrl: PropTypes.string,
      colBaseUrl: PropTypes.string,
      trackApi: PropTypes.bool,
      log: PropTypes.bool,
      collectBreadcrumbs: PropTypes.bool
    }).isRequired,
    routeConfigMap: PropTypes.object.isRequired,
    navigatorConfig: PropTypes.shape({
      type: PropTypes.oneOf(NavigatorTypes.getTypes()),
      config: PropTypes.object
    }),
    uriPrefix: PropTypes.string,
    // 本地保存 key 前缀
    persistKeyPrefix: PropTypes.string,
    // 是否缓存路由状态
    persistNavReducer: PropTypes.bool,
    // 加载缓存时的等待页面
    persistLoading: PropTypes.element,
    // 通用 Loading 页面
    loadingComponent: PropTypes.element
  }

  constructor(props) {
    super(props);
    const {
      routeConfigMap, navigatorConfig, config, persistKeyPrefix, persistNavReducer, onLoadingComplete
    } = props;
    // props check -- start --
    assert(
      routeConfigMap !== null && routeConfigMap !== undefined,
      'routeConfigMap should not be null or undefined'
    );
    assert(
      navigatorConfig !== null && navigatorConfig !== undefined,
      'navigatorConfig should not be null or undefined'
    );
    assert(
      config !== null && config !== undefined,
      'config should not be null or undefined'
    );

    // props check -- end --

    const navigationStore = new NavigationStore();
    const navMiddleware = createReactNavigationReduxMiddleware(
      state => state.sxcNavReducer,
      'root',
    );

    // store init
    const myStore = navigationStore.create({
      routeConfigMap: props.routeConfigMap,
      navigatorConfig: props.navigatorConfig,
      persistKeyPrefix,
      persistNavReducer,
      storage: props.storage
    }, navMiddleware, onLoadingComplete);
    const { store } = myStore;

    const {
      jsVersion, ENV, colBaseUrl,
      colDevBaseUrl, log = false, trackApi = true, collectBreadcrumbs = true
    } = props.config;
    // col init
    Col.init({
      jsVersion,
      debug: ENV !== 1,
      baseUrl: colBaseUrl || 'https://col.songxiaocai.com/collect',
      devBaseUrl: colDevBaseUrl,
      log,
      trackApi,
      collectBreadcrumbs
    });
    // set config
    store.dispatch(configAction.set(props.config));
    this.state = {
      navigationStore: myStore
    };

    // loading init

    global.Loading = {
      show: (option = {}) => {
        store.dispatch(loadingAction.showLoading(option.title || ''));
        if (option.duration) {
          const timer = setTimeout(() => {
            store.dispatch(loadingAction.hideLoading());
            clearTimeout(timer);
          }, option.duration);
        }
      },
      hide: () => store.dispatch(loadingAction.hideLoading())
    };

    this.backPressTime = 0;

    AppState.addEventListener('change', trackAppState)
  }

  _getNestedRouteLength(nav) {
    const { index, routes } = nav;
    if (!routes[index].routes) {
      return index;
    }
    return this._getNestedRouteLength(routes[index]);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      const { store } = this.state.navigationStore;
      if (store) {
        const states = store.getState();
        const { sxcNavReducer } = states;
        if (sxcNavReducer) {
          if (this._getNestedRouteLength(sxcNavReducer) < 1) {
            this.backPressTime += 1;
            if (this.backPressTime >= 2) {
              forbidActive = true
              BackHandler.exitApp();
            } else {
              this.showToast('再按一次退出应用');
              setTimeout(() => {
                this.backPressTime = 0;
              }, 2000);
              return true;
            }
          } else if (store.dispatch) {
            store.dispatch(NavigationActions.back());
            return true;
          }
        }


        return true;
      }
      return false;
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress')
    AppState.removeEventListener('change', trackAppState)
    Col.endTrack()
  }

  /**
   * @description 多使用一个 View 是为了兼容多个 navigation 存在于一个 App 里面的情况
   *              由于 PersistGate 的 bug 如果不包裹一个 View，当 Navigation 为子组
   *              件时可能会显示不出来
   * @author JimmyDaddy
   * @returns
   * @memberof Entry
   */
  render() {
    const Nav = Navigation(this.state.navigationStore.Navigator);
    const { store, persistor } = this.state.navigationStore;
    return (
      <Provider
        store={store}
      >
        <View style={{
          flex: 1
        }}
        >
          <PersistGate
            loading={this.props.persistLoading ? this.props.persistLoading : <PersistLoading />}
            persistor={persistor}
          >
            <Nav uriPrefix={this.props.uriPrefix} />
            <Loading>
              {this.props.loadingComponent}
            </Loading>
            <Popup />
          </PersistGate>
        </View>
      </Provider>
    );
  }
}

