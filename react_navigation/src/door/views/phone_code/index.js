/*
 * @Author: foryoung.cheng
 * @Description:  获取验证码
 * @Date: 2018-03-01 15:13:56
 * @Last Modified by: foryoung.cheng
 * @Last Modified time: 2022-01-17 14:41:58
 * @License: GNU General Public License（GPL)
 * @Copyright: ©2015-2017 www.songxiaocai.com 宋小菜 All Rights Reserved.
 */
import React from 'react'
// import { Page } from '@sxc/react-native-page'
import {
  View,
  Image,
  Text,
  Keyboard,
  ScrollView,
  TouchableOpacity
} from 'react-native'

import connect from '../../../redux/connect'
import { TextInput, CountDown } from '../../components'
import { Component } from '../../../lib'
import { Page, T } from '@sxc/cui'
import { docs,icons } from '../../config'
import { popAction, loadingAction, userAction } from '../../redux/actions'

const WAIT_SECONDS = 60
// const VOICE_SHOW_SECONDS = 15
class VerifyPhone extends Component {
  constructor (props) {
    super(props)
    const { mobilePhone, sendSuccess } = this.getRouteData()
    this.state = {
      // 验证码已发
      codeSent: false,
      // 正在发送验证码
      codeSending: sendSuccess,
      // 正在校验验证码
      isVerifying: false,
      // 未验证成功
      verifed: false,
      // 倒计时 60s
      remainSeconds: WAIT_SECONDS,
      mobilePhone,
    }

    this.styles = this.props.config.getStyle()
  }
  componentWillMount () {
    const { sendSuccess } = this.getRouteData()
    if (sendSuccess) {
      this.timer = setInterval(() => {
        const { remainSeconds } = this.state
        if (remainSeconds > 1) {
          // const showVoiceCode = WAIT_SECONDS - remainSeconds > VOICE_SHOW_SECONDS
          this.setState({ remainSeconds: remainSeconds - 1 })
        } else {
          clearInterval(this.timer)
          this.changeState({
            codeSending: false,
            remainSeconds: WAIT_SECONDS
          })
        }
      }, 1000)
    } else {
      this._sendCode()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.config !== this.props.config) {
      this.styles = this.nextProps.config.getStyle()
    }
  }
  _showPop (title, rightContent) {
    this.props.showPop({
      pop: {
        title,
        rightContent
      },
      leftConfirm: this._leftConfirm,
      rightConfirm: this._rightConfirm
    })
  }

  _login = (smsCaptcha) => {
    this.props.showLoading('验证中')

    this.props.captchaLogin({
      loginType: 6,
      mobilePhone: this.getRouteData('mobilePhone'),
      smsCaptcha
    }).then((data) => {
      console.log('----', data)
      Keyboard.dismiss()
      this.props.hideLoading()
    }).catch((err) => {
      console.log('----', err)
      this.props.hideLoading()
      this._showPop(err.errorMessage, docs.CONFIRM)
    })
  }
  /**
   * 获取验证码，开始倒计时
   */
  _sendCode = () => {
    if (this.state.codeSending) {
      return
    }
    if (!this._checkPhone()) {
      return
    }
    this.setState({
      codeSending: true
    })
    this.timer = setInterval(() => {
      const { remainSeconds } = this.state
      if (remainSeconds > 1) {
        // const showVoiceCode = WAIT_SECONDS - remainSeconds > VOICE_SHOW_SECONDS
        this.setState({ remainSeconds: remainSeconds - 1 })
      } else {
        clearInterval(this.timer)
        this.changeState({
          codeSending: false,
          remainSeconds: WAIT_SECONDS
        })
      }
    }, 1000)
    this.props.sms(this.state.mobilePhone).then((data) => {
      this.props.hideLoading()
      if (!data.success) { // 发送失败
        return this._showPop(data.errorMessage || '验证码发送失败', docs.CONFIRM)
      }
    }).catch((err) => {
      this.props.hideLoading()
      this._showPop(err.errorMessage, docs.CONFIRM)
    })
  }

  _leftConfirm = () => {
    this.props.hidePop()
  }

  _rightConfirm = () => {
    this.props.hidePop()
  }

  componentDidMount () {
    this.codeInput&&this.codeInput.wrappedInstance&&this.codeInput.wrappedInstance.focus()
  }

  componentWillUnmount () {
  }

  _onCodeChange = (index, code) => {
    this.captchaObj[index] = code
    if (code && index + 1 < this.codeRefs.length) {
      this.codeRefs[index + 1].focus()
    }
    this._checkCaptcha()
  }

  _checkCaptcha = () => {
    let captcha = ''
    for (const key in this.captchaObj) {
      if (Object.prototype.hasOwnProperty.call(this.captchaObj, key)) {
        captcha += this.captchaObj[key]
      }
    }
    if (captcha.length === 4) {
      this._login(captcha)
    }
  }

