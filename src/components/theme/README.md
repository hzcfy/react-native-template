# Theme

## 主题色

#### 切换主题色

    执行 node init/shell 进入主题切换

#### 主题色介绍

    主题色字段在主题切换后会改变，因此，在组件开发中，控件颜色与主题存在捆绑关系时，使用主题色字段。例如，Button 背景色使用$PRIMARY , 那么在不同主题下，Button的主题颜色不一致

| key              | 说明           | 默认                               |
| ---------------- | -------------- | ---------------------------------- |
| \$PRIMARY        | 主题色         | \$B500                             |
| \$SECOND_PRIMARY | 第二主题色     | 除了黑色主题，别的与主题色暂时一致 |
| \$PRIMARY_DEEP   | 主题色(深)     | \$B700                             |
| \$PRIMARY_LIGHT  | 主题色(浅)     | \$B300                             |
| \$PRIMARY_600    | 主题色(深浅)   | \$B600                             |
| \$PRIMARY_200    | 主题色(淡浅)   | \$B200                             |
| \$PRIMARY_100    | 主题色(淡)     | \$B100                             |
| \$DANGER         | 危险提示色     | \$R500                             |
| \$DANGER_DEEP    | 危险提示色(深) | \$VOLCANO_DEEP                     |
| \$DANGER_LIGHT   | 危险提示色(浅) | \$VOLCANO_LIGHT                    |
| \$WARNING        | 警告提示色     | \$ORANGE                           |
| \$WARNING_DEEP   | 警告提示色(深) | \$ORANGE_DEEP                      |
| \$WARNING_LIGHT  | 警告提示色(浅) | \$ORANGE_LIGHT                     |

## 使用

默认使用 StyleSheet ，与原先的使用方式一致，都是基于 EStyleSheet 做的，只是把原来的参数名称换了一下

### .create

```js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$PRIMARY'
  },
  welcome: {
    fontSize: '$HEAD'
  }
})
```

### .build

```js
const styles = StyleSheet.build({
  $textColor: '$B500'
})

const styles = EStyleSheet.create({
  text: {
    color: '$textColor'
  }
})

<Text style={styles.text}>
...
</Text>

```

### .value

```js
const BLUE = StyleSheet.value('$B500') // rgba(34, 150, 243, 100)
```

### .subscribe

```js
const styles = EStyleSheet.create({
  button: {
    width: '80%'
  }
})

let Button = <View style={styles.button}></View>

let Button
EStyleSheet.subscribe('build', () => {
  Button = <View style={styles.button}></View>
})
```

### .child

#### Extended stylesheet 支持 4 种 伪类 :first-child, :nth-child-even, :nth-child-odd, :last-child。现在 styles 定义伪类样式，然后在对应的列表中使用 child 的方法设置对应的样式。如：`EStyleSheet.child(stylesObj, styleName, index, count)`

```js

// :first-child, :nth-child-even, :nth-child-odd, :last-child

const styles = EStyleSheet.create({
  row: {
    fontSize: '1.5rem',
    borderTopWidth: 1
  },
  'row:nth-child-even': {
    backgroundColor: 'gray'
  },
  'row:last-child': {
    borderBottomWidth: 1
  }
})
...
render() {
  return (
    <View>
      {items.map((item, index) => {
        return (
          <View key={index} style={EStyleSheet.child(styles, 'row', index, items.length)}></View>
        );
      })}
    </View>
  );
}
```

## StyleSheet Api

| 属性      | 说明                                                      | 类型     | 默认值 |
| --------- | --------------------------------------------------------- | -------- | ------ |
| create    | 与 rn 的 StyleSheet.create 一样，只是能拿到设置的一些参数 | function | -      |
| build     | 设置全局一些变量                                          | function | -      |
| value     | 获取某一个变量                                            | function | -      |
| child     | 列表中设置指定类型行的样式                                | function | -      |
| subscribe | 监听上面的某一个方法，执行回调                            | function | -      |

## 颜色表

#### 五大主色(9 阶)

<img src='../assets/example/theme/theme.png' width='700px'>
<img src='../assets/example/theme/colors.png' width='700px'>

#### 黑白色(10 阶)

<img src='../assets/example/theme/balck-white.png' width='700px'>

## 可用变量

### 字重

| key           | 说明 | 值  |
| ------------- | ---- | --- |
| \$THIN        | 字重 | 100 |
| \$ULTRA_LIGHT | 字重 | 200 |
| \$LIGHT       | 字重 | 300 |
| \$REGULAR     | 字重 | 400 |
| \$MEDIUM      | 字重 | 500 |
| \$SEMIBOLD    | 字重 | 600 |
| \$BOLD        | 字重 | 700 |
| \$HEAVY       | 字重 | 800 |
| \$BLACK       | 字重 | 900 |

### 屏幕

| key                 | 说明       | 值                                   |
| ------------------- | ---------- | ------------------------------------ |
| \$SCREEN_WIDTH      | 屏幕宽度   | -                                    |
| \$SCREEN_HEIGHT     | 屏幕高度   | -                                    |
| \$STATUS_BAR_HEIGHT | 状态栏高度 | ios 普通 20 iphoneX 44，安卓各不相同 |

## 贡献者

- 开发者 程方远、彭泽智
