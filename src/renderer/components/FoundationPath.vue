<template>
  <div>
    <el-form label-width="120px" style="margin-bottom: 30px">
      <el-form-item label="Foundation 路径">
        <el-input v-model="foundationPath" disabled>
          <template slot="append">
            <el-button @click="changeFoundationPath">修改</el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>

    <el-dialog :visible.sync="dialogVisible">
      <el-form>
        <el-form-item label="请输入新的路径">
          <el-input v-model="newFoundationPath"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'FoundationPath',

    data () {
      return {
        newFoundationPath: '',
        dialogVisible: false
      }
    },

    methods: {
      // 显示修改 Foundation 路径的对话框
      changeFoundationPath () {
        this.newFoundationPath = this.foundationPath
        this.dialogVisible = true
      },
      // 关闭修改 Foundation 路径对话框
      confirm () {
        this.dialogVisible = false
        this.$store.dispatch('changeFoundationPath', this.newFoundationPath)
        location.reload()
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
