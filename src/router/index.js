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
        title: '新增',
        name: 'addNote',
        component: () =>
          import ('@/views/components/addNote.vue')
      },{
        path: 'editNote',
        title: '编辑',
        name: 'editNote',
        component: () =>
          import ('@/views/components/editNote.vue')
      },{
        path: 'noteDetail',
        title: '详情',
        name: 'noteDetail',
        component: () =>
          import ('@/views/components/noteDetail.vue')
      }]
    }
  ]
})
