/*
 * @Author: foryoung.cheng
 * @Description:   时间转换工具
 * @Date: 2018-09-29 14:42:07
 * @Last Modified by: foryoung.cheng
 * @Last Modified time: 2018-11-16 10:38:37
 * @License: GNU General Public License（GPL)
 * @Copyright: ©2015-2018 www.songxiaocai.com 宋小菜 All Rights Reserved.
 */
import _ from 'lodash'

const isEmpty = (data) => {
  if (data === null || data === undefined || data === '') return true
  if (data instanceof Array) {
    return _.isEmpty(data)
  }
  if (JSON.stringify(data) === '{}') return true
  return false
}

const addZero = (num) => num < 10 ? `0${num}` : num

const replaceCallback = (fn) => (str) => fn(str.length === 1)

const transfrom = (key) => function (deleteZero) {
  return deleteZero ? this[key]() : addZero(this[key]())
}

const dateFuc = (dateArr) => {
  if (isEmpty(dateArr)) {
    dateArr = new Date().getTime()
  }
  dateArr = Number(dateArr)
  const date = isNaN(dateArr) ? dateArr.replace(/-/g, '/') : dateArr
  const dateObj = new Date(date)
  const date2 = new Date(date)

  const weekday = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const weekdaySimple = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  const properties = [
    'getFullYear',
    'getDate',
    'getHours',
    'getMinutes',
    'getSeconds'
  ]

  properties.forEach(key => {
    dateObj[key] = transfrom(key).bind(date2)
  })

  dateObj.getMonth = (deleteZero) => {
    const month = parseInt(date2.getMonth(), 10) + 1
    if (deleteZero) {
      return month
    }
    return addZero(month)
  }

  dateObj.getDayName = () => weekday[date2.getDay()]
  dateObj.getDayNameSimple = () => weekdaySimple[date2.getDay()]

  dateObj.format = function (format) {
    return format
      .replace(/Y+/i, replaceCallback(this.getFullYear))
      .replace(/M+/i, replaceCallback(this.getMonth))
      .replace(/D+/i, replaceCallback(this.getDate))
      .replace(/H+/i, replaceCallback(this.getHours))
      .replace(/I+/i, replaceCallback(this.getMinutes))
      .replace(/S+/i, replaceCallback(this.getSeconds))
  }
  dateObj.isSameDay = (dateInfoAr) => {
    let dateInfo = dateInfoAr
    if (isNaN(dateInfo)) {
      dateInfo = dateInfo.replace(/-/g, '/')
    }
    const newDate = new Date(dateInfo)
    return newDate.getDate() === dateObj.getDate()
  }
  return dateObj
}

export default dateFuc
