import store from '../store'
import {resolveBinFilePath} from '@/utils'

// function prefix () {
//   return isWin() ? '@chcp 65001 > nul & cmd /d/s/c ' : ''
// }

function artisan () {
  const artisanPath = resolveBinFilePath('artisan.php')

  return `${store.getters.php} ${artisanPath}`
}

function remote () {
  return `git config --get remote.origin.url`
}

function current () {
  return `git status -b -u no`
}

function phpVersion () {
  let php = store.getters.php

  return `${php} -v`
}

function swooleVersion () {
  let php = store.getters.php

  return `${php} -r "echo phpversion('swoole');"`
}

function gitVersion () {
  return `git version`
}

function vagrantVersion () {
  return `vagrant version`
}

function apiBlame (url, method) {
  const binFile = resolveBinFilePath('api_blame.php')
  let php = store.getters.php

  return `${php} ${binFile} --url="${url}"  --method="${method}"`
}

function pull (foundationPath, module) {
  const binFile = resolveBinFilePath('pull.php')
  let php = store.getters.php
  return `${php} ${binFile} --foundation_path="${foundationPath}" --module=${module}`
}

function checkout (branch, module) {
  const binFile = resolveBinFilePath('checkout.php')
  let php = store.getters.php

  return `${php} ${binFile} --branch=${branch} --module=${module}`
}

function switchEnv (env) {
  const binFile = resolveBinFilePath('switch_env.php')
  let php = store.getters.php

  return `${php} ${binFile} ${env}`
}

export {
  artisan,
  remote,
  current,
  phpVersion,
  swooleVersion,
  gitVersion,
  vagrantVersion,
  apiBlame,
  pull,
  checkout,
  switchEnv
}
