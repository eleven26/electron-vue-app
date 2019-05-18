<template>
  <div>
    <el-button :disabled="disabled" :loading="loading" @click="pull">Pull all</el-button>
    <el-row>
      <el-col>
        <div class="description">
          <p>点击 <code>"Pull all"</code> 可以拉取所有模块当前分支的代码</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { Notification } from 'element-ui'
  import {checkPath, execute} from '../../commands'
  import {resolveBinFilePath, resolveModulePaths} from '../../utils'

  export default {
    name: 'Pull',

    data () {
      return {
        loading: false,
        disabled: true
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
            execute(this.command(obj.module), () => resolve())
          })
        })

        Promise.all(promises).finally(() => this.finish())
      },
      // 拉取模块的命令
      command (module) {
        const binFile = resolveBinFilePath('pull.php')
        return `php ${binFile} --module=${module}`
      },
      // 拉取完毕的回调
      finish () {
        Notification.success({
          message: '拉取代码成功',
          position: 'bottom-right'
        })
        this.loading = false
      }
    }
  }
</script>

<style scoped>

</style>
