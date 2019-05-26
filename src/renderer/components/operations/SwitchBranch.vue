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

    <modules ref="modules" :from_switch_branch="true" :foundation_path="foundationPath"></modules>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Notification } from 'element-ui'
  import {checkPath, executeWithFoundationPath} from '../../commands'
  import * as commands from '@/commands/commands'
  import Modules from '@/components/Modules'
  import { resolveModulePaths } from '../../utils'

  export default {
    name: 'SwitchBranch',

    components: { Modules },

    data () {
      return {
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
      // checkout 之前需要检查 Foundation 路径是否正确, 不正确的情况不能 checkout
      checkPath().then(() => {
        this.disabled = false
      })
    },

    methods: {
      // 所有模块 checkout 到某一个分支
      checkout () {
        if (this.checkout_branch === '') {
          Notification.error({
            message: '请选择分支'
          })
          return
        }

        this.start()

        this.runCommand()
      },
      // 运行 checkout 操作（异步）
      runCommand () {
        const promises = resolveModulePaths().map(obj => {
          return new Promise(resolve => {
            executeWithFoundationPath(commands.checkout(this.checkout_branch, obj.module), () => resolve())
          })
        })
        Promise.all(promises).finally(() => this.finish())
      },
      // 运行命令的时候显示 loading，清除表格数据
      start () {
        this.$refs.modules.clearTable()
        this.$refs.modules.loading()
        this.loading = true
      },
      // checkout 完毕之后的回调
      finish () {
        Notification.success({
          message: `成功切换到分支 ${this.checkout_branch}`,
          position: 'bottom-right'
        })
        this.$refs.modules.getModulesCurrentBranch()
        this.loading = false
      }
    },

    computed: {
      ...mapGetters([
        'foundationPath'
      ])
    }
  }
</script>

<style scoped>

</style>
