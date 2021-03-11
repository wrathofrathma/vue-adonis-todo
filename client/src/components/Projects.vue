<template>
    <Panel>
        <template #header>
            <h3 class="p-m-0">
                Projects
            </h3>
        </template>
        <div class="p-grid">
            <div class="p-col-12" v-for="project in projects" :key="project.id">
                {{project.title}}
            </div>
        </div>
        <div class="p-d-flex">
            <input-text 
                placeholder="My project name..." 
                class="p-col-10" 
                @update:model-value="setNewProjectName"
                @keyup.enter="createProject"
                :value="newProjectName"
            />
            <Button class="p-col p-ml-2" @click="createProject">
                <i class="material-icons">add_circle</i>
                Create
            </Button>
        </div>
    </Panel>
</template>

<script>
//This is kinda cheating since the tutorial created its own panel...but in my defense there is no default Panel components in vuetify lol.
import Panel from "primevue/panel";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
    components: {
        Panel,
        InputText,
        Button
    },
    computed: {
        ...mapState('projects', [
            'newProjectName',
            'projects'
        ]),
        ...mapGetters('authentication', [
            'isLoggedIn'
        ])
    },
    methods: {
        ...mapMutations('projects', [
            'setNewProjectName'
        ]),
        ...mapActions('projects', [
            'createProject',
            'getProjects'
        ])
    },
    mounted() {
        if(this.isLoggedIn) {
            this.getProjects()
        }
    }
}
</script>