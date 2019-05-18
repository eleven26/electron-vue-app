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
      getArtisanCommands () {
        this.loading()
        getArtisanCommands().then(commands => {
          this.artisanCommands = JSON.parse(commands.trim())
          this.loadArtisanCommands()
          this.closeLoading()
        })
      },
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
      filterNode (value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      sortLabel (tag1, tag2) {
        return tag1['label'] > tag2['label'] ? 1 : -1
      },
      loading () {
        if (this.loadingObj) this.loadingObj.close()
        this.loadingObj = this.$loading({
          target: document.querySelector('#tree')
        })
      },
      closeLoading () {
        this.loadingObj.close()
      }
    },

    watch: {
      filterText (val) {
        this.$refs.tree.filter(val)
      }
    }
  }
</script>

<style scoped>

</style>
<style>
  .el-input__inner {
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,"Microsoft YaHei" !important;
  }
</style>
