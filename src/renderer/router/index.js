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
          name: 'detect-environment',
          path: '/detect-environment',
          component: require('@/components/operations/DetectEnvironment').default
        },
        {
          name: 'todo',
          path: '/todo',
          component: require('@/components/Todo').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
