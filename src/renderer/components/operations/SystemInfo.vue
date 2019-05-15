<template>
  <el-row style="margin-top: 100px">
    <el-col :span="14" :offset="4">
      <el-card shadow="never">
        <template slot="header">系统信息</template>
        <el-form label-width="150px">
          <el-form-item label="PHP 版本">{{ php_version }}</el-form-item>
          <el-form-item label="swoole 版本">{{ swoole_version }}</el-form-item>
          <el-form-item label="Git 版本">{{ git_version }}</el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import * as commands from '../../commands'

  export default {
    name: 'SystemInfo',

    data () {
      return {
        php_version: this.phpVersion(),
        swoole_version: this.swooleVersion(),
        git_version: this.gitVersion()
      }
    },

    methods: {
      phpVersion () {
        commands.phpVersion(version => {
          this.php_version = version
        })
      },
      swooleVersion () {
        commands.swooleVersion(output => {
          this.swoole_version = output
        })
      },
      gitVersion () {
        commands.gitVersion(output => {
          this.git_version = output
        })
      }
    }
  }
</script>

<style scoped>

</style>
