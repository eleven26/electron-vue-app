const client = require('./oss')
const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec
let files = fs.readdirSync(path.join(__dirname, '../build'))
let compare = require('node-version-compare')

/**
 * 是否是 windows
 *
 * @returns {boolean}
 */
function isWin () {
  return /^win/.test(process.platform)
}

// build
exec(`npm run build`, { cwd: __dirname }, (error, stdout, stderr) => {
  console.error(error)
  console.log(stdout)
  console.error(stderr)

  let file = files.filter(name => {
    let extension = isWin() ? 'exe' : 'dmg'
    return name.endsWith(extension)
  }).sort((name1, name2) => {
    let prefix = isWin() ? 'git-helper Setup ' : 'git-helper-'
    return compare(name2.replace(prefix, ''), name1.replace(prefix, ''))
  })

  if (file.length === 0) {
    console.error('build fails')
  } else {
    let fileName = file[0]
    let fullPath = path.join(__dirname, `../build/${fileName}`)
    // 上传到 oss
    client.put(fileName, fullPath).then(result => {
      console.log(result)
    })
  }
})
