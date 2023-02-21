/*
 * @Author: JimmyDaddy
 * @Date: 2018-07-02 15:53:39
 * @Last Modified by:   JimmyDaddy
 * @Description the entry of this application
 */

import React, {Component} from 'react'
import { View, Text } from 'react-native'
import { SystechNavigation, NavigatorTypes, Component as SComponent } from '../react_navigation'
import routes from './views/routes'
export default class Entry extends Component {
  _onLoadingComplete = () => {
    console.log('onLoadingComplete')
  }
  _onLogin =() => {
    console.log('_onLogin')
  }
  render () {
    console.log('this000')
    console.log('this222', SystechNavigation)
    // return (
    //   <View style={{paddingTop: 100}} >
    //     <Text>1111</Text>
    //   </View>
    // )
    return (
      <SystechNavigation
        persistLoading={<View />}
        onLoadingComplete={this._onLoadingComplete}
        routeConfigMap={routes}
        config={{
          appKey: '',
          bizCode: '',
          jsVersion: '1.0',
          devHost: 'https://gateway.songxiaocai.org', // 121.41.31.174
          testHost: 'https://gateway.songxiaocai.net',
          theme: 'green',
          forceLogin: false, // 是否需要登录
          testUsers: {},
          loadingColor: '#fff',
          onLogin: this._onLogin
        }}
        navigatorConfig={{
          type: NavigatorTypes.STACK,
          config: {
            headerMode: 'none',
            navigationOptions: {
              gesturesEnabled: true
            }
          }
        }}
        persistKeyPrefix={''}
      />
    )
  }
}
