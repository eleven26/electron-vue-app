<template>
  <div>
    <p>PHP 版本: {{php_version}}</p>
    <p>swoole 版本: {{swoole_version}}</p>
  </div>
</template>

<script>
  import { execute } from '../../commands/command'

  export default {
    name: 'DetectEnvironment',

    data () {
      return {
        php_version: this.phpVersion(),
        swoole_version: this.swooleVersion()
      }
    },

    methods: {
      phpVersion () {
        execute(`php -v`, output => {
          this.php_version = output.match(/PHP (\d+\.\d+\.\d+)/)[1]
        })
      },
      swooleVersion () {
        execute(`php -r "echo phpversion('swoole');"`, output => {
          this.swoole_version = output || '未安装'
        })
      }
    }
  }
</script>

<style scoped>

</style>
