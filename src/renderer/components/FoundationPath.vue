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
  export default {
    name: 'FoundationPath',

    data () {
      let path = localStorage.getItem('foundation_path')

      return {
        foundation_path: path,
        new_foundation_path: '',
        dialogVisible: false
      }
    },

    methods: {
      changeFoundationPath () {
        this.new_foundation_path = this.foundation_path
        this.dialogVisible = true
      },
      closeDialog () {
        this.dialogVisible = false
        this.foundation_path = this.new_foundation_path
      }
    },

    watch: {
      new_foundation_path (val) {
        this.foundation_path = val
        localStorage.setItem('foundation_path', val)
      }
    }
  }
</script>

<style scoped>

</style>
