/*
 * @Author: JimmyDaddy
 * @Date: 2018-10-24 11:10:24
 * @Last Modified by:   JimmyDaddy
 * @Description custom connect
 */

import { connect } from 'react-redux';
import { storeKey } from '../config';

function connectAdvanced(mapStateToProps, mapDispatchToProps, mergeProps, options) {
  return connect(mapStateToProps, mapDispatchToProps, mergeProps, {
    storeKey,
    ...options
  });
}


export default connectAdvanced;

