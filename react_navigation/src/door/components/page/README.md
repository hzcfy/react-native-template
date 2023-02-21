# @sxc/react-native-page

> 页面容器，包括一个header 以及下方一个容器，可修改主题颜色（即header颜色）

## usage

```javascript

import Page from '@sxc/react-native-page'

_renderContent(){
  return (
    <Content />
  )
}

render(){
  return (
    <Page
      title='title'// or you can pass an element like this `title={this._renderTitle()}`
      pageLoading={this.state.pageLoading}
      back={this._back} // or you can pass an element `leftContent={this._renderLeftContent()}`
      rightContent={this._renderRightContent()}
      themeColor='#aabb33' // or colors in `@sxc/style`
      error={this.state.error} // show error tip content or not
      errorContent={this._renderErrorContent()} // you can customise the error tip content
      pageLoadingContent={this._renderPageLoadingContent()}// you can customise the loading content
     >
      {this._renderContent()}
    </Page>
  )
}

...

// use header only
import {Header} from '@sxc-test/react-native-page'

render(){
  return (
    <Header 
      title='title'// or you can pass an element like this `title={this._renderTitle()}`    
      themeColor='#aabb33' // or colors in `@sxc/style`
      back={this._back} // or you can pass an element `leftContent={this._renderLeftContent()}`
      rightContent={this._renderRightContent()}
    />
  )
}

```