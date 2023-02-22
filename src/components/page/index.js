import React, { } from 'react'
import { View } from 'react-native'
import styles from './styles'
import Header from './header'
import Footer from './footer'
const statusEnums = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  NOT_FOUND: 'not_found',
  EMPTY: 'empty'
}
const Page = (props = {}) => {
  const {Loading} = props
  return (
    <View style={styles.container}>
      {!props.hideHeader && <Header {...props} />}
      <View style={{ flex: 1, width: '100%' }}>
        {props.pageStatu === statusEnums.LOADING && <Loading />}
        {props.pageStatu === statusEnums.SUCCESS && props.children}
      </View>
      {!props.hideFooter && <Footer backgroundColor={props.footerColor} />}
    </View>
  )
}

export default Page
