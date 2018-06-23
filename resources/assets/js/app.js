/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
import router from './router'
import App from './App.vue'
import { store } from './store'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    const accessToken = localStorage.getItem('accessToken');

    if ( accessToken != null ) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if(error.response.status === 401) {
        localStorage.removeItem('accessToken');
        router.push('/login');
    }

    return Promise.reject(error);
});

const app = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
});
