<template>
    <div class="description">
        <el-row>
            <el-col :span="20" :offset="2">
                <p>1. 如果需要卸载重新安装不能直接删除文件，否则会导致再次安装卡住。需要从控制面板卸载再重新安装，如果仍然不行，需要重启电脑再次尝试</p>
                <p>2. 默认路径: Foundation(<code>/home/vagrant/Code/Foundation</code>)、Homestead(<code>~/Homestead</code>), Foundation 路径是虚拟机路径, Homestead 是真机路径</p>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  export default {
    name: 'Notice'
  }
</script>

<style scoped>

</style>
