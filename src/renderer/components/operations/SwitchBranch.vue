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
      <el-button :loading="loading" type="primary" @click="checkout">确定</el-button>
    </el-form>

    <modules ref="modules" :foundation_path="foundation_path"></modules>
  </div>
</template>

<script>
  import { Notification } from 'element-ui'
  import { execute } from '../../commands'
  import Modules from '@/components/Modules'

  export default {
    name: 'SwitchBranch',
    components: {Modules},
    data () {
      let path = localStorage.getItem('foundation_path')

      return {
        foundation_path: path,
        checkout_branch: '',
        branches: [
          'qa/qa1',
          'qa/qa2',
          'qa/qa3',
          'release',
          'master',
          'dev/v1.1.4'
        ],
        loading: false
      }
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
        execute(`php ./bin/checkout.php ${this.checkout_branch}`, output => {
          console.log(output)
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
