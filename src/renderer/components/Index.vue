<template>
  <el-container>
    <menus></menus>

    <el-main>
      <foundation-path></foundation-path>
      <router-view></router-view>
    </el-main>

    <loading v-show="showLoading"/>
  </el-container>
</template>

<script>
  import Loading from './Loading'
  import Menus from '@/components/Menus'
  import FoundationPath from '@/components/FoundationPath'

  export default {
    name: 'Index',
    components: {FoundationPath, Menus, Loading},
    data () {
      return {
        showLoading: false
      }
    },

    methods: {
    }
  }
</script>

<style scoped>
</style>
