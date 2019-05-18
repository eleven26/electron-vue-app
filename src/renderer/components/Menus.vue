<template>
  <el-aside style="width: 160px">
    <el-row>
      <el-col :span="24">
        <h5 style="font-size: 16px">可选操作</h5>
        <el-menu class="el-menu-vertical-demo">
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
            title: '系统信息',
            name: 'system-info'
          },
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
          // {
          //   title: 'test',
          //   name: 'test'
          // },
          // ,
          // {
          //   title: 'todo',
          //   name: 'todo'
          // },
          {
            title: 'Artisan 命令',
            name: 'artisan'
          }
        ]
      }
    },

    methods: {
      // 切换菜单
      showMenu (name) {
        this.$router.push({ name })
      }
    }
  }
</script>

<style scoped>

</style>
