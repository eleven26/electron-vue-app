<template>
  <el-form>
    <el-form-item label="切换 env">
      <el-radio-group v-model="env">
        <el-radio-button label="qa1"></el-radio-button>
        <el-radio-button label="qa2"></el-radio-button>
        <el-radio-button label="qa3"></el-radio-button>
        <el-radio-button label="demo"></el-radio-button>
      </el-radio-group>
      <el-button :loading="loading" type="primary" @click="switchEnv">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { Notification } from 'element-ui'
  import { execute } from '../../commands'

  export default {
    name: 'SwitchEnv',

    data () {
      return {
        env: '',
        envs: [
          'qa1',
          'qa2',
          'qa3',
          'demo'
        ],
        loading: false
      }
    },

    methods: {
      switchEnv () {
        if (this.envs.indexOf(this.env) === -1) {
          Notification.success({
            message: '请选择正确的环境'
          })
          return
        }
        this.loading = true
        execute(`./bin/switch_env.php ${this.env}`, () => {
          Notification.success({
            message: `成功切换到 ${this.env} !`,
            position: 'bottom-right'
          })
          this.loading = false
        })
      }
    }
  }
</script>

<style scoped>

</style>
