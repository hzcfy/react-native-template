
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Component } from '@cforyoung/react-native-navigation'
import { Page } from 'components'

export default class Entry extends Component {
  _onPress =() => {
    console.log('this', this)
    this.navigator().pop()
  }
  render () {
    return (
      <Page title='士腾科技'>
        <View style={{ }} >

          <TouchableOpacity
            onPress={this._onPress}
          >
            <Text>Test</Text>
          </TouchableOpacity>
        </View>
      </Page>

    )
  }
}
