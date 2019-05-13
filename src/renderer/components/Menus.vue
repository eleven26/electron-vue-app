<template>
  <el-aside style="width: 160px">
    <el-row>
      <el-col :span="24">
        <h5>可选操作</h5>
        <el-menu default-active="1" class="el-menu-vertical-demo">
          <el-menu-item v-for="(menu, index) in menus" :key="index" @click="showMenu(menu.name)">
            <span slot="title">{{ menu.title }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </el-aside>
</template>

<script>
  export default {
    name: 'Menus',

    data () {
      return {
        menus: [
          {
            title: '切换到某一分支',
            name: 'switch-branch'
          },
          {
            title: '拉取所有模块',
            name: 'pull'
          },
          {
            title: '切换 env',
            name: 'switch-env'
          },
          {
            title: '运行环境检测',
            name: 'detect-environment'
          },
          {
            title: 'todo',
            name: 'todo'
          }
        ]
      }
    },

    methods: {
      showMenu (name) {
        console.log(name)
        this.$router.push({ name })
      }
    }
  }
</script>

<style scoped>

</style>
