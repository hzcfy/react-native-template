/*
* @Author: foryoung.cheng
* @Description:   Base Component 页面基础类，继承于React.Component 添加额外功能
* @Date: 2023-02-21 15:57:56
 * @Last Modified by: foryoung.cheng
 * @Last Modified time: 2023-02-21 15:58:41
* @License: GNU General Public License（GPL)
* @Copyright: ©2015-2019 www.songxiaocai.com 宋小菜 All Rights Reserved.
*/

import React from 'react'
import PropTypes from 'prop-types'
import { actionTypes, NavigationActions } from '../config'
import Toast from './toast'
import { loadingAction } from '../redux/actions/index'
import NavigationStore from '../redux/store'
import { getCurrentState } from '../utils'

// __EXIST_FLAG作为 SComponent私有对象，外部不可读写
const __EXIST_FLAG = '__EXIST_FLAG'
const __HAS_ROUTE = '__HAS_ROUTE'
// 全局缓存数据

class SComponent extends React.PureComponent {
  static propTypes = {
    navigation: PropTypes.object
  }

  constructor (props) {
    super(props)
    // 组件生命周期标识（私有！子类不可读写）（初始化为true,销毁时置为false）
    this[__EXIST_FLAG] = true
    this.debounce = true
    /**
     * 判断组件是否存在路由
     * @method __HAS_ROUTE(私有，外部不可调用)
     * @return {Boolean} [description]
     * @author kkt
     * @date   2016-01-25
     */
    this[__HAS_ROUTE] = () => {
      if (!this.props.navigation) {
        console.error('this.props.navigation is undefined')
      }
    }

    // 保存路由信息(如果在路由中传递变量、方法，则都会保存在这个map中, 通过setRouteData和getRouteData)进行修改
    this.__ROUTE_DATA = {}
  }

  componentWillUnmount () {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.release()
  }

  /**
   * 代替 this.refs
   * 原生写法 :   this.refs.scrollview.scrollResponderScrollTo(0, 100);
   * 替换写法 :   this.getRef('scrollview')('scrollResponderScrollTo')(0, 100);
   * 子类中应使用这个方法代替 this.refs 避免异步操作时组件销毁报错
   * @method getRef
   * @param  refName: string
   * @return function
   * @author kkt
   * @date   2016-01-25
   */
  getRef (refName) {
    /**
     * @param  funcName     ref需要执行的方法名，如 this.refs.scrollview.scrollResponderScrollTo中的scrollResponderScrollTo
     * @return function
     */
    return (funcName) => {
      const _this = this
      return (...args) => {
        if (_this[__EXIST_FLAG]) {
          return _this.refs[refName][funcName](...args)
        }
        return null
      }
    }
  }

  /**
 * 获取路由中带来的数据
 * @method getRouteData
 * @param  routeDataKeyName:string
 * @author kkt
 * @date   2016-01-25
 */
  getRouteData (routeDataKeyName) {
    this[__HAS_ROUTE]()
    if (this.props.navigation.state.params) {
      if (routeDataKeyName) {
        return this.props.navigation.state.params[routeDataKeyName]
      }
      return this.props.navigation.state.params
    } else if (routeDataKeyName) {
      return null
    }
    return {}
  }

  /**
   * @description get screenProps
   * @author JimmyDaddy
   * @param {any} propsName
   * @returns
   * @memberof SComponent
   */
  getScreenProps (propsName) {
    if (this.props.screenProps) {
      if (propsName) {
        return this.props.screenProps[propsName]
      }
      return this.props.screenProps
    }
    return {}
  }

  /**
   * 将组件 生命周期标识 置为false
   * 在 componentWillUnmount时自动调用
   * 如果子类中重写了 componentWillUnmount方法，则需要手动调用
   * @method release
   * @author kkt
   * @date   2016-01-25
   */
  release () {
    this[__EXIST_FLAG] = false
  }

  /**
   * 代替this.setState
   * 子类中应使用这个方法代替 this.setState， 避免异步操作时组件销毁，依然执行了 this.setState而报错
   * @method changeState
   * @author kkt
   * @date   2016-01-25
   */
  changeState (...args) {
    if (this[__EXIST_FLAG]) {
      this.setState(...args)
    }
  }

