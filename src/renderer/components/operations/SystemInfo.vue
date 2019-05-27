<template>
  <el-row style="margin-top: 60px">
    <el-col :span="14" :offset="4">
      <el-card shadow="never">
        <template slot="header">系统信息({{ version }})</template>
        <el-form label-width="150px">
          <el-form-item label="PHP 版本">{{ php_version }}</el-form-item>
          <!--<el-form-item label="swoole 版本">{{ swoole_version }}</el-form-item>-->
          <el-form-item label="Git 版本">{{ git_version }}</el-form-item>
          <!--<el-form-item label="Vagrant 版本">{{ vagrant_version }}</el-form-item>-->
          <!--<el-form-item label="swoole server">{{ swoole_server_status }}</el-form-item>-->
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import * as commands from '../../commands'
  import {isLessThanTenMinutes} from '@/utils'
  const { remote } = require('electron')
  const currentWindow = remote.getCurrentWindow()
  const Telnet = require('telnet-client')

  export default {
    name: 'SystemInfo',

    data () {
      this.vagrantVersion()
      return {
        version: require('@/../../package.json').version,
        php_version: this.phpVersion(),
        swoole_version: this.swooleVersion(),
        git_version: this.gitVersion(),
        vagrant_version: '',
        swoole_server_status: ''
      }
    },

    mounted () {
      this.listenKeyboard()
    },

    methods: {
      listenKeyboard () {
        let Mousetrap = require('mousetrap')
        // map multiple combinations to the same callback
        Mousetrap.bind(['command+t', 'ctrl+t'], () => {
          this.$router.push({ name: 'test' })
          // return false to prevent default browser behavior
          // and stop event from bubbling
          return false
        })

        // const focussedWindow = BrowserWindow.getFocusedWindow()
        Mousetrap.bind(['command+i', 'ctrl+i'], () => {
          // 打开 dev-tools 的时候同时设置为调试模式
          this.$store.dispatch('changeDebug', true)
          currentWindow.webContents.openDevTools()
          // return false to prevent default browser behavior
          // and stop event from bubbling
          return false
        })
      },
      // 获取 php 版本
      phpVersion () {
        commands.phpVersion(version => {
          this.php_version = version
        })
      },
      // 获取 swoole 版本
      swooleVersion () {
        commands.swooleVersion(output => {
          this.swoole_version = output
        })
      },
      // 获取 git 版本
      gitVersion () {
        commands.gitVersion(output => {
          this.git_version = output
        })
      },
      // 获取 git 版本
      vagrantVersion () {
        let vagrantVersion = localStorage.getItem('vagrant_version')
        if (vagrantVersion && isLessThanTenMinutes('last_get_vagrant')) {
          // 虽然不知道为什么，但是就是这样才可以渲染出来
          setTimeout(() => {
            this.vagrant_version = vagrantVersion
          }, 100)
        } else {
          commands.vagrantVersion(output => {
            this.vagrant_version = output
          })
        }
      },
      swooleServerStatus () {
        let connection = new Telnet()

        let params = {
          host: '192.168.10.10',
          port: 9304,
          timeout: 100
        }

        try {
          connection.connect(params).then(() => {
            this.swoole_server_status = 'on'
          }).catch(() => {
            this.swoole_server_status = 'off'
          })
        } catch (error) {
          // handle the throw (timeout)
          this.swoole_server_status = 'off'
          console.groupCollapsed('telnet swoole server')
          console.log(error)
          console.groupEnd()
        }
      }
    }
  }
</script>

<style scoped>

</style>
