import _ from 'lodash'

/**
 * 是否为空
 * null undefined '' [] {} 均为空
 * @param {*} data
 */
const isEmpty = data => {
  if (data === null || data === undefined || data === '') return true
  if (data instanceof Array) {
    return _.isEmpty(data)
  }
  // 判断空对象
  if (
    JSON.stringify(data) === '{}' ||
    `${data}` === 'undefined' ||
    `${data}` === 'null'
  ) { return true }
  return false
}
/**
 * 是否是身份证号
 * 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
 * @param {*} card
 */
const isIdCardNo = card => {
  const reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/
  return reg.test(card)
}
/**
 * 是否为手机号
 * @param {*} phone
 */
const isPhoneNumber = phone => {
  if (!Number(phone)) return false
  phone = phone && `${phone}`
  var express = /^1[3456789]\d{9}$/
  return express.test(phone)
}
/**
 * 是否是年
 * @param {*} year
 */
const isYear = year => {
  if (!Number(year)) return false
  year = Number(year)
  const date = new Date()
  if (`${year}`.length === 4 && year <= date.getFullYear()) {
    return true
  }
  return false
}
/**
 * 是否是车牌号
 * @param {*} vehicleNumber
 */
const isVehicleNumber = (vehicleNumber = '') => {
  var result = false
  if (vehicleNumber.length === 7) {
    var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
    result = express.test(vehicleNumber)
  }
  return result
}

export default {
  isEmpty,
  isIdCardNo,
  isPhoneNumber,
  isYear,
  isVehicleNumber
}
