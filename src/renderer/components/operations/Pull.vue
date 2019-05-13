<template>
  <el-card shadow="never">
    <el-button :loading="loading" @click="pull">那就拉吧</el-button>
  </el-card>
</template>

<script>
  import { Notification } from 'element-ui'
  import { execute } from '../../commands'

  export default {
    name: 'Pull',

    data () {
      return {
        loading: false
      }
    },

    methods: {
      pull () {
        this.loading = true
        execute(`./bin/pull.php`, output => {
          Notification.success({
            message: '拉取代码成功',
            position: 'bottom-right'
          })
          this.loading = false
        })
      }
    }
  }
</script>

<style scoped>

</style>
