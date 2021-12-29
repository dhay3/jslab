import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    //@代表src目录, 这里就是表示当前项目下src下...
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
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      //meta title表示的就是html中的title
      meta: {title: '首页', icon: 'el-icon-menu'}
    }]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  {
    //路由到vue组件
    //讲师模块
    path: '/teacher',
    component: Layout,

    redirect: '/teacher/list',
    name: '讲师管理',
    meta: {title: '讲师管理', icon: 'el-icon-user'},
    children: [
      {
        path: 'list',
        name: '讲师列表',
        //对应该路由的组件
        component: () => import('@/views/edu/teacher/list'),
        //通过title属性显示
        meta: {title: '讲师列表', icon: 'el-icon-tickets'}
      },
      {
        path: 'save',
        name: '添加讲师',
        component: () => import('@/views/edu/teacher/save'),
        meta: {title: '添加讲师', icon: 'el-icon-edit'}
      },
      //修改讲师路由,与添加讲师使用同一个vue组件
      {
        path: 'save/:id',
        name: '修改讲师',
        component: () => import('@/views/edu/teacher/save'),
        meta: {title: '修改讲师', icon: 'el-icon-edit'},
        hidden: true
      }
    ]
  },
  {
    //课程分类管理
    path: '/subject',
    component: Layout,
    redirect: '/subject/list',
    name: '课程分类管理',
    meta: {title: '课程分类管理', icon: 'el-icon-files'},
    children: [
      {
        path: 'list',
        name: '课程分类列表',
        //对应该路由的组件
        component: () => import('@/views/edu/subject/list'),
        //通过title属性显示
        meta: {title: '课程分类列表', icon: 'el-icon-tickets'}
      },
      {
        path: 'save',
        name: '添加课程分类',
        component: () => import('@/views/edu/subject/save'),
        meta: {title: '添加课程分类', icon: 'el-icon-edit'}
      }
    ]
  },

  {
    //课程管理
    path: '/course',
    component: Layout,
    redirect: '/course/list',
    name: '课程管理',
    meta: {title: '课程管理', icon: 'el-icon-notebook-1'},
    children: [
      {
        path: 'list',
        name: '课程列表',
        //对应该路由的组件
        component: () => import('@/views/edu/course/list'),
        //通过title属性显示
        meta: {title: '课程列表', icon: 'el-icon-tickets'}
      },
      {
        path: 'info',
        name: '课程信息',
        component: () => import('@/views/edu/course/info'),
        meta: {title: '添加课程', icon: 'el-icon-edit'}
      },
      {
        path: 'info/:id',
        name: '编辑课程基本信息',
        component: () => import('@/views/edu/course/info'),
        meta: {title: '编辑课程基本信息', noCache: true},
        //表示路由对外不可见,即导航栏中不显示
        hidden: true
      },
      {
        path: 'chapter/:id',
        name: '编辑课程大纲',
        component: () => import('@/views/edu/course/chapter'),
        meta: {title: '编辑课程大纲', noCache: true},
        hidden: true
      },
      {
        path: 'publish/:id',
        name: '发布课程',
        component: () => import('@/views/edu/course/publish'),
        meta: {title: '发布课程', noCache: true},
        hidden: true
      }
    ]
  },

  // {
  //   path: '/sta',
  //   component: Layout,
  //   redirect: '/sta/table',
  //   name: '统计分析',
  //   meta: {title: '统计分析', icon: 'el-icon-s-data'},
  //   children: [
  //     {
  //       path: '/table',
  //       name: '生成数据',
  //       component: () => import('@/views/sta/create'),
  //       meta: {title: '生成数据', icon: 'el-icon-magic-stick'}
  //     },
  //     {
  //       path: '/show',
  //       name: '图表显示',
  //       component: () => import('@/views/sta/show'),
  //       meta: {title: '图标显示', icon: 'el-icon-data-analysis'}
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: {title: 'Menu1'},
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: {title: 'Menu1-1'}
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: {title: 'Menu1-2'},
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: {title: 'Menu1-2-1'}
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: {title: 'Menu1-2-2'}
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: {title: 'Menu1-3'}
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: {title: 'menu2'}
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: {title: 'External Link', icon: 'link'}
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
   {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
