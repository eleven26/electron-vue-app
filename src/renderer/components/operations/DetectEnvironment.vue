<template>
  <div>
    <p>PHP 版本: {{php_version}}</p>
  </div>
</template>

<script>
  export default {
    name: 'DetectEnvironment',

    data () {
      return {
        php_version: ''
      }
    }
  }
</script>

<style scoped>

</style>

