<template>
    <div class="p-grid p-mt-4">
        <project-panel class="p-col-4"></project-panel>
        <tasks-panel class="p-col-8"></tasks-panel>
    </div>
</template>

<script>
import ProjectPanel from "../components/Projects.vue"
import TasksPanel from "../components/Tasks.vue"

import { mapGetters } from 'vuex'

export default {
    components: {
        ProjectPanel,
        TasksPanel
    },
    computed: {
        ...mapGetters('authentication', [
            'isLoggedIn'
        ])
    },
    mounted() {
        if(!this.isLoggedIn) {
            this.$router.push('/login')
        }
    }
}
</script>