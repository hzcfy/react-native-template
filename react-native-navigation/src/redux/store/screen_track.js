import { NavigationActions, StackActions } from 'react-navigation'

// gets the current screen from navigation state
function getCurrentRouteName (navigationState) {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route)
  }
  return route.routeName
}

const screenTracking = ({ getState }) => next => (action) => {
  if ([NavigationActions.NAVIGATE, NavigationActions.BACK,
    StackActions.PUSH, StackActions.REPLACE, StackActions.POP,
    StackActions.POP_TO_TOP, StackActions.RESET].indexOf(action.type) === -1) {
    return next(action)
  }

  const currentScreen = getCurrentRouteName(getState().systechNavReducer)

  const result = next(action)
  const nextScreen = getCurrentRouteName(getState().systechNavReducer)
  if (nextScreen !== currentScreen) {
  }
  return result
}

export default screenTracking
