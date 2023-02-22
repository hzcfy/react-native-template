import EStyleSheet from 'react-native-extended-stylesheet'
import * as colors from './colors'
import variables from './variables'
import fontsize from './fontsize'

EStyleSheet.build({
  ...variables,
  ...colors,
  ...fontsize
})

export default EStyleSheet
