<template>
  <el-card shadow="never">
    <el-table class="module-table" :data="tables">
      <el-table-column prop="module" label="模块" sortable></el-table-column>
      <el-table-column prop="current_branch" label="当前分支"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
  import { currentBranch } from '../commands/command'

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
        ]
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
        this.resolvePaths()
        this.tables = []

        this.paths.forEach(path => {
          currentBranch(path).then(branch => {
            this.tables.push({
              module: path.split('/').pop(),
              current_branch: branch
            })
          })
        })
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

</style>
<style type="scss">
  .module-table tr td, .module-table tr th {
    padding: 2px 0;
  }
</style>
