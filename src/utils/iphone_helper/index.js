import { Dimensions, Platform, DeviceInfo, NativeModules } from 'react-native'

const { height: screenH, width: screenW } = Dimensions.get('window')

// iPhoneX Xs
const X_WIDTH = 375
const X_HEIGHT = 812

// iPhoneXR XsMax
const XR_WIDTH = 414
const XR_HEIGHT = 896

/**
 * 判断是否为 iphoneX 或 XsMAX 或 iphone11 等
 * @returns {boolean}
 */
const isIPhoneX = () => {
  if (Platform.OS === 'web') return false

  const { PlatformConstants = {} } = NativeModules
  const { minor = 0 } = PlatformConstants.reactNativeVersion || {}
  const { width, height } = Dimensions.get('window')
  const wh = height / width
  console.log('wh', wh)
  if (minor >= 50) {
    return DeviceInfo.isIPhoneX_deprecated || wh > 1.8
  }

  return (
    Platform.OS === 'ios' &&
    ((screenH === X_HEIGHT && screenW === X_WIDTH) || (screenH === X_WIDTH && screenW === X_HEIGHT))
  )
}

/**
 * 判断是否为 iphoneXR 或 XsMAX
 * @returns {boolean}
 */
const isIPhoneXR = () => {
  return (
    Platform.OS === 'ios' &&
    ((screenH === XR_HEIGHT && screenW === XR_WIDTH) ||
      (screenH === XR_WIDTH && screenW === XR_HEIGHT))
  )
}

export default {
  isIPhoneX,
  isIPhoneXR
}
