/* eslint-disable no-path-concat */
import { Notification } from 'element-ui'
const exec = require('child_process').exec

/**
 * 执行命令
 *
 * @param {string}   command  需要执行的命令
 * @param {function} callback 成功回调
 */
function execute (command, callback) {
  checkPath().then(path => {
    exec(`export foundation_path=${path} && ${command}`, (error, stdout, stderr) => {
      if (error) {
        console.error(error)
        Notification.error({
          message: error
        })
      }
      if (stderr) {
        console.error(stderr)
        Notification.error({
          message: error
        })
      }

      if (stdout) {
        callback(stdout)
      }
    })
  })
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

export {
  execute,
  checkPath,
  currentBranch
}
