# Overview

Vue 3.0 + Primevue + Adonisjs CRUD TODO based on this video: https://www.youtube.com/watch?v=dfEZlcPvez8 

# Library & Framework Differences
There are a few key differences between this app and the tutorial video this is based on.
- Adonis.js structure has changed since the video release
- Vue.js has been updated to Vue 3.
- Due to the update of Vue, we're also using a different component library. We're using Primevue instead of Vuetify. 
- PrimeIcons doesn't quite measure up to the variety offered by Vuetify, material icons, etc. So we are mostly using material icons. 

# Technical Differences
- Vuetify text fields have an @input event, Primevue InputText does not. To access the data changing we had to bind to @update:model-value
- Tutorial used Vuetify, which doesn't have a Panel component. We do. 
- In the tutorial, they used a component inside a view with the same name. In my setup it causes an infinite loop. Not sure if it's because of vue 3, vue router, or firefox, but to fix this we just imported under a different name. 
- Vue3 doesn't support Ie11, so we don't need to use Vue.set since modern browsers can detect changes via proxies and we don't need to explicitly tell vue to overwrite the getters and setters.