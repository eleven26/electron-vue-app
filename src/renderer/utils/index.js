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

export {
  isWin,
  foundationPath,
  resolveModulePaths
}
