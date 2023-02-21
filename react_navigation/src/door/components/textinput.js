/*
 * @Author: JimmyDaddy
 * @Date: 2017-09-09 12:45:42
 * @Last Modified by: foryoung.cheng
 * @Last Modified time: 2022-05-11 21:12:37
 * @Description text input
 */
import React from 'react';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';

import connect from '../../redux/connect';

class STextInput extends React.Component {
  static propTypes = {
    regexp: PropTypes.any, // 验证正则
    onError: PropTypes.func // 验证错误时动作
  }

  constructor(props) {
    super(props);
    this.state = {
      focus: false,
      error: false,
      text: ''
    };

    this.timeout = 0;
    this.styles = this.props.config.getStyle();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.config !== this.props.config) {
      this.styles = nextProps.config.getStyle();
    }
  }

  /**
  * get focus
  * @method  focus
  * @return  {[type]} [description]
  * @author JimmyDaddy
  * @date    2017-06-12T11:46:10+080
  * @version [version]
  */
  focus = () => {
    this.textinput.focus();
  }

  _onFocus = () => {
    this.setState({
      focus: true
    });
  }

  _onBlur = () => {
    if (this.props.regexp) {
      const rgex = new RegExp(this.props.regexp);
      console.log('rgex', rgex, this.state.text)
      if (!rgex.exec(this.state.text)) {
        if (this.props.onError) {
          this.props.onError(this.state.text);
        }
        !this.state.error || this.state.focus &&
          this.setState({
            error: true,
            focus: false
          });
        return;
      }
    }
    this.state.error || this.state.focus &&
      this.setState({
        error: false,
        focus: false
      });

  }

  _getRef = (ref) => {
    this.textinput = ref;
    if (this.props.getRef) {
      this.props.getRef(ref);
    }
  }

  render() {
    console.log('111', this.state)
    return (
      <TextInput
        ref={this._getRef}
        underlineColorAndroid='transparent'
        defaultValue={this.state.text}
        {...this.props}
        style={[
          this.styles.phoneNumber,
          this.state.focus && this.styles.inputFocus,
          this.state.error && this.styles.inputError,
          this.props.style
        ]}
        // onFocus={this._onFocus}
        // onBlur={this._onBlur}
        onChangeText={this._onTextChange}
      />
    );
  }

  _onTextChange = (res) => {
    // clearTimeout(this.timeout)
    // this.timeout = setTimeout(() => {}
    // this.setState({
    //   text: res
    // }, this._onBlur);
    this.state.text = res
    // this._onBlur()
    this.props.onChangeText(res);
    // }, 500)
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
}

const setState = props => ({
  config: props.configReducer
});

export default connect(setState, null, null, { withRef: true })(STextInput);
