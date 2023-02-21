/*
 * @Author: scott
 * @Date: 2017-09-09 12:53:36
 * @Last Modified by: JimmyDaddy
 * @Last Modified time: 2018-04-27 17:50:53
 * @Description
 */
import React from 'react';
import { Text } from 'react-native';

import PropTypes from 'prop-types';

export default class CountDown extends React.Component {
  static propTypes = {
    seconds: PropTypes.number.isRequired,
    onEnd: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      seconds: this.props.seconds
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      const seconds = this.getCurrentSeconds();

      if (seconds >= 0) {
        this.setState({
          seconds
        });
      } else {
        this._stop();
        this._onEnd();
      }
    }, 1000);
  }

  componentDidUpdate() {
    if (this.state.seconds <= 0) {
      this._onEnd();
    }
  }

  componentWillUnmount() {
    this._stop();
    clearTimeout(this.timer);
  }

  getCurrentSeconds() {
    let { seconds } = this.state;

    if (seconds >= 1) {
      seconds -= 1;
    }

    return seconds;
  }

  _onEnd() {
    if (this.props.onEnd) {
      this.props.onEnd();
    }
  }

  _stop() {
    clearInterval(this.timer);
  }

  render() {
    return <Text style={this.props.timeStyle}>{this.state.seconds}</Text>;
  }
}
