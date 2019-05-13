<template>
  <el-card v-show="showMenus2" shadow="never">
    <el-button @click="pull">那就拉吧</el-button>
  </el-card>
</template>

<script>
  import { Notification } from 'element-ui'
  import { execute } from '../../commands/command'

  export default {
    name: 'Pull',

    props: {
      showMenus2: {
        type: Boolean
      }
    },

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
