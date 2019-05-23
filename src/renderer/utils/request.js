import axios from 'axios'

const host = 'http://localhost:9500'
const commandUri = '/index.php/command'

function exec (command, options = null, callback = null) {
  if (typeof options === 'function') {
    callback = options
  }
  axios({
    method: 'post',
    url: host + commandUri,
    data: { command }
  }).then(res => {
    console.log(res)
    console.log(res.data)
    callback(null, res.data, null)
  })
}

export {
  exec
}
