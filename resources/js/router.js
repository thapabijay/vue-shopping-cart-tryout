import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Hello from './views/Hello';
import Home from './views/Home';
import UsersIndex from './views/UsersIndex';

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/hello',
            name: 'hello',
            component: Hello,
        },
        {
            path: '/users',
            name: 'users.index',
            component: UsersIndex,
        },
    ],
});