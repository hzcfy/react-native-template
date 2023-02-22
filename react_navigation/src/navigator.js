/*
* @Author: foryoung.cheng
* @Description:
* @Date: 2023-02-21 14:55:28
 * @Last Modified by: foryoung.cheng
 * @Last Modified time: 2023-02-21 18:59:59
* @License: GNU General Public License（GPL)
* @Copyright: ©2015-2019 www.songxiaocai.com 宋小菜 All Rights Reserved.
*/

import { createSwitchNavigator, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
// import DoorNavigator from './door_navigator'
import AuthLoadingScreen from './auth_loading'
import { NavigatorTypes } from './constants'
import ModalContainer from './modal_container'
import { forVertical } from './utils'

export default (routeConfigMap, navigatorConfig) => {
  const { type, config } = navigatorConfig
  let NavigatorFunc = null
  switch (type) {
    case NavigatorTypes.STACK:
      NavigatorFunc = createStackNavigator
      break
    case NavigatorTypes.TAB:
      NavigatorFunc = createBottomTabNavigator
      break
    case NavigatorTypes.DRAWER:
      NavigatorFunc = createDrawerNavigator
      break
    default:
      NavigatorFunc = createStackNavigator
      break
  }
  return createStackNavigator({
    AppMain: {
      screen: createSwitchNavigator({
        AuthLoading: {
          key: 'AuthLoading',
          screen: AuthLoadingScreen
        },
        // Auth: {
        //   key: 'Auth',
        //   screen: DoorNavigator
        // },
        App: {
          key: 'App',
          screen: NavigatorFunc(routeConfigMap, config)
        }
      })
    },
    SystechNavigationModal: {
      screen: ModalContainer
    }
  }, {
    mode: 'modal',
    headerMode: 'none',
    cardStyle: {
      backgroundColor: 'transparent',
      shadowOpacity: 0
    },
    transparentCard: true,
    transitionConfig: () => ({ screenInterpolator: forVertical })
  })
}
