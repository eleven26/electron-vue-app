import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: require('@/components/Index').default,
      children: [
        {
          name: 'switch-branch',
          path: '/switch-branch',
          component: require('@/components/operations/SwitchBranch').default
        },
        {
          name: 'pull',
          path: '/pull',
          component: require('@/components/operations/Pull').default
        },
        {
          name: 'switch-env',
          path: '/switch-env',
          component: require('@/components/operations/SwitchEnv').default
        },
        {
          name: 'system-info',
          path: '/system-info',
          component: require('@/components/operations/SystemInfo').default
        },
        {
          name: 'todo',
          path: '/todo',
          component: require('@/components/Todo').default
        },
        {
          name: 'artisan',
          path: '/artisan',
          component: require('@/components/operations/Artisan').default
        },
        {
          name: 'test',
          path: '/test',
          component: require('@/components/operations/Test').default
        },
        {
          name: 'notice',
          path: '/notice',
          component: require('@/components/Notice').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
