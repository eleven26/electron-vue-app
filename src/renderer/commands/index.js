import { Notification } from 'element-ui'
import { foundationPath, resolveBinFilePath } from '../utils'
const exec = require('child_process').exec
const log = require('electron-log')
// const spawn = require('child_process').spawn

/**
 * 执行命令
 *
 * @param {string}   command  需要执行的命令
 * @param {Object}   options
 * @param {function} callback 成功回调
 */
function execute (command, options = null, callback = null) {
  if (typeof options === 'function') {
    callback = options
    options = null
  }

  let cb = () => {
    exec(`${command}`, options || {}, (error, stdout, stderr) => {
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

  cb()
}

/**
 * 执行命令，执行之前检查 Foundation 路径是否正确
 *
 * @param command
 * @param callback
 */
function executeWithFoundationPath (command, callback) {
  let cb = path => {
    if (path) path = path.trim()
    let postfix = `--foundation_path=${path}`

    exec(`${command} ${postfix}`, (error, stdout, stderr) => {
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

  checkPath().then(cb)
}

/**
 * 获取 artisan 命令列表
 *
 * @returns {Promise<any>}
 */
function getArtisanCommands () {
  return new Promise(resolve => {
    const artisanPath = resolveBinFilePath('artisan.php')
    executeWithFoundationPath(`php ${artisanPath}`, output => {
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

    exec(`git config --get remote.origin.url`, { cwd: path }, (error, stdout, stderr) => {
      if (!stdout || stdout.indexOf('Foundation.git') === -1) {
        log.error(error)
        log.info(stdout)
        log.error(stderr)
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
    execute(`git status -b -u no`, { cwd: path }, output => {
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
  })
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
      let err = '未安装（windows 不支持）'
      callback(err)
    }
  })
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
  })
}

export {
  execute,
  executeWithFoundationPath,
  checkPath,
  currentBranch,
  getArtisanCommands,
  phpVersion,
  swooleVersion,
  gitVersion
}
