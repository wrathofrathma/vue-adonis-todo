<template>
  <Nav/>
  <div class="content">
    <router-view />
  </div>
</template>
<script>
//CSS/Theme stuff for primevue. 
import "primevue/resources/themes/vela-blue/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"
import Nav from "@/components/Nav.vue"

export default {
  components: {
    Nav
  }
  
}
</script>

<style>
body {
  background-color: var(--surface-b);
  color: var(--text-color);
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

</style>
