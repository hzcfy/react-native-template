/*
 * @Author: JimmyDaddy
 * @Date: 2017-09-09 19:18:37
 * @Last Modified by: JimmyDaddy
 * @Last Modified time: 2019-11-20 14:49:45
 * @Description
 */
import React from 'react';
// import { Page } from '@sxc/react-native-page'
import {
  Animated,
  Easing,
  Image,
  Keyboard,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import connect from '../../../redux/connect';
import { TextInput, Page } from '../../components';
import { Component } from '../../../lib';

// import { styles } from '../../themes'
import { docs } from '../../config';
import { popAction, loadingAction, userAction } from '../../redux/actions';

// const { ICON_AVATAR_GREEN, ICON_BACK_GREEN } = icons

class ResetPWD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      code: '',
      phoneNumber: null,

      // code 倒计时
      showCodePage: false,
      // 验证码已发
      codeSent: false,
      // 正在发送验证码
      codeSending: false,
      // 正在校验验证码
      isVerifying: false,
      // 未验证成功
      verifed: false,
      yOffset: new Animated.Value(0)

    };

    // 键盘升起 表单上移动画
    this.animateAvatar = new Animated.Value(0);
    this.animateForm = new Animated.Value(0);

    this._listeners = null;

    this.styles = this.props.config.getStyle();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.config !== this.props.config) {
      this.styles = this.nextProps.config.getStyle();
    }
  }

  _reset = () => {
    const {
      newPassword,
      newPasswordAgain,
      passwordReseting
    } = this.state;

    // 请求未成功前 重复提交重置
    if (passwordReseting) {
      return;
    }

    if (!newPassword || !newPasswordAgain) {
      this._showPop(docs.PASSWORD_EMPTY_TIP, docs.CONFIRM);
      this.setState({
        hasReset: false
      });
      return;
    }

    if (newPassword !== newPasswordAgain) {
      this._showPop(docs.PASSWORD_NOT_EQUAL, docs.CONFIRM);

      this.setState({
        hasReset: false
      });
      return;
    }
    const { mobilePhone, token } = this.getRouteData();

    this.props.showLoading('修改中');
    this.props.reset({
      mobilePhone,
      token,
      newPassword
    }).then((data) => {
      Keyboard.dismiss();
      this.props.hideLoading();

      if (data.success) {
        this._login();
        // this._showPop(docs.RESET_SUCCESS, docs.CONFIRM, () => {
        //   this.navigator().goBack('DoorIndex')
        // })
      } else {
        this._showPop(data.errorMessage, docs.CONFIRM);
        this.setState({
          hasReset: false
        });
      }
    }).catch((err) => {
      this.props.hideLoading();
      this._showPop(err.errorMessage, docs.CONFIRM);
      this.setState({
        hasReset: true
      });
    });
  }

  _login = () => {
    this.props.showLoading('登录中');
    this.props.login({
      mobilePhone: this.getRouteData('mobilePhone'),
      password: this.state.newPassword
    }).then((data) => {
      console.log('----', data);
      this.props.hideLoading();
    }).catch((err) => {
      console.log('----', err);
      const { errorCode } = err;
      this.props.hideLoading();
      // 沉睡用户 进行手机号验证
      if (docs.SLEEP_USER_CODE === Number(errorCode)) {
        this.navigator().push('VerifyPhone', {
          mobilePhone: this.getRouteData('mobilePhone')
        });
      } else {
        this._showPop(err.errorMessage, docs.CONFIRM);
      }
    });
  }
  _showPop(title, rightContent, rightComfirm) {
    this.props.showPop({
      pop: {
        title,
        rightContent
      },
      leftConfirm: this._leftConfirm,
      rightConfirm: rightComfirm || this._rightConfirm
    });
  }

  _leftConfirm = () => {
    this.props.hidePop();
  }

  _rightConfirm = () => {
    this.props.hidePop();
  }

  _animate(value) {
    Animated.parallel([
      Animated.timing(this.animateAvatar, {
        toValue: value,
        duration: 250,
        easing: Easing.in
      }),
      Animated.timing(this.animateForm, {
        toValue: value,
        duration: 250,
        easing: Easing.in
      })
    ]).start();
  }

  _keyboardDidShow = () => {
    this._animate(1);
  }

  _keyboardDidHide = () => {
    this._animate(0);
  }

  _getAvatarMargin() {
    return this.animateAvatar.interpolate({
      inputRange: [0, 1],
      outputRange: [60, 10]
    });
  }

  _getFormMargin() {
    return this.animateAvatar.interpolate({
      inputRange: [0, 1],
      outputRange: [70, 20]
    });
  }

  componentDidMount() {
    const updateListener = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
    const resetListener = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';

    this._listeners = [
      Keyboard.addListener(updateListener, this._keyboardDidShow),
      Keyboard.addListener(resetListener, this._keyboardDidHide)
    ];
  }

  componentWillUnmount() {
    this._listeners.forEach(listener => listener.remove());
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
        onPress={backCallback}
        style={this.styles.backContainer}
      >
        <Image source={this.props.config.getIcons().ICON_BACK} style={this.styles.backIcon} />
      </TouchableOpacity>
    );
  }

  _onNewPwdChange = (newPassword) => {
    this.setState({ newPassword });
  }

  _renderNewPassword() {
    return (
      <TextInput
        placeholder={docs.NEW_PASSWORD}
        secureTextEntry={!this.state.showPassword}
        onChangeText={this._onNewPwdChange}
      />
    );
  }

  _onNewPwdAgainChange = (newPasswordAgain) => {
    this.setState({ newPasswordAgain });
  }

  _renderNewPasswordAgain() {
    return (
      <TextInput
        placeholder={docs.NEW_PASSWORD_AGAIN}
        secureTextEntry={!this.state.showPassword}
        onChangeText={this._onNewPwdAgainChange}
      />
    );
  }

  _renderResetButton() {
    return (
      <TouchableOpacity style={this.styles.submitBtn} activeOpacity={0.8} type='lg' onPress={this._reset}>
        <Text style={this.styles.submitText}>{docs.RESET_AND_LOGIN}</Text>
      </TouchableOpacity>);
  }

  _renderReset() {
    return (
      <View>
        {this._renderNewPassword()}
        {this._renderNewPasswordAgain()}
        {this._renderResetButton()}
      </View>
    );
  }

  render() {
    const pageName = this.props.pageTitle + docs.LOGIN;
    const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y: this.state.yOffset } } }]);

    return (
      <Page
        pageName={pageName}
        title={<Text style={this.styles.title}>{ docs.FORGOT_PASSWORD}</Text>}
        style={this.styles.page}
        pageLoading={false}
        leftContent={this._renderLeft()}
      >

        <ScrollView
          keyboardDismissMode='interactive'
          onScroll={onScroll}
          scrollEventThrottle={16}
        >
          <Animated.Image
            source={this.props.config.getIcons().ICON_AVATAR}
            style={[this.styles.avatar,
              {
                marginTop: this._getAvatarMargin()
              },
              {
                transform: [
                  {
                    scale: this.state.yOffset.interpolate({
                      inputRange: [0, 120],
                      outputRange: [1, 0]
                    })
                  }
                ]
              }
            ]}
          />

          <Animated.View
            style={{ marginTop: this._getFormMargin() }}
          >
            {this._renderReset()}
          </Animated.View>
        </ScrollView>
      </Page>
    );
  }
}

const setState = props => ({
  config: props.configReducer
});

const setAction = dispatch => ({
  showPop: params => dispatch(popAction.show(params)),
  hidePop: () => dispatch(popAction.hide()),
  showLoading: title => dispatch(loadingAction.showLoading(title)),
  hideLoading: () => dispatch(loadingAction.hideLoading()),
  login: params => dispatch(userAction.login(params)),
  reset: params => dispatch(userAction.reset(params))
});

export default connect(setState, setAction)(ResetPWD);
