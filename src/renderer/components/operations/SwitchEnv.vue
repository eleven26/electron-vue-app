<template>
  <div>
    <el-form label-width="120px">
      <el-form-item label="切换 env">
        <el-radio-group v-model="newEnv">
          <el-radio-button :disabled="disabled" label="qa1"></el-radio-button>
          <el-radio-button :disabled="disabled" label="qa2"></el-radio-button>
          <el-radio-button :disabled="disabled" label="qa3"></el-radio-button>
          <el-radio-button :disabled="disabled" label="demo"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="disabled" :loading="loading" type="primary" @click="switchToLocal">还原</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="11" style="margin-left: 120px; margin-top: 20px">
        <div class="description">
          <p>1. 点击 <code>qa1</code>、<code>qa2</code>、<code>qa3</code>、<code>demo</code> 来切换到不同的 env</p>
          <p>2. 点击 "还原" 可以把 <code>env</code> 还原为未修改前的状态</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Notification } from 'element-ui'
  import {checkPath, executeWithFoundationPath} from '../../commands'
  import {switchEnv} from '@/commands/commands'

  export default {
    name: 'SwitchEnv',

    data () {
      return {
        newEnv: '',
        envs: [
          'qa1',
          'qa2',
          'qa3',
          'demo',
          'local'
        ],
        loading: false,
        disabled: true
      }
    },

    mounted () {
      // 切换 env 之前确保 Foundation 路径正确
      checkPath().then(() => {
        this.disabled = false
      })
    },

    methods: {
      // 切换 env
      switchEnv (env) {
        if (this.envs.indexOf(this.newEnv) === -1) {
          Notification.error({
            message: '请选择正确的环境',
            position: 'bottom-right'
          })
          return
        }
        this.$store.dispatch('changeEnv', env)

        this.loading = true
        executeWithFoundationPath(switchEnv(this.env), () => this.success())
      },
      // 切换成功的回调
      success () {
        Notification.success({
          message: this.env === 'local' ? '成功还原 env !' : `成功切换到 ${this.env} !`,
          position: 'bottom-right'
        })
        this.loading = false
      },
      switchToLocal () {
        this.newEnv = 'local'
      }
    },

    watch: {
      // env 变动的时候保存到 localStorage
      newEnv (env) {
        this.switchEnv(env)
      }
    },

    computed: {
      ...mapGetters([
        'env'
      ])
    }
  }
</script>

<style scoped>

</style>
