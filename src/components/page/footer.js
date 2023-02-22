import React from 'react'
import {
  View
} from 'react-native'
import { StyleSheet } from '../theme'
import T from '../../utils'

const isIPhoneX = T.isIPhoneX()

const Footer = ({ backgroundColor }) => isIPhoneX ? (
  <View
    style={{
      height: 24,
      backgroundColor:
        typeof backgroundColor === 'string'
          ? StyleSheet.value(backgroundColor)
          : backgroundColor,
      width: '100%'
    }}
  />
) : null

export default Footer
