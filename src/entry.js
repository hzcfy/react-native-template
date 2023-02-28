// import * as React from 'react'
// import { View, Text } from 'react-native'
// import NavigationContainer from './navigation/router_module'
import routes from './views/routes'

// const AppEntry = () => {
//   return (
//     <NavigationContainer routes={routes} />
//   )
// }

import * as React from 'react'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
// import NavigatorConfig from './navigator_config'
const Stack = createStackNavigator()
const AppNavigationContainer = (props = {}) => {
  const navigationRef = useNavigationContainerRef()
  console.log('AppNavigationContainer', props, navigationRef)
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
          // headerStyle: {backgroundColor: '#435562'}
        }}
      >
        {
          routes && routes.map((item, index) => {
            return (
              <Stack.Screen
                navigationRef={navigationRef}
                key={item.name}
                {...item}
              />
            )
          })
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigationContainer
