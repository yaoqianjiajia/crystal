/**
 * Created by linxin on 2017/3/11.
 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


import user from './user';

export default new Vuex.Store({
    modules: {
        user
    }
});