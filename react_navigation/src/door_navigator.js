import { createStackNavigator } from 'react-navigation';
import routers from './door/views';


export default createStackNavigator(routers, {
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: true
  }
});
