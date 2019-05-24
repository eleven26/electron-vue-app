<template>
  <div>
    <el-form>
      <el-form-item label="Homestead 路径">
        <el-input v-model="homestead" disabled>
          <template slot="append">
            <el-button @click="changeHomesteadPath">修改</el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>

    <el-dialog :visible.sync="dialogVisible">
      <el-form>
        <el-form-item label="请输入新的路径">
          <el-input v-model="newHomesteadPath"></el-input>
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
    name: 'Config',

    data () {
      return {
        newHomesteadPath: '',
        dialogVisible: false
      }
    },

    methods: {
      // 显示修改 Homestead 路径的对话框
      changeHomesteadPath () {
        this.newHomesteadPath = this.homestead
        this.dialogVisible = true
      },
      // 关闭修改 Homestead 路径对话框
      confirm () {
        this.dialogVisible = false
        this.$store.dispatch('changeHomestead', this.newHomesteadPath.trim())
        location.reload()
      }
    },

    computed: {
      ...mapGetters([
        'homestead'
      ])
    }
  }
</script>

<style scoped>

</style>
