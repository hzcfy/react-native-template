# header

页面头部显示组件

## props

| name | type | default value |
| --- | --- | --- |
| `title` | `string` | `null` |
| `back` | `function` | `null` |
| `leftContent` | `elment` | `null` |
| `rightContent` | `element` | `null` |

如果用户传入`back` 则会显示后退icon

## usage

```javascript

_renderLeft () {
  return (
    <View>
      <Text>left</Text>
    </View>
  )
}

<Header title="title" leftContent={this._renderLeft} />

```