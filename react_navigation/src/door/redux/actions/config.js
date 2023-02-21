/*
 * @Author: JimmyDaddy
 * @Date: 2017-08-21 18:27:22
 * @Last Modified by: JimmyDaddy
 * @Last Modified time: 2018-04-27 15:21:35
 *
 * @Description set config actions
 */

import { actionTypes } from '../../config';

export default {
  set(data) {
    return {
      type: actionTypes.SET_CONFIG,
      data
    };
  }
};
