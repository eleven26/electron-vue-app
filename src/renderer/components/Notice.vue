<template>
    <div class="description">
        <el-row>
            <el-col :span="20" :offset="2">
                <p>1. 如果需要卸载重新安装不能直接删除文件，否则会导致再次安装卡住。需要从控制面板卸载再重新安装，如果仍然不行，需要重启电脑再次尝试</p>
                <p>2. 默认路径: Foundation(<code>{{ userHome }}/Code/Foundation</code>)</p>
                <p>3. windows 需要 vc9、vc11 运行库（是 x86 32 位）
                    <a class="link" @click="download('https://git-helper.oss-cn-shenzhen.aliyuncs.com/VC9%2032%E4%BD%8D.zip')">vc9（32 位）</a>&nbsp;&nbsp;&nbsp;
                    <a class="link" @click="download('https://git-helper.oss-cn-shenzhen.aliyuncs.com/VC11%2032%E4%BD%8D.zip')">vc11（32 位）</a>
                </p>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  import {getUserHome} from '@/utils'

  export default {
    name: 'Notice',
    data () {
      return {
        userHome: getUserHome()
      }
    },
    methods: {
      download (link) {
        // 'http://www.php.cn/xiazai/gongju/1351'
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style scoped>
.link {
    color: blue;
}
.link:hover {
    cursor: pointer;
}
</style>
