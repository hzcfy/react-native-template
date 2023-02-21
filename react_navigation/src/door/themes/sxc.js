/*
 * @Author: scott
 * @Date: 2017-09-08 19:41:51
 * @Last Modified by: foryoung.cheng
 * @Last Modified time: 2022-01-12 13:41:50
 * @Description
 */

import { create } from '@sxc/style'

const black = '#020915'
const red = '#ff5f57'
const grey = '#EEEEEE'

module.exports = create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%'
  },

  page: {
    backgroundColor: '#fff'
  },

  title: {
    marginTop: 28,
    fontWeight: '900',
    fontSize: 22
  },

  section: {
    marginTop: 70
  },

  avatarBox: {
    marginTop: 60
  },

  avatar: {
    alignSelf: 'center',
    width: 110,
    height: 110,
    borderRadius: 55
  },

  phoneNumber: {
    flex: 1,
    // width: '100%',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: grey,
    alignSelf: 'center',
    color: black,
    fontSize: 18
  },

  password: {
    width: 200,
    height: 60,
    borderBottomWidth: 2,
    borderBottomColor: grey,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 15,
    color: black
  },

  inputFocus: {
    borderBottomColor: '#00BF00',
    color: black
  },

  countText: {
    marginTop: 15,
    textAlign: 'center',
    color: black
  },

  opacity: {
    opacity: 0.54
  },

  inputError: {
    color: red,
    borderBottomColor: red
  },

  staticPhoneNumber: {
    fontSize: 16,
    alignSelf: 'center',
    textAlign: 'center',
    color: '#021D33'
  },

  code: {
    width: 120,
    height: 28,
    fontSize: 28,
    marginTop: 20,
    textAlign: 'center',
    letterSpacing: 10,
    borderBottomColor: grey,
    borderBottomWidth: 1,
    alignSelf: 'center',
    color: black
  },

  codeButton: {
    height: 16,
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#00BF00'
  },

  submitBtn: {
    width: '100%',
    height: 44,
    borderRadius: 4,
    marginTop: 32,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#00BF00'
  },
  submitBtnNormal: {
    backgroundColor: '#00BF00'
  },
  submitBtnDisabled: {
    backgroundColor: '#a6edca'
  },

  submitText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center'
  },

  passwordTip: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    fontSize: 18,
    padding: 5,
    textAlign: 'center',
    marginTop: 120,
    color: '#00BF00',
    backgroundColor: 'transparent'
  },

  backIcon: {
    width: 10,
    height: 20
  },
  backContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 14,
    width: 50,
    paddingLeft: 10
  },
  input: {
    width: 48,
    height: 48,
    fontSize: 17,
    textAlign:'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  bottom: {
    alignSelf: 'center',
    marginBottom: 25
  },

  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 32,
    marginTop: 13
  },
  title: {
    fontSize: 22,
    color: '#666666',
    fontWeight: '$Med'
  },
  titleBold: {
    fontSize: 22,
    color: black,
    marginLeft: 3,
    fontWeight: '$Med'
  },
  contentView: {
    marginLeft: 32,
    marginRight: 32,
    flexDirection: 'column',
    marginTop: 72,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  changeLoginText: {
    color: '#666666',
    fontSize: '$T14'
  },
  changeLoginView: {
    width: '100%',
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  otherLoginView: {
    marginTop: 67,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  otherLoginText: {
    color: '$N11',
    fontSize: '$T12',
    textAlign: 'center'
  },
  otherLoginIcon: {
    flex: 1,
    width: 198,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 24
  },
  otherLoginImage: {
    width: 36,
    height: 36
  },
  authButton: {
    backgroundColor: '#00BF00',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 32,
    marginRight: 32,
    height: 44,
    borderRadius: 22
  },
  phoneButton: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 32,
    marginRight: 32,
    height: 44,
    borderRadius: 22,
    borderColor: '#00BF00',
    borderWidth: 1,
    marginTop: 24
  },
  selectLoginTypeView: {
    alignSelf: 'center'
  },
  selectLoginTypeViewText: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 18,
    color: '#666666'
  },
  loginTypeView: {
    marginTop: 72
  },
  loginTypeTextOther: {
    color: '#ffffff',
    fontSize: 17
  },
  loginTypeTextPhone: {
    color: '#00BF00',
    fontSize: 17
  },
  codeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    width: '100%'
  },
  codeInput: {
    borderBottomWidth: 0,
    width: 185
  },
  codeBtn: {
    fontSize: 14,
    color: '#00BF00',
    fontWeight: '500'
  },
  resend: {
    fontSize: 14,
    color: '#9E9E9E'
  },
  itemTitle: {
    width: 66,
    color: '#9e9e9e',
    fontSize: 18
  },
  iconPwdHide: {
    width: 18,
    height: 9
  },
  iconPwdShow: {
    width: 20,
    height: 13
  },
  primary:{
    color: '#00BF00',
  },
  phoneTipFont: {
    fontSize: 15,
    color: '$N10',
    textAlign: 'center'
  },
  select: {
    marginRight: 8,
    width: 16,
    height: 16
  },
  agreeContainer: {
    marginTop:24,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
  }
})
