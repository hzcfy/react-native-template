/*
* @Author: foryoung.cheng
* @Description:
* @Date: 2023-02-21 14:55:24
 * @Last Modified by: foryoung.cheng
 * @Last Modified time: 2023-02-27 09:18:10
* @License: GNU General Public License（GPL)
* @Copyright: ©2003-2023 www.systech.com.cn 士腾 All Rights Reserved.  
*/
import { createReduxContainer } from 'react-navigation-redux-helpers'
import connect from './redux/connect'

const mapStateToProps = state => ({
  state: state.systechNavReducer,
  dispatch: state.dispatch
})

const Navigation = Navigator => connect(mapStateToProps)(createReduxContainer(Navigator))

export default Navigation
