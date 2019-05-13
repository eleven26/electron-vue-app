<template>
  <el-card shadow="never">
    <el-form :inline="true">
      <p>执行此操作会把 Foundation 以及所有子模块切换到选择的那个分支</p>
      <p>如: 选择 "qa/qa1", 会把所有 git repo 切换到 "qa/qa1" 分支</p>
      <p>如果有未提交的代码, 会先执行 "git stash", 在切换成功之后再 "git stash pop" 还原.</p>
      <el-form-item label="切换到">
        <el-select v-model="checkout_branch">
          <el-option v-for="branch in branches"
                     :key="branch"
                     :label="branch"
                     :value="branch"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="checkout">确定</el-button>
    </el-form>
  </el-card>
</template>

<script>
  import { Notification } from 'element-ui'
  import { execute } from '../../commands/command'

  export default {
    name: 'SwitchBranch',

    data () {
      return {
        checkout_branch: '',
        branches: [
          'qa/qa1',
          'qa/qa2',
          'qa/qa3',
          'release',
          'master',
          'dev/v1.1.4'
        ]
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
        execute(`./bin/checkout.php ${this.checkout_branch}`, output => {
          Notification.success({
            message: `成功切换到分支 ${this.checkout_branch}`
          })
          this.$emit('reloadCurrentBranch')
        })
      }
    }
  }
</script>

<style scoped>

</style>
