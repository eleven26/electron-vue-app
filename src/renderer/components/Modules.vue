<template>
  <el-row style="margin-top: 10px">
    <el-col :span="12">
      <el-table class="modules-table" :data="tables">
        <el-table-column prop="module" label="模块" sortable align="center"></el-table-column>
        <el-table-column prop="current_branch" label="当前分支" align="center"></el-table-column>
      </el-table>
    </el-col>

    <el-col :span="11" :offset="1" style="margin-top: 39px">
      <el-card shadow="never">
        <div class="description">
          <p>1. 执行此操作会把 <code>Foundation</code> 以及所有其他 <code>Modules</code> 下面的模块切换到选择的那个分支</p>
          <p>2. 如: 选择 <code>qa/qa1</code>, 会把所有 <code>git repo</code> 切换到 <code>qa/qa1</code> 分支</p>
          <p>3. 如果有未提交的代码, 会先执行 <code>git stash</code>, 在切换成功之后再 <code>git stash pop</code> 还原.</p>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { checkPath, currentBranch } from '../commands'
  import { resolveModulePaths } from '../utils'

  // 检测所有模块当前分支(前提 foundation 路径正确)
  export default {
    name: 'Modules',

    props: {
      from_switch_branch: {
        type: Boolean,
        required: false,
        default: false
      }
    },

    data () {
      return {
        paths: [],
        tables: [],
        loadingObj: null
      }
    },

    mounted () {
      // 可以父组件检查 Foundation 路径
      if (this.from_switch_branch) {
        checkPath(false).then(() => {
          this.getModulesCurrentBranch()
        })
      } else {
        this.getModulesCurrentBranch()
      }
    },

    methods: {
      // 获取所有模块当前分支
      getModulesCurrentBranch () {
        this.paths = resolveModulePaths().map(obj => obj.path)
        this.tables = []

        const promises = this.paths.map(path => {
          return new Promise(resolve => {
            currentBranch(path).then(branch => {
              path = path.replace(/\\/g, '/')
              this.tables.push({
                module: path.split('/').pop(),
                current_branch: branch
              })
              resolve()
            })
          })
        })

        this.loading()
        Promise.all(promises).then(() => this.closeLoading())
      },
      // 清除当前表格数据
      clearTable () {
        this.tables = []
      },
      // 表格位置显示 loading 动画
      loading () {
        if (this.loadingObj) this.loadingObj.close()

        this.loadingObj = this.$loading({
          target: document.querySelector('.modules-table')
        })
      },
      // 关闭 loading 动画
      closeLoading () {
        this.loadingObj.close()
      }
    },

    watch: {
      // Foundation 路径变动的时候需要重新获取所有模块的当前分支
      foundationPath (val) {
        this.foundationPath = val
        this.getModulesCurrentBranch()
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
<style type="scss">
  .modules-table tr td, .modules-table tr th {
    padding: 2px 0;
  }
  .el-table::before{
    height: 0 !important;
  }
</style>
