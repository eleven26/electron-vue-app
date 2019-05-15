<template>
  <el-form>
    <el-form-item label="切换 env">
      <el-radio-group v-model="env">
        <el-radio-button label="qa1"></el-radio-button>
        <el-radio-button label="qa2"></el-radio-button>
        <el-radio-button label="qa3"></el-radio-button>
        <el-radio-button label="demo"></el-radio-button>
      </el-radio-group>
      <el-button :loading="loading" type="primary" @click="switchEnv('local')">还原</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { Notification } from 'element-ui'
  import { execute } from '../../commands'

  export default {
    name: 'SwitchEnv',

    data () {
      let env = localStorage.getItem('env')

      return {
        env: env,
        envs: [
          'qa1',
          'qa2',
          'qa3',
          'demo',
          'local'
        ],
        loading: false
      }
    },

    methods: {
      switchEnv (env) {
        if (env) {
          this.env = env
          return
        }
        if (this.envs.indexOf(this.env) === -1) {
          Notification.error({
            message: '请选择正确的环境',
            position: 'bottom-right'
          })
          return
        }
        this.loading = true
        execute(`php ./bin/switch_env.php ${this.env}`, () => {
          Notification.success({
            message: this.env === 'local' ? '成功还原 env !' : `成功切换到 ${this.env} !`,
            position: 'bottom-right'
          })
          this.loading = false
        })
      }
    },

    watch: {
      env (env) {
        localStorage.setItem('env', env)
        this.switchEnv()
      }
    }
  }
</script>

<style scoped>

</style>
