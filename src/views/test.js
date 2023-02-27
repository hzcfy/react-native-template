
import React, {useState} from 'react'
import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native'

import { Component } from '@cforyoung/react-native-navigation'
import { Page } from 'components'
import CircleProgress from './circl_progress'

const Test = (props) => {
  // 开始倒计时
  const startCountdown = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: durationTime * 1000,
      easing: Easing.linear
    }).start(() => {})
  }
  const resetCountDown = () => {
    progress.stopAnimation() // 停止当前动画
    progress.setValue(0) // 重置动画值
  }
  const durationTime = 5 // 持续时间（单位：s）
  const [progress, setProgress] = useState(new Animated.Value(0)) // 倒计时动画进度
  return (
    <Page title='士腾科技'>
      <View style={{ }} >

        <TouchableOpacity
          // onPress={this._onPress}
        >
          <Text>Test</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={startCountdown}
        >
          <Text>start</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={resetCountDown}
        >
          <Text>stop</Text>
        </TouchableOpacity>
      </View>

      <CircleProgress durationTime={1225} progress={progress} />

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{ borderColor: '#e5e5e5', borderWidth: 1, height: 30, width: 100 }} />
        <View style={{ borderColor: '#e5e5e5', borderWidth: 1, height: 10, width: 10, marginLeft: 5 }} />
      </View>
    </Page>
  )
}

export default Test
