<template>
  <el-button :disabled="disabled" :loading="loading" @click="pull">Pull all</el-button>
</template>

<script>
  import { Notification } from 'element-ui'
  import {checkPath, execute} from '../../commands'

  export default {
    name: 'Pull',

    data () {
      return {
        loading: false,
        disabled: true
      }
    },

    mounted () {
      checkPath().then(() => {
        this.disabled = false
      })
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
