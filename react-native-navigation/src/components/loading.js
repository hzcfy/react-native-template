/*
* @Author: foryoung.cheng
* @Description:   全局 Loading
* @Date: 2023-02-21 15:12:52
* @Last Modified by:   foryoung.cheng
* @Last Modified time: 2023-02-21 15:12:52
* @License: GNU General Public License（GPL)
* @Copyright: ©2015-2019 www.songxiaocai.com 宋小菜 All Rights Reserved.
*/
import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'

const s = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: '100%',
    height: '100%'
  },
  gif: {
    width: 45,
    height: 30
  },
  indicator: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15
  },
  text: {
    marginTop: 5,
    color: 'white'
  }
})

const Loading = () => (
  <View style={s.container}>
    <View
      style={s.indicator}
    >
      <ActivityIndicator
        size='large'
        color='white'
      />
      <Text style={s.text}>loading ... </Text>
    </View>
  </View>
)

export default Loading
