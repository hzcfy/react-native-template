// import Main from './main'
import HomeScreen from './home'
import Test from './test'
import SectionsWheelPicker from './test/sectionsWheelPickerDemo'
import { CardStyleInterpolators } from 'react-navigation-stack'

export default {
  Home: {
    screen: HomeScreen
    // navigationOptions: {
    //   cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    // }
  },
  Test: {
    screen: Test
    // navigationOptions: {
    //   cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    // }
  },
  SectionsWheelPickerDemo: {
    screen: SectionsWheelPicker
    // navigationOptions: {
    //   cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    // }
  }
}
