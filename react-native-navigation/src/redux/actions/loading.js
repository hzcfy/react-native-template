/*
 * @Author: Foryoung
 * @Date: 2017-08-21 18:27:22
 * @Last Modified by: Foryoung
 * @Last Modified time: 2018-04-27 15:21:41
 *
 * @Description loading actions
 */

import { actionTypes } from '../../config'

export default {
  showLoading (title) {
    return {
      type: actionTypes.SHOW_LOADING,
      title
    }
  },
  hideLoading () {
    return { type: actionTypes.HIDE_LOADING }
  }
}
