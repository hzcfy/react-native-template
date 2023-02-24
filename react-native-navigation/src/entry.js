/*
* @Author: foryoung.cheng
* @Description:
* @Date: 2023-02-21 14:55:46
 * @Last Modified by: foryoung.cheng
 * @Last Modified time: 2023-02-21 16:39:25
* @License: GNU General Public License（GPL)
* @Copyright: ©2015-2019 www.songxiaocai.com 宋小菜 All Rights Reserved.
*/
import React from 'react'
import { BackHandler, View, AppState } from 'react-native'
import { PersistGate } from 'redux-persist/integration/react'
import { NavigationActions } from 'react-navigation'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import PropTypes from 'prop-types'
import { loadingAction } from './redux/actions/index'
import NavigationStore from './redux/store'
import { Loading as PersistLoading } from './components'
import Navigation from './navigation'
import { Component } from './lib'
import { assert } from './utils'
import { NavigatorTypes } from './constants'
import Toast from './lib/toast'
import Provider from './redux/provider'

global.Toast = Toast

const getCurrentRouteName = (navigationState) => {
  if (!navigationState) {
    const { store } = NavigationStore.getNavigationStore()
    navigationState = store.getState().systechNavReducer
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
  console.log('trackAppState', state, 'currentRouteName', currentRouteName)
  switch (state) {
    case 'background': // app 切出后台
      break
    case 'active': // app 进入前台 更新
      break
    default :
      break
  }
}

export default class Entry extends Component {
  static propTypes = {
    config: PropTypes.shape({
      // appKey: PropTypes.oneOfType([
      //   PropTypes.string.isRequired,
      //   PropTypes.number.isRequired
      // ]),
      // jsVersion: PropTypes.string,
      // ENV: PropTypes.number,
      // bizCode: PropTypes.string.isRequired,
      // testHost: PropTypes.string, // 121.41.31.174
      // devHost: PropTypes.string, // 121.41.31.174
      // onLogin: PropTypes.func,
      // onLogout: PropTypes.func,
      // theme: PropTypes.string,
      // testUsers: PropTypes.object,
      // errorHandler: PropTypes.func,
      // enableDefaultErrorHnadler: PropTypes.bool,
      // // colAppKey: PropTypes.string.isRequired,
      // colDevBaseUrl: PropTypes.string,
      // colBaseUrl: PropTypes.string,
      // trackApi: PropTypes.bool,
      // log: PropTypes.bool,
      // collectBreadcrumbs: PropTypes.bool
    }).isRequired,
    routeConfigMap: PropTypes.object.isRequired,
    navigatorConfig: PropTypes.shape({
      // type: PropTypes.oneOf(NavigatorTypes.getTypes()),
      // config: PropTypes.object
    }),
    uriPrefix: PropTypes.string,
    // 本地保存 key 前缀
    persistKeyPrefix: PropTypes.string,
    // 是否缓存路由状态
    persistNavReducer: PropTypes.bool,
    // 加载缓存时的等待页面
    persistLoading: PropTypes.element
  
  }

  constructor (props) {
    super(props)
    const {
      routeConfigMap, navigatorConfig, config, persistKeyPrefix, persistNavReducer, onLoadingComplete
    } = props
    // props check -- start --
    assert(
      routeConfigMap !== null && routeConfigMap !== undefined,
      'routeConfigMap should not be null or undefined'
    )
    assert(
      navigatorConfig !== null && navigatorConfig !== undefined,
      'navigatorConfig should not be null or undefined'
    )
    assert(
      config !== null && config !== undefined,
      'config should not be null or undefined'
    )

    // props check -- end --

    const navigationStore = new NavigationStore()
    const navMiddleware = createReactNavigationReduxMiddleware(
      state => state.systechNavReducer,
      'root'
    )

    // store init
    const myStore = navigationStore.create({
      routeConfigMap: props.routeConfigMap,
      navigatorConfig: props.navigatorConfig,
      persistKeyPrefix,
      persistNavReducer,
      storage: props.storage
    }, navMiddleware, onLoadingComplete)
    const { store } = myStore

    // const {
    //   jsVersion, ENV, colBaseUrl,
    //   colDevBaseUrl, log = false, trackApi = true, collectBreadcrumbs = true
    // } = props.config
    // col init
    // set config
    // store.dispatch(configAction.set(props.config))
    this.state = {
      navigationStore: myStore
    }

    // loading init

    global.Loading = {
      show: (option = {}) => {
        store.dispatch(loadingAction.showLoading(option.title || ''))
        if (option.duration) {
          const timer = setTimeout(() => {
            store.dispatch(loadingAction.hideLoading())
            clearTimeout(timer)
          }, option.duration)
        }
      },
      hide: () => store.dispatch(loadingAction.hideLoading())
    }

    this.backPressTime = 0

    AppState.addEventListener('change', trackAppState)

    console.log('SystechNavigation constructor')
  }

  _getNestedRouteLength (nav) {
    const { index, routes } = nav
    if (!routes[index].routes) {
      return index
    }
    return this._getNestedRouteLength(routes[index])
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      const { store } = this.state.navigationStore
      if (store) {
        const states = store.getState()
        const { systechNavReducer } = states
        if (systechNavReducer) {
          if (this._getNestedRouteLength(systechNavReducer) < 1) {
            this.backPressTime += 1
            if (this.backPressTime >= 2) {
              BackHandler.exitApp()
            } else {
              this.showToast('再按一次退出应用')
              setTimeout(() => {
                this.backPressTime = 0
              }, 2000)
              return true
            }
          } else if (store.dispatch) {
            store.dispatch(NavigationActions.back())
            return true
          }
        }

        return true
      }
      return false
    })
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress')
    AppState.removeEventListener('change', trackAppState)
  }

  /**
   * @description 多使用一个 View 是为了兼容多个 navigation 存在于一个 App 里面的情况
   *              由于 PersistGate 的 bug 如果不包裹一个 View，当 Navigation 为子组
   *              件时可能会显示不出来
   * @author Foryoung
   * @returns
   * @memberof Entry
   */
  render () {
    const Nav = Navigation(this.state.navigationStore.Navigator)
    const { store, persistor } = this.state.navigationStore
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
          </PersistGate>
        </View>
      </Provider>
    )
  }
}
