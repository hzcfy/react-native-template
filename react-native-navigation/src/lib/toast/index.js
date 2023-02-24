/*
 * @Author: Foryoung
 * @Date: 2017-08-22 14:01:19
 * @Last Modified by: foryoung.cheng
 * @Last Modified time: 2023-02-21 15:28:36
 * @Description
 */

import React from 'react'
import {Toast} from '../../components'
import Content from './content'

function getExtraOptions (myPosition = 'center', myDurations = 'short') {
  let position
  switch (myPosition) {
    case 'bottom':
      position = Toast.positions.BOTTOM
      break
    case 'center':
      position = Toast.positions.CENTER
      break
    case 'top':
      position = Toast.positions.TOP
      break
    default:
      position = Toast.positions.CENTER
  }

  let duration
  switch (myDurations) {
    case 'short':
      duration = Toast.durations.SHORT
      break
    case 'long':
      duration = Toast.durations.LONG
      break
    default:
      duration = Toast.durations.SHORT
  }

  return {
    duration,
    position
  }
}

module.exports = {
  warn (msg, myPosition, myDurations, options) {
    if (typeof msg === 'string') {
      const { duration, position } = getExtraOptions(myPosition, myDurations)
      Toast.show(
        <Content msg={msg} {...options} type='warn' />,
        {
          duration,
          position,
          shadow: true, // toast是否出现阴影
          animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
          hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
          delay: 0 // toast显示的延时
        }
      )
    }
  },
  success (msg, myPosition, myDurations, options) {
    if (typeof msg === 'string') {
      const { duration, position } = getExtraOptions(myPosition, myDurations)
      Toast.show(
        <Content msg={msg} {...options} type='success' />,
        {
          duration,
          position,
          shadow: true, // toast是否出现阴影
          animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
          hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
          delay: 0 // toast显示的延时
        }
      )
    }
  },
  complete (msg, myPosition, myDurations, options) {
    if (typeof msg === 'string') {
      const { duration, position } = getExtraOptions(myPosition, myDurations)
      Toast.show(
        <Content msg={msg} {...options} type='complete' />,
        {
          duration,
          position,
          shadow: true, // toast是否出现阴影
          animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
          hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
          delay: 0 // toast显示的延时
        }
      )
    }
  },
  error (msg, myPosition, myDurations, options) {
    if (typeof msg === 'string') {
      const { duration, position } = getExtraOptions(myPosition, myDurations)
      Toast.show(
        <Content msg={msg} {...options} type='error' />,
        {
          duration,
          position,
          shadow: true, // toast是否出现阴影
          animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
          hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
          delay: 0 // toast显示的延时
        }
      )
    }
  },
  loading (msg, myPosition, myDurations, options) {
    if (typeof msg === 'string') {
      const { duration, position } = getExtraOptions(myPosition, myDurations)
      Toast.show(
        <Content msg={msg} {...options} type='loading' />,
        {
          duration,
          position,
          shadow: true, // toast是否出现阴影
          animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
          hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
          delay: 0 // toast显示的延时
        }
      )
    }
  },
  show (msg, myPosition, myDurations) {
    const { duration, position } = getExtraOptions(myPosition, myDurations)
    Toast.show(msg, {
      duration, // toast显示时长
      position, // toast位置
      shadow: true, // toast是否出现阴影
      animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
      hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
      delay: 0 // toast显示的延时
    })
  },
  /**
   * [msg description]
   * @type {[type]}
   * @options {
   *  duration: Toast.durations.LONG, // toast显示时长
      position: Toast.positions.BOTTOM, // toast位置
      shadow: true, // toast是否出现阴影
      animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
      hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
      delay: 0, // toast显示的延时
      onShow: () => {
          // toast出现回调（动画开始时）
      },
      onShown: () => {
          // toast出现回调（动画结束时）
      },
      onHide: () => {
          // toast隐藏回调（动画开始时）
      },
      onHidden: () => {
          // toast隐藏回调（动画结束时）
      }
    * }
    */
  showWithOption (msg, options) {
    Toast.show(msg, options)
  }
}
