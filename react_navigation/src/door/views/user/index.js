import React from 'react';
import {
  Text,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';

import { Component } from '../../../lib';
import { Page } from '../../components';
import { userAction, loadingAction } from '../../redux/actions';
import connect from '../../../redux/connect';

class TestUserList extends Component {
  constructor(props) {
    super(props);

    this.styles = this.props.config.getStyle();
  }
  _renderLeft() {
    let whetherHideBack = false;
    let backCallback = this.navigator().pop;
    if (this.getRouteData()) {
      whetherHideBack = this.getRouteData().hideBack;
      const { back } = this.getRouteData();
      if (typeof back === 'function') {
        backCallback = back;
      }
    }
    if (whetherHideBack) {
      return null;
    }
    return (
      <TouchableOpacity
        onPress={() => backCallback()}
        style={this.styles.backContainer}
      >
        <Image source={this.props.config.getIcons().ICON_BACK} style={this.styles.backIcon} />
      </TouchableOpacity>
    );
  }
  _submit =(mobilePhone, password) => {
    this.props.showLoading('登录中');
    this.props.login({
      mobilePhone,
      password,
      loginType:5
    }).then(() => {
      this.props.hideLoading();
    }).catch(() => {
      this.props.hideLoading();
    });
  }
  render() {
    const { config = {} } = this.props;
    const { testUsers = {} } = config;
    return (
      <Page
        style={this.styles.page}
        title={<Text style={this.styles.title}>测试账户</Text>}
        pageLoading={false}
        leftContent={this._renderLeft()}
      >

        <ScrollView
          contentContainerStyle={{ alignItems: 'center' }}
          keyboardDismissMode='interactive'
          scrollEventThrottle={16}
        >
          {
            Object.keys(testUsers).map((e, i) => {
              const { mobilePhone, password } = testUsers[e];
              return (
                <TouchableOpacity
                  style={{ paddingTop: 5 }}
                  onPress={() => this._submit(mobilePhone, password)}
                  key={i}
                >
                  <Text fontSize='$T13' color='$N11'>{e}</Text>
                </TouchableOpacity>
              );
            })
          }
        </ScrollView>
      </Page>
    );
  }
}
const setState = props => ({
  config: props.configReducer
});
const setAction = dispatch => ({
  hideLoading: () => dispatch(loadingAction.hideLoading()),
  login: params => dispatch(userAction.login(params)),
  showLoading: title => dispatch(loadingAction.showLoading(title))
});

export default connect(setState, setAction)(TestUserList);

