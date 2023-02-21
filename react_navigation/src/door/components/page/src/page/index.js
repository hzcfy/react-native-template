/*
 * @Author: JimmyDaddy
 * @Date: 2017-08-22 16:58:58
 * @Last Modified by: JimmyDaddy
 * @Last Modified time: 2018-04-27 17:53:24
 * @Description page
 */
import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import SStyle from '@sxc/style';
import PropTypes from 'prop-types';
import Header from '../header';

const s = SStyle.create({
  container: {
    flex: 1,
    backgroundColor: '$N6'
  },
  content: {
    flex: 1,
    flexDirection: 'column'
  },
  loadingContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1
  },
  img: {
    width: Dimensions.get('window').width * 0.3,
    height: (168 * 220) / Dimensions.get('window').width
  }
});

class MyPage extends React.Component {
  static propTypes = {
    // 是否加载中
    pageLoading: PropTypes.bool,
    // 是否加载出错
    error: PropTypes.bool,
    // title
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    // 后退
    back: PropTypes.func,
    // 左边显示内容
    leftContent: PropTypes.any,
    // 右边内容
    rightContent: PropTypes.any,
    // 是否隐藏header
    hideHeader: PropTypes.bool,
    // 主题色
    themeColor: PropTypes.string,
    // 自定义加载中提示
    pageLoadingContent: PropTypes.element,
    // 自定义加载错误提示
    errorContent: PropTypes.element,
    // header 自定义header
    header: PropTypes.element
  }

  render() {
    return (
      <View style={[s.container, this.props.style]}>
        {this._renderHeader()}
        {this._renderContent()}
      </View>
    );
  }

  /**
   * @description render header for page
   * @author JimmyDaddy
   * @returns  element
   * @memberof Page
   */
  _renderHeader() {
    if (!this.props.hideHeader) {
      return (
        <Header {...this.props} />
      );
    }
    if (this.props.header) {
      return this.props.header;
    }
    return null;
  }

  /**
   * @description render content
   * @author JimmyDaddy
   * @returns  element
   * @memberof Page
   */
  _renderContent() {
    if (this.props.pageLoading) {
      if (this.props.pageLoadingContent && typeof this.props.pageLoadingContent === 'function') {
        return this.props.pageLoadingContent;
      }
      return (
        <View style={s.loadingContent}>
          <Image source={require('../asset/page_loading.png')} style={s.img} resizeMode='contain' />
        </View>
      );
    }
    if (this.props.error) {
      if (this.props.error && typeof this.props.error === 'function') {
        return this.props.error;
      }
      return (
        <View style={s.loadingContent}>
          <Image source={require('../asset/error.png')} style={s.img} resizeMode='contain' />
        </View>
      );
    }
    return (
      <View style={s.content}>
        {this.props.children}
      </View>
    );
  }
}

export default MyPage;
