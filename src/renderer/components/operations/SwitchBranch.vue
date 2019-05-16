<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="全部模块切换到" label-width="120px">
        <el-select v-model="checkout_branch">
          <el-option v-for="branch in branches"
                     :key="branch"
                     :label="branch"
                     :value="branch"></el-option>
        </el-select>
      </el-form-item>
      <el-button :disabled="disabled" :loading="loading" type="primary" @click="checkout">确定</el-button>
    </el-form>

    <modules ref="modules" :from_switch_branch="true" :foundation_path="foundation_path"></modules>
  </div>
</template>

<script>
  import { Notification } from 'element-ui'
  import {checkPath, execute} from '../../commands'
  import Modules from '@/components/Modules'
  import {foundationPath, isWin, resolveModulePaths} from '../../utils'

  export default {
    name: 'SwitchBranch',
    components: {Modules},
    data () {
      let path = foundationPath() || ''

      return {
        foundation_path: path,
        checkout_branch: '',
        branches: [
          'qa/qa1',
          'qa/qa2',
          'qa/qa3',
          'release',
          'master',
          'dev/v1.1.4',
          'dev/v1.1.5'
        ],
        loading: false,
        disabled: true
      }
    },

    mounted () {
      checkPath().then(() => {
        this.disabled = false
      })
    },

    methods: {
      checkout () {
        // todo check path is valid
        // todo checkout branch is valid
        if (this.checkout_branch === '') {
          Notification.error({
            message: '请选择分支'
          })
          return
        }
        this.$refs.modules.clearTable()
        this.$refs.modules.loading()
        this.loading = true
        // execute(`php ./bin/checkout.php ${this.checkout_branch}`, output => {
        //   Notification.success({
        //     message: `成功切换到分支 ${this.checkout_branch}`,
        //     position: 'bottom-right'
        //   })
        //   this.$refs.modules.getModulesCurrentBranch()
        //   this.loading = false
        // })
        let promises = []
        resolveModulePaths().forEach(obj => {
          let promise = new Promise(resolve => {
            let prefix = isWin() ? `set module=${obj.module}` : `export module=${obj.module}`
            execute(`${prefix} && php ./bin/checkout.php ${this.checkout_branch}`, output => {
              resolve()
            })
          })
          promises.push(promise)
        })

        Promise.all(promises, res => {
        }).finally(() => {
          Notification.success({
            message: `成功切换到分支 ${this.checkout_branch}`,
            position: 'bottom-right'
          })
          this.$refs.modules.getModulesCurrentBranch()
          this.loading = false
        })
      }
    }
  }
</script>

<style scoped>

</style>
<style>
  .el-select .el-input__inner {
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,"Microsoft YaHei";
  }
</style>
