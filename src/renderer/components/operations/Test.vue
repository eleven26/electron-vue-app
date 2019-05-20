<template>
  <div>
    <el-form>
      <el-form-item label="rootPath">
        <el-input disabled v-model="rootPath"></el-input>
      </el-form-item>
      <el-form-item label="运行命令">
        <el-input v-model="cmd"></el-input>
      </el-form-item>
      <el-button @click="run">运行</el-button>
      <el-button @click="clear">清空输出</el-button>

      <el-form-item label="命令输出" style="margin-top: 10px">
        <el-input id="textarea" type="textarea" :rows="12" v-model="output"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { rootPath } from 'electron-root-path'
  import { execute } from '../../commands'
  import { isWin } from '../../utils'
  const log = require('electron-log')

  export default {
    name: 'Test',

    data () {
      return {
        cmd: 'dir',
        rootPath: rootPath,
        showDialog: false,
        output: ''
      }
    },

    methods: {
      run () {
        let cmd = this.cmd
        if (isWin()) {
          cmd = '@chcp 65001 > nul & cmd /d/s/c ' + this.cmd
        }
        const textarea = document.getElementById('textarea')
        execute(cmd, {encoding: 'UTF-8'}, output => {
          this.output += output + '\n\n'
          // hack ??? interesting
          setTimeout(() => {
            textarea.scrollTop = textarea.scrollHeight
          }, 10)
          log.info(output)
        })
      },
      clear () {
        this.output = ''
      }
    }
  }
</script>

<style scoped>

</style>
<style>
  .el-textarea__inner {
    background: black !important;
    color: white !important;
  }
</style>
