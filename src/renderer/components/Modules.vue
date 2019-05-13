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
        <div>
          <p>1. 执行此操作会把 <code>Foundation</code> 以及所有其他 <code>Modules</code> 下面的模块切换到选择的那个分支</p>
          <p>2. 如: 选择 <code>qa/qa1</code>, 会把所有 <code>git repo</code> 切换到 <code>qa/qa1</code> 分支</p>
          <p>3. 如果有未提交的代码, 会先执行 <code>git stash</code>, 在切换成功之后再 <code>git stash pop</code> 还原.</p>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import { currentBranch } from '../commands'

  // 检测所有模块当前分支(前提 foundation 路径正确)
  export default {
    name: 'Modules',

    props: {
      foundation_path: {
        type: String,
        required: true
      }
    },

    data () {
      return {
        paths: [],
        tables: [],
        modules: [
          'Admin',
          'Finance',
          'Core',
          'Openapi',
          'Order',
          'Product',
          'Shop',
          'Social',
          'Stock',
          'User'
        ],
        loadingObj: null
      }
    },

    mounted () {
      // 可以父组件检查 Foundation 路径
      this.getModulesCurrentBranch()
    },

    methods: {
      resolvePaths () {
        let paths = this.modules.map(module => {
          return `${this.foundation_path}/Modules/${module}`
        })
        paths.unshift(this.foundation_path)

        this.paths = paths
      },
      getModulesCurrentBranch () {
        const promises = []
        this.resolvePaths()
        this.tables = []

        this.paths.forEach(path => {
          let promise = new Promise(resolve => {
            currentBranch(path).then(branch => {
              this.tables.push({
                module: path.split('/').pop(),
                current_branch: branch
              })
              resolve()
            })
          })
          promises.push(promise)
        })

        this.loading()
        Promise.all(promises).then(() => {
          this.closeLoading()
        })
      },
      clearTable () {
        this.tables = []
      },
      loading () {
        if (this.loadingObj) this.loadingObj.close()
        this.loadingObj = this.$loading({
          target: document.querySelector('.modules-table')
        })
      },
      closeLoading () {
        this.loadingObj.close()
      }
    },

    watch: {
      foundation_path (val) {
        this.foundation_path = val
        this.getModulesCurrentBranch()
      }
    }
  }
</script>

<style scoped>
  code {
    border-radius: 3px;
    font-size: 85%;
    margin: 0;
    padding: .2em .4em;
    font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;
    background: rgba(27,31,35,.05);
  }
</style>
<style type="scss">
  .modules-table tr td, .modules-table tr th {
    padding: 2px 0;
  }
  .el-table::before{
    height: 0 !important;
  }
</style>
