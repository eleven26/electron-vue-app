import { Notification } from 'element-ui'
import {currentState, foundationPath, isDebug, isLessThanTenMinutes, resolveBinFilePath} from '../utils'
import store from '../store'
import {handle} from '../utils/httpServer'
// const log = require('electron-log')

/**
 * 执行命令
 *
 * @param {string}   command  需要执行的命令
 * @param {Object}   options
 * @param {function} callback 成功回调
 */
function execute (command, options = null, callback = null) {
  let exec = store.getters.exec

  if (typeof options === 'function') {
    callback = options
    options = null
  }

  let cb = () => {
    exec(`${command}`, options || {}, (error, stdout, stderr) => {
      if (isDebug()) {
        console.groupCollapsed(command)
        console.table({
          func: execute.name,
          command,
          options,
          error,
          stdout,
          stderr,
          ...currentState()
        })
        console.groupEnd()
      }

      if (error) {
        // log.error(error)
        if (!stdout) {
          Notification.error({
            message: error,
            position: 'bottom-right'
          })
        }
      }
      if (stderr) {
        // log.error(stderr)
        if (!stdout) {
          Notification.error({
            message: error,
            position: 'bottom-right'
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
  let exec = store.getters.exec

  let cb = path => {
    if (path) path = path.trim()
    let postfix = `--foundation_path=${path}`

    command = `${command} ${postfix}`
    exec(command, (error, stdout, stderr) => {
      // Log context when in debug mode.
      if (isDebug()) {
        console.groupCollapsed(command)
        console.table({
          func: executeWithFoundationPath.name,
          command,
          error,
          stdout,
          stderr,
          ...currentState()
        })
        console.groupEnd()
      }

      if (error) {
        // log.error(error)
        if (!stdout) {
          Notification.error({
            message: error,
            position: 'bottom-right'
          })
        }
      }
      if (stderr) {
        // log.error(stderr)
        if (!stdout) {
          Notification.error({
            message: error,
            position: 'bottom-right'
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

    let key = 'last_get_commands'
    if (isLessThanTenMinutes(key)) {
      let commands = commandsIsValid()
      if (commands) {
        resolve(commands)
        return
      }
    }

    executeWithFoundationPath(`php ${artisanPath}`, output => {
      localStorage.setItem('commands', JSON.stringify(output))
      localStorage.setItem(key, (new Date()).toUTCString())
      resolve(output)
    })
  })
}

/**
 * localStorage 存储的命令
 * @returns {any}
 */
function commandsIsValid () {
  let commands = localStorage.getItem('commands')
  if (commands) {
    return JSON.parse(commands)
  }
}

/**
 * 检查 Foundation 是否正确
 *
 * @returns {Promise<any>}
 */
function checkPath (throwErr = true) {
  let exec = store.getters.exec

  return new Promise(resolve => {
    let path = foundationPath()

    console.log(path)
    let command = `cd ${path} && git config --get remote.origin.url`
    exec(command, (error, stdout, stderr) => {
      if (isDebug()) {
        console.groupCollapsed(command)
        console.table({
          func: checkPath.name,
          command,
          cwd: path,
          error,
          stdout,
          stderr,
          ...currentState()
        })
        console.groupEnd()
      }

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

/**
 * 获取 vagrant 版本
 *
 * @param {function} callback
 */
function vagrantVersion (callback) {
  handle(() => {
    execute(`vagrant version`, output => {
      let res = output.match(/(\d+\.\d+\.\d+)/)
      if (res !== null) {
        callback(res[1])
      } else {
        let err = '未安装（或未配置环境变量）'
        callback(err)
      }
    })
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
  gitVersion,
  vagrantVersion
}
