<template>
  <el-container>
    <menus style="width: 160px;position: fixed"></menus>

    <el-main style="margin-left: 160px">
      <foundation-path></foundation-path>
      <router-view></router-view>
    </el-main>

  </el-container>
</template>

<script>
  import Menus from '@/components/Menus'
  import FoundationPath from '@/components/FoundationPath'

  export default {
    name: 'Index',

    components: {FoundationPath, Menus}
  }
</script>

<style scoped>
</style>
