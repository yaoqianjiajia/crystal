import App from '../App'
/**
 * auth true登录才能访问，false不需要登录，默认true
 */
export default [
    {
        path: '/',
        component: App,
        children: [
            {
                path: '/login', //登录
                meta: { auth: false },
                component: resolve => require(['../views/login/'], resolve)
            },
            {
                path: '/signout', //退出
                component: resolve => require(['../views/signout/'], resolve)
            },
            {
                path: '/index', //个人主页
                component: resolve => require(['../views/index/'], resolve)
            },
            {
                path: '*', //其他页面，强制跳转到登录页面
                redirect: '/login'
            }
        ]
    }
]