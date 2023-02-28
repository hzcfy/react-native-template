/*
* @Author: foryoung.cheng
* @Description:
* @Date: 2023-02-27 09:17:05
 * @Last Modified by: foryoung.cheng
 * @Last Modified time: 2023-02-28 14:29:03
* @License: GNU General Public License（GPL)
* @Copyright: ©2003-2023 www.systech.com.cn 士腾 All Rights Reserved.
*/
import React, {Component} from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text, Colors, NumberInput, Toast, DateTimePicker, WheelPicker, SectionsWheelPicker, Stepper, SegmentedControl, ActionBar } from 'react-native-ui-lib'
// import { Component } from '@cforyoung/react-native-navigation'
import { Svg } from 'assets'
import { Page } from 'components'
import _ from 'lodash'
const DAYS = _.times(10, i => i)
const HOURS = _.times(24, i => i)
const MINUTES = _.times(60, i => i)

export default class Entry extends Component {
  state={}
  _onPress =() => {
    console.log('this1', this.props.navigation)
    this.setState({isVisible: true})
  }
  _jump =() => {
    console.log('this', this)
    this.props.navigation.navigate('SectionsWheelPickerDemo', {name: 'Secti1onsWheelPickerDemo'})
    // this.navigator().push('SectionsWheelPickerDemo', {name: '111'})
  }
  _jump1 =() => {
    console.log('this', this)
    this.props.navigation.navigate('Test', {name: '1121'})
    // this.navigator().push('Test', {name: '111'})
  }
   _jump2 =() => {
     console.log('this', this)
     this.props.navigation.navigate('Scan', {name: '1121'})
   }
  _onDismiss =() => {
    this.setState({isVisible: false})
  }
  render () {
    return (
      <View style={{flex: 1}} title='士腾科技'>
        <Toast
          message='士腾科技'
          visible={this.state.isVisible}
          position={'top'}
          autoDismiss={1000}
          onDismiss={this._onDismiss}
        />
        <View style={{ flex: 1, backgroundColor: '#F5FCFF', paddingTop: 100 }} >
          <TouchableOpacity
            onPress={this._jump}
          >
            <Text style={{fontSize: 22, color: '#FF69B4'}}>Jump</Text>

          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._jump1}
          >
            <Text style={{fontSize: 22, color: '#FF69B4'}}>Jump1</Text>

          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._jump2}
          >
            <Text style={{fontSize: 22, color: '#FF69B4'}}>SCAN</Text>

          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._onPress}
          >
            <Text style={{fontSize: 22, color: '#FF69B4'}}>Toast</Text>

          </TouchableOpacity>
          <Svg.SvgDemo width={100}height={100} stopColor='#FEA267' />
          <Text margin-page h1 pink>Hello World</Text>
          <Stepper />
          <NumberInput fractionDigits={3} initialValue={1506} onChangeNumber={this._onDismiss} placeholder={'Price'} />
          {/* <ActionBar
            centered
            // keepRelative
            actions={[
              {label: 'Delete', onPress: () => console.log('delete')},
              {label: 'Delete1', onPress: () => console.log('delete')},
              {label: 'Delete2', onPress: () => console.log('delete')},
              {label: 'Delete4', onPress: () => console.log('delete')},
              {label: 'Delete4', onPress: () => console.log('delete')}
            ]}
          /> */}
          {/* <DateTimePicker title={'Select time'} placeholder={'Placeholder'} mode={'date'} /> */}
          {/* <SegmentedControl segments={[{label: '1st'}, {label: '2nd'}]} /> */}
          <WheelPicker
            items={[{label: 'Yes', value: 'yes'}, {label: 'No', value: 'no'}, {label: 'Maybe', value: 'maybe'}]}
            initialValue={'yes'}
            onChange={() => console.log('changed')}
          />

        </View>
      </View>

    )
  }
}