  /**
   * the navigator functions
   * @method  navigator
   * @return  {[type]} [description]
   * @author JimmyDaddy
   * @date    2017-06-12T11:58:07+080
   * @version [version]
   */
  navigator = () => {
    this[__HAS_ROUTE]()
    return {
      ...this.props.navigation,
      pop: (number) => {
        if (this.debounce) {
          this.debounce = false
          if (number && typeof number === 'number') {
            this.props.navigation.pop(number)
          } else {
            this.props.navigation.pop()
          }
          setTimeout(() => {
            this.debounce = true
          }, 200)
        }
      },
      /**
       * 前进到某个场景
       * @method  popToRoute
       * @param   {string} routeName 路由配置中存在的场景
       * @param   {Object} params 传递参数，该参数应用于子页面
       * @return  {[type]} [description]
       * @author JimmyDaddy
       * @date    2017-07-13T10:51:18+080
       * @version [version]
       */
      push: (routeName, params, actions) => {
        if (this.debounce) {
          this.debounce = false
          this.props.navigation.navigate(routeName, params, actions)
          setTimeout(() => {
            this.debounce = true
          }, 200)
        }
      },
      /**
       * 跳转到某个页面(不建议使用这个方法)
       * @method  jumpTo
       * @param   {[type]} routeName [description]
       * @param   {[type]} params [description]
       * @param   {array} actions
       * @return  {[type]} [description]
       * @author JimmyDaddy
       * @date    2017-07-14T17:06:35+080
       * @version [version]
       */
      jumpTo: (routeName, params, actions) => {
        if (this.debounce) {
          this.debounce = false
          this.props.navigation.navigate(routeName, params, actions)
          setTimeout(() => {
            this.debounce = true
          }, 200)
        }
      },
      /**
       * 返回到某个页面
       * @method  goBack
       * @param   {[type]} routeName [description]
       * @param   {[type]} params [description]
       * @return  {[type]} [description]
       * @author JimmyDaddy
       * @date    2017-07-14T17:06:35+080
       * @version [version]
       */
      goBack: (routeName, params) => {
        if (this.debounce) {
          this.debounce = false
          if (routeName && typeof routeName === 'string') {
            this.props.navigation.goBack({ routeName, params })
          } else {
            this.props.navigation.goBack()
          }
          setTimeout(() => {
            this.debounce = true
          }, 200)
        }
      },
      /**
       * 切换到某个tab的子页面（去往某个Tab的子页面一定使用这个方法，切忌使用push等方法直接去往该子页面）
       * @method  pushToTab
       * @param   {string} tab Tab名字
       * @param   {string} tabName 子页面名字
       * @param   {Object} params 传递参数，该参数应用于子页面
       * @return  {[type]} [description]
       * @author JimmyDaddy
       * @date    2017-07-13T10:51:18+080
       * @version [version]
       */
      pushToTab: (tab, tabName, params) => {
        this.props.navigation.navigate(tab)
        if (tabName) {
          const ti = setTimeout(() => {
            clearTimeout(ti)
            this.props.navigation.navigate(tabName, params)
          }, 10)
        }
      },
      /**
       * 返回到某个之前的场景
       * @method  popToRoute
       * @param   {string} routeName 存在于栈中的route（一定要存在于栈中）
       * @param   {Object} params 传递参数，该参数应用于子页面
       * @return  {[type]} [description]
       * @author JimmyDaddy
       * @date    2017-07-13T10:51:18+080
       * @version [version]
       */
      popToRoute: (routeName, params) => this.props.navigation.goBack({ routeName, params }),
      /**
       * 得到当前路由状态
       * @method  getCurrentRoute
       * @return  {[type]} [description]
       * @author JimmyDaddy
       * @date    2017-07-13T10:51:18+080
       * @version [version]
       */
      getCurrentRoute: () => this.props.navigation.state,
      /**
       * 替换当前场景为指定场景
       * @method  replace
       * @param   {string} routeName 路由配置中存在的场景
       * @param   {Object} params 传递参数，该参数应用于子页面
       * @return  {[type]} [description]
       * @author JimmyDaddy
       * @date    2017-08-23T22:51:18+080
       * @version [version]
       */
      replace: (routeName, params) => {
        const replaceAction = {
          type: actionTypes.REPLACE,
          routeName,
          params
        }
        this.props.navigation.dispatch(replaceAction)
      },
      /**
       * 重置整个路由栈，将其置空，并设定routeName为第一个场景
       * @method  replace
       * @param   {string} routeName 路由配置中存在的场景
       * @param   {Object} params 传递参数
       * @return  {[type]} [description]
       * @author JimmyDaddy
       * @date    2017-08-23T22:51:18+080
       * @version [version]
       */
      resetTo: (routeName, params) => {
        const resetToAction = actionTypes.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: 'AppMain',
              action: NavigationActions.navigate({ routeName, params })
            })
          ]
        })
        this.props.navigation.dispatch(resetToAction)
      },
      /**
       * 替换当前场景的前一个场景
       * @method  replacePrevious
       * @param   {string} routeName 路由配置中存在的场景
       * @param   {Object} params 传递参数
       * @return  {[type]} [description]
       * @author JimmyDaddy
       * @date    2017-08-24T10:33:18+080
       * @version [version]
       */
      replacePrevious: (routeName, params) => {
        const replacePreviousAction = {
          type: actionTypes.NAVIGATION_REPLACE_PREVIOUS,
          routeName,
          params
        }
        this.props.navigation.dispatch(replacePreviousAction)
      },
      /**
       * 回到之前的场景，但会保留当前场景，可使用jumpForward跳转回来
       * @method  jumpBack
       * @return  {[type]} [description]
       * @author JimmyDaddy
       * @date    2017-08-24T11:33:18+080
       * @version [version]
       */
      jumpBack: () => {
        const jumpBackAction = {
          type: actionTypes.NAVIGATION_JUMP_BACK
        }
        this.props.navigation.dispatch(jumpBackAction)
      },
      /**
       * 回到后一个场景，但会保留当前场景，可使用jumpBack跳转回来
       * @method  jumpBack
       * @return  {[type]} [description]
       * @author JimmyDaddy
       * @date    2017-08-24T11:33:18+080
       * @version [version]
       */
      jumpForward: () => {
        const jumpForwardAction = {
          type: actionTypes.NAVIGATION_JUMP_FORWARD
        }
        this.props.navigation.dispatch(jumpForwardAction)
      }
    }
  }

  /**
   * reset all navigation data
   * @method  resetRouteData
   * @param   {[type]} routeData [description]
   * @author JimmyDaddy
   * @date    2017-06-12T11:58:16+080
   * @version [version]
   */
  resetRouteData = (routeData) => {
    this[__HAS_ROUTE]()
    this.props.navigation.setParams(routeData)
  }

  showToast = (msg, position, durations) => {
    Toast.show(msg, position, durations)
  }

  get Toast () {
    return Toast
  }

  showLoading = (options = {}) => {
    if (this.props.navigation) {
      this.props.navigation.dispatch(loadingAction.showLoading(options.title || ''))
      if (options.duration) {
        const timer = setTimeout(() => {
          this.hideLoading()
          clearTimeout(timer)
        }, options.duration)
      }
    } else {
      console.warn('this.props.navigation is undefined')
    }
  }

  hideLoading = () => {
    if (this.props.navigation) {
      this.props.navigation.dispatch(loadingAction.hideLoading())
    } else {
      console.warn('this.props.navigation is undefined')
    }
  }

  showModal = ({
    onContainerClick, containerStyle, modalContent, tapToDismiss
  }) => {
    this.navigator().navigate('SxcNavigationModal', {
      onContainerClick,
      containerStyle,
      modalContent,
      tapToDismiss
    })
  }

  dismissModal = () => {
    const { store } = NavigationStore.getNavigationStore()
    const state = store.getState()
    if (state) {
      const { sxcNavReducer } = state
      const currentRoute = getCurrentState(sxcNavReducer)
      if (currentRoute) {
        const { routeName } = currentRoute
        if (routeName === 'SxcNavigationModal') {
          store.dispatch(NavigationActions.back())
        }
      } else {
        console.warn('current route is not a modal')
      }
    }
  }
}

SComponent.defaultProps = {
  navigation: null
}

export default SComponent
