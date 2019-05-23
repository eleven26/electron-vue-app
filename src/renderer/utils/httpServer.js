import store from '../store'
import {execute} from '../commands'
const vagrantPrefix = 'cd /Users/ruby/Homestead && vagrant ssh -- -t '

function changeExec () {
  store.dispatch('changeExec', require('child_process').exec)
}

function start () {
  handle(() => {
    let preCommand = 'wget https://raw.githubusercontent.com/eleven26/git-helper/vagrant/command/swoole_server.php -O swoole_server.php'
    execute(`${vagrantPrefix} 'cd ~ && ${preCommand} && php ~/swoole_server.php &'`, output => {
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
