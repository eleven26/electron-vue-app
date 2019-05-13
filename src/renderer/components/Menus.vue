<template>
  <el-aside style="width: 200px">
    <el-row>
      <el-col :span="24">
        <h5>可选操作</h5>
        <el-menu
                default-active="1"
                class="el-menu-vertical-demo">
          <el-menu-item index="1" @click="showMenu(1)">
            <span slot="title">切换到某一分支</span>
          </el-menu-item>
          <el-menu-item index="2" @click="showMenu(2)">
            <span slot="title">拉取所有模块</span>
          </el-menu-item>
          <el-menu-item index="3" @click="showMenu(3)">
            <span slot="title">切换 env</span>
          </el-menu-item>
          <el-menu-item index="4" @click="showMenu(4)">
            <span slot="title">运行环境检测</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </el-aside>
</template>

<script>
  export default {
    name: 'Menus',

    methods: {
      showMenu (i) {
        this.$emit('showMenu', i)
      }
    }
  }
</script>

<style scoped>

</style>
