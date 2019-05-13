<template>
  <el-container>
    <menus @showMenu="showMenu"></menus>

    <el-main>
      <foundation-path></foundation-path>

      <switch-branch :show-menus1="showMenus1" @reloadCurrentBranch="reloadCurrentBranch"></switch-branch>

      <pull :show-menus2="showMenus2"></pull>

      <detect-environment v-show="showMenus4"></detect-environment>

      <switch-env :show-menus3="showMenus3"></switch-env>

      <modules ref="modules" :foundation_path="foundation_path" :modules="modules"></modules>

      <todo></todo>
    </el-main>

    <loading v-show="showLoading"/>
  </el-container>
</template>

<script>
  /* eslint-disable handle-callback-err */
  import Modules from './Modules'
  import Loading from './Loading'
  import SwitchBranch from '@/components/operations/SwitchBranch'
  import Pull from '@/components/operations/Pull'
  import SwitchEnv from '@/components/operations/SwitchEnv'
  import DetectEnvironment from '@/components/operations/DetectEnvironment'
  import Menus from '@/components/Menus'
  import Todo from '@/components/Todo'
  import FoundationPath from '@/components/FoundationPath'

  export default {
    name: 'Index',
    components: {FoundationPath, Todo, Menus, DetectEnvironment, SwitchEnv, Pull, SwitchBranch, Loading, Modules},
    data () {
      let path = localStorage.getItem('foundation_path')

      return {
        foundation_path: path,
        content: '',
        modules: [
          'Admin',
          'Finance',
          'Core',
          'Openapi',
          'Order',
          'Product',
          'Shop',
          'Social',
          'Stock',
          'User'
        ],

        menusCount: 4,
        showMenus1: true,
        showMenus2: false,
        showMenus3: false,
        showMenus4: false,

        showLoading: false
      }
    },

    methods: {
      showMenu (index) {
        for (let i = 0; i <= this.menusCount; i++) {
          this[`showMenus` + i] = i === index
        }
      },
      reloadCurrentBranch () {
        this.$refs.modules.getModulesCurrentBranch()
      }
    }
  }
</script>

<style scoped>
</style>
