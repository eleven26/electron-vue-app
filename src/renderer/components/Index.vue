<template>
  <el-container>
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

    <el-main>
      <el-form label-width="120px" style="margin-bottom: 30px">
        <el-form-item label="Foundation 路径">
          <el-input v-model="foundation_path" disabled>
            <template slot="append">
              <el-button @click="click">修改</el-button>
            </template>
          </el-input>
        </el-form-item>

        <el-card>
          <div style="color: red">
            <p>todo</p>
            <p>0. 样式优化</p>
            <p>1. 显示所有模块以及所有模块当前分支, 在 git 操作之后重新检测</p>
            <p>2. 显示命令执行的所有输出</p>
            <p>3. 运行环境检测</p>
            <p>4. windows 兼容</p>
            <p>5. 构建(mac/windows)</p>
            <p>6. title、app name 替换</p>
          </div>
        </el-card>
      </el-form>

      <el-dialog :visible.sync="dialogVisible">
        <el-form>
          <el-form-item label="请输入新的路径">
            <el-input v-model="new_foundation_path"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="closeDialog">确定</el-button>
      </span>
      </el-dialog>

      <el-card v-show="showMenus1">
        <el-form :inline="true">
          <p>执行此操作会把 Foundation 以及所有子模块切换到选择的那个分支</p>
          <p>如: 选择 "qa/qa1", 会把所有 git repo 切换到 "qa/qa1" 分支</p>
          <p>如果有未提交的代码, 会先执行 "git stash", 在切换成功之后再 "git stash pop" 还原.</p>
          <el-form-item label="切换到">
            <el-select v-model="checkout_branch">
              <el-option v-for="branch in branches"
                         :key="branch"
                         :label="branch"
                         :value="branch"></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" @click="checkout">确定</el-button>
        </el-form>
      </el-card>

      <el-card v-show="showMenus2">
        <el-button @click="pull">那就拉吧</el-button>
      </el-card>

      <el-card v-show="showMenus3">
        <template slot="title">切换 env</template>
        <el-form>
          <el-form-item label="切换 env">
            <el-radio-group v-model="env">
              <el-radio-button label="qa1"></el-radio-button>
              <el-radio-button label="qa2"></el-radio-button>
              <el-radio-button label="qa3"></el-radio-button>
              <el-radio-button label="demo"></el-radio-button>
            </el-radio-group>
            <el-button type="primary" @click="switchEnv">确定</el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <el-card v-show="showMenus4">
        <el-button>运行环境检测</el-button>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
  /* eslint-disable handle-callback-err */
  import { Notification } from 'element-ui'
  const exec = require('child_process').exec

  /**
   * 执行命令
   */
  function execute (command, callback) {
    checkPath().then(() => {
      exec(command, (error, stdout, stderr) => {
        // todo handle error
        if (error) {
          Notification.error({
            message: error
          })
          console.log(error)
        }
        if (stderr) {
          Notification.error({
            message: error
          })
          console.log(stderr)
        }

        callback(stdout)
      })
    })
  }

  /**
   * 检查 Foundation 是否正确
   *
   * @returns {Promise<any>}
   */
  function checkPath () {
    return new Promise(resolve => {
      let path = localStorage.getItem('foundation_path')

      exec(`cd ${path} && git config --get remote.origin.url`, (error, stdout, stderr) => {
        if (!stdout || stdout.indexOf('Foundation.git') === -1) {
          Notification.error({
            message: 'Foundation 路径配置不正确'
          })
        } else {
          resolve()
        }
      })
    })
  }

  export default {
    name: 'Index',

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
        branches: [
          'qa/qa1',
          'qa/qa2',
          'qa/qa3',
          'release',
          'master',
          'dev/v1.1.4'
        ],
        envs: [
          'qa1',
          'qa2',
          'qa3',
          'demo'
        ],

        dialogVisible: false,
        new_foundation_path: '',

        checkout_branch: '',

        menusCount: 4,
        showMenus1: true,
        showMenus2: false,
        showMenus3: false,
        showMenus4: false,

        env: ''
      }
    },

    created () {
    },
    mounted () {
    },

    methods: {
      showMenu (index) {
        for (let i = 0; i < this.menusCount; i++) {
          this[`showMenus` + i] = i === index
        }
      },
      click () {
        this.new_foundation_path = this.foundation_path
        this.dialogVisible = true
      },
      closeDialog () {
        this.dialogVisible = false
        this.foundation_path = this.new_foundation_path
      },
      checkout () {
        // todo check path is valid
        // todo checkout branch is valid
        if (this.checkout_branch === '') {
          Notification.error({
            message: '请选择分支'
          })
          return
        }
        execute(`./bin/checkout.php ${this.checkout_branch}`, output => {
          Notification.success({
            message: `成功切换到分支 ${this.checkout_branch}`
          })
        })
      },
      pull () {
        execute(`./bin/pull.php`, output => {
          Notification.success({
            message: '拉取代码成功'
          })
        })
      },
      switchEnv () {
        if (this.envs.indexOf(this.env) === -1) {
          Notification.success({
            message: '请选择正确的环境'
          })
          return
        }
        execute(`./bin/switch_env.php ${this.env}`, output => {
          Notification.success({
            message: `成功切换到 ${this.env} !`
          })
        })
      }
    },

    watch: {
      foundation_path (val) {
        localStorage.setItem('foundation_path', val)
      }
    }
  }
</script>

<style scoped>
</style>
