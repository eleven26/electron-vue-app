const store = require('../store').default
const Client = require('ssh2').Client

let conn = new Client()
conn.on('ready', function () {
  store.dispatch('changeConnected', true)
}).on('error', e => {
  console.error(e)
}).on('end', () => {
  store.dispatch('changeConnected', false)
  console.log('end')
}).on('close', () => {
  store.dispatch('changeConnected', false)
  console.log('close')
}).connect({
  host: 'localhost',
  port: 2222,
  username: 'vagrant',
  privateKey: require('fs').readFileSync('/Users/ruby/.ssh/id_rsa')
})
