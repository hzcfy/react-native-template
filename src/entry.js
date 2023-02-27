/*
 * @Author: JimmyDaddy
 * @Date: 2018-07-02 15:53:39
 * @Last Modified by:   JimmyDaddy
 * @Description the entry of this application
 */

import React, {Component} from 'react'
import { View, Text } from 'react-native'
import { SystechNavigation, NavigatorTypes } from '@cforyoung/react-native-navigation'
import routes from './views/routes'
import './global_config'
export default class Entry extends Component {
  _onLoadingComplete = () => {
    console.log('onLoadingComplete')
  }
  render () {
    return (
       <SystechNavigation
        persistLoading={<View />}
        onLoadingComplete={this._onLoadingComplete}
        routeConfigMap={routes}
        config={{}}
        navigatorConfig={{
          type: NavigatorTypes.STACK,
          config: {
            headerMode: 'none',
            navigationOptions: {
              gesturesEnabled: true
            }
          }
        }}
        // persistKeyPrefix={''}
      />
    )
  }
}
