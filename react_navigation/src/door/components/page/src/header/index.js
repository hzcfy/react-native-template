/*
 * @Author: kkt
 * @Date: 2016-12-22 15:01:46
 * @Last Modified by: JimmyDaddy
 * @Last Modified time: 2019-11-13 19:35:04
 * @Description page header
 */

import React from 'react';
import { View, TouchableOpacity, Image, Platform, Dimensions, Text } from 'react-native';
import PropTypes from 'prop-types';

import SStyle from '@sxc/style';
import { DeviceUtils } from '@sxc/colrn';

const s = SStyle.create({
  container: {
    backgroundColor: '$B1',
    width: Dimensions.get('window').width,
    flexDirection: 'row'
    // zIndex: 1
  },
  content: {
    flex: 1,
    marginTop: DeviceUtils.model === 'iPhone X' ? 20 : 0,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backContainer: {
    position: 'absolute',
    left: 10,
    top: 0,
    bottom: 0,
    width: Dimensions.get('window').width * 0.2,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  backIcon: {
    height: 17,
    width: 10
  },
  rightContainer: {
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'column'
  }
});

export default class SText extends React.Component {
  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    back: PropTypes.func,
    leftContent: PropTypes.element,
    rightContent: PropTypes.element,
    themeColor: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      styles: SStyle.create({
        t: {
          backgroundColor: this.props.themeColor
        }
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({
        style: SStyle.create({
          t: {
            backgroundColor: nextProps.themeColor
          }
        })
      });
    }
  }

  /**
   * 渲染左侧内容 或者 返回 按钮
   * @method _renderLeft
   * @return {[type]}   [description]
   * @author kkt
   * @date   2016-01-26
   */
  _renderLeft() {
    if (this.props.leftContent) {
      return (
        <View style={s.backContainer}>
          {this.props.leftContent}
        </View>
      );
    } else if (this.props.back) {
      return (
        <TouchableOpacity style={s.backContainer} onPress={this._back}>
          <Image source={require('../asset/icon_backward.png')} style={s.backIcon} />
        </TouchableOpacity>
      );
    }
    return null;
  }

  /**
   * @description 返回
   * @author JimmyDaddy
   * @memberof SText
   */
  _back = () => {
    if (this.props.back) {
      this.props.back();
    }
  }

  /**
   * 渲染右侧内容
   * @method _renderRgith
   * @return {[type]}    [description]
   * @author kkt
   * @date   2016-01-26
   */
  _renderRight() {
    if (this.props.rightContent) {
      return (
        <View style={s.rightContainer}>
          {this.props.rightContent}
        </View>
      );
    }
    return null;
  }

  /**
   * render title
   * @method  _renderTitle
   * @return  {[type]} [description]
   * @author JimmyDaddy
   * @date    2017-06-12T11:24:10+080
   * @version [version]
   */
  _renderTitle() {
    if (typeof this.props.title === 'string') {
      return (
        <Text color='white' fontSize='$T21'>{this.props.title}</Text>
      );
    }
    return this.props.title;
  }

  render() {
    return (
      <View style={[s.container, this.state.styles.t, Platform.OS === 'android' ? null : { zIndex: 1 }]}>
        <View style={[s.content]}>
          {this._renderLeft()}
          {this._renderTitle()}
          {this._renderRight()}
        </View>
      </View>
    );
  }
}
