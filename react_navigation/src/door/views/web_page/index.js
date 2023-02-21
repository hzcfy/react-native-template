/**
 * @Author: jimmydaddy
 * @Date:   2017-05-24 02:57:42
 * @Email:  heyjimmygo@gmail.com
 * @Filename: index.js
 * @Last modified by:   jimmydaddy
 * @Last modified time: 2017-08-02 03:10:18
 * @License: GNU General Public License（GPL)
 * @Copyright: ©2015-2017 www.songxiaocai.com 宋小菜 All Rights Reserved.
 *
 *
 * @description common webview page
 */

import React from 'react';
import { View, WebView, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import SStyle from '@sxc/style';

import connect from '../../../redux/connect';
// import { Page } from '../../components';
import { Page, T } from '@sxc/cui'
import { Component } from '../../../lib';

import myPageScripts from './web';

const s = SStyle.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class WebPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uri: this.getRouteData('uri'),
      title: this.getRouteData('title'),
      jumpPageName: this.getRouteData('pageName')
    };
    this.styles = this.props.config.getStyle();
  }
  _renderLeft() {
    let whetherHideBack = false;
    let backCallback = this.navigator().pop;
    if (this.getRouteData()) {
      whetherHideBack = this.getRouteData().hideBack;
      const { back } = this.getRouteData();
      if (typeof back === 'function') {
        backCallback = back;
      }
    }
    if (whetherHideBack) {
      return null;
    }
    return (
      <TouchableOpacity
        onPress={() => backCallback()}
        style={this.styles.backContainer}
      >
        <Image source={this.props.config.getIcons().ICON_BACK} style={this.styles.backIcon} />
      </TouchableOpacity>
    );
  }
  render() {
    console.log(this.state);
    return (
      <Page
      headerStyle='light'
        title={<Text style={this.styles.title}>{this.state.title ? this.state.title : '活动详情'}</Text>}
        style={this.styles.page}
        pageLoading={false}
        leftContent={this._renderLeft()}
      >
        <WebView
          renderError={this._renderError}
          startInLoadingState
          renderLoading={this._renderLoading}
          source={{ uri: this.state.uri }}
          onMessage={this._onBridgeMessage}
          injectedJavaScript={myPageScripts}
          javaScriptEnabled
        />
      </Page>
    );
  }

  /**
   * get message
   * @method  _onBridgeMessage
   * @param   {[type]} e [description]
   * @return  {[type]} [description]
   * @author JimmyDaddy
   * @date    2017-06-01T18:30:12+080
   * @version [version]
   */
  _onBridgeMessage = (e) => {
    const { data } = e.nativeEvent;
    if (data === this.getRouteData('message')) {
      if (typeof this.getRouteData('action') === 'function') {
        this.getRouteData('action')();
      }
    } else {
      switch (data) {
      /*
        * 产品上代金券（Conpous）已经没了，这里是为保底
        * 后面可以删除Conpous，改成通用的‘刮刮卡’这个通用的名字
        */
      case 'goToGuaguale':
        this.navigator().push('Conpous', {
          pageName: 'conpous'
        });
        break;
      case 'goToLotteryGuaguale':
        this.navigator().push('Conpous', {
          pageName: 'lottery'
        });
        break;
      case 'toAlipay':
      {
        this.navigator().push('OnlineFee');
        break;
      }
      default: break;
      }
    }
  }

  /**
   * [_renderLoading description]
   * @method  _renderLoading
   * @return  {[type]} [description]
   * @author JimmyDaddy
   * @date    2017-06-01T09:47:25+080
   * @version [version]
   */
  _renderLoading() {
    return (
      <View style={s.container}>
        <ActivityIndicator
          size='large'
          color='green'
        />
        <Text fontSize='$T15' color='$N12'>加载中....</Text>
      </View>
    );
  }

  /**
   * render error state
   * @method  _renderError
   * @return  {[type]} [description]
   * @author JimmyDaddy
   * @date    2017-06-01T17:41:20+080
   * @version [version]
   */
  _renderError() {
    return (
      <View style={s.container}>
        <Text fontSize='$T15' color='$N12'>加载出错....</Text>
      </View>
    );
  }
}

const setState = props => ({
  config: props.configReducer
});


export default connect(setState)(WebPage);
