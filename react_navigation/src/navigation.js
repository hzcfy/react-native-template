/*
 * @Author: Liufang
 * @Date: 2019-05-28 4:34
 * @Description
 */
import { createReduxContainer } from 'react-navigation-redux-helpers';
import connect from './redux/connect';

const mapStateToProps = state => ({
  state: state.sxcNavReducer,
  dispatch: state.dispatch
});

const Navigation = Navigator => connect(mapStateToProps)(createReduxContainer(Navigator));

export default Navigation;
