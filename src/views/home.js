
import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text, Colors, NumberInput, Toast, DateTimePicker, WheelPicker, Stepper, SegmentedControl, ActionBar } from 'react-native-ui-lib'
import { Component } from '@cforyoung/react-native-navigation'
import { Svg } from 'assets'
import { Page } from 'components'
export default class Entry extends Component {
  state={}
  _onPress =() => {
    console.log('this', this)
    this.setState({isVisible: true})
  }
  _jump =() => {
    console.log('this', this)
    this.navigator().push('Test', {name: '111'})
  }
  _onDismiss =() => {
    this.setState({isVisible: false})
  }
  render () {
    return (
      <Page title='士腾科技'>
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
            onPress={this._onPress}
          >
            <Text style={{fontSize: 22, color: '#FF69B4'}}>Toast</Text>

          </TouchableOpacity>
          <Svg.SvgDemo width={100}height={100} stopColor='#FEA267' />
          <Text margin-page h1 pink>Hello World</Text>
          <Stepper />

          <NumberInput fractionDigits={3} initialValue={1506} onChangeNumber={this._onDismiss} placeholder={'Price'} />
          <ActionBar
            centered
            // keepRelative
            actions={[
              {label: 'Delete', onPress: () => console.log('delete')},
              {label: 'Delete1', onPress: () => console.log('delete')},
              {label: 'Delete2', onPress: () => console.log('delete')},
              {label: 'Delete4', onPress: () => console.log('delete')},
              {label: 'Delete4', onPress: () => console.log('delete')}
            ]}
          />
          <DateTimePicker title={'Select time'} placeholder={'Placeholder'} mode={'date'} />
          <SegmentedControl segments={[{label: '1st'}, {label: '2nd'}]} />
          <WheelPicker
            items={[{label: 'Yes', value: 'yes'}, {label: 'No', value: 'no'}, {label: 'Maybe', value: 'maybe'}]}
            initialValue={'yes'}
            onChange={() => console.log('changed')}
          />

        </View>
      </Page>

    )
  }
}
