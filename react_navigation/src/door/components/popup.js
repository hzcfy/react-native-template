/*
 * @Author: scott
 * @Date: 2017-09-09 14:02:43
 * @Last Modified by: foryoung.cheng
 * @Last Modified time: 2022-01-12 16:10:59
 * @Description
 */
import React from 'react'
import {
  Text,
  View
} from 'react-native'

import SStyle from '@sxc/style'
import connect from '../../redux/connect'
const blue = '#00BF00'
const grey = '#EEEEEE'

const styles = SStyle.create({
  popupContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },

  tipBoxView: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100% - 50',
    padding: 20,
    borderRadius: 12
  },

  tipBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  tipTitleBox: {
    height: 30,
    paddingTop: 10,
    paddingBottom: 10,
    width: '100% - 50',
    // borderBottomWidth: 1,
    borderBottomColor: grey,
    justifyContent: 'center',
    alignItems: 'center'
  },

  tipTitle: {
    height: 30,
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center'
  },

  tipContentBox: {
    flexDirection: 'column',
    paddingBottom: 16,
    paddingTop: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },

  tipContent: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 26,
    marginRight: 26,
    lineHeight: 20,
    textAlign: 'center'
  },

  footer: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  leftContent: {
    width: '50% - 35',
    textAlign: 'center',
    fontSize: 20,
    color: '#666'
  },

  rightContent: {
    width: '50% - 35',
    textAlign: 'center',
    fontSize: 20,
    color: blue
  }
})

class Popup extends React.Component {
  // static propTypes = {
  //   pop: PropTypes.any,
  //   leftConfirm: PropTypes.func,
  //   rightConfirm: PropTypes.func,
  //   leftContent: PropTypes.any,
  //   rightContent: PropTypes.any
  // }

  _leftConfirm = () => {
    if (this.props.popReducer.leftConfirm) {
      this.props.popReducer.leftConfirm()
    }
  }

  _rightConfirm = () => {
    if (this.props.popReducer.rightConfirm) {
      this.props.popReducer.rightConfirm()
    }
  }

  _renderFooter () {
    const {
      leftContent,
      rightContent
    } = this.props.popReducer.pop

    return (
      <View style={styles.footer}>
        {leftContent && <Text onPress={this._leftConfirm} style={styles.leftContent}>{leftContent}</Text>}
        {rightContent && <Text onPress={this._rightConfirm} style={styles.rightContent}>{rightContent}</Text>}
      </View>
    )
  }

  render () {
    const {
      pop
    } = this.props.popReducer

    if (!pop || (!pop.title && !pop.content)) {
      return null
    }

    const {
      title,
      content,
      leftContent,
      rightContent
    } = pop

    return (
      <View style={styles.popupContainer}>
        <View style={styles.tipBoxView}>
          <View style={styles.tipBox}>
            {
              title
                ? <View style={styles.tipTitleBox}>
                  <Text style={styles.tipTitle}>{title}</Text>
                </View>
                : null
            }
            {
              content
                ? <View style={styles.tipContentBox}>
                  <Text style={styles.tipContent}>{content}</Text>
                </View>
                : null
            }
            {
              (leftContent || rightContent) ? this._renderFooter() : null
            }
          </View>
        </View>
      </View>
    )
  }
}

const setState = state => ({
  popReducer: state.popReducer
})
export default connect(setState)(Popup)
