<template>
  <div>
    <el-form label-width="120px" style="margin-bottom: 30px">
      <el-form-item label="Foundation 路径">
        <el-input v-model="foundation_path" disabled>
          <template slot="append">
            <el-button @click="changeFoundationPath">修改</el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>

    <el-dialog :visible.sync="dialogVisible">
      <el-form>
        <el-form-item label="请输入新的路径">
          <el-input v-model="new_foundation_path"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="closeDialog">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {foundationPath} from '../utils'

  export default {
    name: 'FoundationPath',

    data () {
      // 从 localStorage 获取配置的 Foundation 路径
      let path = foundationPath()

      return {
        foundation_path: path,
        new_foundation_path: '',
        dialogVisible: false
      }
    },

    methods: {
      // 显示修改 Foundation 路径的对话框
      changeFoundationPath () {
        this.new_foundation_path = this.foundation_path
        this.dialogVisible = true
      },
      // 关闭修改 Foundation 路径对话框
      closeDialog () {
        this.dialogVisible = false
        this.foundation_path = this.new_foundation_path
        location.reload()
      }
    },

    watch: {
      // 修改 Foundation 路径的时候更新 localStorage，同时把路径的 \ 替换成 \\（因为 \ 会产生转义效果）
      new_foundation_path (val) {
        if (val) {
          if (val.match(/\\/g) && !val.match(/\\\\/g)) {
            val = val.replace(/\\/g, '\\\\')
          }
        }
        this.foundation_path = val
        localStorage.setItem('foundation_path', val)
      }
    }
  }
</script>

<style scoped>

</style>
