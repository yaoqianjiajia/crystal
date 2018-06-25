//引入并安装vue-router插件
import App from './App';
import Vue from 'vue';
import store from './store/index.js';
import routes from './routers/routes'
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import Vuex from 'vuex';
Vue.use(Vuex);
import VueToast from 'vue2-toast';
import 'vue2-toast/lib/toast.css';
Vue.use(VueToast, {
    defaultType: 'center'
})

//定义路由
const router =new VueRouter({
	routes
})
router.beforeEach(({meta, path}, from, next) => {
    var { auth = true } = meta
    var isLogin = Boolean(store.state.user.name) //true用户已登录， false用户未登录

    if (auth && !isLogin && path !== '/login') {
        return next({ path: '/login' })
    }
    next()
})
//创建和挂载根实例。通过 router 配置参数注入路由，从而让整个应用都有路由功能
new Vue({
el:"#app",
store,
router,
template:'<App/>',
components:{App}
});