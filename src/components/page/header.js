import React, { PureComponent, isValidElement, cloneElement } from 'react'
import { View, TouchableOpacity, Text, StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import { StyleSheet } from '../theme'
// import Icon from '../icons'
import { header as styles } from './styles'

const isString = arg => typeof arg === 'string'
const isFunc = (target, def) => (typeof target === 'function' ? target : def)
const generateText = (styles, text, pressFn) => (
  <Text style={styles} onPress={pressFn || void 0} allowFontScaling={false}>
    {text}
  </Text>
)

const headerColorMap = ({ headerStyle, headerColor, textColor, barStyle, leftColor }) => {
  switch (headerStyle) {
    case 'light':
      return {
        textColor:
          typeof textColor === 'string'
            ? StyleSheet.value(textColor)
            : StyleSheet.value('$FONT'),
        headerColor:
          typeof headerColor === 'string'
            ? StyleSheet.value(headerColor)
            : StyleSheet.value('$WHITE'),
        leftColor: StyleSheet.value('$PRIMARY'),
        barStyle: 'dark-content'
      }
    default:
      return {
        textColor:
          typeof textColor === 'string'
            ? StyleSheet.value(textColor)
            : StyleSheet.value('$WHITE'),
        headerColor:
          typeof headerColor === 'string'
            ? StyleSheet.value(headerColor)
            : StyleSheet.value('$PRIMARY'),
        leftColor: typeof leftColor === 'string'
          ? StyleSheet.value(leftColor)
          : StyleSheet.value('#fff'),
        barStyle: barStyle || 'light-content'
      }
  }
}

export default class PageHeader extends PureComponent {
  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]), // 中心标题
    leftContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]), // 左侧内容
    leftEvent: PropTypes.func, // 左侧事件
    rightContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]), // 右侧内容
    rightEvent: PropTypes.func, // 右侧事件
    style: PropTypes.object, // 样式
    textColor: PropTypes.string // 显示的字体、箭头的颜色
  }

  constructor (props) {
    super(props)
    const { style } = this.props
    this.state = {
      style: StyleSheet.create({
        container: style || {}
      })
    }
  }

  componentDidMount () {
    if (this.props.navigation && this.props.navigation.addListener) {
      this._navListener = this.props.navigation.addListener(
        this.props.didFocus,
        () => {
          const colorMap = headerColorMap(this.props)

          StatusBar.setBarStyle(colorMap.barStyle)
        }
      )
    }
  }

  componentWillUnmount () {
    if (this._navListener && this._navListener.remove) {
      this._navListener.remove()
    }
  }

  // 返回上一级路由，并清除本次路由记录
  _goBack = () => {
    const { navigation } = this.props
    if (navigation && navigation.pop) {
      return navigation.pop()
    }

    if (navigation && navigation.goBack) {
      return navigation.goBack()
    }

    if (navigation && navigation.back) {
      return navigation.back()
    }
  }

  // 渲染左侧内容
  _renderLeft = () => {
    const { leftContent, leftEvent } = this.props
    if (!leftContent) return null
    const colorMap = headerColorMap(this.props)

    return (
      <TouchableOpacity
        style={[styles.containerCommon, styles.leftContainer]}
        onPress={() => isFunc(leftEvent, this._goBack)()}
      >
        {isString(leftContent) ? (
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            {/* <Icon
              type='left'
              fontSize={22}
              color={colorMap.leftColor}
              style={{ marginRight: 5 }}
            /> */}
            {generateText(
              [styles.Reg15, { color: colorMap.leftColor }],
              leftContent
            )}
          </View>
        ) : isValidElement(leftContent) ? (
          cloneElement(leftContent)
        ) : (
          leftContent
        )}
      </TouchableOpacity>
    )
  }

  // 渲染header右侧
  _renderRight = () => {
    const { rightContent, rightEvent } = this.props
    const colorMap = headerColorMap(this.props)

    if (!rightContent) return null
    return (
      <TouchableOpacity
        style={[styles.containerCommon, styles.rightContainer]}
        onPress={isFunc(rightEvent, void 0)}
        disabled={!rightEvent}
      >
        {isString(rightContent)
          ? generateText(
            [styles.Reg15, { color: colorMap.leftColor }],
            rightContent,
            isFunc(rightEvent, void 0)
          )
          : isValidElement(rightContent)
            ? cloneElement(rightContent)
            : rightContent}
      </TouchableOpacity>
    )
  }

  // 渲染标题
  _renderTitle = () => {
    const { title } = this.props
    const colorMap = headerColorMap(this.props)

    if (!title) return null
    return isString(title)
      ? generateText([styles.Med17, { color: colorMap.textColor }], title)
      : isValidElement(title)
        ? cloneElement(title)
        : title
  }

  render () {
    const { style = {} } = this.props
    const colorMap = headerColorMap(this.props)

    return (
      <View
        style={[
          styles.container,
          StyleSheet.create(style),
          { backgroundColor: colorMap.headerColor }
        ]}
      >
        <StatusBar
          backgroundColor='transparent'
          translucent
          barStyle={colorMap.barStyle}
        />
        {this._renderLeft()}
        {this._renderTitle()}
        {this._renderRight()}
      </View>
    )
  }
}
