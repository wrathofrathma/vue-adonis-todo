import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//Import vuex-router-sync
import { sync } from 'vuex-router-sync'
//Import PrimeVue to use
import PrimeVue from "primevue/config"

//Syncs the store with the router
sync(store, router);

createApp(App).use(store).use(router).use(PrimeVue).mount('#app')
