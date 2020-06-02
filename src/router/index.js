/**
 * 全站路由配置
 *
 * 建议:
 * 1. 代码中路由统一使用name属性跳转(不使用path属性)
 */
import Vue from 'vue'
import Router from 'vue-router'
import http from '@/utils/httpRequest'
import { isURL } from '@/utils/validate'
import { clearLoginInfo } from '@/utils'

Vue.use(Router)
// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV)

// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [
  { path: '/404', component: _import('common/404'), name: '404', meta: { title: '404未找到' } },
  { path: '/login', component: _import('common/login'), name: 'login', meta: { title: '登录' } },
  { path: '/overview', component: _import('common/overview'), name: 'overview', meta: { title: '首页' } },
]

// 主入口路由(需嵌套上左右整体布局)
const mainRoutes = {
  path: '/',
  component: _import('main'),
  name: 'main',
  redirect: { name: 'overview' },
  meta: { title: '主入口整体布局' },
  children: [
    // 通过meta对象设置路由展示方式
    // 1. isTab: 是否通过tab展示内容, true: 是, false: 否
    // 2. iframeUrl: 是否通过iframe嵌套展示内容, '以http[s]://开头': 是, '': 否
    // 提示: 如需要通过iframe嵌套展示内容, 但不通过tab打开, 请自行创建组件使用iframe处理!
    { path: '/home', component: _import('common/home'), name: 'home', meta: { title: '首页' } },
    { path: '/theme', component: _import('common/theme'), name: 'theme', meta: { title: '主题' } },
    
    
    //用户管理
//  { path: '/user-info', component: _import('modules/user/user-info'), name: 'user-info', meta: { title: '用户信息管理', isTab: true } },
    { path: '/user-detail', component: _import('modules/user/user-detail'), name: 'user-detail', meta: { title: '用户详情', isTab: true } },
    //支付管理
//  { path: '/payment-bank-card-manage', component: _import('modules/payment/bank-card-manage'), name: 'payment-bank-card-manage', meta: { title: '银行卡管理', isTab: true } },
// //交易管理
//  { path: '/transaction-record', component: _import('modules/transaction/transaction-record'), name: 'transaction-record', meta: { title: '交易记录', isTab: true } },
//  { path: '/transaction-statistics', component: _import('modules/transaction/transaction-statistics'), name: 'transaction-statistics', meta: { title: '交易统计', isTab: true } },
   //内容管理
//  { path: '/messages-list', component: _import('modules/message/messages-list'), name: 'messages-list', meta: { title: '消息管理', isTab: true } },
    { path: '/messages-add-or-update', component: _import('modules/message/messages-add-or-update'), name: 'messages-add-or-update', meta: { title: '添加或修改消息', isTab: true,isEditor:true } },
    { path: '/useragreement-add-or-update', component: _import('modules/message/useragreement-add-or-update'), name: 'useragreement-add-or-update', meta: { title: '添加或修改协议', isTab: true,isEditor:true } },
//  { path: '/messages-feeback', component: _import('modules/message/messages-feeback'), name: 'messages-feeback', meta: { title: '信息反馈', isTab: true } },
   //广告管理
//  { path: '/advertising-manage', component: _import('modules/advertising/advertising-manage'), name: 'advertising-manage', meta: { title: '广告管理', isTab: true } },
   //服务器
    { path: '/server-overview', component: _import('modules/server/server-overview'), name: 'server-overview', meta: { title: '服务器概览', isTab: true } },
    { path: '/server-list', component: _import('modules/server/server-list'), name: 'server-list', meta: { title: '服务器列表', isTab: true } },
    { path: '/server-console', component: _import('modules/server/server-console'), name: 'server-console', meta: { title: '服务器详情', isTab: true } },
   //商家管理
// { path: '/merchant-list', component: _import('modules/merchant/merchant-list'), name: 'merchant-list', meta: { title: '第三方应用管理', isTab: true } },
//  { path: '/add-help', component: _import('modules/help/add-help'), name: 'add-help', meta: { title: '添加帮助', isTab: true } },
    { path: '/help-add-or-update', component: _import('modules/help/help-list-add-or-update'), name: 'help-add-or-update', meta: { title: '添加或修改说明', isTab: true,isEditor:true } },
    { path: '/help-classify-list', component: _import('modules/help/help-classify-list'), name: 'help-classify-list', meta: { title: '使用说明分类', isTab: true } },
    { path: '/help-classify-add-or-update', component: _import('modules/help/help-classify-add-or-update'), name: 'help-classify-add-or-update', meta: { title: '使用说明分类', isTab: true } },
    


    
  ],
  beforeEnter (to, from, next) {
    let token = Vue.cookie.get('token')
    if (!token || !/\S/.test(token)) {
      clearLoginInfo()
      next({ name: 'login' })
    }
    next()
  }
}

