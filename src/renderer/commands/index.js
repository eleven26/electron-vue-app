/* eslint-disable no-path-concat */
import { Notification } from 'element-ui'
import {foundationPath, isWin, resolveBinFilePath} from '../utils'
const exec = require('child_process').exec
// const log = require('electron-log')
// const spawn = require('child_process').spawn

/**
 * 设置环境变量的命令兼容处理
 *
 * @param path
 * @returns {string}
 */
function setEnvCommand (path) {
  if (isWin()) {
    return `set temp_foundation_path=${path}`
  } else {
    return `export temp_foundation_path=${path}`
  }
}

/**
 * 执行命令
 *
 * @param {string}   command  需要执行的命令
 * @param {function} callback 成功回调
 * @param {boolean}  checkFoundationPath 是否检查 Foundation 路径
 */
function execute (command, callback, checkFoundationPath = true) {
  let cb = path => {
    if (path) path = path.trim()
    let prefix = setEnvCommand(path)

    // const spawnObj = spawn(`${prefix} && ${command}`, [], {shell: true})
    // spawnObj.stdout.on('data', function (chunk) {
    //   // console.log(chunk.toString())
    //   callback(chunk.toString())
    // })
    // spawnObj.stderr.on('data', (data) => {
    //   if (data) {
    //     // console.error(data.toString())
    //     Notification.error({
    //       message: data
    //     })
    //   }
    // })
    // spawnObj.on('close', function (code) {
    //   // console.log('close code : ' + code)
    // })
    // spawnObj.on('exit', (code) => {
    //   // console.log('exit code : ' + code)
    // })

    // log.info(`${prefix} && ${command}`)
    exec(`${prefix} && ${command}`, (error, stdout, stderr) => {
      if (error) {
        // log.error(error)
        if (!stdout) {
          Notification.error({
            message: error
          })
        }
      }
      if (stderr) {
        // log.error(stderr)
        if (!stdout) {
          Notification.error({
            message: error
          })
        }
      }

      callback(stdout)
    })
  }
  if (checkFoundationPath) {
    checkPath().then(cb)
  } else {
    cb()
  }
}

/**
 * 获取 artisan 命令列表
 *
 * @returns {Promise<any>}
 */
function getArtisanCommands () {
  return new Promise(resolve => {
    const artisanPath = resolveBinFilePath('artisan.php')
    execute(`php ${artisanPath}`, output => {
      resolve(output)
    })
  })
}

/**
 * 检查 Foundation 是否正确
 *
 * @returns {Promise<any>}
 */
function checkPath (throwErr = true) {
  return new Promise(resolve => {
    let path = foundationPath()

    // eslint-disable-next-line handle-callback-err
    exec(`cd ${path} && git config --get remote.origin.url`, (error, stdout, stderr) => {
      if (!stdout || stdout.indexOf('Foundation.git') === -1) {
        if (throwErr) {
          Notification.error({
            message: `Foundation 路径配置不正确: ${path}`,
            position: 'bottom-right'
          })
        }
      } else {
        resolve(path)
      }
    })
  })
}

/**
 * 获取模块当前分支
 *
 * @param {string} path
 * @returns {Promise<any>}
 */
function currentBranch (path) {
  return new Promise(resolve => {
    execute(`cd ${path} && git status -b -u no`, output => {
      resolve(output.split('\n').shift().split(' ').pop())
    })
  })
}

/**
 * 获取 php 版本
 *
 * @param {function} callback
 */
function phpVersion (callback) {
  execute(`php -v`, output => {
    if (output.indexOf('PHP') === 0) {
      callback(output.match(/PHP (\d+\.\d+\.\d+)/)[1])
    } else {
      let err = '未安装（或未配置环境变量）'
      callback(err)
    }
  }, false)
}

/**
 * 获取 swoole 版本(影响系统命令执行方式)
 *
 * @param {function} callback
 */
function swooleVersion (callback) {
  execute(`php -r "echo phpversion('swoole');"`, output => {
    if (Number.isInteger(Number(output[0]))) {
      callback(output || '未安装')
    } else {
      let err = '未安装（或未配置环境变量）'
      callback(err)
    }
  }, false)
}

/**
 * 获取 Git 版本
 *
 * @param {function} callback
 */
function gitVersion (callback) {
  execute(`git version`, output => {
    let res = output.match(/(\d+\.\d+\.\d+)/)
    if (res !== null) {
      callback(res[1])
    } else {
      let err = '未安装（或未配置环境变量）'
      callback(err)
    }
  }, false)
}

export {
  execute,
  checkPath,
  currentBranch,
  getArtisanCommands,
  phpVersion,
  swooleVersion,
  gitVersion
}
