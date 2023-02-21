import React from 'react';
import {
  ActivityIndicator,
  View
} from 'react-native';
import SStyle from '@sxc/style';

import connect from './redux/connect';
import { Component } from './lib';


const s = SStyle.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

class AuthLoadingScreen extends Component {
  componentDidMount() {
    if (this.props.configReducer.forceLogin) {
      if (!this.props.userReducer.isLoggedIn) {
        this.navigator().navigate('Auth');
        return;
      }
    }
    this.navigator().navigate('App');
  }

  render() {
    return (
      <View style={s.container}>
        <ActivityIndicator />
      </View>
    );
  }
}

const setState = state => ({
  userReducer: state.userDoorReducer,
  configReducer: state.configReducer
});

export default connect(setState)(AuthLoadingScreen);
