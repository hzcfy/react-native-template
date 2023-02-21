/*
 * @Author: JimmyDaddy
 * @Date: 2017-09-08 19:54:50
 * @Last Modified by: foryoung.cheng
 * @Last Modified time: 2022-01-12 16:36:44
 * @Description
 */
import React from 'react';
import { NativeModules } from 'react-native';

import connect from '../../../redux/connect';
import { Component } from '../../../lib';

import SxcLogin from './sxc_login';

import { theme } from '../../config';

class DoorIndex extends Component {
  componentDidMount() {
    this._cleanDiskCookie();
  }
  _cleanDiskCookie = () => {
    if (NativeModules.Networking) {
      NativeModules.Networking.clearCookies(() => {});
    }
  }
  render() {
    return (
      this._renderLogin()
    );
  }
  _renderLogin = () => {
    const { config } = this.props;
    if (config.theme === theme.SXC) {
      return (
        <SxcLogin
          {...this.props}
        />
      );
    }
    return null
  }
}
const setState = props => ({
  config: props.configReducer
});
export default connect(setState)(DoorIndex);
