<template>
  <div>
    <el-button :disabled="disabled" :loading="loading" @click="pull">Pull all</el-button>
    <el-button @click="clear">clear</el-button>
    <el-row>
      <el-col>
        <div class="description">
          <p>点击 <code>"Pull all"</code> 可以拉取所有模块当前分支的代码</p>
        </div>
      </el-col>
    </el-row>

    <el-form>
      <el-form-item style="margin-top: 10px">
        <el-input id="textarea" type="textarea" :rows="12" v-model="output"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { Notification } from 'element-ui'
  import { checkPath, executeWithFoundationPath } from '@/commands/index'
  import * as commands from '@/commands/commands'
  import {resolveModulePaths} from '@/utils'

  export default {
    name: 'Pull',

    data () {
      return {
        loading: false,
        disabled: true,
        output: ''
      }
    },

    mounted () {
      // 进行拉取操作之前需要确保 Foundation 路径正确
      checkPath().then(() => {
        this.disabled = false
      })
    },

    methods: {
      // 拉取所有模块的当前分支
      pull () {
        this.loading = true

        const promises = resolveModulePaths().map(obj => {
          return new Promise(resolve => {
            executeWithFoundationPath(commands.pull(obj.module), res => {
              this.output += res
              resolve(res)
              setTimeout(() => {
                document.querySelector('#textarea').scrollTop = document.querySelector('#textarea').scrollHeight
              }, 10)
            })
          })
        })

        Promise.all(promises).finally(() => this.finish())
      },
      // 拉取完毕的回调
      finish () {
        Notification.success({
          message: '拉取代码成功',
          position: 'bottom-right'
        })
        this.loading = false
      },
      clear () {
        this.output = ''
      }
    }
  }
</script>

<style scoped>
  .el-textarea__inner {
    background: black !important;
    color: white !important;
  }
</style>
