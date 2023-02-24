/*
* @Author: foryoung.cheng
* @Description:
* @Date: 2023-02-21 14:55:28
 * @Last Modified by: foryoung.cheng
 * @Last Modified time: 2023-02-23 20:05:46
* @License: GNU General Public License（GPL)
* @Copyright: ©2015-2019 www.songxiaocai.com 宋小菜 All Rights Reserved.
*/

import { createSwitchNavigator } from 'react-navigation'
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createBottomTabNavigator } from 'react-navigation-tabs'
// import DoorNavigator from './door_navigator'
import AuthLoadingScreen from './auth_loading'
import { NavigatorTypes } from './constants'
import ModalContainer from './modal_container'

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
  console.log('navigatorConfig', navigatorConfig, NavigatorFunc)
  // const newRouteConfigMap =
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
    headerStyle: {
      shadowOffset: {width: 0, height: 0},
      elevation: 0
    },
    defaultNavigationOptions: {
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      // ...TransitionPresets.ModalPresentationIOS
    },
    navigationOptions: {
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }
  })
}
