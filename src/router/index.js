import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'index',
      name: 'Index',
      component: () => import('@/views/index/index'),
      meta: { title: '代表团管理', icon: 'el-icon-s-cooperation' }
    }]
  },

  {
    path: '/paper',
    component: Layout,
    redirect: '/paper/allcert',
    name: 'Paper',
    meta: { title: '证件管理', icon: 'el-icon-folder' },
    children: [
      {
        path: 'allcert',
        name: 'Allcert',
        component: () => import('@/views/allcert/index'),
        meta: { title: '所有证件申请管理', icon: '' }
      },
      {
        path: 'guest',
        name: 'Guest',
        component: () => import('@/views/guest/index'),
        meta: { title: '嘉宾证申请管理', icon: '' }
      }
    ]
  },

  {
    path: '/prints',
    component: Layout,
    redirect: '/prints/template',
    name: 'Prints',
    meta: { title: '票证打印', icon: 'el-icon-printer' },
    children: [
      {
        path: 'template',
        name: 'Template',
        component: () => import('@/views/prints/template/index'),
        meta: { title: '模板设置', icon: '' }
      },
      {
        path: 'cert',
        name: 'Cert',
        component: () => import('@/views/prints/cert/index'),
        meta: { title: '证件打印', icon: '' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  mode: 'hash',
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
