import Vue from 'vue';
import Router from 'vue-router';

// Containers
import Full from '../containers/Full';

// Views
import Login from '../views/Login';
import Register from '../views/Register';
import CuratorsPick from '../views/CuratorsPick';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'App',
            redirect: '/curators-pick',
            component: Full,
            children: [
                {
                    path: 'login',
                    name: 'login',
                    component: Login
                },
                {
                    path: 'register',
                    name: 'register',
                    component: Register
                },
                {
                    path: 'curators-pick',
                    name: 'curators-pick',
                    meta: {requiresAuth: true},
                    component: CuratorsPick
                }
            ]
        }
    ]
})

// Redirect unauthenticated users
router.afterEach((to, from) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null && to.meta.requiresAuth) {
        router.push({
            path: '/login'
        })
    }
})

export default router
