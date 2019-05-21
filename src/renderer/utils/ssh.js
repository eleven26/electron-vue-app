const Client = require('ssh2').Client

let conn = new Client()
conn.on('ready', function () {
  console.log('Client :: ready')
  conn.exec('uptime', function (err, stream) {
    if (err) throw err
    stream.on('close', function (code, signal) {
      console.log('Stream :: close :: code: ' + code + ', signal: ' + signal)
      conn.end()
    }).on('data', function (data) {
      console.log('STDOUT: ' + data)
    }).stderr.on('data', function (data) {
      console.log('STDERR: ' + data)
    })
  })
}).on('error', e => {
  console.error(e)
}).on('end', () => console.log('end')).on('close', () => console.log('close')).connect({
  host: 'localhost',
  port: 2222,
  username: 'vagrant',
  privateKey: require('fs').readFileSync('/Users/ruby/.ssh/id_rsa')
})
