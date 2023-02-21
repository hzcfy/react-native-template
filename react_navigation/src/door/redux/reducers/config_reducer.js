/*
 * @Author: JimmyDaddy
 * @Date: 2017-09-11 11:08:46
 * @Last Modified by: foryoung.cheng
 * @Last Modified time: 2022-01-14 10:52:23
 * @Description
 */
import { actionTypes, theme, host, icons } from '../../config'
import { green, blue, sxc } from '../../themes'
import { environment } from '../../../constants'

const prodHost = 'https://gateway.songxiaocai.com/'
const devHost = 'https://gateway.songxiaocai.org/'
const testHost = 'https://gateway.songxiaocai.net/'

const { ICON_AVATAR_GREEN, ICON_BACK_GREEN, ICON_AVATAR, ICON_BACK, ICON_SXC, ICON_BACK_BLACK } = icons

const initalState = {
  theme: theme.BLUE,
  appKey: '0',
  bizCode: '0',
  getStyle: () => {
    return blue
  },
  getIcons: () => {
    return {
      ICON_AVATAR: ICON_AVATAR,
      ICON_BACK: ICON_BACK
    }
  },
  getHost: () => {
    return prodHost
  },
  ENV: environment.PROD,
  onLogin: () => {

  },
  onLogout: () => {

  },
  testUsers: [],
  isSupportDingding: false
}

export default (state = initalState, action = {}) => {
  const { type, data } = action
  if (type === actionTypes.SET_CONFIG) {
    const newState = {
      ...data,
      getHost: () => {
        switch (data.ENV) {
          case environment.PROD:
            return data.prodHost || prodHost
            break;
          case environment.DEV:
            return data.devHost || devHost
            break;
          case environment.TEST:
            return data.testHost || testHost
            break;
          default:
            return data.prodHost || prodHost
            break;
        }
      },
      getStyle: () => {
        if (data.theme === theme.GREEN) {
          return green
        }
        if (data.theme === theme.SXC) {
          return sxc
        }
        return blue
      },
      getIcons: () => {
        if (data.theme === theme.GREEN) {
          return {
            ICON_AVATAR: ICON_AVATAR_GREEN,
            ICON_BACK: ICON_BACK_GREEN
          }
        }
        if (data.theme === theme.SXC) {
          return {
            ICON_AVATAR: ICON_SXC,
            ICON_BACK: ICON_BACK_BLACK
          }
        }
        return {
          ICON_AVATAR: ICON_AVATAR,
          ICON_BACK: ICON_BACK
        }
      }
    }
    return newState
  } else {
    return state
  }
}
