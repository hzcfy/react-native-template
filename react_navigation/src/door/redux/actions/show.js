/*
 * @Author: JimmyDaddy
 * @Date: 2017-09-10 18:27:22
 * @Last Modified by: JimmyDaddy
 * @Last Modified time: 2018-04-27 15:21:49
 *
 * @Description loading actions
 */

import { actionTypes } from '../../config';

export default {
  show() {
    return { type: actionTypes.SHOW_DOOR };
  },
  hide() {
    return { type: actionTypes.HIDE_DOOR };
  }
};
