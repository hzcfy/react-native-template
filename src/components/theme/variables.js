import { Dimensions, StatusBar, Platform, PixelRatio } from 'react-native'
import T from '../../utils'

const $GRID = 4

const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window')

const isIPhoneX = T.isIPhoneX()

const $THIN = '100'
const $ULTRA_LIGHT = '200'
const $LIGHT = '300'
const $REGULAR = '400'
const $MEDIUM = '500'
const $SEMIBOLD = '600'
const $BOLD = '700'
const $HEAVY = '800'
const $BLACK = '900'

export default {
  $THIN,
  $ULTRA_LIGHT,
  $LIGHT,
  $REGULAR,
  $MEDIUM,
  $SEMIBOLD,
  $BOLD,
  $HEAVY,
  $BLACK,
  get $SCREEN_WIDTH () {
    return D_WIDTH
  },
  get $SCREEN_HEIGHT () {
    return D_HEIGHT
  },
  get $STATUS_BAR_HEIGHT () {
    return Platform.select({
      ios: isIPhoneX ? 44 : 20,
      android: StatusBar.currentHeight
    })
  },
  get $BORDER_WIDTH () {
    return 1 / PixelRatio.get()
  },
  get $BORDER_BOLD_WIDTH () {
    return 2 / PixelRatio.get()
  },
  $GRID
}
