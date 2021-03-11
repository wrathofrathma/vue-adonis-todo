// import createPersistedState from 'vuex-persistedstate'
import { createStore } from 'vuex'
import authentication from "./authentication"

export default createStore({
  strict: true,
  state: {
    baseUrl: '/api'
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    authentication
  }
  // plugins: [
  //   createPersistedState()
  // ]
})
