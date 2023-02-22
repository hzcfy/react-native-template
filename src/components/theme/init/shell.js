/*
* @Author: foryoung.cheng
* @Description:   修改主题配置
* @Date: 2019-06-13 17:43:43
 * @Last Modified by: foryoung.cheng
 * @Last Modified time: 2023-02-22 15:03:09
* @License: GNU General Public License（GPL)
* @Copyright: ©2015-2019 www.songxiaocai.com 宋小菜 All Rights Reserved.
*/
const { writeFile, readdir } = require('fs')
const { resolve } = require('path')
const inquirer = require('inquirer')
const program = require('commander')

// 配置文件路径
const confPath = resolve(__dirname, './index.js')
// 配置文件夹路径
const confDir = resolve(__dirname, './')
// 环境配置列表选项
const confList = [
  {
    name: 'BLUE - 蓝色主题',
    value: 'blue'
  },
  {
    name: 'GREEN - 绿色主题',
    value: 'green'
  },
  {
    name: 'BLACK - 黑色主题',
    value: 'black'
  }
]

// 查询数组是否含有某string
const elemFilter = arr => fileName => arr.some(elem => fileName.indexOf(elem) > -1)
// 商城特殊符号
const generatorSymbol = (num, flag = '=') => new Array(~~num).fill(flag).join('')

program
  .version('0.1.0')
  .option('-d, --blue', 'BLUE - 蓝色主题')
  .option('-p, --green', 'GREEN - 绿色主题')
  .option('-p, --black', 'BLACK - 黑色主题')
  .parse(process.argv)

// 读取文件夹下的文件列表
readdir(confDir, 'utf8', (err, files) => {
  if (err) throw err
  if (files.length < 3) {
    console.log('\u001b[90m' + generatorSymbol(54))
    console.log('\x1b[31m 当前文件夹下缺少可供配置的文件, 赶紧 GitLab 上拉一拉! \x1b[0m')
    console.log('\u001b[90m' + generatorSymbol(54))
    process.exit(1)
  }

  start(
    files.filter(
      elemFilter(
        confList.map(e => e.value)
      )
    )
  )
})

/**
 * @desc 开始进入环境配置
 * @param  {Array} files
 */
function start (files) {
  console.log('\u001b[90m' + generatorSymbol(39))
  console.log(generatorSymbol(10) + ' 开始进入主题设置 ' + generatorSymbol(11))
  console.log(generatorSymbol(39) + '\n')

  const { blue, green, black } = program
  if (blue) {
    validate(files, { theme: confList[0].value })
  } else if (green) {
    validate(files, { theme: confList[1].value })
  } else if (black) {
    validate(files, { theme: confList[2].value })
  } else {
    choose(files)
  }
}

/**
 * @desc 选择主题
 * @param  {Array} files
 */
async function choose (files) {
  const choices = confList.slice()
  choices.splice(choices.length - 1, 0, new inquirer.Separator())

  const { theme } = await inquirer.prompt([
    {
      type: 'list',
      name: 'theme',
      message: '请选择 CUI 主题色: ',
      choices
    }
  ])

  validate(files, { theme })
}

/**
 * @desc 验证字段
 * @param  {Array} files - 文件名数组
 * @param  {String} themeName - 选择的主题
 */
function validate (files, { theme }) {
  const targetFilePath = files.find(e => e.indexOf(theme) > -1)
  let themeName = ''

  try {
    themeName = confList.find(e => e.value === theme).name.match(/[\u4e00-\u9fa5]+/g)[0]
  } catch (error) {
    console.log('\n' + error + '\n')
    process.exit(1)
  }

  if (!targetFilePath || !themeName) {
    console.log('\u001b[90m' + generatorSymbol(40))
    console.log(`\x1b[31m 没找到当前路径下的 ${theme}.js 的配置文件! \x1b[0m`)
    console.log('\u001b[90m' + generatorSymbol(40))
    process.exit(1)
  }
  read(resolve(__dirname, targetFilePath), { themeName })
}

/**
 * @desc 读取文件
 * @param  {String} targetFilePath - 需要读取的配置文件路径
 * @param  {String} themeName - 主题名称
 */
function read (targetFilePath, { themeName }) {
  const resultData = require(targetFilePath)
  const data = `module.exports = ${JSON.stringify(resultData, null, 2)}`
  write(confPath, data, { themeName })
}

/**
 * @desc 写入配置文件
 * @param  {String} confPath - 需要写入的目标文件路径
 * @param  {String} data - 文件内容
 * @param  {String} themeName - 主题名称
 */
function write (confPath, data, { themeName }) {
  writeFile(confPath, data, (err) => {
    if (err) throw err

    const str = ` 成功切换为 \u001b[32m${themeName} `
    const biubiu = generatorSymbol(39, '=')

    console.log(`\u001b[90m${biubiu}`)
    console.log(`\u001b[37m${generatorSymbol((39 - str.length) / 2.5, ' ') + str}`)
    console.log('\u001b[90m' + biubiu)
  })
}
