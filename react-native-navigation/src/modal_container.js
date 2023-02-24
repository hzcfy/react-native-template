/*
* @Author: foryoung.cheng
* @Description:
* @Date: 2023-02-21 14:55:35
 * @Last Modified by: foryoung.cheng
 * @Last Modified time: 2023-02-21 18:32:00
* @License: GNU General Public License（GPL)
* @Copyright: ©2015-2019 www.songxiaocai.com 宋小菜 All Rights Reserved.
*/
import React from 'react'
import { TouchableOpacity } from 'react-native'
import Component from './lib/component'

export default class extends Component {
  _onConatinerClick = () => {
    const { onContainerClick, tapToDismiss } = this.getRouteData()
    if (onContainerClick && typeof onContainerClick === 'function') {
      onContainerClick()
    } else if (tapToDismiss) {
      this.props.navigation.goBack()
    }
  }

  render () {
    const { containerStyle, modalContent } = this.getRouteData()
    return (
      <TouchableOpacity
        style={[{ flex: 1 }, containerStyle]}
        onPress={this._onConatinerClick}
        activeOpacity={1}
      >
        {modalContent}
      </TouchableOpacity>
    )
  }
}
