// import createPersistedState from 'vuex-persistedstate'
import { createStore } from 'vuex'
import authentication from "./authentication"
import projects from "./projects"
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
    authentication,
    projects
  }
  // plugins: [
  //   createPersistedState()
  // ]
})
