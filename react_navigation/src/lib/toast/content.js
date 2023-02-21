/*
 * @Author: Foryoung
 * @Date: 2018-10-25 15:42:45
 * @Last Modified by:   Foryoung
 * @Description toast content
 */

import React from 'react'
import { Image, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'

import Icons from './icons'

function getImage (type) {
  switch (type) {
    case 'success':
      return Icons.SUCCESS
    case 'error':
      return Icons.ERROR
    case 'complete':
      return Icons.COMPLETE
    case 'warn':
      return Icons.WARN
    default:
      return Icons.SUCCESS
  }
}

const s = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    marginRight: 15
  },
  icon: {
    width: 30,
    height: 30
  },
  text: {
    fontSize: 15,
    color: '#fff',
    marginTop: 5
  }
})

export default ({
  type, msg, onClick, style, iconStyle, textStyle, indicatorColor
}) => (
  <TouchableOpacity
    activeOpacity={1}
    onPress={onClick}
  >
    <View
      style={[s.container, style]}
    >
      {
        type === 'loading'
          ? <ActivityIndicator
            size='large'
            color={indicatorColor || '#fff'}
          />
          : <Image resizeMode='contain' source={getImage(type)} style={[s.icon, iconStyle]} />}
      {msg ? <Text allowFontScaling={false} style={[s.text, textStyle]}>{msg}</Text> : null}
    </View>
  </TouchableOpacity>
)
