
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
      <Page>
        <View style={{ flex: 1, backgroundColor: '#F5FCFF', paddingTop: 100 }} >

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