const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
  routes: globalRoutes.concat(mainRoutes)
})

router.beforeEach((to, from, next) => {
  // 添加动态(菜单)路由
  // 1. 已经添加 or 全局路由, 直接访问
  // 2. 获取菜单列表, 添加并保存本地存储
  if (router.options.isAddDynamicMenuRoutes || fnCurrentRouteType(to, globalRoutes) === 'global') {
    next()
  } else {
    http({
      url: http.adornUrl('/sys/menu/nav'),
      method: 'get',
      params: http.adornParams()
    }).then(({data}) => {
      if (data && data.code === 0) {
        fnAddDynamicMenuRoutes(data.menuList)
        router.options.isAddDynamicMenuRoutes = true
        sessionStorage.setItem('menuList', JSON.stringify(data.menuList || '[]'))
        sessionStorage.setItem('permissions', JSON.stringify(data.permissions || '[]'))
        next({ ...to, replace: true })
      } else {
        sessionStorage.setItem('menuList', '[]')
        sessionStorage.setItem('permissions', '[]')
        next()
      }
    }).catch((e) => {
      console.log(`%c${e} 请求菜单列表和权限失败，跳转至登录页！！`, 'color:blue')
      router.push({ name: 'login' })
    })
  }
})

/**
 * 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {*} route 当前路由
 */
function fnCurrentRouteType (route, globalRoutes = []) {
  var temp = []
  for (var i = 0; i < globalRoutes.length; i++) {
    if (route.path === globalRoutes[i].path) {
      return 'global'
    } else if (globalRoutes[i].children && globalRoutes[i].children.length >= 1) {
      temp = temp.concat(globalRoutes[i].children)
    }
  }
  return temp.length >= 1 ? fnCurrentRouteType(route, temp) : 'main'
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function fnAddDynamicMenuRoutes (menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].list && menuList[i].list.length >= 1) {
      temp = temp.concat(menuList[i].list)
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      menuList[i].url = menuList[i].url.replace(/^\//, '')
      var route = {
        path: menuList[i].url.replace('/', '-'),
        component: null,
        name: menuList[i].url.replace('/', '-'),
        meta: {
          menuId: menuList[i].menuId,
          title: menuList[i].name,
          isDynamic: true,
          isTab: true,
          iframeUrl: ''
        }
      }
      // url以http[s]://开头, 通过iframe展示
      if (isURL(menuList[i].url)) {
        route['path'] = `i-${menuList[i].menuId}`
        route['name'] = `i-${menuList[i].menuId}`
        route['meta']['iframeUrl'] = menuList[i].url
      } else {
        try {
          route['component'] = _import(`modules/${menuList[i].url}`) || null
        } catch (e) {}
      }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    fnAddDynamicMenuRoutes(temp, routes)
  } else {
    mainRoutes.name = 'main-dynamic'
    mainRoutes.children = routes
    router.addRoutes([
      mainRoutes,
      { path: '*', redirect: { name: '404' } }
    ])
    sessionStorage.setItem('dynamicMenuRoutes', JSON.stringify(mainRoutes.children || '[]'))
  }
}

export default router
