/*
* @Author: foryoung.cheng
* @Description:   路由管理
* @Date: 2023-02-21 15:19:35
 * @Last Modified by: foryoung.cheng
 * @Last Modified time: 2023-02-21 15:21:44
* @License: GNU General Public License（GPL)
* @Copyright: ©2015-2019 www.songxiaocai.com 宋小菜 All Rights Reserved.
*/

import _ from 'lodash'
import { actionTypes } from '../config'
/**
 * 检查目标路由是否存在与路由栈中
 * @method  routesExist
 * @param   {[type]} routes [description]
 * @param   {[type]} distinationRoute [description]
 * @return  {[type]} [description]
 * @author Foryoung
 * @date    2017-05-25T16:54:57+080
 * @version 1.0
 */
function routesExist (Navigator, state, distinationRoute) {
  const { routes } = state
  if (state && !_.isEmpty(routes)) {
    for (let i = 0; i < routes.length; i += 1) {
      if (routes[i].routeName === distinationRoute) {
        // state.index = i;
        return true
      }
      const subRoutes = routes[i].routes
      if (!_.isEmpty(subRoutes)) {
        return routesExist(routes[i], distinationRoute)
      }
    }
    return false
  }
  return false
}

function getAppNavigator (state) {
  const currentIndex = state.index
  if (currentIndex === 0 && state.routes && state.routes[currentIndex] && state.routes[currentIndex].index === 2) {
    return state.routes[currentIndex].routes[2]
  }
  return null
}

module.exports = Navigator => (state, action) => {
  let nextState
  switch (action.type) {
    case actionTypes.DO_LOGIN: {
      return Navigator.router.getStateForAction(
        actionTypes.navigate({ routeName: 'App' }),
        state
      )
    }

    case actionTypes.DO_LOGOUT: {
      return Navigator.router.getStateForAction(
        actionTypes.navigate({ routeName: 'Auth' }),
        state
      )
    }

    case actionTypes.BACK: {
      const appNavigator = getAppNavigator(state)
      // 针对 AppNavigator 做特殊处理
      if (appNavigator) {
      /**
       * 此处是在不修改源码的基础上作出的妥协
       * 源码中需要goback接收key作为路由标识，而key仅仅能获取到当前的路由的key,获取其他路由的key较为麻烦，
       * 所以其goback(key)的意思是：
       * 回往key所标识的路由后面一个路由，从某种程度上来说等价于回到上一页
       * 这对我们来说是不方便的，因此对其作微小改变
       * goback涵义有所修改，goback(name, params)即回到name这个router,params是额外参数
       * @type {[type]}
       */
        let distinationRoute = null
        let routeParams = null
        if (action.routeName) {
          distinationRoute = action.routeName
          if (action.params) {
            routeParams = action.params
          }
        } else if (action.key && action.key.routeName) {
          distinationRoute = action.key.routeName
          if (action.key.params) {
            routeParams = action.key.params
          }
        }
        if (distinationRoute) {
          let backRouteIndex = null
          const appRoutes = appNavigator.routes
          backRouteIndex = appRoutes.findIndex(route =>
            route.routeName === distinationRoute || routesExist(Navigator, route, distinationRoute))
          if (backRouteIndex > -1) {
            if (!_.isEmpty(routeParams)) {
              appRoutes[backRouteIndex].params = routeParams
            }
            const myNewState = _.cloneDeep(state)
            myNewState.routes[0].routes[2] = {
              ...state.routes[0].routes[2],
              routes: appRoutes.slice(0, backRouteIndex + 1),
              index: backRouteIndex
            }
            return myNewState
          }
        }
      }
      return Navigator.router.getStateForAction(action, state)
    }

    case actionTypes.NAVIGATION_JUMP_BACK: {
      const appNavigator = getAppNavigator(state)
      // 需在 App Navigator 里面才会生效
      if (appNavigator) {
        const appRoutes = appNavigator.routes
        const currentIndex = appNavigator.index
        if (appRoutes.length >= 2 && currentIndex > 0) {
          const myNewState = _.cloneDeep(state)
          myNewState.routes[0].routes[2] = {
            ...state.routes[0].routes[2],
            routes: appRoutes,
            index: currentIndex - 1
          }
          return myNewState
        }
      }
      return state
    }

    case actionTypes.NAVIGATION_JUMP_FORWARD: {
      const appNavigator = getAppNavigator(state)
      // 需在 App Navigator 里面才会生效
      if (appNavigator) {
        const appRoutes = appNavigator.routes
        const currentIndex = appNavigator.index
        if (appRoutes.length >= 2 && currentIndex < appRoutes.length - 1) {
          const myNewState = _.cloneDeep(state)
          myNewState.routes[0].routes[2] = {
            ...state.routes[0].routes[2],
            routes: appRoutes,
            index: currentIndex + 1
          }
          return myNewState
        }
      }
      return state
    }
    default: {
      if (Navigator) {
        nextState = Navigator.router.getStateForAction(action, state)
      }
      return nextState || state
    }
  }
}
