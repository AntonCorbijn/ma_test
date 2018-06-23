import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: null
    },
    mutations: {
        setUser (state, payload) {
            state.user = payload
        }
    },
    actions: {
        signIn ({ commit }, payload) {
            return new Promise((resolve, reject) => {
                axios.post('/api/login', payload)
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        signUp ({ commit }, payload) {
            return new Promise((resolve, reject) => {
                axios.post('/api/register', payload)
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        }
    },
    getters: {
        user (state) {
            return state.user
        }
    }
});
