
// import reducerWhitelist from './reducer_white_list'
import actionTypes, { NavigationActions, StackActions } from './action_types'
import api from './api'
module.exports = {
  // reducerWhitelist,
  actionTypes: {
    ...actionTypes
  },
  keyPrefix: 'SYSTECH_NAVIGATION_',
  NavigationActions,
  StackActions,
  storeKey: 'systechNavigationStore',
  api
}
