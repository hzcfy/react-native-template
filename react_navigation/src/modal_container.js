import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Component } from './lib';

export default class extends Component {
  _onConatinerClick = () => {
    const { onContainerClick, tapToDismiss } = this.getRouteData();
    if (onContainerClick && typeof onContainerClick === 'function') {
      onContainerClick();
    } else if (tapToDismiss) {
      this.props.navigation.goBack();
    }
  }


  render() {
    const { containerStyle, modalContent } = this.getRouteData();
    return (
      <TouchableOpacity
        style={[{ flex: 1 }, containerStyle]}
        onPress={this._onConatinerClick}
        activeOpacity={1}
      >
        {modalContent}
      </TouchableOpacity>
    );
  }
}
