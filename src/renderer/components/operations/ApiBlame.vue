<template>
    <div>
        <h5 style="margin-left: 7px">查询某个接口的作者、所在控制器和方法</h5>
        <el-form>
            <el-form-item>
                <el-input placeholder="请输入路径" v-model="url">
                    <el-select slot="prepend" v-model="requestMethod" style="width: 110px">
                        <el-option v-for="method in methods"
                                   :key="method"
                                   :label="method"
                                   :value="method"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="blame" :loading="loading"></el-button>
                </el-input>
            </el-form-item>
            <el-form-item style="margin-top: 20px" v-show="showDetail" label-width="120px" label="开发者：">
                {{ developer }}
            </el-form-item>
            <el-form-item v-show="showDetail" label-width="120px" label="文档地址：">
                <a class="link" @click="open(docs_url)">{{ docs_url }}</a>
            </el-form-item>
            <el-form-item v-show="showDetail" label-width="120px" label="class：">
                {{ cls }}
            </el-form-item>
            <el-form-item v-show="showDetail" label-width="120px" label="method：">
                {{ method }}
            </el-form-item>
            <el-row v-show="this.params.length > 0 && !loading">
                <el-col style="width: 120px">
                    <el-form-item label="参数：" label-width="120px"></el-form-item>
                </el-col>
                <el-col :span="12" style="margin-top: 4px">
                    <el-table class="modules-table" :data="params" :show-header="false">
                        <el-table-column prop="key"></el-table-column>
                        <el-table-column prop="value"></el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
  import { Notification } from 'element-ui'
  import {checkPath, executeWithFoundationPath} from '../../commands'
  import {apiBlame} from '@/commands/commands'

  export default {
    name: 'ApiBlame',

    data () {
      return {
        url: '',
        developer: '',
        docs_url: '',
        raw_docs: '',
        cls: '',
        method: '',
        requestMethod: 'GET',
        loading: false,
        showDetail: false,
        params: [],
        methods: [
          'GET',
          'POST',
          'PUT',
          'PATCH',
          'DELETE'
        ]
      }
    },

    methods: {
      blame () {
        if (this.url === '') {
          Notification.error({
            message: `请输入 URL`,
            position: 'bottom-right'
          })
          return
        }

        try {
          // eslint-disable-next-line no-new
          new URL(this.url)
        } catch (e) {
          Notification.error({
            message: `URL 格式错误`,
            position: 'bottom-right'
          })
          return
        }

        this.loading = true
        this.resolveParams()
        checkPath().then(() => {
          executeWithFoundationPath(apiBlame(this.url, this.requestMethod), output => this.finish(output))
        })
      },
      finish (result) {
        try {
          let res = JSON.parse(result)
          this.developer = res.developer
          this.docs_url = res.docs_url
          this.raw_docs = res.raw_docs
          this.cls = res.class
          this.method = res.method
        } catch (e) {
          console.log(result)
          Notification.error({
            message: `返回数据格式错误`,
            position: 'bottom-right'
          })
        }
        this.loading = false
        this.showDetail = true
      },
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      clear () {
        this.url = ''
        this.showDetail = false
        this.params = []
      },
      resolveParams () {
        try {
          let url = new URL(this.url)
          this.params = url.search.substring(1)
            .split('&')
            .map(v => {
              let pair = v.split('=')
              return {
                key: pair[0],
                value: decodeURIComponent(pair[1])
              }
            }).filter(v => {
              return v.key !== ''
            })
        } catch (e) {
        }
      }
    }
  }
</script>

<style scoped>
.link {
    color: dodgerblue;
}
.link:hover {
    cursor: pointer;
}
.modules-table tr td, .modules-table tr th {
    padding: 2px 0;
}
.el-form-item__label, .el-form-item__content {
    line-height: 22px !important;
}
.el-form-item {
    margin-bottom: 10px !important;
}
</style>
