import Vue from 'vue';
import Router from 'vue-router';

import authStore from './store'

Vue.use(Router);

let router= new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: require('./views/Home')
        },
        {
            path: '/login',
            name:'login',
            component: require('./views/Login')
        },
        {
            path: '/logout',
            component: require('./views/Logout.vue')
        },
        {
            path: '/hello',
            name: 'hello',
            component: require('./views/Hello')
        },
        {
            path: '/users',
            name: 'users.index',
            component: require('./views/UsersIndex'),
            meta: { middlewareAuth: true }
        },
    ],
});

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.middlewareAuth)) {
        if (authStore.getters.isLoggedIn) {
            next()
            return
        }
        next('/login') 
    } else {
        next() 
    }
})

export default router