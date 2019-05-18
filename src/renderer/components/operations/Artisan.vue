<template>
  <div>
    <h4>所有可用 Artisan 命令</h4>

    <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>

    <div id="tree">
      <el-tree :v-loading="loading" style="margin-top: 10px"
              class="filter-tree"
              :data="tree"
              :props="defaultProps"
              :filter-node-method="filterNode"
              ref="tree">
      </el-tree>
    </div>
  </div>
</template>

<script>
  import {getArtisanCommands} from '../../commands'

  export default {
    name: 'Artisan',

    data () {
      return {
        artisanCommands: {},
        tree: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        tags: [],
        filterText: '',
        loadingObj: null
      }
    },

    mounted () {
      this.getArtisanCommands()
    },

    methods: {
      // 获取所有 artisan 命令，渲染到页面上
      getArtisanCommands () {
        this.loading()

        getArtisanCommands().then(commands => {
          try {
            this.artisanCommands = JSON.parse(commands.trim())
          } catch (e) {
            Notification.success({
              message: `返回数据格式错误`,
              position: 'bottom-right'
            })
          }
          this.loadArtisanCommands()
          this.closeLoading()
        })
      },
      // 从 php 调用获取 artisan 命令
      loadArtisanCommands () {
        const tags = this.artisanCommands.tags
        const tree = Object.keys(tags).map(tag => {
          const children = Object.keys(tags[tag]).map(signature => {
            return {
              label: signature + ` (${tags[tag][signature]['description']})`,
              description: tags[tag][signature]['description']
            }
          })
          return {
            label: tag,
            children: children.sort(this.sortLabel)
          }
        })
        const noTagCommands = Object.keys(this.artisanCommands.no_tag_commands).map(signature => {
          const command = this.artisanCommands.no_tag_commands[signature]
          return {
            label: signature + ` (${command.description})`,
            description: command.description
          }
        })
        this.tree = tree.sort(this.sortLabel)
        this.tree.unshift({
          label: '无标签命令',
          children: noTagCommands
        })
      },
      // 搜索节点
      filterNode (value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      // 排序 tag
      sortLabel (tag1, tag2) {
        return tag1['label'] > tag2['label'] ? 1 : -1
      },
      // 显示 loading 动画
      loading () {
        if (this.loadingObj) this.loadingObj.close()
        this.loadingObj = this.$loading({
          target: document.querySelector('#tree')
        })
      },
      // 关闭 loading 动画
      closeLoading () {
        this.loadingObj.close()
      }
    },

    watch: {
      // 搜索
      filterText (val) {
        this.$refs.tree.filter(val)
      }
    }
  }
</script>

<style scoped>

</style>
