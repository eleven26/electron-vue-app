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

      <el-form-item label="命令输出">
        <el-input type="textarea" :rows="6" v-model="output"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { rootPath } from 'electron-root-path'
  import { execute } from '../../commands'
  const log = require('electron-log')

  export default {
    name: 'Test',

    data () {
      return {
        cmd: '',
        rootPath: rootPath,
        showDialog: false,
        output: ''
      }
    },

    methods: {
      run () {
        execute(this.cmd, output => {
          this.output += output
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
