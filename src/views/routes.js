// import Main from './main'
import HomeScreen from './home'
import Test from './test'
import Scan from './scan'
import SectionsWheelPicker from './test/sectionsWheelPickerDemo'
import { CardStyleInterpolators } from 'react-navigation-stack'

// export default {
//   Home: {
//     screen: HomeScreen
//     // navigationOptions: {
//     //   cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
//     // }
//   },
//   Test: {
//     screen: Test
//     // navigationOptions: {
//     //   cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
//     // }
//   },
//   Scan: {
//     screen: Scan
//     // navigationOptions: {
//     //   cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
//     // }
//   },
//   SectionsWheelPickerDemo: {
//     screen: SectionsWheelPicker
//     // navigationOptions: {
//     //   cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
//     // }
//   }
// }

export default [
  {
    name: 'Home',
    component: HomeScreen
  },
  {
    name: 'Test',
    component: Test,
    options: {
      // headerShown: false
    }
  },
  {
    name: 'SectionsWheelPickerDemo',
    component: SectionsWheelPicker
  },
  {
    name: 'Scan',
    component: Scan
  }
]
