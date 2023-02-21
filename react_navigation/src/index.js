/*
 * @Author: JimmyDaddy
 * @Date: 2018-04-23 11:32:15
 * @Last Modified by:   Liufang
 * @Last Modified Date:   2019-05-28 4:34
 * @Description
 */
import { DeviceUtils } from '@sxc/colrn';
import ReactNavigation from 'react-navigation';
import SxcNavigation from './entry';
import * as DoorExport from './door_export';
import { Component, PureComponent } from './lib';
import NavgationStore from './redux/store';
import { NavigatorTypes, environment } from './constants';
import { NavigationActions, StackActions } from './config';
import Provider from './redux/provider';
import connect from './redux/connect';

/**
 * @description 重置当前 App 下所有路由到某个页面，该页面称为第一个页面，不会影响到 登录 和 modal
 * @attention 此 API 仅在 App 为 stack 类型才会生效
 * @param {string} routeName
 * @param {any} params
 * @param {action} action
 */
const showPage = (routeName, params, action) => {
  const { store } = NavgationStore.getNavigationStore();
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
    });
    store.dispatch(navigateAction);
  }
};

module.exports = {
  ...DoorExport,
  Component,
  DeviceUtils,
  NavgationStore,
  NavigationActions,
  NavigatorTypes,
  Provider,
  PureComponent,
  SxcNavigation,
  connect,
  environment,
  showPage,
  ...ReactNavigation
};
