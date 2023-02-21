import React from 'react'
import {
  ActivityIndicator,
  View,
  StyleSheet
} from 'react-native'

import connect from './redux/connect'
import Component from './lib/component'

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

class AuthLoadingScreen extends Component {
  componentDidMount () {
    // if (this.props.configReducer.forceLogin) {
    //   if (!this.props.userReducer.isLoggedIn) {
    //     this.navigator().navigate('Auth')
    //     return
    //   }
    // }
    this.navigator().navigate('App')
  }

  render () {
    return (
      <View style={s.container}>
        <ActivityIndicator />
      </View>
    )
  }
}

const setState = state => ({
  userReducer: state.userDoorReducer
})

export default connect(setState)(AuthLoadingScreen)
