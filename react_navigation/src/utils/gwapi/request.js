import axios from 'axios'
import qs from 'qs'
import { errors, actionTypes, api } from '../../config'

// const {
//   systemName, systemVersion, uuid, appVersion
// } = DeviceUtils
// import NavigationStore from '../../redux/store';

const gwApi = api.gwapi

function validFunction (func) {
  return func && typeof func === 'function'
}

function defaultHandler (msg, enableDefaultErrorHnadler) {
  if (enableDefaultErrorHnadler) {
    if (global.Toast) {
      global.Toast.show(msg)
    } else {
      window.alert(msg)
    }
  }
}

const _request = (method = 'get') => (subApi, body = {}, state, dispatch, bizCode, errorHandler) => {
  let url = state.configReducer.getHost()
  url += subApi
  const conf = {
    url,
    method,
    timeout: 30000
  }

  // 植入网关随机请求 ID
  // body.gatewayKeyId = getGatewayId()

  // 植入用户本地 sessionId
  // return getItem('localUser').then(user => {
  //   if (user && user.sessionId) {
  //     body.sessionId = user.sessionId
  //   }

  if (method === 'get') {
    conf.params = body
    // conf.params.deviceUUID = uuid
    conf.params.appKey = state.configReducer.appKey
    if (subApi.indexOf(gwApi) < 0) {
      conf.params.bizCode = bizCode || state.configReducer.bizCode
    }
  } else if (subApi.indexOf(gwApi) >= 0) {
    const encodeReqBody = {}
    Object.keys(body).forEach((k) => {
      encodeReqBody[k] = body[k] !== null && typeof body[k] === 'object' ? JSON.stringify(body[k]) : body[k]
    })
    conf.data = encodeReqBody
    // conf.data.deviceUUID = uuid
    // conf.data.appKey = state.configReducer.appKey
    // conf.data.clientSysName = systemName
    // conf.data.clientSysVersion = systemVersion
    // conf.data.clientSysVersion = systemName
    // conf.data.appVersion = appVersion
    conf.data = qs.stringify(conf.data)
  } else {
    conf.data = body
    // conf.data.deviceUUID = uuid
    // conf.data.clientSysName = systemName
    // conf.data.appKey = state.configReducer.appKey
    // conf.data.bizCode = bizCode || state.configReducer.bizCode
  }

  const configErrorHnadler = state.configReducer.errorHandler
  const { enableDefaultErrorHnadler } = state.configReducer

  return axios(url, conf)
    .then((res) => {
      if (res.status === 203) {
        if (validFunction(errorHandler)) {
          errorHandler(errors.INVALID_LOGIN)
          throw res
        } else if (validFunction(configErrorHnadler)) {
          configErrorHnadler(errors.INVALID_LOGIN)
          throw res
        }
        defaultHandler(errors.INVALID_LOGIN.msg, enableDefaultErrorHnadler)
        throw res
      } else if (res.status !== 200) {
        if (validFunction(errorHandler)) {
          errorHandler(errors.NETWORK_UNREACHABLE)
          throw res
        } else if (validFunction(configErrorHnadler)) {
          configErrorHnadler(errors.NETWORK_UNREACHABLE)
          throw res
        }
        defaultHandler(errors.NETWORK_UNREACHABLE.msg, enableDefaultErrorHnadler)
        throw res
      }
      const { data } = res
      if (!data.success && data.errorResponse) {
        if (data.errorResponse.code === 9100) {
          dispatch({ type: actionTypes.DO_LOGOUT })
        }
        if (data.errorResponse && data.errorResponse.msg) {
          if (validFunction(errorHandler)) {
            errorHandler(data.errorResponse)
            throw data
          } else if (validFunction(configErrorHnadler)) {
            configErrorHnadler(data.errorResponse)
            throw data
          }
          defaultHandler(data.errorResponse.msg, enableDefaultErrorHnadler)
          throw data
        }
        throw data
      } else {
        return data
      }
    }).catch((err) => {
      throw err
    })
  // })
}

const _get = () => (subApi, body, state, dispatch, errorHandler) => {
  let url = state.configReducer.getHost()
  url += subApi + '/' + body
  const conf = {
    url,
    method: 'get',
    timeout: 30000
  }
  const configErrorHnadler = state.configReducer.errorHandler
  const { enableDefaultErrorHnadler } = state.configReducer
  return axios(url, conf)
    .then((res) => {
      if (res.status === 203) {
        if (validFunction(errorHandler)) {
          errorHandler(errors.INVALID_LOGIN)
          throw res
        } else if (validFunction(configErrorHnadler)) {
          configErrorHnadler(errors.INVALID_LOGIN)
          throw res
        }
        defaultHandler(errors.INVALID_LOGIN.msg, enableDefaultErrorHnadler)
        throw res
      } else if (res.status !== 200) {
        if (validFunction(errorHandler)) {
          errorHandler(errors.NETWORK_UNREACHABLE)
          throw res
        } else if (validFunction(configErrorHnadler)) {
          configErrorHnadler(errors.NETWORK_UNREACHABLE)
          throw res
        }
        defaultHandler(errors.NETWORK_UNREACHABLE.msg, enableDefaultErrorHnadler)
        throw res
      }
      const { data } = res
      if (!data.success && data.errorResponse) {
        if (data.errorResponse.code === 9100) {
          dispatch({ type: actionTypes.DO_LOGOUT })
        }
        if (data.errorResponse && data.errorResponse.msg) {
          if (validFunction(errorHandler)) {
            errorHandler(data.errorResponse)
            throw data
          } else if (validFunction(configErrorHnadler)) {
            configErrorHnadler(data.errorResponse)
            throw data
          }
          defaultHandler(data.errorResponse.msg, enableDefaultErrorHnadler)
          throw data
        }
        throw data
      } else {
        return data
      }
    }).catch((err) => {
      throw err
    })
  // })
}
// let request = {}

// `get post put delete patch`.split(' ').forEach(item => {
//   request[item] = _request(item)
// })

module.exports = Object.assign({}, {
  delete: _request('delete'),
  get: _request('get'),
  patch: _request('patch'),
  post: _request('post'),
  put: _request('put'),
  smsReq: _get()
})
