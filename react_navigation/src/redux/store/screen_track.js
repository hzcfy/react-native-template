import Col, { TrackViewType } from '@sxc/colrn';
import { NavigationActions, StackActions } from 'react-navigation';

// gets the current screen from navigation state
function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}

const screenTracking = ({ getState }) => next => (action) => {
  if ([NavigationActions.NAVIGATE, NavigationActions.BACK,
    StackActions.PUSH, StackActions.REPLACE, StackActions.POP,
    StackActions.POP_TO_TOP, StackActions.RESET].indexOf(action.type) === -1) {
    return next(action);
  }

  const jumpType = [NavigationActions.NAVIGATE, StackActions.PUSH, StackActions.REPLACE, StackActions.RESET].indexOf(action.type) > -1 ? TrackViewType.PUSH : TrackViewType.BACK;

  const currentScreen = getCurrentRouteName(getState().sxcNavReducer);

  const result = next(action);
  const nextScreen = getCurrentRouteName(getState().sxcNavReducer);
  if (nextScreen !== currentScreen) {
    // the line below uses the Google Analytics tracker
    // change the tracker here to use other Mobile analytics SDK.
    Col.trackView({
      view: nextScreen,
      lastView: currentScreen,
      jumpType,
      feature: action.params
    });
  }
  return result;
};

export default screenTracking;
