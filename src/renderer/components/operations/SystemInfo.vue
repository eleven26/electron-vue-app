<template>
  <el-row style="margin-top: 60px">
    <el-col :span="14" :offset="4">
      <el-card shadow="never">
        <template slot="header">系统信息(0.0.1)</template>
        <el-form label-width="150px">
          <el-form-item label="PHP 版本">{{ php_version }}</el-form-item>
          <el-form-item label="swoole 版本">{{ swoole_version }}</el-form-item>
          <el-form-item label="Git 版本">{{ git_version }}</el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import * as commands from '../../commands'
  const { remote } = require('electron')
  const currentWindow = remote.getCurrentWindow()

  export default {
    name: 'SystemInfo',

    data () {
      return {
        php_version: this.phpVersion(),
        swoole_version: this.swooleVersion(),
        git_version: this.gitVersion()
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
      }
    }
  }
</script>

<style scoped>

</style>
