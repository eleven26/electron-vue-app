/* eslint-disable no-path-concat */
import { Notification } from 'element-ui'
const exec = require('child_process').exec

/**
 * 设置环境变量的命令兼容处理
 *
 * @param path
 * @returns {string}
 */
function setEnvCommand (path) {
  const isWin = /^win/.test(process.platform)
  if (isWin) {
    return `set foundation_path=${path}`
  } else {
    return `export foundation_path=${path}`
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
    let prefix = setEnvCommand(path)
    exec(`${prefix} && ${command}`, (error, stdout, stderr) => {
      if (error) {
        console.error(error)
        if (!stdout) {
          Notification.error({
            message: error
          })
        }
      }
      if (stderr) {
        console.error(stderr)
        if (!stdout) {
          Notification.error({
            message: error
          })
        }
      }

      if (stdout) {
        callback(stdout)
      }
    })
  }
  if (checkFoundationPath) {
    checkPath().then(cb)
  } else {
    cb()
  }
}

/**
 * 检查 Foundation 是否正确
 *
 * @returns {Promise<any>}
 */
function checkPath () {
  return new Promise(resolve => {
    let path = localStorage.getItem('foundation_path')

    // eslint-disable-next-line handle-callback-err
    exec(`cd ${path} && git config --get remote.origin.url`, (error, stdout, stderr) => {
      if (!stdout || stdout.indexOf('Foundation.git') === -1) {
        Notification.error({
          message: `Foundation 路径配置不正确: ${path}`
        })
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
    execute(`cd ${path} && git status -b -u no | awk 'NR==1{print $3;}'`, output => {
      resolve(output)
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
  phpVersion,
  swooleVersion,
  gitVersion
}
