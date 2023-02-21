/*
 * @Author: JimmyDaddy
 * @Date: 2017-08-21 18:27:22
 * @Last Modified by: JimmyDaddy
 * @Last Modified time: 2018-04-27 15:21:45
 *
 * @Description pop actions
 */

import { actionTypes } from '../../config';

export default {
  show(data) {
    return {
      type: actionTypes.SHOW_POP,
      data
    };
  },
  hide() {
    return { type: actionTypes.HIDE_POP };
  }
};
