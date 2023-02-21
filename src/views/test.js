
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Component } from '@systech/react-native-navigation'

export default class Entry extends Component {
  _onPress =() => {
    console.log('this', this)
    this.navigator().pop()
  }
  render () {
    return (
      <View style={{ flex: 1, backgroundColor: '#F5FCFF', paddingTop: 100 }} >

        <TouchableOpacity
          onPress={this._onPress}
        >
          <Text>Test</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
