/*
 * @Author: JimmyDaddy
 * @Date: 2018-10-24 11:10:38
 * @Last Modified by:   JimmyDaddy
 * @Description custom provider
 */

import { createProvider } from 'react-redux';
import { storeKey } from '../config';

export default createProvider(storeKey);
