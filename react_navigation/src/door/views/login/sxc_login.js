/*
 * @Author: JimmyDaddy
 * @Date: 2017-09-08 19:54:50
 * @Last Modified by: foryoung.cheng
 * @Last Modified time: 2022-05-11 21:12:11
 * @Description
 */
import React from 'react'
// import { Page } from '@sxc/react-native-page'
import {
  View,
  Text,
  Easing,
  Animated,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native'

import connect from '../../../redux/connect'
import { TextInput, Page } from '../../components'
import { Component } from '../../../lib'

import { popAction, userAction, loadingAction } from '../../redux/actions'
import { icons, docs } from '../../config'
import _ from 'lodash'
import { Toast } from '@sxc/cui'
import Col from '@sxc/colrn'

const { ICON_DING, ICON_SXC, ICON_COOPERATION, ICON_REALIZE, ICON_SHOPPING_CART, ICON_SELECTED, ICON_UNSELECTED } = icons

const LoginTypeEnum = {
  DingTalk: 2, // 钉钉
  PhonePwd: 5, // 手机密码登录
  PhoneCode: 6 // 手机验证码登录
}

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // 配置密码是否可见
      showPassword: false,
      mobilePhone: '',
      password: null,

      // 正在登录
      isLogining: false,
      // 登录方式是否为验证码 true-验证码 false-密码登录
      isLoginInByCode: true,
      // 切换登录方式按钮是否可见
      isSwitchBtnVisible: false,
      // 已开始发送验证码
      codeSending: false,
      // 是否支持手机号登录
      showPhoneLogin: false,

      // 错误标识
      passwordError: false,
      yOffset: new Animated.Value(0),
      loginType: [LoginTypeEnum.PhoneCode],
      agreed: true
    }

    // 键盘升起 表单上移动画
    this.animateAvatar = new Animated.Value(0)
    this.animateForm = new Animated.Value(0)

    this.TEXT_INPUT_FOCUS_TIMER = -1
    this.TEXT_INPUT_TIMER = -1
    this.count = 0

    this.styles = this.props.config.getStyle()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.config !== this.props.config) {
      this.styles = nextProps.config.getStyle()
    }
  }

  _checkPhone() {
    console.log('111', this.state)
    if (!this.state.mobilePhone) {
      this._showPop(docs.PHONENUMBER_EMPTY_TIP, docs.CONFIRM)
      Col.trackEvent('collect_error', {
        scene: 1,
        data: this.state.mobilePhone
      })
      return false
    }

    const mobilePhone = this.state.mobilePhone.replace(/[^\d]/g, '').trim()
    console.log('mobilePhone', mobilePhone)
    if (!docs.PHONENUMBER_REG.test(mobilePhone)) {
      Col.trackEvent('collect_error', {
        scene: 2,
        data: mobilePhone,
        phone: this.mobilePhone,
        test: docs.PHONENUMBER_REG.test(mobilePhone),
        version: '0.4.0-beta11'
      })
      // this._showPop(docs.PHONENUMBER_INVALID, docs.CONFIRM)
      // return false
    }
    return true
  }

  _login = () => {
    if (!this.state.agreed) {
      Toast.show('请选同意用户协议')
      return null
    }
    if (!this._checkPhone()) {
      return
    }

    const { password, code } = this.state

    this.setState({
      passwordError: false
    })

    if (!this.state.isLoginInByCode && !this.state.password) {
      this._showPop(docs.PASSWORD_EMPTY_TIP, docs.CONFIRM)
      this.setState({
        passwordError: true
      })
      return
    }
    if (this.state.isLogining) {
      return
    }
    this.setState({
      isLogining: true
    })
    this.props.showLoading('登录中')
    const data = {
      mobilePhone: this.state.mobilePhone,
      password,
      smsCaptcha: code,
      loginType: this.state.isLoginInByCode ? LoginTypeEnum.PhoneCode : LoginTypeEnum.PhonePwd
    }
    if (this.state.isLoginInByCode) {
      delete data.password
    } else {
      delete data.smsCaptcha
    }
    this.props.login(data).then(() => {
      Keyboard.dismiss()
      this.props.hideLoading()
    }).catch((err) => {
      this.props.hideLoading()
      console.log('err loading', err)
      const { errorCode } = err
      this.props.hideLoading()
      // 沉睡用户 进行手机号验证 ？？？啥是沉睡客户
      if (docs.SLEEP_USER_CODE === Number(errorCode)) {
        this.navigator().push('VerifyPhone', {
          mobilePhone: this.state.mobilePhone
        })
      } else {
        this._showPop(err.errorMessage, docs.CONFIRM)
      }
      this.setState({
        isLogining: false
      })
    })
  }

  _getAppConfig = () => {
    if (this.state.isLogining) {
      return
    }

    this.setState({
      isLogining: true
    })

    // this.props.showLoading('获取登录配置中')

    this.props.getAppConfig({
      appKey: this.props.config.appKey
    }).then((res) => {
      if (res.success) {
        const { loginType = [], loginTitle = '' } = res.response || {}
        this.changeState({
          loginType,
          title: loginTitle
        }, this._setOutLogin)
        Keyboard.dismiss()
        this.props.hideLoading()
        this.setState({
          isLogining: false
        })
      }
    }).catch((err) => {
      this.props.hideLoading()
      console.log('err loading', err)
      this._showPop(err.errorMessage, docs.CONFIRM)
      this.setState({
        isLogining: false
      })
    })
  }

  _showPop(title, rightContent) {
    this.props.showPop({
      pop: {
        title,
        rightContent
      },
      leftConfirm: this._leftConfirm,
      rightConfirm: this._rightConfirm
    })
  }

  _leftConfirm = () => {
    this.props.hidePop()
  }

  _rightConfirm = () => {
    this.props.hidePop()
  }

  componentDidMount() {
    this._getAppConfig()
    this._getPhonelist()
  }

  _getPhonelist = async () => {
    try {
      const res = await this.props.getPhonelist()
      if (res.success) {
        this.changeState({
          whitelist: res.response || []
        })
      } else {
        this._showPop(res.errorMessage, docs.CONFIRM)
      }
    } catch (error) {
      this._showPop(error.errorMessage, docs.CONFIRM)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.TEXT_INPUT_FOCUS_TIMER)
    this.clickTimer && clearTimeout(this.clickTimer)
  }

  _setOutLogin = () => {
    const firstLogin = _.head(this.state.loginType)
    if (firstLogin) {
      let isLoginInByCode = false
      if (this.state.loginType.findIndex(x => x === LoginTypeEnum.PhoneCode) !== -1) {
        if (this.state.loginType.findIndex(x => x === LoginTypeEnum.PhonePwd) === -1) {
          isLoginInByCode = true
        }
        if (this.state.loginType.findIndex(x => x === LoginTypeEnum.PhoneCode) < this.state.loginType.findIndex(x => x === LoginTypeEnum.PhonePwd)) {
          isLoginInByCode = true
        }
      }
      this.changeState({
        isLoginInByCode,
        showPhoneLogin: this.state.loginType.filter(x => +x === LoginTypeEnum.PhonePwd || +x === LoginTypeEnum.PhoneCode).length > 0,
        isSwitchBtnVisible: _.includes(this.state.loginType, LoginTypeEnum.PhonePwd) && _.includes(this.state.loginType, LoginTypeEnum.PhoneCode)
      })
    }
  }

  _onCodeChange = (code) => {
    this.setState({
      isLogining: true
    })

    if (this.state.mobilePhone && code.length === 4) { // 验证码自动登录
      this.state.code = code
      this.state.isLogining = false
      this._login()
    }
  }

  _switch = () => {
    this.changeState({
      isLoginInByCode: !this.state.isLoginInByCode,
      code: null,
      password: null
    })
  }

  _onPwdChange = (password) => {
    this.changeState({ password })
  }

  _renderPasswordInput() {
    if (!this.state.isLoginInByCode) {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* <Text style={[this.styles.itemTitle, {position: 'absolute'}]}>密码</Text> */}
          <TextInput
            ref={(passwordInput) => { this.passwordInput = passwordInput }}
            secureTextEntry={!this.state.showPassword}
            onChangeText={this._onPwdChange}
            placeholder='请输入密码'
            placeholderColor=' #C2C2C2'
            style={[this.styles.textLeft]}
          />
          <TouchableOpacity
            style={{ position: 'absolute', right: 0 }}
            onPress={() => { this.setState({ showPassword: !this.state.showPassword }) }}
          >
            <Image
              source={!this.state.showPassword ? icons.ICON_PWD_SHOW : icons.ICON_PWD_HIDE}
              style={!this.state.showPassword ? this.styles.iconPwdShow : this.styles.iconPwdHide} />
          </TouchableOpacity>
        </View>
      )
    }
  }

  _onNumberChange = (mobilePhone) => {
    const { whitelist } = this.state
    if (mobilePhone && mobilePhone.length >= 11) {
      this.TEXT_INPUT_FOCUS_TIMER = setTimeout(() => {
        if (this.passwordInput.wrappedInstance) {
          this.passwordInput.wrappedInstance.focus()
        }
      }, 50)
    }
    const isWhitelistPhone = mobilePhone && mobilePhone.length >= 11 && whitelist.indexOf(mobilePhone) > -1
    this.changeState({
      mobilePhone,
      isLoginInByCode: !isWhitelistPhone,
      isSwitchBtnVisible: isWhitelistPhone
    })
    this.mobilePhone = mobilePhone
    console.log('mobilePhone', mobilePhone)
  }
  /**
   * @description render phone input
   * @author JimmyDaddy
   * @returns  element
   * @memberof Login
   */
  _renderPhoneInput() {
    return (
      <View
        style={{ flexDirection: 'row', alignItems: 'center' }}
      >
        {/* <Text style={[this.styles.itemTitle, {position: 'absolute'}]}>手机号</Text> */}
        <TextInput
          ref={(ref) => { this.mobilePhoneInput = ref }}
          onChangeText={this._onNumberChange}
          regexp={docs.PHONENUMBER_REG}
          maxLength={11}
          placeholder='请输入手机号'
          placeholderColor=' #C2C2C2'
          // style={{paddingLeft: 16}}
          keyboardType='phone-pad'
        />
      </View>

    )
  }

  _getCode = () => {
    if (!this.state.agreed) {
      Toast.show('请选同意用户协议')
      return null
    }
    this._sendCode()
  }
  /**
   * 获取验证码，开始倒计时
   */
  _sendCode = () => {
    if (!this._checkPhone()) {
      return
    }
    this.props.showLoading('正在获取验证码')
    this.props.sms(this.state.mobilePhone).then((data) => {
      this.props.hideLoading()
      if (data.success) {
        this.navigator().push('GetPhoneCode', {
          mobilePhone: this.state.mobilePhone,
          callback: this._getCodeBack,
          sendSuccess: data.success
        })
      } else {
        Toast.show('发送验证码失败，请重新发送')
      }
    }).catch((err) => {
      console.log('err', err)
      this.props.hideLoading()
      const { errorCode } = err
      errorCode === docs.USER_ERR_CODE ? this._popPhoneCheck() : Toast.show('发送验证码失败，请重新发送')
    })
  }

  _popPhoneCheck = () => {
    this.props.showPop({
      pop: {
        title: <Text style={{ fontSize: 17, color: '#212121' }}>很抱歉</Text>,
        content: <Text style={{ fontSize: 15, color: '#666', lineHeight: 24 }}>宋小菜目前仅针对部分邀请客户开放，感谢您的关注。</Text>,
        rightContent: '知道了'
      },
      rightConfirm: this.props.hidePop
    })
  }

  _renderLoginView = () => {
    return (
      <View >
        <Image style={{ width: 84, height: 84, alignSelf: 'center', marginTop: 66 }} source={ICON_SXC} />
        <View style={this.styles.contentView}>
          {this._renderPhoneInput()}

          {this._renderPasswordInput()}
          <Text style={{ fontSize: 12, color: '#9E9E9E', marginTop: 16 }}>宋小菜目前仅针对部分{<Text style={{ color: '#f78744' }}>邀请客户</Text>}开放，感谢您的关注。</Text>
          {this._renderLoginButton()}
          {
            this.state.isSwitchBtnVisible ? <TouchableOpacity onPress={this._switch} style={this.styles.changeLoginView}>
              <Text style={this.styles.changeLoginText}>{this.state.isLoginInByCode ? '密码登录' : '验证码登录'}</Text>
            </TouchableOpacity> : null
          }

        </View>
      </View>
    )
  }

  /**
   * @description renderButton
   * @author JimmyDaddy
   * @returns
   * @memberof Login
   */
  _renderLoginButton() {
    if (this.state.isLoginInByCode) {
      return (
        <TouchableOpacity
          style={[this.styles.submitBtn, this.styles.submitBtnNormal]} activeOpacity={0.8} type='lg' onPress={this._getCode}>
          <Text style={this.styles.submitText}>获取短信验证码</Text>
        </TouchableOpacity>
      )
    } else if (this.state.password && this.state.mobilePhone) {
      return (
        <TouchableOpacity style={this.styles.submitBtn} activeOpacity={0.8} type='lg' onPress={this._login}>
          <Text style={this.styles.submitText}>{docs.LOGIN}</Text>
        </TouchableOpacity>
      )
    }
    return null
  }

  render() {
    return (
      <Page
        style={this.styles.page}
        pageLoading={false}
      >

        <ScrollView
        >

          {this._renderLoginView()}
          {this._renderAgreement()}
        </ScrollView>

      </Page>
    )
  }

  _renderAgreement() {
    const { agreed } = this.state
    return (
      <View style={this.styles.agreeContainer}>
        <TouchableOpacity
          onPress={() => {
            this.setState({
              agreed: !this.state.agreed
            })
          }}>
          <Image source={agreed ? ICON_SELECTED : ICON_UNSELECTED} style={this.styles.select} />
        </TouchableOpacity>
        <Text style={{ fontSize: 14, color: '#9E9E9E' }}>我已阅读并同意</Text>
        <TouchableOpacity activeOpacity={0.6} onPress={() => this._jumpAtion(4)}>
          <Text style={{ fontSize: 14, color: '#00BF00' }}>《用户协议》</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} onPress={() => this._jumpAtion(5)}>
          <Text style={{ fontSize: 14, color: '#00BF00' }}>《隐私政策》</Text>
        </TouchableOpacity>
      </View>
    )
  }
  _jumpAtion = (type) => {
    switch (type) {
      case 4:
        this.navigator().push('WebPage', {
          title: '用户协议',
          uri: 'https://agreement.songxiaocai.com/detail/ppznpu'
        })
        break
      case 5:
        this.navigator().push('WebPage', {
          title: '隐私政策',
          uri: 'https://agreement.songxiaocai.com/detail/ml6e6a'
        })
        break
    }
  }
}

const setState = props => ({
  config: props.configReducer
})

const setAction = dispatch => ({
  hideLoading: () => dispatch(loadingAction.hideLoading()),
  hidePop: () => dispatch(popAction.hide()),
  login: params => dispatch(userAction.login(params)),
  getAppConfig: params => dispatch(userAction.getAppConfig(params)),
  showLoading: title => dispatch(loadingAction.showLoading(title)),
  showPop: params => dispatch(popAction.show(params)),
  sms: params => dispatch(userAction.sms(params)),
  getPhonelist: () => dispatch(userAction.getPhonelist())
})

export default connect(setState, setAction)(Login)