  _renderLeft () {
    let whetherHideBack = false
    let backCallback = this.navigator().pop
    if (this.getRouteData()) {
      whetherHideBack = this.getRouteData().hideBack
      const { back } = this.getRouteData()
      if (typeof back === 'function') {
        backCallback = back
      }
    }
    if (whetherHideBack) {
      return null
    }
    return (
      <TouchableOpacity
        onPress={backCallback}
        style={this.styles.backContainer}
      >
        <Image source={this.props.config.getIcons().ICON_BACK} style={this.styles.backIcon} />
      </TouchableOpacity>
    )
  }

  render () {
    const {mobilePhone} = this.state
    const disabled = T.isEmpty(this.code)
    return (
      <Page
        headerStyle='light'
        leftContent={this._renderLeft()}
      >

        <ScrollView
          keyboardDismissMode='interactive'
          style={{backgroundColor: '#fff'}}
          scrollEventThrottle={16}
          contentContainerStyle={{paddingHorizontal: 32}}
        >
          <Text style={{fontSize: 22, color: '#212121', fontWeight: '600',marginTop:48}} >输入验证码</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 16}}>
            <Text style={{fontSize: 14, color: '#9E9E9E', marginRight: 16}} >验证码已发送至{<Text style={{fontSize: 14, color: '#666666'}}>{T.formatPhone(mobilePhone)}</Text>}</Text>

          </View>
          <View style={{flexDirection: 'row', alignItems: 'center',marginTop:36}}>
            <TextInput
              ref={(codeInput) => { this.codeInput = codeInput }}
              onChangeText={this._onCodeChange}
              placeholder='输入验证码'
              placeholderColor=' #C2C2C2'
              maxLength={4}
              keyboardType='phone-pad'
            />
            {
              !this.state.codeSending
                ? <TouchableOpacity
                  style={{borderColor: '#00BF00', borderWidth: 1, borderRadius: 4, paddingHorizontal: 8, paddingVertical: 4, position: 'absolute', right: 0}}
                  onPress={this._sendCode}>
                  <Text style={[this.styles.codeBtn,{lineHeight:20}]}>{docs.GET_CODE}</Text>
                </TouchableOpacity>
                : <View style={{borderColor: '#ededed', borderWidth: 1, borderRadius: 4, paddingHorizontal: 8, paddingVertical: 4, position: 'absolute', right: 0}}>
                  <Text style={[this.styles.resend,{lineHeight:20}]}>{docs.RESEND_CODE}({this.state.remainSeconds})</Text>
                </View>
            }
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 16}}>
            <Text style={{fontSize: 14, color: '#666'}} >收不到验证码，试试</Text>
            <TouchableOpacity
              onPress={this._getVoiceCode}
            >
              <Text style={[{fontSize: 14}, this.styles.primary]}> 语音获取?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            disabled={disabled}
            style={[this.styles.submitBtn, disabled ? this.styles.submitBtnDisabled : this.styles.submitBtnNormal]} activeOpacity={0.8} type='lg' onPress={this._getCode}>
            <Text style={this.styles.submitText}>登录</Text>
          </TouchableOpacity>
        </ScrollView>
      </Page>
    )
  }

  _checkPhone () {
    if (!this.state.mobilePhone) {
      this._showPop(docs.PHONENUMBER_EMPTY_TIP, docs.CONFIRM)

      return false
    }

    const mobilePhone = this.state.mobilePhone.replace(/[^\d]/g, '').trim()

    if (!docs.PHONENUMBER_REG.test(mobilePhone)) {
      this._showPop(docs.PHONENUMBER_INVALID, docs.CONFIRM)

      return false
    }
    return true
  }

  _onCodeChange =(value = '') => {
    if (value.length >= 4) {
      this._login(value)
    }
  }

  _getVoiceCode =() => {
    this.props.showPop({
      pop: {
        title: <Text style={{fontSize: 17, color: '#212121'}}>语音验证码</Text>,
        content: <Text style={{fontSize: 15, color: '#666', lineHeight: 24}}>我们将以电话形式告知您验证码，您可能会接到0571等开头的来电，请放心接听。</Text>,
        leftContent: '不用了',
        rightContent: '现在接听'
      },
      leftConfirm: this._leftConfirm,
      rightConfirm: this._sendVoiceCode
    })
  }
  _sendVoiceCode =() => {
    this.props.hidePop()
    this.props.voiceSms(this.state.mobilePhone).then((data) => {
      this.props.hideLoading()
      if (!data.success) { // 发送失败
        return this._showPop(data.errorMessage || '验证码发送失败', docs.CONFIRM)
      }
    }).catch((err) => {
      this.props.hideLoading()
      this._showPop(err.errorMessage, docs.CONFIRM)
    })
  }
}

const setState = props => ({
  config: props.configReducer
})

const setAction = dispatch => ({
  captchaLogin: params => dispatch(userAction.captchaLogin(params)),
  hideLoading: () => dispatch(loadingAction.hideLoading()),
  hidePop: () => dispatch(popAction.hide()),
  showLoading: title => dispatch(loadingAction.showLoading(title)),
  showPop: params => dispatch(popAction.show(params)),
  sms: params => dispatch(userAction.sms(params)),
  voiceSms: params => dispatch(userAction.voiceSms(params))
})

export default connect(setState, setAction)(VerifyPhone)
