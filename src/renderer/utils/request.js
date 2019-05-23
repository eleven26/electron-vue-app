import axios from 'axios'

const host = 'http://192.168.10.10:9304'

function exec (command, options = null, callback = null) {
  if (typeof options === 'function') {
    callback = options
  }
  axios({
    method: 'post',
    url: host,
    data: { command }
  }).then(res => {
    callback(null, res.data, null)
  })
}

export {
  exec
}
