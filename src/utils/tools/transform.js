import judge from './judge'

const format = (str, normalValue = '') => {
  if (judge.isEmpty(str)) return normalValue
  return str
}
/**
 *  格式化手机号
 *  188 8888 8888
 * @param {*} phoneNumber
 */
const formatPhone = (phoneNumber) => {
  if (!judge.isPhoneNumber(phoneNumber)) return format(phoneNumber)
  return `${phoneNumber}`.slice(0, 3) + ' ' + `${phoneNumber}`.slice(3, 7) + ' ' + `${phoneNumber}`.slice(7, 11)
}
/*
  * 参数说明：
  * number：要格式化的数字
  * decimals：保留几位小数 默认 2
  * dec_point：小数点符号 默认 .
  * thousands_sep：千分位符号 默认 ,
  * roundtag:舍入参数，默认 "ceil" 向上取,"floor"向下取,"round" 四舍五入 默认 round
  *
  */
const formatNumber = (number, decimals = 2, thousandsSep = ',', roundtag = 'round') => {
  const decPoint = '.'
  number = (number + '').replace(/[^0-9+-Ee.]/g, '')
  let n = !isFinite(+number) ? 0 : +number
  let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  let s = ''
  s = (prec ? toFixedFix(n, prec, roundtag) : '' + Math.round(n)).split('.')
  var re = /(-?\d+)(\d{3})/
  if (!judge.isEmpty(thousandsSep)) {
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, '$1' + thousandsSep + '$2')
    }
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(decPoint)
}
const toFixedFix = (n, prec, roundtag) => {
  var k = Math.pow(10, prec)
  return '' + parseFloat(Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)) / k
}

const formatVehicleNumber = (vehicleNumber) => {
  if (!judge.isVehicleNumber(vehicleNumber)) return vehicleNumber
  return vehicleNumber.slice(0, 2) + '·' + vehicleNumber.slice(2, 7)
}

export default {
  format,
  formatPhone,
  formatNumber,
  formatVehicleNumber
}
