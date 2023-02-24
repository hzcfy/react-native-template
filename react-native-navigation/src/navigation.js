/*
* @Author: foryoung.cheng
* @Description:
* @Date: 2023-02-21 14:55:24
 * @Last Modified by: foryoung.cheng
 * @Last Modified time: 2023-02-21 15:14:22
* @License: GNU General Public License（GPL)
* @Copyright: ©2015-2019 www.songxiaocai.com 宋小菜 All Rights Reserved.
*/
import { createReduxContainer } from 'react-navigation-redux-helpers'
import connect from './redux/connect'

const mapStateToProps = state => ({
  state: state.systechNavReducer,
  dispatch: state.dispatch
})

const Navigation = Navigator => connect(mapStateToProps)(createReduxContainer(Navigator))

export default Navigation
