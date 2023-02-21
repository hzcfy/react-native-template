/*
 * @Author: foryoung.cheng
 * @Description:  验证手机号
 * @Date: 2018-03-01 15:13:56
 * @Last Modified by: foryoung.cheng
 * @Last Modified time: 2021-12-30 14:35:07
 * @License: GNU General Public License（GPL)
 * @Copyright: ©2015-2017 www.songxiaocai.com 宋小菜 All Rights Reserved.
 */
import React from 'react';
// import { Page } from '@sxc/react-native-page'
import {
  View,
  Image,
  Text,
  Easing,
  Animated,
  Keyboard,
  Platform,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import connect from '../../../redux/connect';
import { TextInput, CountDown } from '../../components';
import { Component } from '../../../lib';
import { Page, T } from '@sxc/cui'
// import { styles } from '../../themes'
import { docs } from '../../config';
import { popAction, loadingAction, userAction } from '../../redux/actions';

// const { ICON_AVATAR_GREEN, ICON_BACK_GREEN } = icons
class VerifyPhone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 验证码已发
      codeSent: false,
      // 正在发送验证码
      codeSending: false,
      // 正在校验验证码
      isVerifying: false,
      // 未验证成功
      verifed: false,
      //
      yOffset: new Animated.Value(0)

    };

    // 键盘升起 表单上移动画
    this.animateAvatar = new Animated.Value(0);
    this.animateForm = new Animated.Value(0);

    this._listeners = null;

    this.styles = this.props.config.getStyle();

    this.codeRefs = [
      'codeRef0',
      'codeRef1',
      'codeRef2',
      'codeRef3'
    ];

    this.captchaObj = {};
  }
  componentWillMount() {
    this._sendCode();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.config !== this.props.config) {
      this.styles = this.nextProps.config.getStyle();
    }
  }

  _sendCode = () => {
    if (this.state.codeSending) {
      return;
    }
    this.setState({
      codeSending: true
    });
    this.props.showLoading('发送中');
    this.props.sms(this.getRouteData('mobilePhone')).then((data) => {
      Keyboard.dismiss();
      this.props.hideLoading();
      if (data.success === false) {
        this.setState({
          codeSending: false
        });
        this._showPop(data.errorMessage, docs.CONFIRM);
      }
    }).catch((err) => {
      this._showPop(err.errorMessage, docs.CONFIRM);
      this.props.hideLoading();
      this.setState({
        codeSending: false
      });
    });
  }

  _showPop(title, rightContent) {
    this.props.showPop({
      pop: {
        title,
        rightContent
      },
      leftConfirm: this._leftConfirm,
      rightConfirm: this._rightConfirm
    });
  }

  _login = (smsCaptcha) => {
    this.props.showLoading('验证中');

    this.props.captchaLogin({
      loginType: 6,
      mobilePhone: this.getRouteData('mobilePhone'),
      smsCaptcha
    }).then((data) => {
      Keyboard.dismiss();
      this.props.hideLoading();
    }).catch((err) => {
      console.log('----', err);
      this.props.hideLoading();
      this._showPop(err.errorMessage, docs.CONFIRM);
    });
  }

  _onCountEnd = () => {
    this.setState({
      codeSending: false
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
      outputRange: [50, 20]
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

  _renderCountDown() {
    if (this.state.codeSending) {
      return (
        <Text style={[this.styles.countText, this.styles.opacity]}>
          <Text>{docs.RESEND} (<CountDown onEnd={this._onCountEnd} seconds={60} />）</Text>
        </Text>
      );
    }
    return (
      <Text style={[this.styles.countText]} onPress={this._sendCode}>
        <Text style={this.styles.codeButton}>{docs.RESEND}</Text>
      </Text>
    );
  }


  _onCodeChange = (index, code) => {
    this.captchaObj[index] = code;
    if (code && index + 1 < this.codeRefs.length) {
      this.codeRefs[index + 1].focus();
    }
    this._checkCaptcha();
  }

  _checkCaptcha = () => {
    let captcha = '';
    for (const key in this.captchaObj) {
      if (Object.prototype.hasOwnProperty.call(this.captchaObj, key)) {
        captcha += this.captchaObj[key];
      }
    }
    if (captcha.length === 4) {
      this._login(captcha);
    }
  }
  _renderCodeInput() {
    return (
      <View style={[this.styles.row, { alignSelf: 'center', marginTop: 10, marginBottom: 10 }]}>
        <TextInput
          getRef={((ref) => { this.codeRefs[0] = ref; })}
          style={[this.styles.input, { marginRight: 10 }]}
          keyboardType='phone-pad'
          maxLength={1}
          onChangeText={code => this._onCodeChange(0, code)}
        />
        <TextInput
          getRef={((ref) => { this.codeRefs[1] = ref; })}
          style={[this.styles.input, { marginRight: 10 }]}
          keyboardType='phone-pad'
          maxLength={1}
          onChangeText={code => this._onCodeChange(1, code)}
        />
        <TextInput
          getRef={((ref) => { this.codeRefs[2] = ref; })}
          style={[this.styles.input, { marginRight: 10 }]}
          keyboardType='phone-pad'
          maxLength={1}
          onChangeText={code => this._onCodeChange(2, code)}
        />
        <TextInput
          getRef={((ref) => { this.codeRefs[3] = ref; })}
          style={this.styles.input}
          keyboardType='phone-pad'
          maxLength={1}
          onChangeText={code => this._onCodeChange(3, code)}
        />
      </View>
    );
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

  render() {
    const pageName = this.props.pageTitle + docs.LOGIN;
    const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y: this.state.yOffset } } }]);
    return (
      <Page
        title={<Text style={this.styles.title}>{ docs.PHONE_VERIFICATION}</Text>}
        leftContent={this._renderLeft()}
        headerStyle='light'
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
            {
              this._renderContent()
            }
          </Animated.View>
        </ScrollView>
      </Page>
    );
  }
  _renderContent = () => (
    <View style={{paddingHorizontal:32}} >
      <Text style={[this.styles.phoneTipFont]} >{ docs.PHONE_VERIFICATION_TIP_1 }</Text>
      <Text style={[this.styles.phoneTipFont, { marginTop: 5 }]} >{ docs.PHONE_VERIFICATION_TIP_2 }</Text>
      <Text style={[this.styles.phoneTipFont, { marginTop: 5 }]} >{ docs.PHONE_VERIFICATION_TIP_3 }</Text>
      {this._renderCodeInput()}
      {this._renderCountDown()}
    </View>
  )
}

const setState = props => ({
  config: props.configReducer
});

const setAction = dispatch => ({
  captchaLogin: params => dispatch(userAction.captchaLogin(params)),
  hideLoading: () => dispatch(loadingAction.hideLoading()),
  hidePop: () => dispatch(popAction.hide()),
  showLoading: title => dispatch(loadingAction.showLoading(title)),
  showPop: params => dispatch(popAction.show(params)),
  sms: params => dispatch(userAction.sms(params))
});

export default connect(setState, setAction)(VerifyPhone);
