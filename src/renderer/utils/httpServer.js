import store from '../store'
import {execute} from '../commands'
const vagrantPrefix = 'cd /Users/ruby/Homestead && vagrant ssh -- -t '

function changeExec () {
  store.dispatch('changeExec', require('child_process').exec)
}

function start () {
  handle(() => {
    execute(`${vagrantPrefix} 'php ~/swoole_server.php &'`, output => {
      console.log(output)
    })
  })
}

function handle (callback) {
  changeExec()
  callback()
  restoreExec()
}

function restoreExec () {
  store.dispatch('changeExec', require('../utils/request').exec)
}

export {
  start
}
