import { rootPath } from 'electron-root-path'
const store = require('../store').default

/**
 * 是否是 windows
 *
 * @returns {boolean}
 */
function isWin () {
  return /^win/.test(process.platform)
}

/**
 * Foundation 路径
 *
 * @returns {string}
 */
function foundationPath () {
  let path = store.getters.foundationPath
  if (path) {
    path = path.trim()
  }
  return path
}

/**
 * Homestead 路径
 *
 * @returns {string}
 */
function homesteadPath () {
  let path = store.getters.homestead
  if (path) {
    path = path.trim()
  }
  return path
}

/**
 * vagrant 路径
 *
 * @returns {string}
 */
function vagrantPath () {
  let path = store.getters.vagrant
  if (path) {
    path = path.trim()
  }
  return path
}

/**
 * 获取所有模块绝对路径
 */
function resolveModulePaths () {
  let foundationPath1 = foundationPath()
  let modules = [
    'Admin',
    'Finance',
    'Core',
    'Openapi',
    'Order',
    'Product',
    'Shop',
    'Social',
    'Stock',
    'User'
  ]
  let paths = modules.map(module => {
    return {path: `${foundationPath1}/Modules/${module}`, module: module}
  })
  paths.unshift({path: foundationPath1, module: 'Foundation'})
  return paths
}

/**
 * check if is in dev mode.
 *
 * @returns {boolean}
 */
function isDev () {
  return process.mainModule.filename.indexOf('app.asar') === -1
}

/**
 * 获取 bin 文件绝对路径
 *
 * @param {string} file
 * @returns {string}
 */
function resolveBinFilePath (file) {
  const path = require('path')
  if (isDev()) {
    return path.join(rootPath, '/bin/' + file)
  }

  if (isWin()) {
    return path.join(rootPath, `/resources/bin/` + file)
  } else {
    return path.join(rootPath, `/Contents/Resources/bin/` + file)
  }
}

/**
 * 获取 php 可执行文件路径
 *
 * @returns {string}
 */
function php () {
  let path = require('path')
  let php
  if (isWin()) {
    php = isDev() ? path.join(rootPath, '/php72/php.exe ') : path.join(rootPath, `/resources/php72/php.exe `)
    php = php.replace(/\\/g, '/')
    php = '@chcp 65001 > nul & cmd /d/s/c ' + php
  } else {
    php = 'php '
  }

  return php
}

/**
 * Get current state.
 *
 * @returns {{foundationPath: *, env: *, debug: *}}
 */
function currentState () {
  return {
    foundationPath: store.getters.foundationPath,
    env: store.getters.env,
    debug: store.getters.debug
  }
}

/**
 * Check if is debug mode
 *
 * @returns {boolean}
 */
function isDebug () {
  return store.getters.debug
}

/**
 * 获取用户主目录
 *
 * @returns {string | undefined}
 */
function getUserHome () {
  return (process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']).replace(/\\/g, '/')
}

/**
 * 判断上一次获取命令的时间是否在十分钟以前
 *
 * @param {string} key
 * @returns {boolean}
 */
function isLessThanTenMinutes (key) {
  let lastGetCommands = localStorage.getItem(key)
  if (!lastGetCommands) {
    return false
  } else {
    lastGetCommands = new Date(lastGetCommands)
    let time = (new Date()).getTime() - lastGetCommands.getTime()
    return time / (1000 * 60) < 10
  }
}

export {
  isWin,
  isDev,
  foundationPath,
  homesteadPath,
  vagrantPath,
  resolveModulePaths,
  resolveBinFilePath,
  currentState,
  isDebug,
  getUserHome,
  isLessThanTenMinutes,
  php
}
