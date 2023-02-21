// import { DeviceUtils } from '@sxc/colrn'
import request from './request'
import { api } from '../../config'

// const deviceUUID = DeviceInfo.deviceInfo.uuid
// const systemName = DeviceUtils.osName
// const systemVersion = DeviceUtils.sysVersion
// const version = DeviceUtils.appBuild

module.exports = {
  invoke: (apiName, data = {}, configData, dispatch, errorHandler) => {
    // 网关系统参数：appKey，clientSysName，clientSysVersion，clientVersion，timestamp
    // 其中 appkey deviceUUID request底层会补充
    // Store.getState().configReducer.bizCode
    data.timestamp = new Date().getTime()
    // data.clientSysName = systemName
    // data.clientSysVersion = systemVersion
    // data.clientVersion = version
    return request.post(`${api.gwapi}/${apiName}`, data, configData, dispatch, null, errorHandler)
  }
}
