<template>
  <div>
    <p>PHP 版本: {{php_version}}</p>
    <p>swoole 版本: {{swoole_version}}</p>
  </div>
</template>

<script>
  import * as commands from '../../commands'

  export default {
    name: 'SystemInfo',

    data () {
      return {
        php_version: this.phpVersion(),
        swoole_version: this.swooleVersion()
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
          this.swoole_version = output || '未安装'
        })
      }
    }
  }
</script>

<style scoped>

</style>
