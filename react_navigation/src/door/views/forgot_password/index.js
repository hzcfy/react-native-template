/*
 * @Author: JimmyDaddy
 * @Date: 2017-09-09 19:18:37
 * @Last Modified by: JimmyDaddy
 * @Last Modified time: 2019-11-20 14:54:45
 * @Description
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

import { TextInput, CountDown, Page } from '../../components';
import { Component } from '../../../lib';

// import { styles } from '../../themes'
import { docs } from '../../config';
import { popAction, loadingAction, userAction } from '../../redux/actions';

// const { ICON_AVATAR_GREEN, ICON_BACK_GREEN } = icons

class ForgotPWD extends Component {
  constructor(props) {
    super(props);
    this.state = {

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.config !== this.props.config) {
      this.styles = this.nextProps.config.getStyle();
    }
  }

  _sendCode = () => {
    if (this.state.codeSending) {
      return;
    }
    if (!this._checkPhone()) {
      return;
    }

    this.setState({
      codeSending: true
    });

    this.props.showLoading('发送中');

    this.props.sms({
      mobilePhone: this.state.phoneNumber
    }).then((data) => {
      Keyboard.dismiss();
      this.props.hideLoading();

      if (data.success) {
        this.setState({
          showCodePage: true
        });
      } else {
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

  _checkPhone() {
    if (!this.state.phoneNumber) {
      this._showPop(docs.PHONENUMBER_EMPTY_TIP, docs.CONFIRM);
      return false;
    }

    const phoneNumber = this.state.phoneNumber.replace(/[^\d]/g, '').trim();

    if (!docs.PHONENUMBER_REG.test(phoneNumber)) {
      this._showPop(docs.PHONENUMBER_INVALID, docs.CONFIRM);

      return false;
    }

    return true;
  }

  _verify = () => {
    if (!this.state.code) {
      this._showPop(docs.CODE_EMPTY_TIP, docs.CONFIRM);
      this.setState({
        verifed: false
      });
      return;
    }

    this.props.showLoading('验证中');

    this.props.verify({
      mobilePhone: this.state.phoneNumber,
      captchaValue: this.state.code
    }).then((data) => {
      Keyboard.dismiss();
      this.props.hideLoading();

      if (data.success) {
        const { token } = data.result;
        this.navigator().push('Reset', {
          token,
          mobilePhone: this.state.phoneNumber
        });
        this.setState({
          verifed: true
        });
      } else {
        this._showPop(data.errorMessage, docs.CONFIRM);
        this.setState({
          verifed: false
        });
      }
    }).catch((err) => {
      this.props.hideLoading();
      this._showPop(err.errorMessage, docs.CONFIRM);
      this.setState({
        verifed: false
      });
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

  _onNumberChange = (phoneNumber) => {
    this.setState({ phoneNumber });
  }

  _renderPhoneInput() {
    return (
      <TextInput
        placeholder={docs.PHONENUMBER}
        regexp={docs.PHONENUMBER_REG}
        keyboardType='phone-pad'
        onChangeText={this._onNumberChange}
      />
    );
  }

  // _onCodeChange = (code) => {
  //   this.setState({code}, () => {
  //     if (code.length === 4) {
  //       this._verify()
  //     }
  //   })
  // }
  _onCodeChange = (index, code) => {
    this.captchaObj[index] = code;
    if (code && index + 1 < this.codeRefs.length) {
      this.codeRefs[index + 1].focus();
    }
    this._checkCaptcha();
  }

  _checkCaptcha = () => {
    let code = '';
    for (const key in this.captchaObj) {
      if (Object.prototype.hasOwnProperty.call(this.captchaObj, key)) { code += this.captchaObj[key]; }
    }
    this.setState({ code }, () => {
      if (code.length === 4) {
        this._verify();
      }
    });
    // if(code.length === 4){
    //   this._verify()
    // }
  }

  // _renderCodeInput () {
  //   return (
  //     <TextInput
  //       placeholder={docs.CODE}
  //       keyboardType={'phone-pad'}
  //       onChangeText={this._onCodeChange}
  //     />
  //   )
  // }
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
  _renderPhoneText() {
    return <Text style={this.styles.staticPhoneNumber}>{this.state.phoneNumber}</Text>;
  }

  _renderCodeButton() {
    return (
      <TouchableOpacity
        style={this.styles.submitBtn}
        activeOpacity={0.8}
        type='lg'
        onPress={this._sendCode}
      >
        <Text style={this.styles.submitText}>{docs.GET_CODE}</Text>
      </TouchableOpacity>);
  }

  _renderVeryfyButton() {
    return (
      <TouchableOpacity
        style={this.styles.submitBtn}
        activeOpacity={0.8}
        type='lg'
        onPress={this._verify}
      >
        <Text style={this.styles.submitText}>{docs.CONFIRM}</Text>
      </TouchableOpacity>
    );
  }

  _renderForget() {
    return (
      <View>
        {this._renderPhoneInput()}
        {this._renderCodeButton()}
      </View>
    );
  }

  _renderCode() {
    return (
      <View>
        {this._renderPhoneText()}
        {this._renderCodeInput()}
        {this._renderCountDown()}
      </View>
    );
  }

  _renderLeft() {
    let whetherHideBack = false;
    let backCallback = this.navigator().goBack;
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
            {
              !this.state.showCodePage
                ? this._renderForget()
                : this._renderCode()
            }
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
  hideLoading: () => dispatch(loadingAction.hideLoading()),
  hidePop: () => dispatch(popAction.hide()),
  showLoading: title => dispatch(loadingAction.showLoading(title)),
  showPop: params => dispatch(popAction.show(params)),
  sms: params => dispatch(userAction.sms(params)),
  verify: params => dispatch(userAction.verify(params))
});

export default connect(setState, setAction)(ForgotPWD);
