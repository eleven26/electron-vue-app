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

export {
  isWin,
  foundationPath
}
