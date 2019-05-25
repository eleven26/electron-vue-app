<template>
  <div>
    <el-form>
      <el-form-item label="Homestead 路径">
        <el-input v-model="homestead" disabled>
          <template slot="append">
            <el-button @click="change(homestead, 'changeHomestead')">修改</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="vagrant 路径">
        <el-input v-model="vagrant" disabled>
          <template slot="append">
            <el-button @click="change(vagrant, 'changeVagrant')">修改</el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>

    <el-dialog :visible.sync="dialogVisible">
      <el-form>
        <el-form-item label="请输入新的值">
          <el-input v-model="newValue"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="cancel">取消</el-button>
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
        action: '',
        newValue: '',
        dialogVisible: false
      }
    },

    methods: {
      change (value, action) {
        this.newValue = value
        this.action = action
        this.dialogVisible = true
      },
      // 关闭修改 Homestead 路径对话框
      confirm () {
        this.dialogVisible = false
        this.$store.dispatch(this.action, this.newValue.trim())
        location.reload()
      },
      cancel () {
        this.dialogVisible = false
        this.newValue = ''
        this.action = ''
      }
    },

    computed: {
      ...mapGetters([
        'homestead',
        'vagrant'
      ])
    }
  }
</script>

<style scoped>

</style>
