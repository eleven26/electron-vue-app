// import { rootPath } from 'electron-root-path'
const store = require('../store').default
// const path = require('path')

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
  let path = localStorage.getItem('foundation_path')
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
  // if (isDev()) {
  // return path.join(rootPath, '/bin/' + file)
  // }
  return `~/bin/` + file

  // if (isWin()) {
  //   return path.join(rootPath, `/resources/bin/` + file)
  // } else {
  //   return path.join(rootPath, `/Contents/Resources/bin/` + file)
  // }
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

export {
  isWin,
  isDev,
  foundationPath,
  resolveModulePaths,
  resolveBinFilePath,
  currentState,
  isDebug
}
