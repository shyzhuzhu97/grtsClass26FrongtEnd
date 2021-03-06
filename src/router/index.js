import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/showTeacher',
    name: '讲师管理',
    meta: { title: '讲师管理', icon: 'example' },
    children: [
      {
        path: '/teacher/showTeacher',
        name: '展示讲师',
        component: () => import('@/views/edu/showTeacher'),
        meta: { title: '展示讲师', icon: 'table' }
      },
      {
        path: '/teacher/addTeacher',
        name: '添加讲师',
        component: () => import('@/views/edu/addTeacher'),
        meta: { title: '添加讲师', icon: 'tree' }
      },
      {
        path: '/teacher/updateTeacher/:id',
        name: '修改讲师',
        component: () => import('@/views/edu/addTeacher'),
        meta: { title: '修改讲师', icon: 'tree' },
        hidden: true
      }
    ]
  },

  {
    path: '/subject',
    component: Layout,
    children: [
      {
        path: '/subject/manageSubject',
        name: '课程分类管理',
        component: () => import('@/views/edu/manageSubject'),
        meta: { title: '课程分类管理', icon: 'form' }
      }
    ]
  },

  {
    path: '/course',
    component: Layout,
    redirect: '/course/showCourse',
    name: '课程管理',
    meta: { title: '课程管理', icon: 'example' },
    children: [
      {
        path: '/course/showCourse',
        name: '展示课程',
        component: () => import('@/views/edu/showCourse'),
        meta: { title: '展示课程', icon: 'table' }
      },
      {
        path: '/course/addCourse',
        name: '添加课程',
        component: () => import('@/views/edu/addCourse'),
        meta: { title: '添加课程', icon: 'tree' }
      },
      {
        path: '/course/updateCourse/:id',
        name: '修改课程',
        component: () => import('@/views/edu/addCourse'),
        meta: { title: '修改课程', icon: 'tree' },
        hidden: true
      },
      {
        path: '/course/addChapter/:id',
        name: '添加章节',
        component: () => import('@/views/edu/addChapter'),
        meta: { title: '添加章节', icon: 'tree' },
        hidden: true
      }
      ,
      {
        path: '/course/publishCourse/:id',
        name: '发布课程',
        component: () => import('@/views/edu/publishCourse'),
        meta: { title: '发布课程', icon: 'tree' },
        hidden: true
      }
    ]
  },


  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
