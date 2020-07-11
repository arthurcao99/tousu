import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' ,requiresAuth: true}
                },
                // {
                //     path: '/search',
                //     component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/search.vue'),
                //     meta: { title: '搜索' }
                // },
                // {
                //     path: '/advanceSearch',
                //     component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/AdvanceSearch.vue'),
                //     meta: { title: '高级搜索' }
                // },
                // {
                //     name: 'comicDetail',
                //     path: '/comicDetail',
                //     component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/ComicDetail.vue'),
                //     meta: { title: '漫画详情' }
                // },
                {
                    path: '/collect',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/collect.vue'),
                    meta: { title: '我的收藏',requiresAuth: true }
                },
                // {
                //     path: '/history',
                //     component: () => import(/* webpackChunkName: "donate" */ '../components/page/History.vue'),
                //     meta: { title: '浏览历史' }
                // }
                // ,
                {
                    path: '/userweibo',
                    name:'userweibo',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/userWeibo.vue'),
                    meta: { title: '用户页面',requiresAuth: true }
                }
                ,
                {
                    path: '/manager',
                    name:'manager',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/manager.vue'),
                    meta: { title: '用户页面',requiresAuth: true }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        }
    ]
});
