const client = require('./oss')
const fs = require('fs')
const path = require('path')
const spawn = require('child_process').spawn
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
let spawnObj = spawn(`npm`, ['run', 'build'], { cwd: __dirname })
spawnObj.stdout.on('data', (data) => {
  console.log(`${data}`)
})
spawnObj.stderr.on('error', (data) => {
  console.error(`${data}`)
})
spawnObj.on('close', (code) => {
  console.log(`${code}`)

  let file = files.filter(name => {
    let extension = isWin() ? 'exe' : 'dmg'
    return name.endsWith(extension)
  }).sort((name1, name2) => {
    return compare(name2.replace('git-helper-', ''), name1.replace('git-helper-', ''))
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
