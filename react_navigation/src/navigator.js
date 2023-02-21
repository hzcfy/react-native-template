/*
 * @Author: JimmyDaddy
 * @Date: 2018-04-23 11:32:15
 * @Last Modified by:   Liufang
 * @Last Modified Date:   2019-05-28 4:34
 * @Description
 */

import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation';
import DoorNavigator from './door_navigator';
import AuthLoadingScreen from './auth_loading';
import { NavigatorTypes } from './constants';
import ModalContainer from './modal_container';
import { forVertical } from './utils';

export default (routeConfigMap, navigatorConfig) => {
  const { type, config } = navigatorConfig;
  let NavigatorFunc = null;
  switch (type) {
  case NavigatorTypes.STACK:
    NavigatorFunc = createStackNavigator;
    break;
  case NavigatorTypes.TAB:
    NavigatorFunc = createBottomTabNavigator;
    break;
  case NavigatorTypes.DRAWER:
    NavigatorFunc = createDrawerNavigator;
    break;
  default:
    NavigatorFunc = createStackNavigator;
    break;
  }
  return createStackNavigator({
    AppMain: {
      screen: createSwitchNavigator({
        AuthLoading: {
          key: 'AuthLoading',
          screen: AuthLoadingScreen
        },
        Auth: {
          key: 'Auth',
          screen: DoorNavigator
        },
        App: {
          key: 'App',
          screen: NavigatorFunc(routeConfigMap, config)
        }
      })
    },
    SxcNavigationModal: {
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
  });
};

