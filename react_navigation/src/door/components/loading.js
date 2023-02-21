/**
 * @Author: jimmydaddy
 * @Date:   2017-05-18 02:23:18
 * @Email:  heyjimmygo@gmail.com
 * @Filename: loading.js
 * @Last modified by:   jimmydaddy
 * @Last modified time: 2017-08-02 03:28:41
 * @License: GNU General Public License（GPL)
 * @Copyright: ©2015-2017 www.songxiaocai.com 宋小菜 All Rights Reserved.
 *
 * @flow
 * @description Loading widget
 */

import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

import PropTypes from 'prop-types';
import SStyle from '@sxc/style';
import Col from '@sxc/colrn';

import { theme } from '../config';
import connect from '../../redux/connect';

// const defaultSource = require('./loading.gif');

const s = SStyle.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: '100%',
    height: '100%'
  },
  gif: {
    width: 45,
    height: 30
  },
  indicator: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15
  },
  text: {
    marginTop: 5,
    color: '#f0f0f0'
  }
});

class Loading extends React.Component {
  render() {
    const childrenWithProps = this.props.children && React.Children.map(this.props.children, child => React.cloneElement(
      child,
      ...this.props
    ));
    // const source = this.props.source ? this.props.source : defaultSource;
    if (this.props.loadingDoorReducer.visible) {
      // eslint-disable-next-line no-nested-ternary
      const color = this.props.config.loadingColor ?
        this.props.config.loadingColor :
        this.props.config.theme === theme.BLUE ? '#2296F3' : '#00BF00';
      return (
        <View style={[s.container, this.props.containerStyle]}>
          {childrenWithProps
          ||
            <View
              style={s.indicator}
            >
              <ActivityIndicator
                size='large'
                color={color}
              />
              <Text style={[s.text]}>{this.props.loadingDoorReducer.title || '加载中...'}</Text>
            </View>
          }
        </View>
      );
    }
    return null;
  }

  componentDidMount() {
    const { userReducer } = this.props;
    if (userReducer && userReducer.isLoggedIn) {
      const { userId } = userReducer;
      Col.identify(userId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userReducer !== nextProps.userReducer) {
      if (nextProps.userReducer.isLoggedIn && nextProps.config.onLogin) {
        nextProps.config.onLogin(nextProps.userReducer);
        const { userId } = nextProps.userReducer;
        Col.identify(userId);
      } else if (!nextProps.userReducer.isLoggedIn && nextProps.config.onLogout) {
        nextProps.config.onLogout(nextProps.userReducer);
      }
    }
  }
}

// <Image source={source} style={[s.gif, props.loadingStyle]} />

Loading.propTypes = {
  containerStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  // source: React.PropTypes.object,
  // loadingStyle: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.object]),
  visible: PropTypes.bool
};

const setState = state => ({
  loadingDoorReducer: state.loadingDoorReducer,
  config: state.configReducer,
  userReducer: state.userDoorReducer
});

export default connect(setState)(Loading);
