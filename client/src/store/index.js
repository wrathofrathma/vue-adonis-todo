import createPersistedState from 'vuex-persistedstate'
import { createStore } from 'vuex'
import authentication from "./authentication"
import projects from "./projects"
import tasks from "./tasks"

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
    projects,
    tasks
  },
  plugins: [
    createPersistedState()
  ]
})
