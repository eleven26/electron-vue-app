<template>
  <el-card shadow="never">
    <el-button @click="pull">那就拉吧</el-button>
  </el-card>
</template>

<script>
  import { Notification } from 'element-ui'
  import { execute } from '../../commands'

  export default {
    name: 'Pull',

    methods: {
      pull () {
        execute(`./bin/pull.php`, output => {
          Notification.success({
            message: '拉取代码成功'
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
