
import { actionTypes } from '../../config'

const initialState = {
  visible: false,
  title: '验证中'
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.SHOW_LOADING: {
      const { title } = action
      return {
        visible: true,
        title
      }
    }

    case actionTypes.HIDE_LOADING:
      return {
        visible: false
      }
    default:
      return state
  }
}
