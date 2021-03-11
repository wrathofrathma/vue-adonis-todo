import HTTP from '@/http';
import router from '../router';
export default {
    namespaced: true,
    state: {
        registerEmail: '',
        registerPassword: '',
        registerError: null,
        token: null,
        loginEmail: '',
        loginPassword: '',
        loginError: null
    },
    mutations: {
        setRegisterEmail(state, email) {
            state.registerEmail = email;
        },
        setRegisterPassword(state, password) {
            state.registerPassword = password;
        },
        setToken(state, token) {
            state.token = token;
        },
        setRegisterError(state, error) {
            state.registerError = error;
        },
        setLoginEmail(state, email) {
            state.loginEmail = email;
        },
        setLoginPassword(state, password) {
            state.loginPassword = password;
        },
        setLoginError(state, error) {
            state.loginError = error;
        }
    },
    getters: {
        isLoggedIn(state) {
            return !!state.token;
        }
    },
    actions: {
        register({ commit, state }) {
            commit('setRegisterError', null);
            return HTTP().post('/api/auth/register', {
                email: state.registerEmail,
                password: state.registerPassword
            }).then(({data}) => {
                commit('setToken', data.token);
                router.push('/');

            }).catch(() => {
                commit('setRegisterError', 'An error has occured trying to create your account.');
            })
        },
        logout({commit}) {
            commit('setToken', null);
            router.push("/login")
        },
        login({state, commit}) {
            commit('setLoginError', null)
            return HTTP().post('/api/auth/login', {
                email: state.loginEmail, 
                password: state.loginPassword
            }).then(({data}) => {
                commit('setToken', data.token)
                router.push('/')
            }).catch(() => {
                commit('setLoginError', "An error occured while logging in.")
            })
        }
    }
}