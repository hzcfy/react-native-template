/*
* @Author: foryoung.cheng
* @Description:
* @Date: 2023-02-21 14:55:40
 * @Last Modified by: foryoung.cheng
 * @Last Modified time: 2023-02-21 17:21:16
* @License: GNU General Public License（GPL)
* @Copyright: ©2015-2019 www.songxiaocai.com 宋小菜 All Rights Reserved.
*/
import SystechNavigation from './entry'
import { Component, PureComponent } from './lib'
import NavgationStore from './redux/store'
import { NavigatorTypes, environment } from './constants'
import { NavigationActions, StackActions } from './config'
import Provider from './redux/provider'
import connect from './redux/connect'

/**
 * @description 重置当前 App 下所有路由到某个页面，该页面称为第一个页面，不会影响到 登录 和 modal
 * @attention 此 API 仅在 App 为 stack 类型才会生效
 * @param {string} routeName
 * @param {any} params
 * @param {action} action
 */
const showPage = (routeName, params, action) => {
  const { store } = NavgationStore.getNavigationStore()
  if (store) {
    const navigateAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'AppMain',
          action: NavigationActions.navigate({
            routeName: 'App',
            action: StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({
                  routeName,
                  params,
                  action
                })
              ]
            })
          })
        })
      ]
    })
    store.dispatch(navigateAction)
  }
}

module.exports = {
  Component,
  NavgationStore,
  NavigationActions,
  NavigatorTypes,
  Provider,
  PureComponent,
  SystechNavigation,
  connect,
  environment,
  showPage
}
