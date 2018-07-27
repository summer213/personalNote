import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      redirect:'/home',
      children: [{
        path: 'home',
        title: '首页',
        name: 'notelist',
        component: () =>
          import ('@/views/components/notelist.vue')
      },{
        path: 'addNote',
        title: '编辑',
        name: 'richedit',
        component: () =>
          import ('@/views/components/richEdit.vue')
      }]
    }
  ]
})
