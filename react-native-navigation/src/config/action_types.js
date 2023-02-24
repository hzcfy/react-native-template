
import { NavigationActions, StackActions } from 'react-navigation'

const myNavigationAction = {
  ...NavigationActions,
  /**
   * navigate actions 只对 AppNavigator 适用
   */
  NAVIGATION_REPLACE: 'Navigation/REPLACE',
  NAVIGATION_RESETTO: 'Navigation/RESETTO',
  NAVIGATION_POP_TO_TOP: 'Navigation/POP_TO_TOP',
  NAVIGATION_REPLACE_PREVIOUS: 'Navigation/REPLACE_PREVIOUS',
  NAVIGATION_JUMP_BACK: 'Navigation/JUMP_BACK',
  NAVIGATION_JUMP_FORWARD: 'Navigation/JUMP_FORWARD'
}

export default {
  /**
   * global loading
   */
  SHOW_LOADING: 'show loading',
  HIDE_LOADING: 'hide loading',
  ...myNavigationAction,
  ...StackActions
}

export { myNavigationAction as NavigationActions, StackActions }
